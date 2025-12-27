import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

import { useToast } from "@/components/shared";
import { IndividualTier1FormData } from "@/features/account/validation/individual-tier1";
import {
  getLGAs,
  sendProspectOTP,
  submitProspect,
  updateAddressDetails,
  updateFile,
  verifyBVN,
  verifyNIN,
  verifyOTP,
} from "@/services/account.service";
import {
  ApiError,
  ApiResponse,
  LocationOption,
  SendProspectOTPRequest,
  UpdateAddressDetailsRequest,
  VerifyBvnData,
  VerifyNinData,
} from "@/types/api";
import { base64ToFileUpload, findStateCodeByName } from "@/utils";

interface UseTier1MutationsProps {
  prospectId: string | null;
  setProspectId: (id: string | null) => void;
  form: UseFormReturn<IndividualTier1FormData>;
  handleNext: () => void;
  states: LocationOption[];
  onStateOfOriginChange: (stateCode: string) => void;
  onStateOfResidenceChange: (stateCode: string) => void;
}

export function useTier1Mutations({
  prospectId,
  setProspectId,
  form,
  handleNext,
  states,
  onStateOfOriginChange,
  onStateOfResidenceChange,
}: UseTier1MutationsProps) {
  const { showToast } = useToast();
  const { setValue } = form;

  /**
   * Centralized mutation response handler
   */
  const handleApiResponse = <T>(
    response: ApiResponse<T>,
    options: {
      successMessage?: string;
      onSuccess?: (data: T) => void;
      onError?: (message: string) => void;
    } = {}
  ) => {
    if (response.status === "Success" || response.code === 204) {
      if (options.successMessage) {
        showToast({ type: "success", message: options.successMessage });
      }
      options.onSuccess?.(response.data as T);
      return true;
    } else {
      const errorMsg = response.message || "An error occurred";
      if (options.onError) {
        options.onError(errorMsg);
      } else {
        showToast({ type: "error", message: errorMsg });
      }
      return false;
    }
  };

  const syncLocation = async (
    stateName: string | undefined,
    lgaName: string | undefined,
    fieldPrefix: "Origin" | "Residence"
  ) => {
    if (!stateName) return;

    const stateCode = findStateCodeByName(stateName, states);
    if (!stateCode) return;

    const stateField = `stateOf${fieldPrefix}` as "stateOfOrigin" | "stateOfResidence";
    const lgaField = `lgaOf${fieldPrefix}` as "lgaOfOrigin" | "lgaOfResidence";

    setValue(stateField, stateCode);

    if (fieldPrefix === "Origin") {
      onStateOfOriginChange(stateCode);
    } else {
      onStateOfResidenceChange(stateCode);
    }

    // Reset LGA field before trying to sync new value
    setValue(lgaField, "");

    if (lgaName) {
      const lgaResponse = await getLGAs(stateCode);
      if (lgaResponse.status === "Success" && lgaResponse.data) {
        const matchedLga = lgaResponse.data.find(
          (l) => l.lga_name.toLowerCase() === lgaName.toLowerCase()
        );
        if (matchedLga) {
          setValue(lgaField, matchedLga.lga_code);
        }
      }
    }
  };

  const populateFormFromVerification = async (
    data: VerifyBvnData | VerifyNinData,
    isBvn: boolean
  ) => {
    if (data.firstName) setValue("firstName", data.firstName);
    if (data.middleName) setValue("middleName", data.middleName);

    const lastName = isBvn ? (data as VerifyBvnData).lastName : (data as VerifyNinData).surName;
    if (lastName) setValue("lastName", lastName);

    if (data.gender) setValue("gender", data.gender.toLowerCase());

    const address = isBvn
      ? (data as VerifyBvnData).residentialAddress
      : (data as VerifyNinData).residenceAddressLine1;
    if (address) setValue("residentialAddress", address);

    // Direct Location Syncing
    if (isBvn) {
      const bvnData = data as VerifyBvnData;
      await Promise.all([
        syncLocation(bvnData.stateOfOrigin || undefined, bvnData.localGovernmentOfOrigin || undefined, "Origin"),
        syncLocation(bvnData.stateOfResidence || undefined, bvnData.localGovernmentOfResidence || undefined, "Residence"),
      ]);

      if (bvnData.base64Image) {
        const passportFile = base64ToFileUpload(bvnData.base64Image, "bvn_passport.jpg");
        if (passportFile) setValue("passportPhotograph", passportFile);
      }
    } else {
      const ninData = data as VerifyNinData;
      if (ninData.photoBase64) {
        const passportFile = base64ToFileUpload(ninData.photoBase64, "nin_passport.jpg");
        if (passportFile) setValue("passportPhotograph", passportFile);
      }
    }
  };

  const sendOTPMutation = useMutation({
    mutationFn: (data: SendProspectOTPRequest) =>
      sendProspectOTP(data.prospectDetails, data.phone, data.country),
    onSuccess: (response) =>
      handleApiResponse(response, {
        successMessage: "OTP sent successfully!",
        onSuccess: (data) => setProspectId(data.prospect.id),
      }),
    onError: (error: ApiError) => showToast({ type: "error", message: error.message }),
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (data: { otp: string }) => verifyOTP(prospectId!, data.otp),
    onSuccess: (response) =>
      handleApiResponse(response, {
        successMessage: "OTP verified successfully!",
        onSuccess: () => handleNext(),
      }),
    onError: (error: ApiError) => showToast({ type: "error", message: error.message }),
  });

  const verifyBVNMutation = useMutation({
    mutationFn: (data: { bvn: string; dob: Date; email: string }) =>
      verifyBVN({ prospectId: prospectId!, ...data }),
    onSuccess: (response) =>
      handleApiResponse(response, {
        onSuccess: async (data) => {
          if (data.responseCode === "00") {
            // TODO: REMOVE MOCK DATA BEFORE PRODUCTION
            // data.localGovernmentOfResidence = "Asa";
            // data.localGovernmentOfOrigin = "Alkaleri";

            await populateFormFromVerification(data, true);
            showToast({ type: "success", message: "BVN verified!" });
          } else {
            showToast({ type: "error", message: data.responseMessage || "Verification failed" });
          }
        },
      }),
    onError: (error: ApiError) => showToast({ type: "error", message: error.message }),
  });

  const verifyNINMutation = useMutation({
    mutationFn: (data: { nin: string; dob: Date; email: string }) =>
      verifyNIN({ prospectId: prospectId!, ...data }),
    onSuccess: (response) =>
      handleApiResponse(response, {
        onSuccess: async (data) => {
          if (data.responseCode === "00") {
            await populateFormFromVerification(data, false);
            showToast({ type: "success", message: "NIN verified!" });
          } else {
            showToast({ type: "error", message: data.responseMessage || "Verification failed" });
          }
        },
      }),
    onError: (error: ApiError) => showToast({ type: "error", message: error.message }),
  });

  const updateAddressMutation = useMutation({
    mutationFn: (data: UpdateAddressDetailsRequest) => updateAddressDetails(prospectId!, data),
    onSuccess: (response) =>
      handleApiResponse(response, {
        successMessage: "Address details updated!",
        onSuccess: () => handleNext(),
      }),
    onError: (error: ApiError) => showToast({ type: "error", message: error.message }),
  });

  const finalSubmitMutation = useMutation({
    mutationFn: async (data: IndividualTier1FormData) => {
      if (data.passportPhotograph) {
        await updateFile(prospectId!, data.passportPhotograph, "passport");
      }
      if (data.signature) {
        await updateFile(prospectId!, data.signature, "signature");
      }
      return await submitProspect(prospectId!);
    },
    onSuccess: (response) =>
      handleApiResponse(response, {
        onSuccess: (data) => {
          showToast({
            type: "success",
            message: `Account for ${data.customer.accountname} created!`,
          });
        },
      }),
    onError: (error: ApiError) => showToast({ type: "error", message: error.message }),
  });

  return {
    sendOTPMutation,
    verifyOTPMutation,
    verifyBVNMutation,
    verifyNINMutation,
    updateAddressMutation,
    finalSubmitMutation,
  };
}

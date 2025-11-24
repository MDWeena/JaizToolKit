import { useToast } from "@/components/shared";
import { IndividualTier1FormData } from "@/features/account/validation/individual-tier1";
import {
  sendProspectOTP,
  submitProspect,
  updateAddressDetails,
  updateFile,
  verifyBVN,
  verifyNIN,
  verifyOTP,
} from "@/services/account.service";
import {
  SendProspectOTPRequest,
  UpdateAddressDetailsRequest,
} from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

interface UseTier1MutationsProps {
  prospectId: string | null;
  setProspectId: (id: string) => void;
  form: UseFormReturn<IndividualTier1FormData>;
  handleNext: () => void;
}

export function useTier1Mutations({
  prospectId,
  setProspectId,
  form,
  handleNext,
}: UseTier1MutationsProps) {
  const { showToast } = useToast();
  const { setValue } = form;

  const sendOTPMutation = useMutation({
    mutationFn: (data: SendProspectOTPRequest) =>
      sendProspectOTP(data.prospectDetails, data.phone, data.country),
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        setProspectId(response.data.prospect.Id);
        showToast({ type: "success", message: "OTP sent successfully!" });
      } else {
        showToast({
          type: "error",
          message: response.message || "Failed to send OTP.",
        });
      }
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (data: { otp: string }) => verifyOTP(prospectId!, data.otp),
    onSuccess: (response) => {
      if (response.status === "success") {
        showToast({ type: "success", message: "OTP verified successfully!" });
        handleNext();
      } else {
        showToast({
          type: "error",
          message: response.message || "OTP verification failed.",
        });
      }
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });
    },
  });

  const verifyBVNMutation = useMutation({
    mutationFn: (data: { bvn: string; dob: Date }) =>
      verifyBVN(prospectId!, data.bvn, data.dob),
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        const { firstname, middlename, lastname } = response.data.prospect;
        setValue("firstName", firstname);
        setValue("middleName", middlename);
        setValue("lastName", lastname);
        showToast({ type: "success", message: "BVN verified!" });
      } else {
        showToast({
          type: "error",
          message: response.message || "BVN verification failed.",
        });
      }
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });
    },
  });

  const verifyNINMutation = useMutation({
    mutationFn: (data: { nin: string; dob: Date; email: string }) =>
      verifyNIN(prospectId!, data.nin, data.dob, data.email),
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        const { firstname, middlename, lastname } = response.data.prospect;
        setValue("firstName", firstname);
        setValue("middleName", middlename);
        setValue("lastName", lastname);
        showToast({ type: "success", message: "NIN verified!" });
      } else {
        showToast({
          type: "error",
          message: response.message || "NIN verification failed.",
        });
      }
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: (data: UpdateAddressDetailsRequest) =>
      updateAddressDetails(prospectId!, data),
    onSuccess: (response) => {
      if (response.code === 204 || response.status === "success") {
        showToast({
          type: "success",
          message: "Address details updated!",
        });
        handleNext();
      } else {
        showToast({
          type: "error",
          message: response.message || "Failed to update address details.",
        });
      }
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });
    },
  });

  const finalSubmitMutation = useMutation({
    mutationFn: async (data: IndividualTier1FormData) => {
      await updateFile(prospectId!, data.passportPhotograph as any, "passport");
      await updateFile(prospectId!, data.signature as any, "signature");
      const finalResponse = await submitProspect(prospectId!);
      return finalResponse;
    },
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        showToast({
          type: "success",
          message: `Account for ${response.data.customer.accountname} created!`,
        });
        // Navigation can be handled here or in the component
      } else {
        showToast({
          type: "error",
          message: response.message || "Final submission failed.",
        });
      }
    },
    onError: (error: any) => {
      showToast({
        type: "error",
        message:
          error.message ||
          "An unexpected error occurred during final submission.",
      });
    },
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

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
  VerifyBvnData,
  VerifyNinData,
} from "@/types/api";
import { FileUpload } from "@/types/file-upload";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type StateOption = { code: string; name: string };

const normalizeStateName = (stateName: string | null): string => {
  if (!stateName) return "";
  return stateName.replace(/\s*State$/i, "").trim();
};

const findStateCodeByName = (
  stateName: string | null,
  states: StateOption[]
): string => {
  if (!stateName || states.length === 0) return "";

  const normalized = normalizeStateName(stateName).toLowerCase();
  const state = states.find((s) => s.name.toLowerCase() === normalized);
  return state?.code || "";
};

const base64ToFileUpload = (
  base64String: string,
  fileName: string = "passport.jpg"
): FileUpload => {
  if (!base64String) return null;

  const uri = `data:image/jpeg;base64,${base64String}`;
  // Estimate file size from base64 (base64 is ~33% larger than binary)
  const estimatedSize = Math.round((base64String.length * 3) / 4);
  return {
    uri,
    type: "image/jpeg",
    name: fileName,
    size: estimatedSize,
  };
};

interface UseTier1MutationsProps {
  prospectId: string | null;
  setProspectId: (id: string) => void;
  form: UseFormReturn<IndividualTier1FormData>;
  handleNext: () => void;
  states: StateOption[];
}

export interface PendingLgaValues {
  lgaOfOrigin: string | null;
  lgaOfResidence: string | null;
}

export function useTier1Mutations({
  prospectId,
  setProspectId,
  form,
  handleNext,
  states,
}: UseTier1MutationsProps) {
  const { showToast } = useToast();
  const { setValue } = form;

  // Store pending LGA values to be set after LGAs are fetched
  const [pendingLgaValues, setPendingLgaValues] = useState<PendingLgaValues>({
    lgaOfOrigin: null,
    lgaOfResidence: null,
  });

  const clearPendingLga = (field: keyof PendingLgaValues) => {
    setPendingLgaValues((prev) => ({ ...prev, [field]: null }));
  };

  const sendOTPMutation = useMutation({
    mutationFn: (data: SendProspectOTPRequest) =>
      sendProspectOTP(data.prospectDetails, data.phone, data.country),
    onSuccess: (response) => {
      if (response.status === "Success" && response.data) {
        setProspectId(response.data.prospect.id);
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
      if (response.status === "Success") {
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
    mutationFn: (data: { bvn: string; dob: Date; email: string }) =>
      verifyBVN({
        prospectId: prospectId!,
        bvn: data.bvn,
        dob: data.dob,
        email: data.email,
      }),
    onSuccess: (response) => {
      if (response.status === "Success" && response.data) {
        const data: VerifyBvnData = response.data;

        // Guard: Check if response is valid
        if (!data.responseCode || data.responseCode !== "00") {
          showToast({
            type: "error",
            message: data.responseMessage || "BVN verification failed.",
          });
          return;
        }

        // Auto-populate personal details (Step 2)
        if (data.firstName) setValue("firstName", data.firstName);
        if (data.middleName) setValue("middleName", data.middleName);
        if (data.lastName) setValue("lastName", data.lastName);

        // Auto-populate address details (Step 3)
        if (data.gender) {
          setValue("gender", data.gender.toLowerCase());
        }
        if (data.residentialAddress)
          setValue("residentialAddress", data.residentialAddress);

        if (data.stateOfOrigin) {
          const stateCode = findStateCodeByName(data.stateOfOrigin, states);
          if (stateCode) {
            setValue("stateOfOrigin", stateCode);
            if (data.localGovernmentOfOrigin) {
              setPendingLgaValues((prev) => ({
                ...prev,
                lgaOfOrigin: data.localGovernmentOfOrigin,
              }));
            }
          }
        }
        if (data.stateOfResidence) {
          const stateCode = findStateCodeByName(data.stateOfResidence, states);
          if (stateCode) {
            setValue("stateOfResidence", stateCode);
            if (data.localGovernmentOfResidence) {
              setPendingLgaValues((prev) => ({
                ...prev,
                lgaOfResidence: data.localGovernmentOfResidence,
              }));
            }
          }
        }

        if (data.base64Image) {
          const passportFile = base64ToFileUpload(
            data.base64Image,
            "bvn_passport.jpg"
          );
          if (passportFile) {
            setValue("passportPhotograph", passportFile);
          }
        }

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
      verifyNIN({
        prospectId: prospectId!,
        nin: data.nin,
        dob: data.dob,
        email: data.email,
      }),
    onSuccess: (response) => {
      if (response.status === "Success" && response.data) {
        const data: VerifyNinData = response.data;

        // Guard: Check if response is valid
        if (!data.responseCode || data.responseCode !== "00") {
          showToast({
            type: "error",
            message: data.responseMessage || "NIN verification failed.",
          });
          return;
        }

        if (data.firstName) setValue("firstName", data.firstName);
        if (data.middleName) setValue("middleName", data.middleName);
        if (data.surName) setValue("lastName", data.surName);

        if (data.gender) {
          setValue("gender", data.gender.toLowerCase());
        }
        if (data.residenceAddressLine1)
          setValue("residentialAddress", data.residenceAddressLine1);

        if (data.photoBase64) {
          const passportFile = base64ToFileUpload(
            data.photoBase64,
            "nin_passport.jpg"
          );

          if (passportFile) {
            setValue("passportPhotograph", passportFile);
          }
        }

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
      if (response.code === 204 || response.status === "Success") {
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
      // console.log("Final submission response:", finalResponse);
      return finalResponse;
    },
    onSuccess: (response) => {
      if (response.status === "Success" && response.data) {
        showToast({
          type: "success",
          message: `Account for ${response.data.customer.accountname} created!`,
        });
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
    pendingLgaValues,
    clearPendingLga,
  };
}

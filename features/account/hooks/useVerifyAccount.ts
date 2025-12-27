import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";

import { useToast } from "@/components/shared";
import { PhoneForm, phoneSchema } from "@/features/account/validation";
import { verifyAccount } from "@/services/account.service";
import { ApiError } from "@/types/api";
import { useAccountStore } from "./useAccountStore";

export function useVerifyAccount() {
  const { showToast } = useToast();
  const router = useRouter();
  const setVerifiedAccounts = useAccountStore((state) => state.setVerifiedAccounts);

  const form = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationKey: ["verifyAccount"],
    mutationFn: verifyAccount,
    onSuccess: (response) => {
      if (response.status !== "Success" || !response.data || response.data.length === 0) {
        showToast({
          message: "No accounts found.",
          type: "error",
        });
        return;
      }
      Keyboard.dismiss();
      showToast({
        message: "Account verified successfully",
        type: "success",
      });
      setVerifiedAccounts(response.data);
      router.push({
        pathname: "/(app)/accounts/verify/success",
      });
      form.reset();
    },
    onError: (error: ApiError) => {
      showToast({
        type: "error",
        message: error?.message || "Verification failed.",
      });
    },
  });

  const handleVerify = useCallback(
    (data: PhoneForm) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return {
    form,
    handleVerify,
    isVerifying: mutation.isPending,
  };
}

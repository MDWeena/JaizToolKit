import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Keyboard } from "react-native";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/shared";
import { PhoneForm, phoneSchema } from "@/features/account/validation";
import { verifyAccount } from "@/services/account.service";

export function useVerifyAccount() {
  const { showToast } = useToast();
  const router = useRouter();

  const form = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
    mode: "onChange",
  });

  const phoneNumber = form.watch("phoneNumber");

  const mutation = useMutation({
    mutationKey: ["verifyAccount", phoneNumber],
    mutationFn: verifyAccount,
    onSuccess: (response) => {
      if (response.status === "Success" && response.data) {
        Keyboard.dismiss();

        showToast({
          message: "Account verified successfully",
          type: "success",
        });

        router.push({
          pathname: "/(app)/accounts/verify/success",
          params: { accounts: JSON.stringify(response.data) },
        });

        form.reset();
      }
    },
    onError: (error: any) => {
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

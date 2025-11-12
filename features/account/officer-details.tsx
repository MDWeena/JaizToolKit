
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header } from "@/components/shared";
import { Button, TextField } from "@/components/ui";
import {
  OfficerForm,
  officerSchema,
  sanitizeName,
} from "@/features/account/validation";
import { Controller, useForm } from "react-hook-form";

export default function OfficerDetailsScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    formState: { isValid, isSubmitting },
  } = useForm<OfficerForm>({
    resolver: zodResolver(officerSchema),
    defaultValues: { officerCode: "", teamName: "" },
    mode: "onBlur",
  });

  const onSubmit = (data: OfficerForm) => {
    const payload = {
      officerCode: data.officerCode,
      teamName: sanitizeName(data.teamName),
    };
    reset();
    router.push("/(app)/accounts/open");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
        >
          <Header title="Officer Details" />

          <Controller
            control={control}
            name="officerCode"
            render={({ field: { value, onChange } }) => (
              <TextField
                className="w-full"
                InputProps={{
                  placeholder: "Account Officer code",
                  value: value,
                  onChangeText: (t) => {
                    onChange(t);
                    trigger("officerCode");
                  },
                }}
                helperText={errors.officerCode?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="teamName"
            render={({ field: { value, onChange } }) => (
              <TextField
                className="!mt-5 w-full"
                InputProps={{
                  placeholder: "Team Name",
                  value: value,
                  onChangeText: (t) => {
                    onChange(sanitizeName(t));
                    trigger("teamName");
                  },
                }}
                helperText={errors.teamName?.message}
              />
            )}
          />

          <Button onPress={handleSubmit(onSubmit)} disabled={!isValid || isSubmitting} size="lg" className="mt-10">
            <Text className="text-sm font-interSemiBold text-primary-foreground">
              Continue
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import * as Clipboard from "expo-clipboard";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { BackButton, Header, useToast } from "@/components/shared";
import { Button, TextField } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { AccountDetailsSheet } from "@/features/account/components/account-details-sheet";
import {
  NameForm,
  PhoneForm,
  nameSchema,
  phoneSchema,
  sanitizeName,
  sanitizePhone,
} from "@/features/account/validation";
import { verifyAccount } from "@/services/account.service";

export default function VerifyAccountScreen() {
  const [activeTab, setActiveTab] = useState<"phone-number" | "name">(
    "phone-number"
  );
  const { showToast } = useToast();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const {
    control: phoneControl,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
    reset: phoneReset,
    trigger: phoneTrigger,
    formState: { isSubmitting: phoneIsSubmitting, isValid: phoneIsValid },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
    mode: "onBlur",
  });

  const {
    control: nameControl,
    handleSubmit: handleNameSubmit,
    formState: { errors: nameErrors },
    reset: nameReset,
    trigger: nameTrigger,
    formState: { isSubmitting: nameIsSubmitting, isValid: nameIsValid },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    defaultValues: { firstName: "", lastName: "" },
    mode: "onBlur",
  });

  const reset = () => {
    if (activeTab === "phone-number") {
      phoneReset();
    } else {
      nameReset();
    }
  };

  const { mutate: verify, isPending: isVerifying } = useMutation({
    mutationFn: verifyAccount,
    onSuccess: (response) => {
      if (response.status === "success" && response.data) {
        showBottomSheet(
          <AccountDetailsSheet
            details={response.data}
            onCopy={async (text) => Clipboard.setStringAsync(text)}
            onClose={hideBottomSheet}
          />,
          { cornerRadius: "large", snapPoints: ["50%", "85%"] }
        );
        reset();
      }
    },
    onError: (error) => {
      console.error("Verification failed:", error);
      showToast({
        type: "error",
        message: error.message || "Verification failed.",
      });
    },
  });

  const handleVerify = useCallback(
    (data: PhoneForm | NameForm) => {
      const sanitized =
        "phoneNumber" in data
          ? { phoneNumber: sanitizePhone(data.phoneNumber) }
          : {
              firstName: sanitizeName(data.firstName),
              lastName: sanitizeName(data.lastName),
            };

      verify(sanitized);
    },
    [verify, showBottomSheet, hideBottomSheet, reset]
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1 px-5" keyboardShouldPersistTaps="handled">
          <Header title="Verify Account" />

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onValueChange={(val) =>
              setActiveTab(val as "phone-number" | "name")
            }
            className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
          >
            <TabsList>
              <TabsTrigger value="phone-number" className="flex-1">
                Phone Number
              </TabsTrigger>
              <TabsTrigger value="name" className="flex-1">
                Name
              </TabsTrigger>
            </TabsList>

            {/* Phone Number Form */}
            <TabsContent value="phone-number">
              <Controller
                control={phoneControl}
                name="phoneNumber"
                render={({ field: { value, onChange } }) => (
                  <TextField
                    className="!mt-3 w-full"
                    InputProps={{
                      placeholder: "Phone Number",
                      textContentType: "telephoneNumber",
                      keyboardType: "phone-pad",
                      inputMode: "tel",
                      autoFocus: activeTab === "phone-number" ? true : false,
                      value,
                      onChangeText: (t) => {
                        onChange(sanitizePhone(t));
                        phoneTrigger("phoneNumber");
                      },
                    }}
                    helperText={phoneErrors.phoneNumber?.message}
                  />
                )}
              />
              <Button
                onPress={handlePhoneSubmit(handleVerify)}
                size="lg"
                className="mt-10"
                disabled={phoneIsSubmitting || !phoneIsValid || isVerifying}
                loading={isVerifying}
              >
                <Text className="text-sm font-interSemiBold text-primary-foreground">
                  Verify
                </Text>
              </Button>
            </TabsContent>

            {/* Name Form */}
            <TabsContent value="name">
              <Controller
                control={nameControl}
                name="firstName"
                render={({ field: { value, onChange } }) => (
                  <TextField
                    className="!mt-5 w-full"
                    InputProps={{
                      placeholder: "First Name",
                      textContentType: "givenName",
                      autoFocus: activeTab === "name" ? true : false,
                      value,
                      onChangeText: (t) => {
                        onChange(sanitizeName(t));
                        nameTrigger("firstName");
                      },
                    }}
                    helperText={nameErrors.firstName?.message}
                  />
                )}
              />
              <Controller
                control={nameControl}
                name="lastName"
                render={({ field: { value, onChange } }) => (
                  <TextField
                    className="!mt-5 w-full"
                    InputProps={{
                      placeholder: "Last Name",
                      textContentType: "familyName",
                      value,
                      onChangeText: (t) => {
                        onChange(sanitizeName(t));
                        nameTrigger("lastName");
                      },
                    }}
                    helperText={nameErrors.lastName?.message}
                  />
                )}
              />
              <Button
                onPress={handleNameSubmit(handleVerify)}
                size="lg"
                className="mt-10"
                disabled={nameIsSubmitting || !nameIsValid || isVerifying}
                loading={isVerifying}
              >
                <Text className="text-sm font-interSemiBold text-primary-foreground">
                  Verify
                </Text>
              </Button>
            </TabsContent>
          </Tabs>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

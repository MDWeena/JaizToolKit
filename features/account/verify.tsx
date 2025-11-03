import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
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
import { type AccountDetails, fetchAccountDetails } from "@/services/account";
import { Controller, useForm } from "react-hook-form";

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"phone-number" | "name">(
    "phone-number"
  );
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
    defaultValues: { name: "" },
    mode: "onBlur",
  });

  const reset = () => {
    if (activeTab === "phone-number") {
      phoneReset();
    } else {
      nameReset();
    }
  };

  const handleVerify = useCallback(
    async (data: PhoneForm | NameForm) => {
      try {
        // const sanitized =
        //   "phoneNumber" in data
        //     ? { phoneNumber: sanitizePhone(data.phoneNumber) }
        //     : { name: sanitizeName(data.name) };

        const details: AccountDetails = await fetchAccountDetails();

        showBottomSheet(
          <AccountDetailsSheet
            details={details}
            onCopy={async (text) => Clipboard.setStringAsync(text)}
            onClose={hideBottomSheet}
          />,
          { cornerRadius: "large", snapPoints: ["50%", "85%"] }
        );
        reset();
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
      }
    },
    [showBottomSheet, hideBottomSheet, phoneReset, nameReset]
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Header Section */}
          <Pressable hitSlop={20} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} />
          </Pressable>
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
                disabled={phoneIsSubmitting || !phoneIsValid}
                loading={phoneIsSubmitting}
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
                name="name"
                render={({ field: { value, onChange } }) => (
                  <TextField
                    className="!mt-5 w-full"
                    InputProps={{
                      placeholder: "Account Name",
                      textContentType: "name",
                      value,
                      onChangeText: (t) => {
                        onChange(sanitizeName(t));
                        nameTrigger("name");
                      },
                    }}
                    helperText={nameErrors.name?.message}
                  />
                )}
              />
              <Button
                onPress={handleNameSubmit(handleVerify)}
                size="lg"
                className="mt-10"
                disabled={nameIsSubmitting || !nameIsValid}
                loading={nameIsSubmitting}
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

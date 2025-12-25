import { StatusBar } from "expo-status-bar";
import { Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header } from "@/components/shared";
import { Button, TextField } from "@/components/ui";
import { useVerifyAccount } from "./hooks/useVerifyAccount";

export default function VerifyAccountScreen() {
  const {
    form: {
      control,
      handleSubmit,
      formState: { errors, isSubmitting, isValid },
    },
    handleVerify,
    isVerifying,
  } = useVerifyAccount();

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

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange } }) => (
              <TextField
                className="!mt-3 w-full"
                InputProps={{
                  placeholder: "Phone Number",
                  keyboardType: "phone-pad",
                  inputMode: "tel",
                  autoFocus: true,
                  value,
                  onChangeText: onChange,
                }}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />

          <Button
            onPress={handleSubmit(handleVerify)}
            size="lg"
            className="mt-10"
            disabled={!isValid || isSubmitting || isVerifying}
            loading={isVerifying}
          >
            <Text className="text-sm font-interSemiBold text-primary-foreground">
              Verify
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

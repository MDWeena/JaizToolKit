import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Checkbox, CheckboxLabel } from "./checkbox";
import { navigateToWebView } from "@/utils/navigateToWebView";
import { Text } from "./Text";

interface AgreementModel {
  agree: boolean;
  setAgree: (value: boolean) => void;
}
const PRIVACY_POLICY_URL = "https://jaizbankplc.com/privacy-policy";
const Agreement = ({ agree, setAgree }: AgreementModel) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-start w-full">
      <Checkbox id="terms" checked={agree} onCheckedChange={setAgree} />
      <CheckboxLabel htmlFor="terms">I agree to the </CheckboxLabel>
      <Pressable
        onPress={() =>
          navigateToWebView(router, {
            url: PRIVACY_POLICY_URL,
            title: "Privacy Policy",
            loadingText: "Loading Jaiz Bank Privacy Policy...",
            errorTitle: "Failed to load privacy policy.",
            errorMessage:
              "Please check your internet connection or try again later.",
          })
        }
      >
        <Text className="text-sm underline font-interSemiBold text-primary">
          Data Privacy Policy
        </Text>
      </Pressable>
    </View>
  );
};

export { Agreement };

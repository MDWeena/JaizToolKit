import React from "react";
import { View } from "react-native";
import { Link } from "expo-router";

import { Checkbox, CheckboxLabel } from "./checkbox";

interface AgreementModel {
  agree: boolean;
  setAgree: (value: boolean) => void;
}
const Agreement = ({ agree, setAgree }: AgreementModel) => {
  return (
    <View className="flex-row items-center justify-start w-full">
      <Checkbox id="terms" checked={agree} onCheckedChange={setAgree} />
      <CheckboxLabel
        htmlFor="terms"
        className="flex-row flex items-center justify-start w-full"
      >
        I agree to the{" "}
        <Link href="/" className="underline text-primary font-medium">
          Data Privacy Policy
        </Link>
      </CheckboxLabel>
    </View>
  );
};

export default Agreement;

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Pressable, View } from "react-native";
import { ICountry } from "react-native-international-phone-number";

import { Agreement, Button, Text } from "@/components/ui";
import { OtpField, OtpFieldHandle } from "@/components/ui/otp-field";
import CustomPhoneInput from "@/components/ui/phone-input";
import { IndividualTier1FormData } from "@/features/account/validation/individual-tier1";

interface Step1VerificationProps {
  selectedCountry: ICountry | undefined;
  handleSelectedCountry: (country: ICountry) => void;
  handleSendOTP: () => void;
  isSendingOTP: boolean;
  prospectId: string | null;
  otpFieldRef: React.RefObject<OtpFieldHandle | null>;
  handleStep1Next: () => void;
  isVerifyingOTP: boolean;
  mobileNumber?: string;
  onPhoneNumberChange?: () => void;
}

export const Step1Verification: React.FC<Step1VerificationProps> = ({
  selectedCountry,
  handleSelectedCountry,
  handleSendOTP,
  isSendingOTP,
  prospectId,
  otpFieldRef,
  handleStep1Next,
  isVerifyingOTP,
  mobileNumber,
  onPhoneNumberChange,
}) => {
  const { control, formState: { errors } } = useFormContext<IndividualTier1FormData>();

  return (
    <View className="gap-6">
      <Controller
        control={control}
        name="agreement"
        render={({ field: { value, onChange } }) => (
          <Agreement agree={value} setAgree={onChange} />
        )}
      />
      {errors.agreement && (
        <Text className="ml-2 -mt-4 text-sm text-red-500">
          {String(errors.agreement.message)}
        </Text>
      )}

      <View>
        <CustomPhoneInput
          name="mobileNumber"
          control={control}
          error={errors.mobileNumber}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          autoFocus={true}
          onPhoneNumberChange={onPhoneNumberChange}
        />
        <Pressable
          onPress={handleSendOTP}
          disabled={isSendingOTP}
          className="mt-1 ml-auto"
        >
          <Text className="text-xs underline font-interBold text-primary">
            {isSendingOTP ? "Sending..." : "Click to send OTP"}
          </Text>
        </Pressable>
      </View>

      <View>
        <Text className="mb-2 font-interMedium text-text">OTP</Text>
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange } }) => (
            <OtpField
              ref={otpFieldRef}
              length={6}
              onOtpChange={onChange}
            />
          )}
        />
        {errors.otp && (
          <Text className="mt-1 text-sm text-red-500">
            {String(errors.otp.message)}
          </Text>
        )}
        {prospectId && (
          <Text className="text-[.9rem] mt-3 text-grey-600">
            Enter 6-Digit code sent to {selectedCountry?.idd?.root} {mobileNumber}
          </Text>
        )}
      </View>

      <Button
        size={"lg"}
        onPress={handleStep1Next}
        loading={isVerifyingOTP}
      >
        <Text className="text-sm font-interSemiBold text-primary-foreground">
          Next
        </Text>
      </Button>
    </View>
  );
};
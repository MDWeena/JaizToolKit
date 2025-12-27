import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";

import { Button, FileInput, Text, TextField } from "@/components/ui";
import CustomSelect from "@/components/ui/custom-select";
import { IndividualTier1FormData } from "@/features/account/validation/individual-tier1";

import { BankOption } from "@/types/api";
import { FileUpload } from "@/types/file-upload";

interface Step4DocumentsProps {
  banks: BankOption[];
  isBanksLoading: boolean;
  onSubmit: (data: IndividualTier1FormData) => void;
  isSubmitting: boolean;
}

export const Step4Documents: React.FC<Step4DocumentsProps> = ({
  banks,
  isBanksLoading,
  onSubmit,
  isSubmitting,
}) => {
  const { control, formState: { errors }, handleSubmit } = useFormContext<IndividualTier1FormData>();

  return (
    <View className="gap-6">
      <Controller
        control={control}
        name="bank"
        render={({ field: { value, onChange } }) => (
          <CustomSelect
            label="Fund Account Instantly"
            options={banks.map((bank) => ({
              label: bank.bankName,
              value: bank.bankName,
            }))}
            placeholder="Select Bank"
            value={value as string}
            onValueChange={onChange}
            disabled={isBanksLoading}
          />
        )}
      />
      {errors.bank && (
        <Text className="-mt-4 text-sm text-red-500">
          {String(errors.bank.message)}
        </Text>
      )}

      <Controller
        control={control}
        name="amount"
        render={({ field: { value, onChange } }) => (
          <TextField
            InputProps={{
              placeholder: "Amount",
              keyboardType: "numeric",
              value: (value as string) || "",
              onChangeText: onChange,
            }}
            helperText={errors.amount?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="passportPhotograph"
        render={({ field: { value, onChange } }) => (
          <View>
            <FileInput
              label="Passport Photograph"
              value={value as FileUpload | null}
              onFileSelect={(file) => onChange(file)}
            />
            {errors.passportPhotograph && (
              <Text className="-mt-2 text-sm text-red-500">
                {String(errors.passportPhotograph.message)}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="signature"
        render={({ field: { value, onChange } }) => (
          <View>
            <FileInput
              label="Signature"
              value={value as FileUpload | null}
              onFileSelect={(file) => onChange(file)}
            />
            {errors.signature && (
              <Text className="-mt-2 text-sm text-red-500">
                {String(errors.signature.message)}
              </Text>
            )}
          </View>
        )}
      />

      <Button
        size={"lg"}
        className="flex-1"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
      >
        <Text className="text-sm font-interSemiBold text-primary-foreground">
          Submit
        </Text>
      </Button>
    </View>
  );
};
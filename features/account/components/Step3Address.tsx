import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";

import { Button, Text, TextField } from "@/components/ui";
import CustomSelect from "@/components/ui/custom-select";
import { GENDER_OPTIONS } from "@/constants/form-options";
import { IndividualTier1FormData } from "@/features/account/validation/individual-tier1";
import { sanitizeName } from "@/utils";

import { LocationOption } from "@/types/api";

interface Step3AddressProps {
  states: LocationOption[];
  lgasOfOrigin: LocationOption[];
  lgasOfResidence: LocationOption[];
  handleStep3Next: () => void;
  isUpdatingAddress: boolean;
  onStateOfOriginChange: (stateCode: string) => void;
  onStateOfResidenceChange: (stateCode: string) => void;
}

export const Step3Address: React.FC<Step3AddressProps> = ({
  states,
  lgasOfOrigin,
  lgasOfResidence,
  handleStep3Next,
  isUpdatingAddress,
  onStateOfOriginChange,
  onStateOfResidenceChange,
}) => {
  const { control, formState: { errors }, watch } = useFormContext<IndividualTier1FormData>();
  const stateOfOrigin = watch("stateOfOrigin");
  const stateOfResidence = watch("stateOfResidence");

  return (
    <View className="gap-6">
      <Controller
        control={control}
        name="gender"
        render={({ field: { value, onChange } }) => (
          <CustomSelect
            options={GENDER_OPTIONS}
            placeholder="Gender"
            value={value as string}
            onValueChange={onChange}
          />
        )}
      />
      {errors.gender && (
        <Text className="-mt-4 text-sm text-red-500">
          {String(errors.gender.message)}
        </Text>
      )}

      <Controller
        control={control}
        name="mothersMaidenName"
        render={({ field: { value, onChange } }) => (
          <TextField
            InputProps={{
              placeholder: "Mother's Maiden Name",
              value: value || "",
              onChangeText: (text) => onChange(sanitizeName(text)),
            }}
            helperText={errors.mothersMaidenName?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="stateOfOrigin"
        render={({ field: { value } }) => (
          <CustomSelect
            options={states.map((state) => ({
              label: state.name,
              value: state.code,
            }))}
            placeholder="State of Origin"
            value={value as string}
            onValueChange={onStateOfOriginChange}
          />
        )}
      />
      {errors.stateOfOrigin && (
        <Text className="-mt-4 text-sm text-red-500">
          {String(errors.stateOfOrigin.message)}
        </Text>
      )}

      <Controller
        control={control}
        name="lgaOfOrigin"
        render={({ field: { value, onChange } }) => (
          <CustomSelect
            options={lgasOfOrigin.map((lga) => ({
              label: lga.name,
              value: lga.code,
            }))}
            placeholder="LGA of Origin"
            value={value as string}
            onValueChange={onChange}
            disabled={!stateOfOrigin || lgasOfOrigin.length === 0}
          />
        )}
      />
      {errors.lgaOfOrigin && (
        <Text className="-mt-4 text-sm text-red-500">
          {String(errors.lgaOfOrigin.message)}
        </Text>
      )}

      <Controller
        control={control}
        name="residentialAddress"
        render={({ field: { value, onChange } }) => (
          <TextField
            InputProps={{
              placeholder: "Residential Address",
              multiline: true,
              numberOfLines: 3,
              value: value || "",
              onChangeText: onChange,
            }}
            helperText={errors.residentialAddress?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="stateOfResidence"
        render={({ field: { value } }) => (
          <CustomSelect
            options={states.map((state) => ({
              label: state.name,
              value: state.code,
            }))}
            placeholder="State of Residence"
            value={value as string}
            onValueChange={onStateOfResidenceChange}
          />
        )}
      />
      {errors.stateOfResidence && (
        <Text className="-mt-4 text-sm text-red-500">
          {String(errors.stateOfResidence.message)}
        </Text>
      )}

      <Controller
        control={control}
        name="lgaOfResidence"
        render={({ field: { value, onChange } }) => (
          <CustomSelect
            options={lgasOfResidence.map((lga) => ({
              label: lga.name,
              value: lga.code,
            }))}
            placeholder="LGA of Residence"
            value={value as string}
            onValueChange={onChange}
            disabled={!stateOfResidence || lgasOfResidence.length === 0}
          />
        )}
      />
      {errors.lgaOfResidence && (
        <Text className="-mt-4 text-sm text-red-500">
          {String(errors.lgaOfResidence.message)}
        </Text>
      )}

      <Button
        size={"lg"}
        onPress={handleStep3Next}
        className="flex-1"
        loading={isUpdatingAddress}
      >
        <Text className="text-sm font-interSemiBold text-primary-foreground">
          Next
        </Text>
      </Button>
    </View>
  );
};

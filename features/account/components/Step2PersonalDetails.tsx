import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";

import { Button, DatePicker, Text, TextField } from "@/components/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { IndividualTier1FormData } from "@/features/account/validation/individual-tier1";
import { sanitizeBVN, sanitizeEmail, sanitizeName, sanitizeNIN } from "@/utils";

interface Step2PersonalDetailsProps {
  activeTab: string;
  handleTabChange: (value: "bvn" | "nin") => void;
  isVerifyingBVN: boolean;
  isVerifyingNIN: boolean;
  handleStep2Next: () => void;
}

export const Step2PersonalDetails: React.FC<Step2PersonalDetailsProps> = ({
  activeTab,
  handleTabChange,
  isVerifyingBVN,
  isVerifyingNIN,
  handleStep2Next,
}) => {
  const { control, formState: { errors } } = useFormContext<IndividualTier1FormData>();

  return (
    <View className="gap-6">
      <Tabs
        value={activeTab}
        onValueChange={(value) => handleTabChange(value as "bvn" | "nin")}
        className="gap-6"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="bvn" className="flex-1">
            <Text>BVN</Text>
          </TabsTrigger>
          <TabsTrigger value="nin" className="flex-1">
            <Text>NIN</Text>
          </TabsTrigger>
        </TabsList>

        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field: { value, onChange }, fieldState }) => (
            <View className="w-full">
              <DatePicker
                value={value}
                onChange={onChange}
                placeholder="Date of Birth"
                maximumDate={new Date()}
              />
              {fieldState.error && (
                <Text className="mt-1 text-sm text-red-500">
                  {String(fieldState.error.message)}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <TextField
              InputProps={{
                placeholder: "Email Address",
                keyboardType: "email-address",
                value: value || "",
                onChangeText: (text) => onChange(sanitizeEmail(text)),
              }}
              helperText={errors.email?.message as string}
            />
          )}
        />

        <TabsContent value="nin" className="mt-0">
          <Controller
            control={control}
            name="nin"
            render={({ field: { value, onChange } }) => (
              <TextField
                InputProps={{
                  placeholder: "NIN",
                  keyboardType: "numeric",
                  value: value || "",
                  onChangeText: (text) => onChange(sanitizeNIN(text)),
                }}
                inputSuffix={isVerifyingNIN && <ActivityIndicator />}
                helperText={errors.nin?.message as string}
              />
            )}
          />
        </TabsContent>

        <TabsContent value="bvn" className="mt-0">
          <Controller
            control={control}
            name="bvn"
            render={({ field: { value, onChange } }) => (
              <TextField
                InputProps={{
                  placeholder: "BVN",
                  keyboardType: "numeric",
                  value: value || "",
                  onChangeText: (text) => onChange(sanitizeBVN(text)),
                }}
                inputSuffix={isVerifyingBVN && <ActivityIndicator />}
                helperText={errors.bvn?.message as string}
              />
            )}
          />
        </TabsContent>
      </Tabs>

      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange } }) => (
          <TextField
            InputProps={{
              placeholder: "First Name",
              value: value || "",
              onChangeText: (text) => onChange(sanitizeName(text)),
              editable: false,
            }}
            helperText={errors.firstName?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="middleName"
        render={({ field: { value, onChange } }) => (
          <TextField
            InputProps={{
              placeholder: "Middle Name",
              value: value || "",
              onChangeText: (text) => onChange(sanitizeName(text)),
              editable: false,
            }}
            helperText={errors.middleName?.message as string}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { value, onChange } }) => (
          <TextField
            InputProps={{
              placeholder: "Last Name",
              value: value || "",
              onChangeText: (text) => onChange(sanitizeName(text)),
              editable: false,
            }}
            helperText={errors.lastName?.message as string}
          />
        )}
      />

      <Button
        size={"lg"}
        onPress={handleStep2Next}
        className="flex-1"
        loading={isVerifyingBVN || isVerifyingNIN}
      >
        <Text className="text-sm font-interSemiBold text-primary-foreground">
          Next
        </Text>
      </Button>
    </View>
  );
};

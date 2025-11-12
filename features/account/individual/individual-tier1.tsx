import { useRouter } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header } from "@/components/shared";
import {
  Agreement,
  Button,
  DatePicker,
  FileInput,
  OtpField,
  Text,
  TextField,
} from "@/components/ui";
import CustomSelect from "@/components/ui/custom-select";
import {
  Stepper,
  StepperContent,
  StepperStep,
  StepperStepContent,
  StepperSteps,
} from "@/components/ui/stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import {
  BANK_OPTIONS,
  GENDER_OPTIONS,
  NIGERIAN_STATES,
} from "@/constants/form-options";
import { useTierForm } from "@/features/account/hooks/useTierForm";
import {
  getDefaultValues,
  IndividualTier1FormData,
  individualTier1Schema,
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
} from "@/features/account/validation/individual-tier1";
import {
  sanitizeBVN,
  sanitizeEmail,
  sanitizeName,
  sanitizeNIN,
  sanitizePhone,
} from "@/utils";

const TOTAL_STEPS = 4;

const Tier1Screen = () => {
  const router = useRouter();
  const {
    form,
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    scrollViewRef,
  } = useTierForm<IndividualTier1FormData>({
    schema: individualTier1Schema,
    defaultValues: getDefaultValues(),
    totalSteps: TOTAL_STEPS,
    stepFields: {
      1: step1Fields as (keyof IndividualTier1FormData)[],
      2: step2Fields as (keyof IndividualTier1FormData)[],
      3: step3Fields as (keyof IndividualTier1FormData)[],
      4: step4Fields as (keyof IndividualTier1FormData)[],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    trigger,
  } = form;

  const idType = watch("idType");
  const activeTab = idType || "bvn";


  const onSubmit = async (data: IndividualTier1FormData) => {
    try {
      const { idType: _idType, bvn, nin, ...rest } = data;
      const payload = activeTab === "bvn" ? { ...rest, bvn } : { ...rest, nin };
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Submitting Individual Tier 1 Form", payload);
      // router.push("/(app)/accounts/open/success");
    } catch (error) {
      console.error("Form submission error:", error);
      Alert.alert("Error", "Failed to submit form. Please try again.");
    }
  };

  const handleTabChange = (value: "bvn" | "nin") => {
    setValue("idType", value);
    if (value === "bvn") {
      setValue("nin", undefined);
      trigger("bvn");
    } else {
      setValue("bvn", undefined);
      trigger("nin");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton activeStep={activeStep} onStepBack={handleBack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
        >
          <Stepper activeStep={activeStep} onStepChange={setActiveStep}>
            <StepperSteps className="mb-4">
              <StepperStep step={1} />
              <StepperStep step={2} />
              <StepperStep step={3} />
              <StepperStep step={4} />
            </StepperSteps>
            <Header title="Tier 1 Account" />

            <StepperContent>
              {/* Step 1: Verification */}
              <StepperStepContent className="gap-6" step={1}>
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
                  <Controller
                    control={control}
                    name="mobileNumber"
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        className="w-full"
                        InputProps={{
                          placeholder: "Mobile Number",
                          keyboardType: "phone-pad",
                          value: value || "",
                          onChangeText: (text) => onChange(sanitizePhone(text)),
                          autoFocus: true,
                        }}
                        helperText={errors.mobileNumber?.message as string}
                      />
                    )}
                  />
                  <Pressable
                    onPress={() => {
                      // Handle OTP send action
                      console.log("Send OTP");
                    }}
                    className="mt-1 ml-auto"
                  >
                    <Text className="text-xs font-bold underline text-primary">
                      Click to send OTP
                    </Text>
                  </Pressable>
                </View>

                <View>
                  <Text className="font-[500] mb-2 text-text">OTP</Text>
                  <Controller
                    control={control}
                    name="otp"
                    render={({ field: { onChange } }) => (
                      <OtpField length={6} onOtpChange={onChange} />
                    )}
                  />
                  {errors.otp && (
                    <Text className="mt-1 text-sm text-red-500">
                      {String(errors.otp.message)}
                    </Text>
                  )}
                  <Text className="text-[.9rem] mt-3 text-grey-600">
                    Enter 6-Digit code sent to +234 123 456 7890
                  </Text>
                </View>

                <Button size={"lg"} onPress={handleNext}>
                  <Text className="text-sm font-semibold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              {/* Step 2: Personal Details */}
              <StepperStepContent className="gap-6" step={2}>
                <Tabs
                  value={activeTab}
                  onValueChange={(value) =>
                    handleTabChange(value as "bvn" | "nin")
                  }
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
                      }}
                      helperText={errors.lastName?.message as string}
                    />
                  )}
                />

                <Button size={"lg"} onPress={handleNext} className="flex-1">
                  <Text className="text-sm font-semibold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              {/* Step 3: Address and Additional Info */}
              <StepperStepContent className="gap-6" step={3}>
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
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={NIGERIAN_STATES}
                      placeholder="State of Origin"
                      value={value as string}
                      onValueChange={onChange}
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
                      options={NIGERIAN_STATES}
                      placeholder="LGA of Origin"
                      value={value as string}
                      onValueChange={onChange}
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
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={NIGERIAN_STATES}
                      placeholder="State of Residence"
                      value={value as string}
                      onValueChange={onChange}
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
                      options={NIGERIAN_STATES}
                      placeholder="LGA of Residence"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.lgaOfResidence && (
                  <Text className="-mt-4 text-sm text-red-500">
                    {String(errors.lgaOfResidence.message)}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="cityOfResidence"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={NIGERIAN_STATES}
                      placeholder="City of Residence"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.cityOfResidence && (
                  <Text className="-mt-4 text-sm text-red-500">
                    {String(errors.cityOfResidence.message)}
                  </Text>
                )}

                <Button size={"lg"} onPress={handleNext} className="flex-1">
                  <Text className="text-sm font-semibold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              {/* Step 4: Documents and Funding */}
              <StepperStepContent className="gap-6" step={4}>
                <Controller
                  control={control}
                  name="bank"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      label="Fund Account Instantly"
                      options={BANK_OPTIONS}
                      placeholder="Select Bank"
                      value={value as string}
                      onValueChange={onChange}
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

                <FileInput
                  label="Passport Photograph"
                  onFileSelect={(file) =>
                    setValue("passportPhotograph", file as any)
                  }
                />
                {errors.passportPhotograph && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.passportPhotograph.message)}
                  </Text>
                )}

                <FileInput
                  label="Signature"
                  onFileSelect={(file) => setValue("signature", file as any)}
                />
                {errors.signature && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.signature.message)}
                  </Text>
                )}

                <Button
                  size={"lg"}
                  className="flex-1"
                  onPress={handleSubmit(onSubmit)}
                  // disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  <Text className="text-sm font-semibold text-primary-foreground">
                    Submit
                  </Text>
                </Button>
              </StepperStepContent>
            </StepperContent>
          </Stepper>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Tier1Screen;

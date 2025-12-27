import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICountry } from "react-native-international-phone-number";

import { BackButton, Header } from "@/components/shared";
import {
  Agreement,
  Button,
  DatePicker,
  FileInput,
  OtpField,
  OtpFieldHandle,
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
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  NIGERIAN_STATES,
} from "@/constants/form-options";
import { useTierForm } from "@/features/account/hooks/useTierForm";
import {
  getDefaultValues,
  IndividualTier3FormData,
  individualTier3Schema,
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
  step5Fields,
} from "@/features/account/validation/individual-tier3";
import {
  sanitizeBVN,
  sanitizeEmail,
  sanitizeName,
  sanitizeNIN,
  sanitizePhone,
} from "@/utils";
import { useLocation } from "../hooks/useLocation";
import CustomPhoneInput from "@/components/ui/phone-input";
import { USSD_CODES } from "@/constants/ussd-codes";

const TOTAL_STEPS = 5;

const Tier3Screen = () => {
  const [prospectId, setProspectId] = useState<string | null>(null);
  const otpFieldRef = useRef<OtpFieldHandle>(null);
  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(
    undefined
  );

  const router = useRouter();
  const {
    form,
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    scrollViewRef,
  } = useTierForm<IndividualTier3FormData>({
    schema: individualTier3Schema,
    defaultValues: getDefaultValues(),
    totalSteps: TOTAL_STEPS,
    stepFields: {
      1: step1Fields as (keyof IndividualTier3FormData)[],
      2: step2Fields as (keyof IndividualTier3FormData)[],
      3: step3Fields as (keyof IndividualTier3FormData)[],
      4: step4Fields as (keyof IndividualTier3FormData)[],
      5: step5Fields as (keyof IndividualTier3FormData)[],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch,
    trigger,
  } = form;
  const stateOfOrigin = watch("stateOfOrigin");
  const stateOfResidence = watch("stateOfResidence");

  const {
    states,
    lgas: lgasOfOrigin,
    handleStateChange: handleStateOfOriginChange,
  } = useLocation();
  const {
    lgas: lgasOfResidence,
    handleStateChange: handleStateOfResidenceChange,
  } = useLocation();

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
    setValue("selectedCountry", country);
    trigger("mobileNumber");
  }

  useEffect(() => {
    setValue("lgaOfOrigin", "");
    handleStateOfOriginChange(stateOfOrigin);
  }, [stateOfOrigin]);

  useEffect(() => {
    setValue("lgaOfResidence", "");
    handleStateOfResidenceChange(stateOfResidence);
  }, [stateOfResidence]);

  const onSubmit = async (data: IndividualTier3FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Submitting Individual Tier 3 Form", data);
      router.push({
        pathname: "/(app)/accounts/open/success",
        params: {
          accountName: "John Doe",
          accountNumber: "12345678901",
          ussdString: "*044*1000000*12345678901#"
      }},
      );
    } catch (error) {
      console.error("Form submission error:", error);
      Alert.alert("Error", "Failed to submit form. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
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
              <StepperStep step={5} />
            </StepperSteps>
            <Header title="Tier 3 Account" />

            <StepperContent>
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
                  <CustomPhoneInput
                    name="mobileNumber"
                    control={control}
                    error={errors.mobileNumber}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                    autoFocus={true}
                    onPhoneNumberChange={() => {
                      setProspectId(null);
                    }}
                  />
                  <Pressable className="mt-1 ml-auto">
                    <Text className="text-xs underline font-interBold text-primary">
                      Click to send OTP
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
                  <Text className="text-[.9rem] mt-3 text-grey-600">
                    Enter 6-Digit code sent to +23
                  </Text>
                </View>

                <Button size={"lg"} onPress={handleNext}>
                  <Text className="text-sm font-interSemiBold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={2}>
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

                <Button size={"lg"} onPress={handleNext}>
                  <Text className="text-sm font-interSemiBold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              {/* Step 2: Address and Additional Info */}
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
                  name="maritalStatus"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={MARITAL_STATUS_OPTIONS}
                      placeholder="Marital Status"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.maritalStatus && (
                  <Text className="-mt-4 text-sm text-red-500">
                    {String(errors.maritalStatus.message)}
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
                      options={states.map((state) => ({
                        label: state.name,
                        value: state.code,
                      }))}
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
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={states.map((state) => ({
                        label: state.name,
                        value: state.code,
                      }))}
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
                      options={lgasOfResidence.map((lga) => ({
                        label: lga.name,
                        value: lga.code,
                      }))}
                      placeholder="LGA of Residence"
                      value={value as string}
                      onValueChange={onChange}
                      disabled={
                        !stateOfResidence || lgasOfResidence.length === 0
                      }
                    />
                  )}
                />
                {errors.lgaOfResidence && (
                  <Text className="-mt-4 text-sm text-red-500">
                    {String(errors.lgaOfResidence.message)}
                  </Text>
                )}

                <Button size={"lg"} onPress={handleNext} className="flex-1">
                  <Text className="text-sm font-interSemiBold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              {/* Step 3: Next of Kin and Account Details */}
              <StepperStepContent className="gap-6" step={4}>
                <Controller
                  control={control}
                  name="nextOfKinFullName"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputProps={{
                        placeholder: "Full Name of Next of Kin",
                        value: value || "",
                        onChangeText: (text) => onChange(sanitizeName(text)),
                      }}
                      helperText={errors.nextOfKinFullName?.message as string}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="nextOfKinMobileNumber"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputProps={{
                        placeholder: "Next of Kin Mobile Number",
                        keyboardType: "phone-pad",
                        value: value || "",
                        onChangeText: (text) => onChange(sanitizePhone(text)),
                      }}
                      helperText={
                        errors.nextOfKinMobileNumber?.message as string
                      }
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="nextOfKinRelationship"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputProps={{
                        placeholder: "Relationship with Next of Kin",
                        value: value || "",
                        onChangeText: (text) => onChange(sanitizeName(text)),
                      }}
                      helperText={
                        errors.nextOfKinRelationship?.message as string
                      }
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="nextOfKinDateOfBirth"
                  render={({ field: { value, onChange }, fieldState }) => (
                    <View className="w-full">
                      <DatePicker
                        value={value}
                        onChange={onChange}
                        placeholder="Next of Kin Date of Birth"
                        maximumDate={new Date()}
                        minimumDate={
                          new Date(new Date().getFullYear() - 100, 0, 1)
                        }
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
                  name="annualTurnover"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputProps={{
                        placeholder: "Annual Turnover",
                        keyboardType: "numeric",
                        value: value || "",
                        onChangeText: onChange,
                      }}
                      helperText={errors.annualTurnover?.message as string}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="purposeOfAccountOpening"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      InputProps={{
                        placeholder: "Purpose of Account Opening",
                        multiline: true,
                        numberOfLines: 3,
                        value: value || "",
                        onChangeText: onChange,
                      }}
                      helperText={
                        errors.purposeOfAccountOpening?.message as string
                      }
                    />
                  )}
                />

                <Button size={"lg"} onPress={handleNext} className="flex-1">
                  <Text className="text-sm font-interSemiBold text-primary-foreground">
                    Next
                  </Text>
                </Button>
              </StepperStepContent>

              {/* Step 4: Documents */}
              <StepperStepContent className="gap-6" step={5}>
              <Controller
                  control={control}
                  name="bank"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      label="Fund Account Instantly"
                      options={Object.keys(USSD_CODES).map((bank: string) => ({
                        label: bank,
                        value: bank,
                      }))}
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
                  label="Valid ID"
                  onFileSelect={(file) => setValue("validId", file as any)}
                />
                {errors.validId && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.validId.message)}
                  </Text>
                )}

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
                  label="Utility Bill"
                  onFileSelect={(file) => setValue("utilityBill", file as any)}
                />
                {errors.utilityBill && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.utilityBill.message)}
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

                <FileInput
                  label="KYC"
                  onFileSelect={(file) => setValue("kyc", file as any)}
                />
                {errors.kyc && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.kyc.message)}
                  </Text>
                )}

                <FileInput
                  label="EDD"
                  onFileSelect={(file) => setValue("edd", file as any)}
                />
                {errors.edd && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.edd.message)}
                  </Text>
                )}

                <FileInput
                  label="Risk Assessment Form"
                  onFileSelect={(file) =>
                    setValue("riskAssessmentForm", file as any)
                  }
                />
                {errors.riskAssessmentForm && (
                  <Text className="-mt-2 text-sm text-red-500">
                    {String(errors.riskAssessmentForm.message)}
                  </Text>
                )}

                <Button
                  size={"lg"}
                  className="flex-1"
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  <Text className="text-sm font-interSemiBold text-primary-foreground">
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

export default Tier3Screen;

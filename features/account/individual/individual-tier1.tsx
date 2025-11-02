import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import DatePicker from "@/components/ui/date-picker";
import FileInput from "@/components/ui/file-input";
import Agreement from "@/components/ui/form-agreement";
import { TextField } from "@/components/ui/input";
import OtpField from "@/components/ui/otp-field";
import {
  Stepper,
  StepperContent,
  StepperStep,
  StepperStepContent,
  StepperSteps,
} from "@/components/ui/stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import {
  IndividualTier1FormData,
  getDefaultValues,
  individualTier1Schema,
  sanitizeBVN,
  sanitizeEmail,
  sanitizeNIN,
  sanitizeName,
  sanitizePhone,
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
} from "@/features/account/validation/individual-tier1";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

const TOTAL_STEPS = 4;

const Tier1Screen = () => {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [fileUploads, setFileUploads] = useState<{
    passportPhotograph: any | null;
    signature: any | null;
  }>({
    passportPhotograph: null,
    signature: null,
  });

  // Initialize form
  const form = useForm<IndividualTier1FormData>({
    resolver: zodResolver(individualTier1Schema),
    mode: "onChange",
    defaultValues: getDefaultValues(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = form;

  // Watch idType to sync tabs
  const idType = watch("idType");
  const activeTab = idType || "bvn";

  // Set maximum date to today
  const maxDate = new Date();
  // Set minimum date to 100 years ago
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  const genderOptions: SelectOption[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const stateOptions: SelectOption[] = [
    { value: "lagos", label: "Lagos" },
    { value: "abuja", label: "Abuja" },
    { value: "kano", label: "Kano" },
    { value: "ibadan", label: "Ibadan" },
    { value: "port-harcourt", label: "Port Harcourt" },
    { value: "enugu", label: "Enugu" },
    { value: "oyo", label: "Oyo" },
    { value: "kaduna", label: "Kaduna" },
  ];

  const bankOptions: SelectOption[] = [
    { label: "Access Bank", value: "access" },
    { label: "GTBank", value: "gtb" },
    { label: "Zenith Bank", value: "zenith" },
    { label: "First Bank", value: "firstbank" },
    { label: "UBA", value: "uba" },
    { label: "Union Bank", value: "union" },
    { label: "Fidelity Bank", value: "fidelity" },
    { label: "Jaiz Bank", value: "jaiz" },
  ];

  // Handle tab change
  const handleTabChange = (value: "bvn" | "nin") => {
    setValue("idType", value);
    // Clear the other field when switching
    if (value === "bvn") {
      setValue("nin", undefined);
    } else {
      setValue("bvn", undefined);
    }
  };

  // Get fields for current step
  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return step1Fields as string[];
      case 2:
        return step2Fields as string[];
      case 3:
        return step3Fields as string[];
      case 4:
        return step4Fields as string[];
      default:
        return [];
    }
  };

  // Handle next step with validation
  const handleNext = async () => {
    const fields = getFieldsForStep(activeStep);
    const isValid = await trigger(fields as any);

    if (!isValid) {
      Alert.alert(
        "Validation Error",
        "Please fill all required fields correctly before proceeding."
      );
      // Scroll to top to show errors
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    if (activeStep < TOTAL_STEPS) {
      setActiveStep(activeStep + 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  // Handle file selection
  const handleFileSelect = (
    fieldName: "passportPhotograph" | "signature",
    file: any
  ) => {
    setFileUploads((prev) => ({ ...prev, [fieldName]: file }));
    setValue(fieldName as any, file);
  };

  // Handle form submission
  const onSubmit = async (data: IndividualTier1FormData) => {
    setSubmitting(true);
    try {
      // Combine form data with file uploads
      const payload = {
        ...data,
        passportPhotograph: fileUploads.passportPhotograph,
        signature: fileUploads.signature,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", payload);

      // Navigate to success page
      router.push("/(app)/accounts/open/success");
    } catch (error) {
      Alert.alert("Error", "Failed to submit form. Please try again later.");
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Scroll to top when step changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, [activeStep]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Pressable
            hitSlop={20}
            onPress={() => router.canGoBack() && router.dismissAll()}
          >
            <Ionicons name="arrow-back" size={25} />
          </Pressable>

          <Stepper
            activeStep={activeStep}
            onStepChange={setActiveStep}
            className="mt-6"
          >
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
                  <Text className="text-red-500 text-sm ml-2 -mt-4">
                    {String(errors.agreement.message)}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="mobileNumber"
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      className="!mt-5 w-full"
                      InputProps={{
                        placeholder: "Mobile Number",
                        keyboardType: "phone-pad",
                        value: value || "",
                        onChangeText: (text) => onChange(sanitizePhone(text)),
                      }}
                      helperText={errors.mobileNumber?.message as string}
                    />
                  )}
                />

                <View>
                  <Text className="font-[500] mb-2">OTP</Text>
                  <Controller
                    control={control}
                    name="otp"
                    render={({ field: { onChange } }) => (
                      <OtpField length={6} onOtpChange={onChange} />
                    )}
                  />
                  {errors.otp && (
                    <Text className="text-red-500 text-sm mt-1">
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
                      <>
                        <DatePicker
                          value={value}
                          onChange={onChange}
                          placeholder="Date of Birth"
                          maximumDate={maxDate}
                          minimumDate={minDate}
                        />
                        {fieldState.error && (
                          <Text className="text-red-500 text-sm mt-1">
                            {String(fieldState.error.message)}
                          </Text>
                        )}
                      </>
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

                <View className="flex-row gap-3">
                  {/* <Button
                    variant="outline"
                    onPress={handleBack}
                    disabled={activeStep === 1}
                    className="flex-1"
                  >
                    <Text className="text-sm font-semibold">Back</Text>
                  </Button> */}
                  <Button size={"lg"} onPress={handleNext} className="flex-1">
                    <Text className="text-sm font-semibold text-primary-foreground">
                      Next
                    </Text>
                  </Button>
                </View>
              </StepperStepContent>

              {/* Step 3: Address and Additional Info */}
              <StepperStepContent className="gap-6" step={3}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={genderOptions}
                      placeholder="Gender"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.gender && (
                  <Text className="text-red-500 text-sm -mt-4">
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
                      options={stateOptions}
                      placeholder="State of Origin"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.stateOfOrigin && (
                  <Text className="text-red-500 text-sm -mt-4">
                    {String(errors.stateOfOrigin.message)}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="lgaOfOrigin"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={stateOptions}
                      placeholder="LGA of Origin"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.lgaOfOrigin && (
                  <Text className="text-red-500 text-sm -mt-4">
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
                      options={stateOptions}
                      placeholder="State of Residence"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.stateOfResidence && (
                  <Text className="text-red-500 text-sm -mt-4">
                    {String(errors.stateOfResidence.message)}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="lgaOfResidence"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={stateOptions}
                      placeholder="LGA of Residence"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.lgaOfResidence && (
                  <Text className="text-red-500 text-sm -mt-4">
                    {String(errors.lgaOfResidence.message)}
                  </Text>
                )}

                <Controller
                  control={control}
                  name="cityOfResidence"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={stateOptions}
                      placeholder="City of Residence"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.cityOfResidence && (
                  <Text className="text-red-500 text-sm -mt-4">
                    {String(errors.cityOfResidence.message)}
                  </Text>
                )}

                <View className="flex-row gap-3">
                  {/* <Button
                    variant="outline"
                    onPress={handleBack}
                    disabled={activeStep === 1}
                    className="flex-1"
                  >
                    <Text className="text-sm font-semibold">Back</Text>
                  </Button> */}
                  <Button size={"lg"} onPress={handleNext} className="flex-1">
                    <Text className="text-sm font-semibold text-primary-foreground">
                      Next
                    </Text>
                  </Button>
                </View>
              </StepperStepContent>

              {/* Step 4: Documents and Funding */}
              <StepperStepContent className="gap-6" step={4}>
                <Controller
                  control={control}
                  name="bank"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      label="Fund Account Instantly"
                      options={bankOptions}
                      placeholder="Select Bank"
                      value={value as string}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors.bank && (
                  <Text className="text-red-500 text-sm -mt-4">
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
                    handleFileSelect("passportPhotograph", file)
                  }
                />
                {errors.passportPhotograph && (
                  <Text className="text-red-500 text-sm -mt-2">
                    {String(errors.passportPhotograph.message)}
                  </Text>
                )}

                <FileInput
                  label="Signature"
                  onFileSelect={(file) => handleFileSelect("signature", file)}
                />
                {errors.signature && (
                  <Text className="text-red-500 text-sm -mt-2">
                    {String(errors.signature.message)}
                  </Text>
                )}

                <View className="flex-row gap-3">
                  <Button
                    variant="outline"
                    onPress={handleBack}
                    disabled={activeStep === 1}
                    className="flex-1"
                  >
                    <Text className="text-sm font-semibold">Back</Text>
                  </Button>
                  <Button
                    size={"lg"}
                    className="flex-1"
                    onPress={handleSubmit(onSubmit)}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text className="text-sm font-semibold text-primary-foreground">
                        Submit
                      </Text>
                    )}
                  </Button>
                </View>
              </StepperStepContent>
            </StepperContent>
          </Stepper>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Tier1Screen;

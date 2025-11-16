import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ICountry } from "react-native-international-phone-number";
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
import { OtpFieldHandle } from "@/components/ui/otp-field";
import CustomPhoneInput from "@/components/ui/phone-input";
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
} from "@/constants/form-options";
import { useDebounce } from "@/features/account/hooks/useDebounce";
import { useLocation } from "@/features/account/hooks/useLocation";
import { useTier1Mutations } from "@/features/account/hooks/useTier1Mutations";
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
import { sanitizeBVN, sanitizeEmail, sanitizeName, sanitizeNIN } from "@/utils";
import { StateCodes } from "geo-ng";
import { isValidPhoneNumber } from "react-native-international-phone-number";

const TOTAL_STEPS = 4;

const Tier1Screen = () => {
  const router = useRouter();
  const [prospectId, setProspectId] = useState<string | null>(null);
  const otpFieldRef = useRef<OtpFieldHandle>(null);

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
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = form;

  const {
    states,
    lgas: lgasOfOrigin,
    handleStateChange: handleStateOfOriginChange,
  } = useLocation();
  const {
    lgas: lgasOfResidence,
    cities: citiesOfResidence,
    handleStateChange: handleStateOfResidenceChange,
    handleLgaChange: handleLgaOfResidenceChange,
  } = useLocation();

  const {
    sendOTPMutation,
    verifyOTPMutation,
    verifyBVNMutation,
    verifyNINMutation,
    updateAddressMutation,
    finalSubmitMutation,
  } = useTier1Mutations({ prospectId, setProspectId, form, handleNext });

  const { mutate: doSendOTP, isPending: isSendingOTP } = sendOTPMutation;
  const { mutate: doVerifyOTP, isPending: isVerifyingOTP } = verifyOTPMutation;
  const { mutate: doVerifyBVN, isPending: isVerifyingBVN } = verifyBVNMutation;
  const { mutate: doVerifyNIN, isPending: isVerifyingNIN } = verifyNINMutation;
  const { mutate: doUpdateAddress, isPending: isUpdatingAddress } =
    updateAddressMutation;
  const { mutate: doFinalSubmit, isPending: isSubmitting } =
    finalSubmitMutation;

  const idType = watch("idType");
  const activeTab = idType || "bvn";
  const bvnValue = watch("bvn");
  const ninValue = watch("nin");
  const stateOfOrigin = watch("stateOfOrigin");
  const stateOfResidence = watch("stateOfResidence");
  const lgaOfResidence = watch("lgaOfResidence");
  const debouncedBvn = useDebounce(bvnValue, 1000);
  const debouncedNin = useDebounce(ninValue, 1000);

  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(
    undefined
  );

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
    setValue("selectedCountry", country);
    trigger("mobileNumber");
  }

  useEffect(() => {
    setValue("lgaOfOrigin", "");
    handleStateOfOriginChange(stateOfOrigin as StateCodes);
  }, [stateOfOrigin]);

  useEffect(() => {
    setValue("lgaOfResidence", "");
    handleStateOfResidenceChange(stateOfResidence as StateCodes);
  }, [stateOfResidence]);

  useEffect(() => {
    setValue("cityOfResidence", "");
    handleLgaOfResidenceChange(stateOfResidence as StateCodes, lgaOfResidence);
  }, [lgaOfResidence, stateOfResidence]);

  useEffect(() => {
    if (debouncedBvn && debouncedBvn.length === 11 && idType === "bvn") {
      const { dateOfBirth } = form.getValues();
      if (dateOfBirth) {
        doVerifyBVN({ bvn: debouncedBvn, dob: dateOfBirth });
      }
    }

    if (debouncedNin && debouncedNin.length === 11 && idType === "nin") {
      const { dateOfBirth, email } = form.getValues();
      if (dateOfBirth && email) {
        doVerifyNIN({ nin: debouncedNin, dob: dateOfBirth, email });
      }
    }
  }, [debouncedNin, idType, debouncedBvn]);

  const handleSendOTP = () => {
    const mobileNumber = form.getValues("mobileNumber");
    const country = form.getValues("selectedCountry");
    setValue("otp", "");

    if (!isValidPhoneNumber(mobileNumber, country as ICountry)) {
      form.setError("mobileNumber", {
        type: "manual",
        message: "Please enter a valid phone number.",
      });
      return;
    }
    if (!form.getValues("agreement")) {
      form.setError("agreement", {
        type: "manual",
        message: "You must agree to the Data Privacy Policy",
      });
      return;
    }

    const phoneDigits = mobileNumber.replace(/\D/g, "");
    const countryCode = country?.idd?.root ?? "";

    doSendOTP(
      {
        prospectDetails: { type: "IND", tier: 1 },
        phone: phoneDigits,
        country: countryCode,
      },
      {
        onSuccess: () => {
          otpFieldRef.current?.clear();
          otpFieldRef.current?.focus();
        },
      }
    );
  };

  const handleStep1Next = async () => {
    const isValid = await form.trigger(step1Fields);
    if (!prospectId) {
      form.setError("otp", {
        type: "manual",
        message: "Invalid OTP. Please send an OTP first.",
      });
      if (!isValid) {
        return;
      }
      return;
    }

    if (isValid) {
      doVerifyOTP({ otp: form.getValues("otp") });
    }
  };

  const handleStep2Next = async () => {
    const isValid = await form.trigger(step2Fields);
    if (isValid) {
      handleNext();
    }
  };

  const handleStep3Next = async () => {
    const isValid = await form.trigger(step3Fields);
    if (isValid) {
      const {
        gender,
        mothersMaidenName,
        stateOfOrigin,
        lgaOfOrigin,
        residentialAddress,
        stateOfResidence,
        lgaOfResidence,
        cityOfResidence,
      } = form.getValues();

      const stateOfOriginName = states.find(
        (s) => s.code === stateOfOrigin
      )?.name;
      const stateOfResidenceName = states.find(
        (s) => s.code === stateOfResidence
      )?.name;

      const payload = {
        gender: gender?.[0]?.toUpperCase(),
        mothersmaidenname: mothersMaidenName,
        origin: { state: stateOfOriginName!, lga: lgaOfOrigin },
        residence: {
          addressline: residentialAddress,
          state: stateOfResidenceName!,
          lga: lgaOfResidence,
          city: cityOfResidence,
        },
      };
      doUpdateAddress(payload);
    }
  };

  const onSubmit = (data: IndividualTier1FormData) => {
    doFinalSubmit(data, {
      onSuccess: (response) => {
        if (response.status === "success" && response.data) {
          const { accountname, accountnumber } = response.data.customer;
          router.push({
            pathname: "/(app)/accounts/open/success",
            params: { accountName: accountname!, accountNumber: accountnumber! },
          });
        }
      },
    });
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
                  <CustomPhoneInput
                    name="mobileNumber"
                    control={control}
                    error={errors.mobileNumber}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={handleSelectedCountry}
                    autoFocus={true}
                  />
                  <Pressable
                    onPress={handleSendOTP}
                    disabled={isSendingOTP}
                    className="mt-1 ml-auto"
                  >
                    <Text className="text-xs font-bold underline text-primary">
                      {isSendingOTP ? "Sending..." : "Click to send OTP"}
                    </Text>
                  </Pressable>
                </View>

                <View>
                  <Text className="font-[500] mb-2 text-text">OTP</Text>
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
                    Enter 6-Digit code sent to +234 123 456 7890
                  </Text>
                </View>

                <Button
                  size={"lg"}
                  onPress={handleStep1Next}
                  loading={isVerifyingOTP}
                >
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
                      options={lgasOfOrigin.map((lga) => ({ label: lga, value: lga }))}
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
                      options={lgasOfResidence.map((lga) => ({ label: lga, value: lga }))}
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

                <Controller
                  control={control}
                  name="cityOfResidence"
                  render={({ field: { value, onChange } }) => (
                    <CustomSelect
                      options={citiesOfResidence.map((city) => ({ label: city, value: city }))}
                      placeholder="City of Residence"
                      value={value as string}
                      onValueChange={onChange}
                      disabled={!lgaOfResidence || citiesOfResidence.length === 0}
                    />
                  )}
                />
                {errors.cityOfResidence && (
                  <Text className="-mt-4 text-sm text-red-500">
                    {String(errors.cityOfResidence.message)}
                  </Text>
                )}

                <Button
                  size={"lg"}
                  onPress={handleStep3Next}
                  className="flex-1"
                  loading={isUpdatingAddress}
                >
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

                <View>
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
                </View>

                <View>
                  <FileInput
                    label="Signature"
                    onFileSelect={(file) => setValue("signature", file as any)}
                  />
                  {errors.signature && (
                    <Text className="-mt-2 text-sm text-red-500">
                      {String(errors.signature.message)}
                    </Text>
                  )}
                </View>

                <Button
                  size={"lg"}
                  className="flex-1"
                  onPress={handleSubmit(onSubmit)}
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

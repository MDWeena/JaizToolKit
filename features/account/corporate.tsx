import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import FileInput from "@/components/ui/file-input";
import OtpField from "@/components/ui/otp-field";
import { TextField } from "@/components/ui/input";
import {
  Stepper,
  StepperContent,
  StepperStep,
  StepperStepContent,
  StepperSteps,
} from "@/components/ui/stepper";
import { Header } from "@/components/shared/header";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";
import Agreement from "@/components/ui/form-agreement";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "@/components/ui/date-picker";

const CorporateAccountsScreen = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>();
  const [incorporationDate, setIncorporationDate] = useState<Date>();
  const [dateIssued, setDateIssued] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  // Set maximum date to today
  const maxDate = new Date();
  // Set minimum date to 100 years ago (reasonable limit)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={100}
      >
        <ScrollView
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
            <Header title="Corporate Account" />
            <StepperContent>
              <StepperStepContent className="gap-6" step={1}>
                <Agreement agree={isChecked} setAgree={setChecked} />
                <TextField
                  InputProps={{
                    placeholder: "Business Mobile Number",
                    keyboardType: "number-pad",
                  }}
                />

                <View>
                  <Text className="font-[500] mb-2">OTP</Text>
                  <OtpField length={6} />
                  <Text className="text-[.9rem] mt-3 text-grey-600">
                    Enter 6-Digit code sent to +234 123 456 7890
                  </Text>
                </View>

                <CustomSelect
                  options={[
                    { value: "jaiz max", label: "Jaiz Max" },
                    { value: "jaiz business", label: "Jaiz Business" },
                  ]}
                  placeholder="Account Product"
                />

                <CustomSelect
                  options={[
                    { value: "corporate", label: "Corporate" },
                    {
                      value: "sole proprietorship",
                      label: "Sole Proprietorship",
                    },
                    { value: "partnership", label: "Partnership" },
                    {
                      value: "limited liability partnership",
                      label: "Limited Liability Partnership",
                    },
                    {
                      value: "limited liability company",
                      label: "Limited Liability Company",
                    },
                    {
                      value: "public limited company",
                      label: "Public Limited Company",
                    },
                    {
                      value: "private limited company",
                      label: "Private Limited Company",
                    },
                    {
                      value: "public limited company",
                      label: "Public Limited Company",
                    },
                  ]}
                  placeholder="Account Nature"
                />

                <CustomSelect
                  options={[
                    { value: "naira", label: "Naira" },
                    { value: "usd", label: "USD" },
                    { value: "gbp", label: "GBP" },
                    { value: "eur", label: "EUR" },
                    { value: "cny", label: "CNY" },
                    { value: "jpy", label: "JPY" },
                    { value: "krw", label: "KRW" },
                    { value: "inr", label: "INR" },
                    { value: "brl", label: "BRL" },
                  ]}
                  placeholder="Account Currency"
                />

                <TextField
                  InputProps={{
                    placeholder: "RC Number",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Business Name",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Business Address",
                    multiline: true,
                    numberOfLines: 3,
                  }}
                />

                <CustomSelect
                  options={[
                    { value: "lagos", label: "Lagos" },
                    { value: "abuja", label: "Abuja" },
                    { value: "kano", label: "Kano" },
                    { value: "ibadan", label: "Ibadan" },
                    { value: "port-harcourt", label: "Port Harcourt" },
                    { value: "enugu", label: "Enugu" },
                    { value: "oyo", label: "Oyo" },
                    { value: "kaduna", label: "Kaduna" },
                    { value: "usd", label: "USD" },
                    { value: "gbp", label: "GBP" },
                    { value: "eur", label: "EUR" },
                    { value: "cny", label: "CNY" },
                    { value: "jpy", label: "JPY" },
                    { value: "krw", label: "KRW" },
                    { value: "inr", label: "INR" },
                    { value: "brl", label: "BRL" },
                  ]}
                  placeholder="State of Operation"
                />

                <DatePicker
                  value={incorporationDate}
                  onChange={setIncorporationDate}
                  placeholder="Date of Incorporation"
                  maximumDate={new Date()}
                  minimumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    )
                  }
                />

                <Button
                  size={"lg"}
                  className="my-4"
                  onPress={() => setActiveStep(2)}
                >
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={2}>
                <TextField
                  InputProps={{
                    placeholder: "Business Email",
                    keyboardType: "email-address",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "TIN Number",
                    keyboardType: "number-pad",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Monthly Turnover",
                  }}
                />
                <CustomSelect
                  options={[
                    { value: "lagos", label: "Lagos" },
                    { value: "abuja", label: "Abuja" },
                    { value: "kano", label: "Kano" },
                    { value: "ibadan", label: "Ibadan" },
                    { value: "port-harcourt", label: "Port Harcourt" },
                    { value: "enugu", label: "Enugu" },
                    { value: "oyo", label: "Oyo" },
                    { value: "kaduna", label: "Kaduna" },
                  ]}
                  placeholder="Preferred Branch"
                />
                <TextField
                  InputProps={{
                    placeholder: "SCUML Number",
                    keyboardType: "number-pad",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Purpose of Account",
                  }}
                />
                <CustomSelect
                  placeholder="Additional Banking Services"
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <Button
                  size={"lg"}
                  className="my-4"
                  onPress={() => setActiveStep(3)}
                >
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={3}>
                <TextField
                  InputProps={{
                    placeholder: "Director's Mobile Number",
                    keyboardType: "number-pad",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Director's BVN",
                    keyboardType: "number-pad",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Director's Name",
                  }}
                />

                <CustomSelect
                  placeholder="Director's Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />

                <DatePicker
                  value={birthDate}
                  onChange={setBirthDate}
                  placeholder="Director's Date of Birth"
                  maximumDate={maxDate}
                  minimumDate={minDate}
                />

                <TextField
                  InputProps={{
                    placeholder: "Director's Address",
                    multiline: true,
                    numberOfLines: 3,
                  }}
                />

                <CustomSelect
                  placeholder="Director's State of Residence"
                  options={[
                    { value: "lagos", label: "Lagos" },
                    { value: "abuja", label: "Abuja" },
                    { value: "kano", label: "Kano" },
                    { value: "ibadan", label: "Ibadan" },
                    { value: "port-harcourt", label: "Port Harcourt" },
                    { value: "enugu", label: "Enugu" },
                    { value: "oyo", label: "Oyo" },
                    { value: "kaduna", label: "Kaduna" },
                  ]}
                />

                <CustomSelect
                  placeholder="Director's Country"
                  options={[
                    { value: "nigeria", label: "Nigeria" },
                    { value: "ghana", label: "Ghana" },
                    { value: "kenya", label: "Kenya" },
                    { value: "tanzania", label: "Tanzania" },
                    { value: "uganda", label: "Uganda" },
                  ]}
                />
                <CustomSelect
                  placeholder="Director's State"
                  options={[
                    { value: "lagos", label: "Lagos" },
                    { value: "abuja", label: "Abuja" },
                    { value: "kano", label: "Kano" },
                    { value: "ibadan", label: "Ibadan" },
                    { value: "port-harcourt", label: "Port Harcourt" },
                  ]}
                />
                <CustomSelect
                  placeholder="Director's LGA"
                  options={[
                    { value: "lagos", label: "Lagos" },
                    { value: "abuja", label: "Abuja" },
                    { value: "kano", label: "Kano" },
                    { value: "ibadan", label: "Ibadan" },
                    { value: "port-harcourt", label: "Port Harcourt" },
                  ]}
                />
                <CustomSelect
                  placeholder="Director's Identification Type"
                  options={[
                    { value: "passport", label: "Passport" },
                    { value: "driver's license", label: "Driver's License" },
                    {
                      value: "national identity card",
                      label: "National Identity Card",
                    },
                  ]}
                />
                <TextField
                  InputProps={{
                    placeholder: "Director's Identification Number",
                    keyboardType: "number-pad",
                  }}
                />
                <DatePicker
                  value={dateIssued}
                  onChange={setDateIssued}
                  placeholder="Date Issued"
                  maximumDate={new Date()}
                  minimumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    )
                  }
                />
                <DatePicker
                  value={expiryDate}
                  onChange={setExpiryDate}
                  placeholder="Expiry Date"
                  maximumDate={new Date()}
                  minimumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 100)
                    )
                  }
                />
                <CustomSelect
                  placeholder="Referee Type 1"
                  options={[
                    { value: "bank", label: "Bank" },
                    { value: "customer", label: "Customer" },
                    { value: "other", label: "Other" },
                  ]}
                />
                <CustomSelect
                  placeholder="Referee Type 2"
                  options={[
                    { value: "bank", label: "Bank" },
                    { value: "customer", label: "Customer" },
                    { value: "other", label: "Other" },
                  ]}
                />
                <CustomSelect
                  placeholder="PC Code"
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                  ]}
                />
                <TextField
                  InputProps={{
                    placeholder: "Relationship Team Email",
                  }}
                />
                <Button
                  size={"lg"}
                  className="my-4"
                  onPress={() => setActiveStep(4)}
                >
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={4}>
                <FileInput
                  label="Passport Photograph"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="TIN Certificate"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Form 2 Document"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Certificate of Registration"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Signature Mandate"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Other Documents"
                  onFileSelect={(files) => console.log(files)}
                />

                <Button
                  className="my-4"
                  onPress={() => console.log("Submitting SKS Account Form")}
                >
                  Submit
                </Button>
              </StepperStepContent>
            </StepperContent>
          </Stepper>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CorporateAccountsScreen;

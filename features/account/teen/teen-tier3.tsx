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

const Tier3Screen = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>();

  // Set maximum date to today
  const maxDate = new Date();
  // Set minimum date to 100 years ago (reasonable limit)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  const genderOptions: SelectOption[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            {/* Header Section */}
            <Header title="Tier 3 Account" />

            <StepperContent>
              <StepperStepContent className="gap-6" step={1}>
                <Agreement agree={isChecked} setAgree={setChecked} />
                <TextField
                  InputProps={{
                    placeholder: "Mobile Number",
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

                <TextField
                  InputProps={{
                    placeholder: "Email Address",
                    keyboardType: "email-address",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "BVN",
                    keyboardType: "number-pad",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "NIN",
                    keyboardType: "number-pad",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "First Name",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Middle Name",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Last Name",
                  }}
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
                <CustomSelect options={genderOptions} placeholder="Gender" />
                <CustomSelect
                  options={[
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                  ]}
                  placeholder="Marital Status"
                />
                <TextField
                  InputProps={{
                    placeholder: "Mother's Maiden Name",
                  }}
                />
                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  placeholder="State of Origin"
                />
                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  placeholder="LGA of Origin"
                />
                <TextField
                  InputProps={{
                    placeholder: "Residential Address",
                    multiline: true,
                    numberOfLines: 3,
                  }}
                />
                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  placeholder="State of Residence"
                />
                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  placeholder="LGA of Residence"
                />
                <CustomSelect
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  placeholder="City of Residence"
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
                    placeholder: "Full Name of Next of Kin",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Next of Kin Mobile Number",
                    keyboardType: "number-pad",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Relationship with Next of Kin",
                  }}
                />

                <DatePicker
                  value={birthDate}
                  onChange={setBirthDate}
                  placeholder="Next of Kin Date of Birth"
                  maximumDate={maxDate}
                  minimumDate={minDate}
                />

                <TextField
                  InputProps={{
                    placeholder: "Annual Turnover",
                  }}
                />

                <TextField
                  InputProps={{
                    placeholder: "Purpose of Account Opening",
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
                  label="Valid ID"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Passport Photograph"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Utility Bill"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Signature"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="KYC"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="EDD"
                  onFileSelect={(files) => console.log(files)}
                />

                <FileInput
                  label="Risk Assessment Form"
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

export default Tier3Screen;

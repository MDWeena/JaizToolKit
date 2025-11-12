import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/shared/header";
import { Button, DatePicker, FileInput, Agreement, TextField, OtpField } from "@/components/ui";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
import {
  Stepper,
  StepperContent,
  StepperStep,
  StepperStepContent,
  StepperSteps,
} from "@/components/ui/stepper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Pressable, Text, View } from "react-native";
import { BackButton } from "@/components/shared";

const Tier3Screen = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>();
  const [customerType, setCustomerType] = React.useState("existing");

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
      <BackButton />
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="handled"
        >
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
            <Header title="Tier 3 - Jaiz 3 Account" />

            <StepperContent>
              <StepperStepContent className="gap-6" step={1}>
                <Agreement agree={isChecked} setAgree={setChecked} />
                <TextField
                  InputProps={{
                    placeholder: "Mobile Number",
                    keyboardType: "phone-pad",
                    className: "py-5",
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
                    placeholder: "NIN",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "BVN",
                  }}
                />

                <DatePicker
                  value={birthDate}
                  onChange={setBirthDate}
                  placeholder="Date of Birth"
                  maximumDate={maxDate}
                  minimumDate={minDate}
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

                <Button size={"lg"} onPress={() => setActiveStep(2)}>
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={2}>
                <CustomSelect options={genderOptions} placeholder="Gender" />
                <TextField
                  InputProps={{
                    placeholder: "Mother's Maiden Name",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Next of Kin",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Next of Kin Mobile Number",
                    keyboardType: "phone-pad",
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
                  placeholder="State of Origin"
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
                    { value: "lagos", label: "Lagos" },
                    { value: "abuja", label: "Abuja" },
                    { value: "kano", label: "Kano" },
                    { value: "ibadan", label: "Ibadan" },
                    { value: "port-harcourt", label: "Port Harcourt" },
                    { value: "enugu", label: "Enugu" },
                    { value: "oyo", label: "Oyo" },
                    { value: "kaduna", label: "Kaduna" },
                  ]}
                  placeholder="State of Residence"
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
                  placeholder="LGA of Residence"
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
                  placeholder="City of Residence"
                />

                <Button size={"lg"} onPress={() => setActiveStep(3)}>
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={3}>
                <CustomSelect
                  options={[
                    { label: "University of Lagos", value: "unilag" },
                    { label: "University of Ibadan", value: "ui" },
                    { label: "Ahmadu Bello University", value: "abu" },
                    { label: "University of Nigeria", value: "unn" },
                    { label: "Obafemi Awolowo University", value: "oau" },
                    { label: "Lagos State University", value: "lasu" },
                  ]}
                  placeholder="Select school"
                />
                <CustomSelect
                  options={[
                    { label: "Faculty of Engineering", value: "engineering" },
                    { label: "Faculty of Science", value: "science" },
                    { label: "Faculty of Arts", value: "arts" },
                    { label: "Faculty of Law", value: "law" },
                    { label: "Faculty of Medicine", value: "medicine" },
                    {
                      label: "Faculty of Social Sciences",
                      value: "social-sciences",
                    },
                    { label: "Faculty of Education", value: "education" },
                    { label: "Faculty of Business", value: "business" },
                  ]}
                  placeholder="Select Faculty"
                />
                <CustomSelect
                  options={[
                    { label: "100 Level", value: "100" },
                    { label: "200 Level", value: "200" },
                    { label: "300 Level", value: "300" },
                    { label: "400 Level", value: "400" },
                    { label: "500 Level", value: "500" },
                  ]}
                  placeholder="Select Level"
                />
                <TextField
                  InputProps={{
                    placeholder: "Year of Graduation",
                    keyboardType: "numeric",
                  }}
                />

                <Button size={"lg"} onPress={() => setActiveStep(4)}>
                  Next
                </Button>
              </StepperStepContent>
              <StepperStepContent className="gap-6" step={4}>
                <CustomSelect
                  label="Fund Account Instantly"
                  options={[
                    { label: "Access Bank", value: "access" },
                    { label: "GTBank", value: "gtb" },
                    { label: "Zenith Bank", value: "zenith" },
                    { label: "First Bank", value: "firstbank" },
                    { label: "UBA", value: "uba" },
                    { label: "Union Bank", value: "union" },
                    { label: "Fidelity Bank", value: "fidelity" },
                    { label: "Jaiz Bank", value: "jaiz" },
                  ]}
                  placeholder="Select Bank"
                />
                <TextField
                  InputProps={{
                    placeholder: "Amount",
                    keyboardType: "numeric",
                  }}
                />
                <FileInput
                  label="Passport Photograph"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={1048576}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="Signature"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={1048576}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="School ID"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={1048576}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="Other ID"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={1048576}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <Button
                  size={"lg"}
                  className="my-4"
                  onPress={() => {
                    // Simulate form submission
                    console.log("Submitting Teen Tier 3 Account Form");
                    router.push("/(app)/accounts/open/success");
                  }}
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

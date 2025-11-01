import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

const Tier1Screen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("bvn");
  const [activeStep, setActiveStep] = useState(1);
  const [isChecked, setChecked] = useState(false);
  const [birthDate, setBirthDate] = useState<Date>();
  const [kidBirthDate, setKidBirthDate] = useState<Date>();

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
    <SafeAreaView className="flex-1 bg-background">
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
          {/* Header Section */}

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

                <Button size={"lg"} onPress={() => setActiveStep(2)}>
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={2}>
                <DatePicker
                  value={kidBirthDate}
                  onChange={setKidBirthDate}
                  placeholder="Kid's Date of Birth"
                  maximumDate={maxDate}
                  minimumDate={minDate}
                />
                <TextField
                  InputProps={{
                    placeholder: "Kid's First Name",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Kid's Middle Name",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Kid's Last Name",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Kid's NIN",
                  }}
                />
                <CustomSelect
                  options={genderOptions}
                  placeholder="Kid's Gender"
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
                  placeholder="Kid's State of Origin"
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
                  placeholder="Kid's LGA of Origin"
                />
                <Button size={"lg"} onPress={() => setActiveStep(3)}>
                  Next
                </Button>
              </StepperStepContent>

              <StepperStepContent className="gap-6" step={3}>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
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
                  <CustomSelect
                    options={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    placeholder="Existing Customer"
                  />
                  <TabsContent value="nin" className="mt-0">
                    <TextField
                      InputProps={{
                        placeholder: "Parent's NIN",
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="bvn" className="mt-0">
                    <TextField
                      InputProps={{
                        placeholder: "Parent's BVN",
                      }}
                    />
                  </TabsContent>
                </Tabs>
                <TextField
                  InputProps={{
                    placeholder: "Parent's Full Name",
                  }}
                />
                <TextField
                  InputProps={{
                    placeholder: "Parent's Address",
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
                  placeholder="Parent's State of Residence"
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
                  label="Kid's Birth Certificate"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={2097152}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="Kid's Passport Photograph"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={2097152}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="Parent's Passport Photograph"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={2097152}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="Parent's Signature"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={2097152}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <FileInput
                  label="Risk Assessment form"
                  onFileSelect={(files) => console.log(files)}
                  maxFileSize={2097152}
                  acceptedTypes={["pdf", "jpg", "png"]}
                />
                <Button
                  size={"lg"}
                  className="my-4"
                  onPress={() => console.log("Submitting Teen Account Form")}
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

export default Tier1Screen;

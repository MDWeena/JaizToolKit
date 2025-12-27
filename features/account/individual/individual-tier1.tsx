import React from "react";
import { FormProvider } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header } from "@/components/shared";
import {
  Stepper,
  StepperContent,
  StepperStep,
  StepperStepContent,
  StepperSteps,
} from "@/components/ui/stepper";
import { Step1Verification } from "@/features/account/components/Step1Verification";
import { Step2PersonalDetails } from "@/features/account/components/Step2PersonalDetails";
import { Step3Address } from "@/features/account/components/Step3Address";
import { Step4Documents } from "@/features/account/components/Step4Documents";
import { useTier1Handlers } from "@/features/account/hooks/useTier1Handlers";

const Tier1Screen = () => {
  const {
    form,
    activeStep,
    setActiveStep,
    handleBack,
    scrollViewRef,
    states,
    lgasOfOrigin,
    lgasOfResidence,
    prospectId,
    otpFieldRef,
    banks,
    isBanksLoading,
    activeTab,
    selectedCountry,
    handleSelectedCountry,
    handleSendOTP,
    handleStep1Next,
    handleStep2Next,
    handleStep3Next,
    onSubmit,
    handleTabChange,
    isSendingOTP,
    isVerifyingOTP,
    isVerifyingBVN,
    isVerifyingNIN,
    isUpdatingAddress,
    isSubmitting,
    handleStateOfOriginChange,
    handleStateOfResidenceChange,
    mobileNumber,
    onPhoneNumberChange,
  } = useTier1Handlers();

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

            <FormProvider {...form}>
              <StepperContent>
                <StepperStepContent className="gap-6" step={1}>
                  <Step1Verification
                    selectedCountry={selectedCountry}
                    handleSelectedCountry={handleSelectedCountry}
                    handleSendOTP={handleSendOTP}
                    isSendingOTP={isSendingOTP}
                    prospectId={prospectId}
                    otpFieldRef={otpFieldRef}
                    handleStep1Next={handleStep1Next}
                    isVerifyingOTP={isVerifyingOTP}
                    mobileNumber={mobileNumber}
                    onPhoneNumberChange={onPhoneNumberChange}
                  />
                </StepperStepContent>

                <StepperStepContent className="gap-6" step={2}>
                  <Step2PersonalDetails
                    activeTab={activeTab}
                    handleTabChange={handleTabChange}
                    isVerifyingBVN={isVerifyingBVN}
                    isVerifyingNIN={isVerifyingNIN}
                    handleStep2Next={handleStep2Next}
                  />
                </StepperStepContent>

                <StepperStepContent className="gap-6" step={3}>
                  <Step3Address
                    states={states}
                    lgasOfOrigin={lgasOfOrigin}
                    lgasOfResidence={lgasOfResidence}
                    handleStep3Next={handleStep3Next}
                    isUpdatingAddress={isUpdatingAddress}
                    onStateOfOriginChange={handleStateOfOriginChange}
                    onStateOfResidenceChange={handleStateOfResidenceChange}
                  />
                </StepperStepContent>

                <StepperStepContent className="gap-6" step={4}>
                  <Step4Documents
                    banks={banks}
                    isBanksLoading={isBanksLoading}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                  />
                </StepperStepContent>
              </StepperContent>
            </FormProvider>
          </Stepper>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Tier1Screen;

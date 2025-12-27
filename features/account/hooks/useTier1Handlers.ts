import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ICountry, isValidPhoneNumber } from "react-native-international-phone-number";

import { OtpFieldHandle } from "@/components/ui/otp-field";
import { useBanksUssdCodes } from "@/features/account/hooks/useBanksUssdCodes";
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
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { sanitizePhone } from "@/utils";
import { useAccountStore } from "./useAccountStore";

const TOTAL_STEPS = 4;

export const useTier1Handlers = () => {
  const router = useRouter();
  const [prospectId, setProspectId] = useState<string | null>(null);
  const otpFieldRef = useRef<OtpFieldHandle>(null);
  const { banks, getUssdCode, isLoading: isBanksLoading } = useBanksUssdCodes();
  const setOpenedAccount = useAccountStore((state) => state.setOpenedAccount);

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
    watch,
    setValue,
    trigger,
  } = form;

  const {
    states,
    lgas: lgasOfOrigin,
    handleStateChange: doHandleStateOfOriginChange,
  } = useLocation();
  const {
    lgas: lgasOfResidence,
    handleStateChange: doHandleStateOfResidenceChange,
  } = useLocation();

  const handleStateOfOriginChange = (stateCode: string) => {
    setValue("lgaOfOrigin", "");
    doHandleStateOfOriginChange(stateCode);
  };

  const handleStateOfResidenceChange = (stateCode: string) => {
    setValue("lgaOfResidence", "");
    doHandleStateOfResidenceChange(stateCode);
  };

  const {
    sendOTPMutation,
    verifyOTPMutation,
    verifyBVNMutation,
    verifyNINMutation,
    updateAddressMutation,
    finalSubmitMutation,
  } = useTier1Mutations({
    prospectId,
    setProspectId,
    form,
    handleNext,
    states,
    onStateOfOriginChange: handleStateOfOriginChange,
    onStateOfResidenceChange: handleStateOfResidenceChange,
  });

  const { mutate: doSendOTP, isPending: isSendingOTP } = sendOTPMutation;
  const { mutate: doVerifyOTP, isPending: isVerifyingOTP } = verifyOTPMutation;
  const { mutate: doVerifyBVN, isPending: isVerifyingBVN } = verifyBVNMutation;
  const { mutate: doVerifyNIN, isPending: isVerifyingNIN } = verifyNINMutation;
  const { mutate: doUpdateAddress, isPending: isUpdatingAddress } = updateAddressMutation;
  const { mutate: doFinalSubmit, isPending: isSubmitting } = finalSubmitMutation;

  const [idType, bvnValue, ninValue, emailValue, dobValue] = watch(["idType", "bvn", "nin", "email", "dateOfBirth"]);
  const activeTab = idType || "bvn";

  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(undefined);

  const handleSelectedCountry = (country: ICountry) => {
    setSelectedCountry(country);
    setValue("selectedCountry", country);
    trigger("mobileNumber");
  };

  const debouncedVerify = useDebouncedCallback(
    (type: "bvn" | "nin", value: string, dob: Date, email: string) => {
      if (type === "bvn") {
        doVerifyBVN({ bvn: value, dob, email });
      } else {
        doVerifyNIN({ nin: value, dob, email });
      }
    },
    1000
  );

  useEffect(() => {
    const idValue = idType === "bvn" ? bvnValue : ninValue;
    debouncedVerify.cancel();
    if (!idValue || idValue.length !== 11 || !emailValue || !dobValue || !prospectId) {
      return;
    }
    debouncedVerify(idType, idValue, dobValue, emailValue);
  }, [idType, bvnValue, ninValue, emailValue, dobValue, prospectId, debouncedVerify]);

  const handleSendOTP = () => {
    const mobileNumber = form.getValues("mobileNumber");
    const country = form.getValues("selectedCountry");
    const sanitizedPhoneNumber = sanitizePhone(mobileNumber);
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

    const countryCode = country?.idd?.root ?? "";
    doSendOTP(
      {
        prospectDetails: { type: "IND", tier: 1 },
        phone: sanitizedPhoneNumber,
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

    if (!isValid) {
      return;
    }
    if (!prospectId) {
      form.setError("otp", {
        type: "manual",
        message: "Invalid OTP. Please send an OTP first.",
      });
      return;
    }
    doVerifyOTP({ otp: form.getValues("otp") });
  };

  const handleStep2Next = async () => {
    const isValid = await form.trigger(step2Fields);
    if (!isValid) {
      return;
    }
    handleNext();
  };

  const handleStep3Next = async () => {
    const isValid = await form.trigger(step3Fields);
    if (!isValid) {
      return;
    }

    const {
      gender,
      mothersMaidenName,
      stateOfOrigin,
      lgaOfOrigin,
      residentialAddress,
      stateOfResidence,
      lgaOfResidence,
    } = form.getValues();

    const payload = {
      gender: gender?.[0]?.toUpperCase(),
      mothersmaidenname: mothersMaidenName,
      origin: { state: stateOfOrigin, lga: lgaOfOrigin },
      residence: {
        addressline: residentialAddress,
        state: stateOfResidence!,
        lga: lgaOfResidence,
      },
    };
    doUpdateAddress(payload);
  };

  const onSubmit = (data: IndividualTier1FormData) => {
    doFinalSubmit(data, {
      onSuccess: (response) => {
        if (response.status === "Success" && response.data) {
          const { accountname, accountnumber } = response.data.customer;

          const bankName = data.bank;
          const amount = data.amount;
          const ussdString = bankName
            ? getUssdCode(bankName, amount || "", accountnumber || "")
            : "";

          setOpenedAccount({
            accountName: accountname || "",
            accountNumber: accountnumber || "",
            ussdString,
          });

          router.push("/(app)/accounts/open/success");
        }
      },
    });
  };

  const onPhoneNumberChange = () => {
    setProspectId(null);
  };

  const mobileNumber = watch("mobileNumber");

  const handleTabChange = (tab: "bvn" | "nin") => {
    setValue("idType", tab);
    if (tab === "bvn") {
      setValue("nin", undefined);
      trigger("bvn");
    } else {
      setValue("bvn", undefined);
      trigger("nin");
    }
  };

  return {
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
    handleStateOfOriginChange,
    handleStateOfResidenceChange,
    onSubmit,
    handleTabChange,
    isSendingOTP,
    isVerifyingOTP,
    isVerifyingBVN,
    isVerifyingNIN,
    isUpdatingAddress,
    isSubmitting,
    mobileNumber,
    onPhoneNumberChange,
  };
};
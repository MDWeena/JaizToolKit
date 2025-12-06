import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header, useToast } from "@/components/shared";
import { DatePicker } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
import SuccessSheet from "@/components/ui/success-sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { formatDate } from "@/lib/utils";
import {
  getCustomerDetails,
  linkBvn,
  linkNin,
} from "@/services/functions.service";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

type FormData = {
  bvn: string;
  nin: string;
  dob: Date;
  phone: string;
  accountName: string;
  accountNumber: string;
  firstname: string;
  lastname: string;
};

export default function LinkingScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [customerFetched, setCustomerFetched] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("bvn");
  const [isLoading, setIsLoading] = React.useState(false);
  const { showBottomSheet } = useBottomSheet();

  const {
    handleSubmit,
    setError,
    setValue,
    setFocus,
    control,
    watch,
    reset,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      dob: new Date("1993-10-21"),
      accountNumber: "0002250766",
    },
  });

  const [accountNumber, dob] = watch(["accountNumber", "dob"]);

  const {
    mutateAsync: fetchCustomerDetails,
    isPending: fetchingCustomerDetails,
  } = useMutation({
    mutationKey: ["get-customer-details"],
    mutationFn: getCustomerDetails,
    onSuccess(data) {
      console.log(data);
      setValue("accountName", data.accountname);
      setValue("phone", data.phone);
      setValue("firstname", data.firstname);
      setValue("lastname", data.lastname);

      setCustomerFetched(true);
      if (activeTab === "bvn") {
        setFocus("bvn");
      } else if (activeTab === "nin") {
        setFocus("nin");
      }
    },
    onError(error) {
      showToast({
        icon: true,
        message: error?.message || "Failed to fetch customer details",
        type: "error",
      });
    },
  });

  const fetchCustomer = async () => {
    if (accountNumber?.length != 10)
      return setError("accountNumber", {
        message: "Account number must be 10 digits",
      });

    if (!dob)
      return setError("dob", {
        message: "Date of birth is required",
      });

    clearErrors("dob");
    clearErrors("accountNumber");

    fetchCustomerDetails({
      accountNumber: accountNumber.trim(),
      dob: formatDate(dob),
    });
  };

  const { mutateAsync: linkCustomerBvn, isPending: linkingBvn } = useMutation({
    mutationKey: ["linking", "bvn"],
    mutationFn: linkBvn,
    onSuccess() {
      showBottomSheet(
        <SuccessSheet message="Your BVN has been linked to your account successfully." />
      );
      reset();
      setCustomerFetched(false);
    },
    onError(error) {
      showToast({
        icon: true,
        message: error?.message || "Failed to link BVN",
        type: "error",
      });
    },
  });

  const { mutateAsync: linkCustomerNin, isPending: linkingNin } = useMutation({
    mutationKey: ["linking", "nin"],
    mutationFn: linkNin,
    onSuccess() {
      showBottomSheet(
        <SuccessSheet message="Your NIN has been linked to your account successfully." />
      );
      reset();
      setCustomerFetched(false);
    },
    onError(error) {
      showToast({
        icon: true,
        message: error?.message || "Failed to link NIN",
        type: "error",
      });
    },
  });

  const handleLinkNin = () => {
    handleSubmit((data) =>
      linkCustomerNin({
        accountNumber: data.accountNumber,
        nin: data.nin,
        phone: data.phone,
        firstname: data.firstname,
        lastname: data.lastname,
        dob: formatDate(data.dob),
      })
    )();
  };

  const handleLinkBvn = () => {
    handleSubmit((data) =>
      linkCustomerBvn({
        accountNumber: data.accountNumber,
        bvn: data.bvn,
        phone: data.phone,
        firstname: data.firstname,
        lastname: data.lastname,
        dob: formatDate(data.dob),
      })
    )();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Link BVN/NIN" />
        <Tabs
          value={activeTab}
          onValueChange={(tab) => setActiveTab(tab)}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="bvn" className="flex-1">
              <Text>BVN</Text>
            </TabsTrigger>
            <TabsTrigger value="nin" className="flex-1">
              <Text>NIN</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="bvn">
            <Controller
              name="accountNumber"
              control={control}
              rules={{
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 10,
                  message: "Account number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Account number must be 10 digits",
                },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => {
                return (
                  <TextField
                    className="w-full"
                    InputProps={{
                      value,
                      placeholder: "Account Number",
                      onChangeText: (text) => {
                        onChange(text);
                        setCustomerFetched(false);
                      },
                      onBlur,
                    }}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="dob"
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => {
                return (
                  <View className="w-full">
                    <DatePicker
                      value={value}
                      onChange={(date) => {
                        onChange(date);
                        setCustomerFetched(false);
                      }}
                      placeholder="Date of Birth"
                      maximumDate={new Date()}
                    />
                    {fieldState.error && (
                      <Text className="mt-1 text-sm text-red-500">
                        {String(fieldState.error.message)}
                      </Text>
                    )}
                  </View>
                );
              }}
            />

            {customerFetched ? (
              <>
                <Controller
                  control={control}
                  name="accountName"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState,
                  }) => {
                    return (
                      <TextField
                        className="w-full"
                        loading={fetchingCustomerDetails}
                        InputProps={{
                          value,
                          onChangeText: onChange,
                          onBlur,
                          placeholder: "Account Name",
                          editable: false,
                        }}
                        helperText={fieldState.error?.message}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => {
                    return (
                      <TextField
                        className="w-full"
                        loading={fetchingCustomerDetails}
                        InputProps={{
                          placeholder: "Phone Number",
                          editable: false,
                          value,
                          onChangeText: onChange,
                          onBlur,
                        }}
                        helperText={fieldState.error?.message}
                      />
                    );
                  }}
                ></Controller>

                <Controller
                  control={control}
                  name="bvn"
                  rules={
                    activeTab === "bvn"
                      ? {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          minLength: {
                            value: 11,
                            message: "BVN must be 11 digits",
                          },
                          maxLength: {
                            value: 11,
                            message: "BVN must be 11 digits",
                          },
                        }
                      : undefined
                  }
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => {
                    return (
                      <TextField
                        className="w-full"
                        InputProps={{
                          placeholder: "BVN",
                          keyboardType: "numeric",
                          inputMode: "numeric",
                          value,
                          onChangeText: onChange,
                          onBlur,
                        }}
                        helperText={fieldState.error?.message}
                      />
                    );
                  }}
                ></Controller>

                <Button
                  className="mt-12 !min-w-full"
                  onPress={handleLinkBvn}
                  loading={linkingBvn}
                >
                  Link BVN
                </Button>
              </>
            ) : (
              <>
                <Button
                  loading={fetchingCustomerDetails}
                  className="mt-12 !min-w-full"
                  onPress={() => fetchCustomer()}
                >
                  Get Details
                </Button>
              </>
            )}
          </TabsContent>
          <TabsContent className="gap-5" value="nin">
            <Controller
              name="accountNumber"
              control={control}
              rules={{
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 10,
                  message: "Account number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Account number must be 10 digits",
                },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => {
                return (
                  <TextField
                    className="w-full"
                    InputProps={{
                      value,
                      placeholder: "Account Number",
                      onChangeText: onChange,
                      onBlur,
                    }}
                    helperText={fieldState.error?.message}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="dob"
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => {
                return (
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
                );
              }}
            />
            {customerFetched ? (
              <>
                <Controller
                  control={control}
                  name="accountName"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState,
                  }) => {
                    return (
                      <TextField
                        className="w-full"
                        loading={fetchingCustomerDetails}
                        InputProps={{
                          value,
                          onChangeText: onChange,
                          onBlur,
                          placeholder: "Account Name",
                          editable: false,
                        }}
                        helperText={fieldState.error?.message}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => {
                    return (
                      <TextField
                        className="w-full"
                        loading={fetchingCustomerDetails}
                        InputProps={{
                          placeholder: "Phone Number",
                          editable: false,
                          value,
                          onChangeText: onChange,
                          onBlur,
                        }}
                        helperText={fieldState.error?.message}
                      />
                    );
                  }}
                ></Controller>

                <Controller
                  control={control}
                  name="nin"
                  rules={
                    activeTab === "nin"
                      ? {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          minLength: {
                            value: 11,
                            message: "NIN must be 11 digits",
                          },
                          maxLength: {
                            value: 11,
                            message: "NIN must be 11 digits",
                          },
                        }
                      : undefined
                  }
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => {
                    return (
                      <TextField
                        className="w-full"
                        InputProps={{
                          placeholder: "NIN",
                          keyboardType: "numeric",
                          inputMode: "numeric",
                          value,
                          onChangeText: onChange,
                          onBlur,
                        }}
                        helperText={fieldState.error?.message}
                      />
                    );
                  }}
                ></Controller>

                <Button
                  className="mt-12 !min-w-full"
                  loading={linkingNin}
                  onPress={handleLinkNin}
                >
                  Link NIN
                </Button>
              </>
            ) : (
              <>
                <Button
                  loading={fetchingCustomerDetails}
                  className="mt-12 !min-w-full"
                  onPress={() => fetchCustomer()}
                >
                  Get Details
                </Button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

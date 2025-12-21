import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header, useToast } from "@/components/shared";
import { DatePicker } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
import SuccessSheet from "@/components/ui/success-sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { formatDate, hideEmailPartsWithAsterisks } from "@/lib/utils";
import {
  getCustomerDetailsWithAccountNumber,
  getTransactionHistory,
  sendStatement,
} from "@/services/functions.service";
import { SendStatementDto, TransactionHistoryQuery } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addDays, isBefore } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

type Inputs = SendStatementDto & { accountName: string };

export default function TransactionsScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = React.useState("statement");
  const { showBottomSheet } = useBottomSheet();
  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm<Inputs>();

  const [accountNumber, startDate, email] = watch([
    "accountNumber",
    "startDate",
    "email",
  ]);

  const {
    isLoading: fetchingCustomerDetails,
    data: customerDetails,
    error: errorFetchingCustomerDetails,
  } = useQuery({
    queryKey: ["customer-details", accountNumber],
    queryFn: () => getCustomerDetailsWithAccountNumber(accountNumber),
    enabled: accountNumber?.length === 10,
  });

  const { isPending: sendingStatement, mutateAsync: sendStatementMutation } =
    useMutation({
      mutationKey: ["send-statement", accountNumber],
      mutationFn: (data: SendStatementDto) => sendStatement(data),
      onSuccess() {
        showBottomSheet(
          <SuccessSheet
            message={`Your account statement has been sent to ${hideEmailPartsWithAsterisks(email)}.`}
          />
        );
        reset();
      },
      onError(error) {
        showToast({
          message: error?.message || "Error sending account statement",
          type: "error",
        });
      },
    });

  const {
    isPending: fetchingTransactionHistory,
    mutateAsync: fetchTransactionHistory,
  } = useMutation({
    mutationKey: ["fetch-transaction-history", accountNumber],
    mutationFn: (data: TransactionHistoryQuery) => getTransactionHistory(data),
    onSuccess(data) {
      showToast({
        message: "Transaction history fetched successfully",
        type: "success",
      });

      router.push({
        pathname: "/functions/rm/transactions/history",
        params: {
          transactions: JSON.stringify(data),
        },
      });
    },
    onError(error) {
      showToast({
        message: error?.message || "Error fetching transaction history",
        type: "error",
      });
    },
  });

  const onStatementSubmit = (data: SendStatementDto) => {
    if (isBefore(data.endDate, addDays(data.startDate, 1))) {
      setError("endDate", {
        message: "End day must be at least one day after start date",
      });
      setFocus("endDate");
      return;
    }

    sendStatementMutation({
      ...data,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
    });
  };

  const onHistorySubmit = (data: TransactionHistoryQuery) => {
    if (isBefore(data.endDate, addDays(data.startDate, 1))) {
      setError("endDate", {
        message: "End day must be at least one day after start date",
      });
      setFocus("endDate");
      return;
    }

    fetchTransactionHistory({
      ...data,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
    });
  };

  useEffect(() => {
    clearErrors("accountNumber");
    setValue("accountName", customerDetails?.accountName || "");
  }, [accountNumber]);

  useEffect(() => {
    setValue("accountName", customerDetails?.accountName || "");
    setValue("email", customerDetails?.email || "");
  }, [customerDetails]);

  useEffect(() => {
    if (errorFetchingCustomerDetails) {
      setError("accountNumber", {
        message:
          errorFetchingCustomerDetails.message ||
          "Error fetching customer details",
      });
      setFocus("accountNumber");
    }
  }, [errorFetchingCustomerDetails]);

  const renderFields = () => {
    return (
      <>
        <Controller
          control={control}
          name="accountNumber"
          render={({ field: { onBlur, onChange, value }, fieldState }) => {
            return (
              <TextField
                className="w-full"
                InputProps={{
                  value,
                  onBlur,
                  onChangeText: onChange,
                  keyboardType: "number-pad",
                  maxLength: 10,
                  placeholder: "Account Number",
                }}
                helperText={fieldState.error?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="accountName"
          render={({ field: { value }, fieldState }) => {
            return (
              <TextField
                className="w-full"
                loading={fetchingCustomerDetails}
                InputProps={{
                  value,
                  editable: false,
                  placeholder: "Account Name",
                }}
                helperText={fieldState.error?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="startDate"
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          render={({ field: { onChange, onBlur, value }, fieldState }) => {
            return (
              <View className="w-full">
                <DatePicker
                  value={value as Date}
                  onChange={(date) => {
                    onChange(date);
                  }}
                  placeholder="Start Date"
                  maximumDate={new Date()}
                  minimumDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    )
                  }
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

        <Controller
          control={control}
          name="endDate"
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          render={({ field: { onChange, onBlur, value }, fieldState }) => {
            return (
              <View className="w-full">
                <DatePicker
                  value={value as Date}
                  onChange={(date) => {
                    onChange(date);
                  }}
                  placeholder="End Date"
                  maximumDate={new Date()}
                  minimumDate={
                    (startDate as Date) ||
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 100)
                    )
                  }
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
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="View Transactions" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="statement" className="flex-1">
              <Text>Statement</Text>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1">
              <Text>History</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="statement">
            {renderFields()}
            <Button
              onPress={handleSubmit(onStatementSubmit)}
              className="mt-12 !min-w-full"
              loading={sendingStatement}
            >
              Send Statement
            </Button>
          </TabsContent>
          <TabsContent className="gap-5" value="history">
            {renderFields()}

            <Button
              onPress={handleSubmit(onHistorySubmit)}
              className="mt-12 !min-w-full"
              loading={fetchingTransactionHistory}
            >
              View Transactions
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

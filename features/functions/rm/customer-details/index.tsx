import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header, useToast } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import {
  getCustomerBalance,
  getCustomerDetailsWithAccountNumber,
  getFullCustomerDetails,
} from "@/services/functions.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { BalanceSheet } from "./balance-sheet";
import { CustomerDetailsSheet } from "./details-sheet";

export default function CustomerDetailsScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("balance");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState<string | undefined>(undefined);

  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const { isLoading: fetchingCustomerDetails, data: customerDetails } =
    useQuery({
      queryKey: ["customer-details", accountNumber],
      queryFn: () => getCustomerDetailsWithAccountNumber(accountNumber),
      enabled: accountNumber.length === 10,
    });

  const {
    isPending: fetchingCustomerBalance,
    mutateAsync: fetchCustomerBalance,
  } = useMutation({
    mutationKey: ["customer-balance", accountNumber],
    mutationFn: () => getCustomerBalance(accountNumber),
    onSuccess(data) {
      showBottomSheet(<BalanceSheet onClose={hideBottomSheet} {...data} />);
    },
    onError(error) {
      showToast({
        message: error?.message || "Error fetching customer balance",
        type: "error",
      });
    },
  });

  const {
    isPending: fetchingFullCustomerDetails,
    mutateAsync: fetchFullCustomerDetails,
  } = useMutation({
    mutationKey: ["full-customer-details", accountNumber],
    mutationFn: () => getFullCustomerDetails(accountNumber),
    onSuccess(data) {
      showBottomSheet(
        <CustomerDetailsSheet onClose={hideBottomSheet} {...data} />
      );
    },
    onError(error) {
      showToast({
        message: error?.message || "Error fetching customer details",
        type: "error",
      });
    },
  });

  useEffect(() => {
    setAccountName(undefined);
  }, [accountNumber]);

  useEffect(() => {
    setAccountName(customerDetails?.accountName);
  }, [customerDetails]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="View Customer Details" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="balance" className="flex-1">
              <Text>Balance</Text>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              <Text>Details</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="balance">
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: "Account Number",
                value: accountNumber,
                keyboardType: "number-pad",
                maxLength: 10,
                onChangeText(text) {
                  setAccountNumber(text);
                },
              }}
            />
            <TextField
              className="!mt-5 w-full"
              loading={fetchingCustomerDetails}
              InputProps={{
                placeholder: "Account Name",
                editable: false,
                value: accountName,
              }}
            />
            <Button
              onPress={() => fetchCustomerBalance()}
              className="mt-12 !min-w-full"
              loading={fetchingCustomerBalance}
            >
              Search
            </Button>
          </TabsContent>
          <TabsContent value="details">
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: "Account Number",
                value: accountNumber,
                keyboardType: "number-pad",
                maxLength: 10,
                onChangeText(text) {
                  setAccountNumber(text);
                },
              }}
            />
            <TextField
              className="!mt-5 w-full"
              loading={fetchingCustomerDetails}
              InputProps={{
                placeholder: "Account Name",
                editable: false,
                value: accountName,
              }}
            />
            <Button
              onPress={() => fetchFullCustomerDetails()}
              className="mt-12 !min-w-full"
              loading={fetchingFullCustomerDetails}
            >
              Search
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

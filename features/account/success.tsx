import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, Image, Linking, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { CopyIcon } from "@/assets/images/svgs/account";
import { Button } from "@/components/ui/button";
import Images from "@/constants/Images";

const AccountSuccessScreen = () => {
  const router = useRouter();
  const { accountName, accountNumber, ussdString } = useLocalSearchParams<{
    accountName: string;
    accountNumber: string;
    ussdString: string;
  }>();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (accountNumber) {
      await Clipboard.setStringAsync(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDial = () => {
    if (ussdString) {
      const isUssdCode = /^[*#][\d*#]+$/.test(ussdString);
      if (isUssdCode) {
        Linking.openURL(`tel:${ussdString}`);
      } else {
        Alert.alert("Fund Account", ussdString);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="flex-1 justify-center items-center"
      >
        <View className="items-center justify-center flex-1 w-full">
          {/* Success Icon */}
          <Image source={Images.successAlert} resizeMode="contain" />

          {/* Success Message */}
          <Text className="mb-2 text-3xl font-bold text-center text-grey-900">
            Congratulations!
          </Text>

          <Text className="px-4 mb-8 text-sm text-center text-grey-600">
            Your Account has been successfully Opened. An SMS will be sent to
            the registered Phone number
          </Text>

          {/* Account Details Card */}
          <View className="w-full p-4 mb-8 bg-white border rounded-xl border-secondary-foreground/10">
            <View className="flex-col pb-4">
              <Text className="text-sm font-medium text-grey-600">
                Account Name
              </Text>
              <Text className="text-base font-semibold text-grey-900">
                {accountName}
              </Text>
            </View>
            <View className="flex-col">
              <Text className="text-sm font-medium text-grey-600">
                Account Number
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-grey-900">
                  {accountNumber}
                </Text>
                <Pressable
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel="Copy Account Number"
                  onPress={handleCopy}
                  className="ml-2"
                >
                  {copied ? (
                    <Feather name="check" size={18} color="#10B981" />
                  ) : (
                    <CopyIcon color="#6B7280" />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
          <Button size="lg" className="w-full" onPress={handleDial}>
            <Text className="text-sm font-semibold text-primary-foreground">
              Fund Account
            </Text>
          </Button>
          <Button
            size="lg"
            className="w-full"
            variant="ghost"
            onPress={() => router.push("/(tabs)/(home)")}
          >
            <Text className="text-sm font-semibold text-pretty">
              Back to Home
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSuccessScreen;

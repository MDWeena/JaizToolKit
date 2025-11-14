import React, { useState } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

import { Text } from "@/components/ui/Text";
import { BackButton, Header } from "@/components/shared";
import { SafeAreaView } from "react-native-safe-area-context";

const HELP_SUPPORT_URL = "https://jaizbankplc.com/contact-us";
const HelpSupportWebView = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      {hasError ? (
        <View className="items-center justify-center flex-1 p-4">
          <Text className="text-lg font-semibold text-center text-grey-900">
            Failed to load help and support.
          </Text>
          <Text className="mt-2 text-center text-grey-500">
            Please check your internet connection or try again later.
          </Text>
          <TouchableOpacity
            onPress={() => setHasError(false)}
            className="px-4 py-2 mt-4 rounded-lg bg-error"
          >
            <Text className="font-medium text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          source={{ uri: HELP_SUPPORT_URL }}
          onError={() => setHasError(true)}
          startInLoadingState
          renderLoading={() => (
            <View className="items-center justify-center flex-1 bg-background">
              <ActivityIndicator size="large" color="#fb5022" />
              <Text className="mt-2 text-grey-500">
                Loading Jaiz Bank Help and Support...
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default HelpSupportWebView;

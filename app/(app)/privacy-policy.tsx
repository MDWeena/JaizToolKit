import React, { useState } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

import { Text } from "@/components/ui/Text";
import { BackButton, Header } from "@/components/shared";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIVACY_POLICY_URL = "https://jaizbankplc.com/privacy-policy";

const PrivacyPolicyWebView = () => {
  const [hasError, setHasError] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      {hasError ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-center text-lg font-semibold text-grey-900">
            Failed to load privacy policy.
          </Text>
          <Text className="text-center text-grey-500 mt-2">
            Please check your internet connection or try again later.
          </Text>
          <TouchableOpacity
            onPress={() => setHasError(false)}
            className="mt-4 px-4 py-2 bg-error rounded-lg"
          >
            <Text className="text-white font-medium">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          source={{ uri: PRIVACY_POLICY_URL }}
          onError={() => setHasError(true)}
          startInLoadingState
          renderLoading={() => (
            <View className="flex-1 justify-center items-center bg-background">
              <ActivityIndicator size="large" color="#fb5022" />
              <Text className="mt-2 text-grey-500">
                Loading Jaiz Bank Privacy Policy...
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PrivacyPolicyWebView;

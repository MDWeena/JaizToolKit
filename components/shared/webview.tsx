import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

import { Text } from "@/components/ui/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "./back-button";
import { Header } from "./header";

interface WebViewComponentProps {
  url: string;
  title?: string;
  loadingText?: string;
  errorTitle?: string;
  errorMessage?: string;
}

export const WebViewComponent: React.FC<WebViewComponentProps> = ({
  url,
  title,
  loadingText = "Loading...",
  errorTitle = "Failed to load page",
  errorMessage = "Please check your internet connection or try again later.",
}) => {
  const [hasError, setHasError] = useState(false);

  const handleRetry = () => {
    setHasError(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center gap-4">
        <BackButton />
        <Header title={title} />
      </View>
      {hasError ? (
        <View className="items-center justify-center flex-1 p-4">
          <Text className="text-lg font-semibold text-center text-grey-900">
            {errorTitle}
          </Text>
          <Text className="mt-2 text-center text-grey-500">{errorMessage}</Text>
          <TouchableOpacity
            onPress={handleRetry}
            className="px-4 py-2 mt-4 rounded-lg bg-error"
          >
            <Text className="font-medium text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          source={{ uri: url }}
          onError={() => setHasError(true)}
          startInLoadingState
          renderLoading={() => (
            <View className="items-center justify-center flex-1">
              <ActivityIndicator size="large" color="#fb5022" />
              <Text className="mt-2 text-grey-500">{loadingText}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/shared/back-button";
import { Header } from "@/components/shared/header";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import type { VerifyAccountData } from "@/types/api";

import { ListTile } from "@/components/shared/list-tile";
import { Text } from "@/components/ui/Text";
import { AccountDetailsSheet } from "./components/account-details-sheet";

export default function AccountVerifySuccessScreen() {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const params = useLocalSearchParams();

  const accounts: VerifyAccountData[] = useMemo(() => {
    try {
      if (params.accounts) {
        return JSON.parse(params.accounts as string);
      }
    } catch (e) {}
    return [];
  }, [params.accounts]);

  // Memoize handler to avoid unnecessary re-renders
  const handleAccountPress = useCallback(
    (account: VerifyAccountData) => {
      showBottomSheet(
        <AccountDetailsSheet
          details={account}
          onCopy={async (text) => navigator.clipboard.writeText(text)}
          onClose={hideBottomSheet}
        />,
        { cornerRadius: "large", snapPoints: ["50%", "85%"] }
      );
    },
    [showBottomSheet, hideBottomSheet]
  );

  const renderItem = useCallback(
    ({ item }: { item: VerifyAccountData }) => (
      <ListTile
        onPress={() => handleAccountPress(item)}
        title={item.accountName}
        subtitle={`${item.accountType} | ${item.accountNumber}`}
        containerClassName="bg-white border border-secondary-foreground/10 rounded-xl mb-3"
        titleClassName="font-interSemiBold text-base text-grey-900"
        subtitleClassName="text-xs text-grey-500"
      />
    ),
    [handleAccountPress]
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      <ScrollView className="flex-1 px-5">
        <Header title="Accounts Linked" />
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.accountNumber}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text className="mt-10 text-center text-grey-500">
              No accounts found.
            </Text>
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

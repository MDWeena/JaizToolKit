import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/shared/back-button";
import { Header } from "@/components/shared/header";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import type { VerifyAccountData } from "@/types/api";

import { ListTile } from "@/components/shared/list-tile";
import { Button } from "@/components/ui";
import { Text } from "@/components/ui/Text";
import { AccountDetailsSheet } from "./components/account-details-sheet";
import { useAccountStore } from "./hooks/useAccountStore";

export default function AccountVerifySuccessScreen() {
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const router = useRouter();
  const { verifiedAccounts: accounts, clearAccounts } = useAccountStore();

  // prevent stale data on re-entry
  useEffect(() => {
    return () => clearAccounts();
  }, [clearAccounts]);

  const handleAccountPress = useCallback(
    (account: VerifyAccountData) => {
      showBottomSheet(
        <AccountDetailsSheet details={account} onClose={hideBottomSheet} />,
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
      <FlatList
        data={accounts || []}
        keyExtractor={(item) => item.accountNumber}
        renderItem={renderItem}
        ListHeaderComponent={
          <Header title="Accounts Linked" />
        }
        ListFooterComponent={
          <Button
            size="lg"
            className="mt-4 w-full"
            onPress={() => router.push("/(tabs)/(home)")}
          >
            <Text className="text-sm font-interSemiBold text-primary-foreground">
              Back to Home
            </Text>
          </Button>
        }
        ListEmptyComponent={
          <Text className="mt-10 text-center text-grey-500">
            No accounts found.
          </Text>
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

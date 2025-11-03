import React from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Card, Header, SearchBar, SearchNotFound } from "@/components/shared";
import { accounts } from "@/constants/data";
import { useSearch } from "@/hooks/useSearch";
import { PageItem } from "@/types/page";
import { Ionicons } from "@expo/vector-icons";

const AccountScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredAccounts,
    hasQuery,
    hasResults,
  } = useSearch(accounts);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        {/* Header Section */}
        <Pressable
          hitSlop={20}
          onPress={() =>
            router.canGoBack() && router.dismissAll()
          }
        >
          <Ionicons name="arrow-back" size={25} />
        </Pressable>

        {/* Header Section */}
        <Header title='Accounts' />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search'
        />


        <FlatList<PageItem>
          data={filteredAccounts}
          renderItem={({ item }) => (
            <Card
              className={`borderborder-grey-900 ${item.class} items-start`}
              icon={item.icon}
              text={item.text}
              onPress={() => router.navigate(item.route as Href)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={6}
          ListEmptyComponent={
            hasQuery && !hasResults ? (
              <SearchNotFound
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : null
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

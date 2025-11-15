import React from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";

import { BackButton, Card, Header, SearchBar, SearchNotFound } from "@/components/shared";
import { accounts } from "@/constants/data";
import { useSearch } from "@/hooks/useSearch";
import { PageItem } from "@/types/page";

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
      <BackButton />
      <ScrollView className='flex-1 px-5'>
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
              starredItem={{
                id: item.id,
                text: item.text,
                route: item.route,
                icon: item.icon,
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
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

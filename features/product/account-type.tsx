import React from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Header, ListTile, SearchBar, SearchNotFound } from "@/components/shared";
import { accountTypeData } from "@/constants/data";
import { useSearch } from "@/hooks/useSearch";
import { PageItem } from "@/types/page";


const AccountTypeScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredCategories,
    hasQuery,
    hasResults,
  } = useSearch(accountTypeData);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>

          <Pressable
            hitSlop={20}
            onPress={() =>
              router.canGoBack() && router.dismissAll()
            }
          >
            <Ionicons name="arrow-back" size={25} />
          </Pressable>

        {/* Header Section */}
        <Header title='Product Information' />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search'
        />

        <FlatList<PageItem>
          data={filteredCategories}
          renderItem={({ item }) => (
            <ListTile
              leading={item.icon}
              title={item.text}
              onPress={() => router.navigate(item.route as Href)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          className="rounded-lg bg-grey-0"
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

export default AccountTypeScreen;

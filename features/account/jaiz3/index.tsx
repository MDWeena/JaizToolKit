import React from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from "@/components/shared";
import { Jaiz3AccountData } from "@/constants/data";
import { useSearch } from "@/hooks/useSearch";
import { PageItem } from "@/types/page";

const Jaiz3AccountScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredJaiz3Accounts,
    hasQuery,
    hasResults,
  } = useSearch(Jaiz3AccountData);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <BackButton />
      <ScrollView className='flex-1 px-5'>
        {/* Header Section */}
        <Header title='Jaiz 3 Account' />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search'
        />

        <FlatList<PageItem>
          data={filteredJaiz3Accounts}
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
          className='rounded-lg bg-grey-0 border-grey-200 border'
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

export default Jaiz3AccountScreen;

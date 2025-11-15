import React from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";

import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from "@/components/shared";
import { productsData } from "@/constants/data";
import { useSearch } from "@/hooks/useSearch";
import { PageItem } from "@/types/page";

const ProductScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredCategories,
    hasQuery,
    hasResults,
  } = useSearch(productsData);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      <ScrollView className="flex-1 px-5">
        <Header title="Product Information" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />

        <FlatList<PageItem>
          data={filteredCategories}
          renderItem={({ item }) => (
            <ListTile
              leading={item.icon}
              title={item.text}
              trailing={
                <Ionicons name="chevron-forward" size={26} color="#004081" />
              }
              onPress={() => router.push(item.route as Href)}
              starredItem={{
                id: item.id,
                text: item.text,
                route: item.route,
                icon: item.icon,
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          className="border rounded-lg bg-grey-0 border-grey-200"
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

export default ProductScreen;

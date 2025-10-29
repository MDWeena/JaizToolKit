import React from "react";
import { FlatList, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AutoSlider } from "@/features/home/components/auto-slider";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Header, Card, SearchBar, SearchNotFound } from "@/components/shared";
import { categoriesData } from "@/constants/data";
import Images from "@/constants/Images";
import { useSearch } from "@/hooks/useSearch";

export interface Category {
  id: number;
  text: string;
  icon: React.ReactNode;
  route: string;
  keywords?: string[];
  class?: string;
}

const HomeScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredCategories,
    hasQuery,
    hasResults,
  } = useSearch(categoriesData);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        {/* Header Section */}
        <Header
          profileImage={Images.profileImagePlaceholder}
          userName='Michel'
          userId='64bhfhfb'
          showNotification
        />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search'
        />

        <FlatList<Category>
          data={filteredCategories}
          ListHeaderComponent={
            hasQuery && !hasResults ? (
              <></>
            ) : (
              <Text className='my-4 text-xl font-medium'>Categories</Text>
            )
          }
          renderItem={({ item }) => (
            <Card
              className={`${item.class} items-start`}
              icon={item.icon}
              text={item.text}
              onPress={() => router.push(item.route as Href)}
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

        {hasQuery ? null : (
          <>
            <Text className='my-4 text-xl font-medium'>Updates</Text>
            <AutoSlider height={120} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

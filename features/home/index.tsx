import React, { useEffect } from "react";
import { ScrollView, Text, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, useRouter } from "expo-router";
import { Header } from "@/components/shared/header";
import Images from "@/constants/Images";
import { SearchBar } from "@/components/shared/search-bar";
import { categoriesData } from "@/constants/data";
import { useSearch } from "@/hooks/useSearch";
import { SearchNotFound } from "@/components/shared/search-not-found";
import { Card } from "@/components/shared/card";

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
    <SafeAreaView style={{ paddingTop: 20 }} className='flex-1 bg-background'>
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
              <Text className='mb-5 leading-tight'>Categories</Text>
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

        {/* {hasQuery ? null : (
          <>
            <Text className='mb-5 !leading-tight'>
              Updates
            </Text>
            <View className='mb-5'>
              <FlatList<Slider>
                ref={flatListRef}
                data={slidersData}
                renderItem={renderSliderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
                getItemLayout={(data, index) => ({
                  length: SLIDER_WIDTH,
                  offset: SLIDER_WIDTH * index,
                  index,
                })}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                windowSize={5}
                initialNumToRender={3}
                contentContainerStyle={{ paddingHorizontal: 0 }}
                className='mb-3'
              />

              <FlatList<IndicatorData>
                data={indicatorData}
                renderItem={renderIndicator}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                }}
                style={{ alignSelf: "center" }}
              />
            </View>
          </>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

import { Href, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Text } from '@/components/ui/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, Header, SearchBar, SearchNotFound } from '@/components/shared';
import { categoriesData } from '@/constants/data';
import Images from '@/constants/Images';
import { AutoSlider } from '@/features/home/components/auto-slider';
import { useSearch } from '@/hooks/useSearch';
import { useAuthStore } from '@/store/auth.store';
import { PageItem } from '@/types/page';

const HomeScreen = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredCategories,
    hasQuery,
    hasResults,
  } = useSearch(categoriesData);

  const renderItem = useCallback(
    ({ item }: { item: PageItem }) => (
      <Card
        className={`${item.class} items-start`}
        icon={item.icon}
        text={item.text}
        onPress={() => router.push(item.route as Href)}
      />
    ),
    [router]
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header
          profileImage={Images.profileImagePlaceholder}
          userName={user?.name}
          userId={user?.id}
          showNotification
        />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />

        <FlatList<PageItem>
          data={filteredCategories}
          ListHeaderComponent={
            hasQuery && !hasResults ? (
              <></>
            ) : (
              <Text className="my-4 text-xl font-medium">Categories</Text>
            )
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
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
            <Text className="my-4 text-xl font-medium">Updates</Text>
            <AutoSlider height={120} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { useToast } from '@/components/shared/toast';
import { productsData } from '@/constants/data';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useStarred } from '@/contexts/StarredContext';
import { useSearch } from '@/hooks/useSearch';
import { PageItem } from '@/types/page';

const ProductScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredCategories,
    hasQuery,
    hasResults,
  } = useSearch(productsData);
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { isStarred, toggleStar } = useStarred();
  const { showToast, dismissToast } = useToast();

  const handleProductStarSheet = useCallback(
    (item: PageItem) => {
      showBottomSheet(
        <View>
          <View className="items-center pb-4 mb-4 border-b border-b-secondary-foreground/10">
            <Text className="text-xl font-semibold text-grey-900">
              {item.text}
            </Text>
          </View>
          <ListTile
            containerClassName="border border-secondary-foreground/10 rounded-xl"
            title={
              isStarred(item.id) ? 'Remove from Starred' : 'Add to Starred'
            }
            onPress={() => {
              const starredItem = {
                id: item.id,
                text: item.text,
                route: item.route,
              };
              toggleStar(starredItem as any).then(() => {
                hideBottomSheet();
                // Show toast after adding to starred
                if (!isStarred(item.id)) {
                  showToast({
                    message: 'Added to Starred',
                    linkText: 'See List',
                    onLinkPress: () => {router.push('/(tabs)/starred'); dismissToast();},
                    position: 'bottom',
                  });
                }
              });
            }}
            trailing={
              <Ionicons
                name={isStarred(item.id) ? 'star' : 'star-outline'}
                size={20}
                color={isStarred(item.id) ? '#FFA500' : '#9CA3AF'}
              />
            }
          />
        </View>,
        {
          cornerRadius: 'medium',
          snapPoints: ['20%', '10%'],
        }
      );
    },
    [hideBottomSheet, isStarred, router, showBottomSheet, showToast, toggleStar]
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        <Pressable
          hitSlop={20}
          onPress={() => router.canGoBack() && router.back()}
        >
          <Ionicons name="arrow-back" size={25} />
        </Pressable>

        {/* Header Section */}
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
                <View className="flex-row items-center gap-3">
                  {isStarred(item.id) && (
                    <Ionicons name="star" size={20} color="#FFA500" />
                  )}
                  <Ionicons name="chevron-forward" size={26} color="#004081" />
                </View>
              }
              onPress={() => router.push(item.route as Href)}
              onLongPress={() => handleProductStarSheet(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          className="rounded-lg bg-grey-0 border-grey-200 border"
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

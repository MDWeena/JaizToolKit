import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  LaunchUrlIcon,
  SingleQuickLinkIcon,
} from '@/assets/images/svgs/ressources';
import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { quickLinksData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type QuickLinksFunction = (typeof quickLinksData)[0];

type QuickLinksFunctionItemProps = {
  quickLinksFunction: QuickLinksFunction;
  onPress(route: string): void;
};

const QuickLinksFunctionItem = React.memo<QuickLinksFunctionItemProps>(
  ({ quickLinksFunction, onPress }) => (
    <ListTile
      leading={<SingleQuickLinkIcon width={25} height={25} />}
      title={quickLinksFunction.text}
      onPress={() => onPress(quickLinksFunction.url)}
      trailing={<LaunchUrlIcon />}
      containerClassName="!pb-0"
    />
  )
);
QuickLinksFunctionItem.displayName = 'QuickLinksFunctionItem';

export default function QuickLinksScreen() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredQuickLinks,
    hasQuery,
  } = useSearch(quickLinksData);

  const handleQuickLinksPress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const renderQuickLinksItem: ListRenderItem<QuickLinksFunction> = useCallback(
    ({ item }) => (
      <QuickLinksFunctionItem
        quickLinksFunction={item}
        onPress={handleQuickLinksPress}
      />
    ),
    [handleQuickLinksPress]
  );

  const renderEmptyComponent = useCallback(
    () => (hasQuery ? <SearchNotFound searchQuery={searchQuery} /> : null),
    [hasQuery, searchQuery]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Useful Codes" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 bg-white rounded-lg">
          <FlatList<QuickLinksFunction>
            data={filteredQuickLinks}
            renderItem={renderQuickLinksItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={renderEmptyComponent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={8}
            contentContainerStyle={{ paddingBottom: 0 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LaunchUrlIcon, UnitUserIcon } from '@/assets/images/svgs/ressources';
import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { usefulCodesData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type UsefulCodesFunction = (typeof usefulCodesData)[0];

type UsefulCodesFunctionItemProps = {
  usefulCodesFunction: UsefulCodesFunction;
  onPress(route: string): void;
};

const UsefulCodesFunctionItem = React.memo<UsefulCodesFunctionItemProps>(
  ({ usefulCodesFunction, onPress }) => (
    <ListTile
      leading={<UnitUserIcon width={25} height={25} />}
      title={usefulCodesFunction.text}
      onPress={() => onPress(usefulCodesFunction.url)}
      trailing={<LaunchUrlIcon />}
      containerClassName="!pb-0"
    />
  )
);
UsefulCodesFunctionItem.displayName = 'UsefulCodesFunctionItem';

export default function UsefulCodesScreen() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredUsefulCodes,
    hasQuery,
  } = useSearch(usefulCodesData);

  const handleUsefulCodesPress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const renderUsefulCodesItem: ListRenderItem<UsefulCodesFunction> =
    useCallback(
      ({ item }) => (
        <UsefulCodesFunctionItem
          usefulCodesFunction={item}
          onPress={handleUsefulCodesPress}
        />
      ),
      [handleUsefulCodesPress]
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
        <Header title="Quick Links" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 bg-white rounded-lg">
          <FlatList<UsefulCodesFunction>
            data={filteredUsefulCodes}
            renderItem={renderUsefulCodesItem}
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

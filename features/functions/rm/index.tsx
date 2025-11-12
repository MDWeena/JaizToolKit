import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { rmData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type RMFunction = (typeof rmData)[0];

type RMFunctionItemProps = {
  rmFunction: RMFunction;
  onPress(route: string): void;
};

const RMFunctionItem = React.memo<RMFunctionItemProps>(
  ({ rmFunction, onPress }) => (
    <ListTile
      leading={rmFunction.icon}
      title={rmFunction.text}
      onPress={() => onPress(rmFunction.route)}
    />
  )
);
RMFunctionItem.displayName = 'RMFunctionItem';

export default function RmScreen() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredRm,
    hasQuery,
  } = useSearch(rmData);

  const handleRMPress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const renderRMItem: ListRenderItem<RMFunction> = useCallback(
    ({ item }) => <RMFunctionItem rmFunction={item} onPress={handleRMPress} />,
    [handleRMPress]
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
        <Header title="Relationship Mgmt." />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 bg-white rounded-lg">
          <FlatList<RMFunction>
            data={filteredRm}
            renderItem={renderRMItem}
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

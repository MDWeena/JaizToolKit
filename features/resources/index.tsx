import {
  BackButton,
  Card,
  Header,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resourcesData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type Resource = (typeof resourcesData)[0];

type ResourceCardProps = {
  func: Resource;
  onPress(route: string): void;
};

const ResourceCard = React.memo<ResourceCardProps>(({ func, onPress }) => (
  <Card
    icon={func.icon}
    text={func.text}
    className={func.class}
    onPress={() => onPress(func.route)}
  />
));
ResourceCard.displayName = 'ResourceCard';

const ResourcesScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredResources,
    hasQuery,
  } = useSearch(resourcesData);

  const handleResourcePress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const renderResourceItem: ListRenderItem<Resource> = useCallback(
    ({ item }) => <ResourceCard func={item} onPress={handleResourcePress} />,
    [handleResourcePress]
  );

  const renderEmptyComponent = useCallback(
    () => (hasQuery ? <SearchNotFound searchQuery={searchQuery} /> : null),
    [hasQuery, searchQuery]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <BackButton />

      <ScrollView className="flex-1 px-5">
        <Header title="Resources" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 mt-5">
          <FlatList<Resource>
            data={filteredResources}
            renderItem={renderResourceItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              gap: 8,
            }}
            ListEmptyComponent={renderEmptyComponent}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={8}
            windowSize={10}
            initialNumToRender={6}
            contentContainerStyle={{}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResourcesScreen;

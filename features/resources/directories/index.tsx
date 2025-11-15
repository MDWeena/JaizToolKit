import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  LaunchUrlIcon,
  SingleDirectoryIcon,
} from '@/assets/images/svgs/ressources';
import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { directoriesData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type DirectoriesFunction = (typeof directoriesData)[0];

type DirectoriesFunctionItemProps = {
  directoriesFunction: DirectoriesFunction;
  onPress(route: string, external: boolean): void;
};

const DirectoriesFunctionItem = React.memo<DirectoriesFunctionItemProps>(
  ({ directoriesFunction, onPress }) => (
    <ListTile
      leading={directoriesFunction.icon}
      title={directoriesFunction.text}
      onPress={() =>
        onPress(directoriesFunction.link, directoriesFunction.external || false)
      }
      trailing={directoriesFunction.external ? <LaunchUrlIcon /> : undefined}
      containerClassName="!pb-0"
      starredItem={{ text: directoriesFunction.text, id: directoriesFunction.id, route: directoriesFunction.link, icon: <SingleDirectoryIcon width={25} height={25} /> }}
    />
  )
);
DirectoriesFunctionItem.displayName = 'DirectoriesFunctionItem';

export default function DirectoriesScreen() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredDirectories,
    hasQuery,
  } = useSearch(directoriesData);

  const handleDirectoriesPress = useCallback(
    (route: string, external: boolean) => {
      router.push(route as any);
    },
    [router]
  );

  const renderDirectoriesItem: ListRenderItem<DirectoriesFunction> =
    useCallback(
      ({ item }) => (
        <DirectoriesFunctionItem
          directoriesFunction={item}
          onPress={handleDirectoriesPress}
        />
      ),
      [handleDirectoriesPress]
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
        <Header title="Directories" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 bg-white rounded-lg">
          <FlatList<DirectoriesFunction>
            data={filteredDirectories}
            renderItem={renderDirectoriesItem}
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

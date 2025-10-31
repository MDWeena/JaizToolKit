import { Card, Header, SearchBar, SearchNotFound } from '@/components/shared';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { functionsData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type Function = (typeof functionsData)[0];

type FunctionCardProps = {
  func: Function;
  onPress(route: string): void;
};

const FunctionCard = React.memo<FunctionCardProps>(({ func, onPress }) => (
  <Card icon={func.icon} text={func.text} onPress={() => onPress(func.route)} />
));
FunctionCard.displayName = 'FunctionCard';

const FunctionsScreen = () => {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredFunctions,
    hasQuery,
  } = useSearch(functionsData);

  const handleFunctionPress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const renderFunctionItem: ListRenderItem<Function> = useCallback(
    ({ item }) => <FunctionCard func={item} onPress={handleFunctionPress} />,
    [handleFunctionPress]
  );

  const renderEmptyComponent = useCallback(
    () => (hasQuery ? <SearchNotFound searchQuery={searchQuery} /> : null),
    [hasQuery, searchQuery]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />

      <ScrollView className="flex-1 px-5">
        <Header title="Functions" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 mt-5">
          <FlatList<Function>
            data={filteredFunctions}
            renderItem={renderFunctionItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              columnGap: 16,
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

export default FunctionsScreen;

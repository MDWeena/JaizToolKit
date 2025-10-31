import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Header, ListTile, SearchBar, SearchNotFound } from '@/components/ui';
import { serviceRequestData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';
import { ServiceRequest, ServiceRequestItemProps } from '@/types';

const ServiceRequestItem = React.memo<ServiceRequestItemProps>(
  ({ item, onPress }) => (
    <ListTile
      icon={item.icon}
      text={item.text}
      onPress={() => onPress(item.route)}
    />
  )
);
ServiceRequestItem.displayName = 'ServiceRequestItem';

export default function ServiceRequestScreen() {
  const router = useRouter();
  const { searchQuery, setSearchQuery, filteredItems, hasQuery } =
    useSearch(serviceRequestData);

  const handleItemPress = useCallback(
    (route: string) => {
      router.push(route as any);
    },
    [router]
  );

  const renderServiceItem: ListRenderItem<ServiceRequest> = useCallback(
    ({ item }) => <ServiceRequestItem item={item} onPress={handleItemPress} />,
    [handleItemPress]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Service Requests" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5">
          <FlatList<ServiceRequest>
            data={filteredItems}
            renderItem={renderServiceItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={8}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              hasQuery ? (
                <SearchNotFound
                  searchQuery={searchQuery}
                />
              ) : null
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

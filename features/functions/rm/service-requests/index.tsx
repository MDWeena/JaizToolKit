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
import { serviceRequestData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';

type ServiceRequest = (typeof serviceRequestData)[0];

type ServiceRequestItemProps = {
  item: ServiceRequest;
  onPress: (route: string) => void;
};

const ServiceRequestItem = React.memo<ServiceRequestItemProps>(
  ({ item, onPress }) => (
    <ListTile
      leading={item.icon}
      title={item.text}
      onPress={() => onPress(item.route)}
      starredItem={{ text: item.text, id: item.id, route: item.route, icon: item.icon }}
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
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Service Requests" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <View className="mb-5 bg-white rounded-lg">
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
            contentContainerStyle={{}}
            ListEmptyComponent={
              hasQuery ? <SearchNotFound searchQuery={searchQuery} /> : null
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

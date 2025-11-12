import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BankIcon } from '@/assets/images/svgs/customer-details';
import { LiveIcon, NotLiveIcon } from '@/assets/images/svgs/ressources';
import {
  BackButton,
  Header,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { Text } from '@/components/ui';
import { NIMCCentresData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';

type NIMCCentresFunction = (typeof NIMCCentresData)[0];

type NIMCCentresFunctionItemProps = {
  nimcCentresFunction: NIMCCentresFunction;
};

const NIMCCentresFunctionItem = React.memo<NIMCCentresFunctionItemProps>(
  ({ nimcCentresFunction }) => (
    <View className="border border-gray-300 rounded-lg py-6 px-8 flex flex-row gap-4 mb-4 bg-white">
      <View className="flex-1">
        <View className="flex flex-row gap-2 items-center mb-5">
          <BankIcon width={18} height={18} />
          <Text className="text-[1.1rem]">{nimcCentresFunction.centre}</Text>
        </View>

        <View className="flex flex-row gap-2 items-center">
          <Ionicons name="map" className="!text-primary" size={18} />
          <Text className="text-[1.1rem]">{nimcCentresFunction.location}</Text>
        </View>
      </View>
      <View className="w-[1px] bg-gray-300"></View>
      <View className="flex-1 items-end">
        <View
          className={cn(
            'rounded-lg flex-row gap-2 max-w-fit py-1 px-2 items-center mb-5',
            nimcCentresFunction.live && 'bg-green-600',
            !nimcCentresFunction.live && 'bg-[#EDB500]'
          )}
        >
          {nimcCentresFunction.live ? <LiveIcon /> : <NotLiveIcon />}
          <Text className="text-white">
            {nimcCentresFunction.live ? 'Live' : 'Not Live'}
          </Text>
        </View>

        <View
          className={cn('rounded-lg flex-row gap-1 max-w-fit items-center')}
        >
          <Text>Operation</Text>
          {nimcCentresFunction.operational ? (
            <Ionicons
              name="checkmark-circle"
              className={'!text-green-600'}
              size={20}
            />
          ) : (
            <Ionicons
              name="close-circle"
              className={'!text-red-600'}
              size={20}
            />
          )}
        </View>
      </View>
    </View>
  )
);
NIMCCentresFunctionItem.displayName = 'NIMCCentresFunctionItem';

export default function NIMCCentresScreen() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredNIMCCentres,
    hasQuery,
  } = useSearch(NIMCCentresData, { searchFields: ['centre', 'location'] });

  const renderNIMCCentresItem: ListRenderItem<NIMCCentresFunction> =
    useCallback(
      ({ item }) => <NIMCCentresFunctionItem nimcCentresFunction={item} />,
      []
    );

  const renderEmptyComponent = useCallback(
    () => (hasQuery ? <SearchNotFound searchQuery={searchQuery} /> : null),
    [hasQuery, searchQuery]
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <View className="flex-1 px-5">
        {/* Header Section */}
        <Header title="NIMC Centres" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <FlatList<NIMCCentresFunction>
          data={filteredNIMCCentres}
          renderItem={renderNIMCCentresItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={8}
          contentContainerStyle={{ paddingBottom: 0 }}
        />
      </View>
    </SafeAreaView>
  );
}

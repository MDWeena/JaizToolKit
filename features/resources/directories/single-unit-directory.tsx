import { UnitUserIcon } from '@/assets/images/svgs/ressources';
import {
  BackButton,
  Header,
  ListTile,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { directoryContacts } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Linking, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SingleUnitDirectory = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredDirectories,
    hasQuery,
  } = useSearch(directoryContacts, { searchFields: ['name', 'phone'] });

  const call = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error('Failed to make a call:', err)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />

      <View className="px-5 flex-1">
        <Header title="Aba 1" />
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
        />

        <FlatList
          data={filteredDirectories}
          renderItem={({ item }) => (
            <ListTile
              leading={<UnitUserIcon />}
              title={item.name}
              subtitle={item.phone}
              subtitleClassName="text-[1rem]"
              trailing={
                <Pressable onPress={() => call(item.phone)}>
                  <Ionicons name="call" size={24} className="!text-primary" />
                </Pressable>
              }
            />
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          className="rounded-lg bg-grey-0"
          initialNumToRender={6}
          ListEmptyComponent={
            hasQuery && filteredDirectories?.length === 0 ? (
              <SearchNotFound
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                hideBackButton
                hideResult
              />
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SingleUnitDirectory;

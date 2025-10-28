import { Card, Header, ListTile } from "@/components/shared";
import { productsData } from "@/constants/data";
import { useStarred } from "@/contexts/StarredContext";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ViewMode = "list" | "grid";

const StarredScreen = () => {
  const router = useRouter();
  const { starredItems, loading } = useStarred();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Enrich starred items with icons from productsData
  const starredItemsWithIcons = useMemo(() => {
    return starredItems.map((starredItem) => {
      const productData = productsData.find((p) => p.id === starredItem.id);
      return {
        ...starredItem,
        icon: productData?.icon || <></>,
      };
    });
  }, [starredItems]);

  if (loading) {
    return (
      <SafeAreaView className='flex-1 bg-background'>
        <StatusBar style='auto' />
        <View className='items-center justify-center flex-1'>
          <ActivityIndicator size='large' color='#004081' />
        </View>
      </SafeAreaView>
    );
  }

  if (starredItems.length === 0) {
    return (
      <SafeAreaView style={{ paddingTop: 20 }} className='flex-1 bg-background'>
        <StatusBar style='auto' />
        <ScrollView className='flex-1 px-5'>
          {/* Header with view toggle */}
          <View className='flex-row items-center justify-between mb-4'>
            <Header title='Favorite' />
            <View className='flex-row items-center gap-2 p-1 rounded-lg bg-grey-100'>
              <Pressable onPress={() => setViewMode("list")}>
                <Ionicons
                  name='menu'
                  size={24}
                  color={viewMode === "list" ? "#004081" : "#9CA3AF"}
                />
              </Pressable>
              <Pressable onPress={() => setViewMode("grid")}>
                <Ionicons
                  name='grid'
                  size={24}
                  color={viewMode === "grid" ? "#004081" : "#9CA3AF"}
                />
              </Pressable>
            </View>
          </View>

          {/* Empty state */}
          <View className='items-center justify-center flex-1 py-20'>
            <Ionicons name='star-outline' size={80} color='#D1D5DB' />
            <Text className='mt-4 text-xl font-semibold text-grey-900'>
              No Starred Items
            </Text>
            <Text className='px-10 mt-2 text-sm text-center text-grey-600'>
              Star items to view them here
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ paddingTop: 20 }} className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        {/* Header with view toggle and edit button */}
        <Header title='Favorite' />
        <View className='flex-row items-center justify-between gap-3 mb-6'>
          {/* View Toggle */}
          <View className='flex-row items-center overflow-hidden border rounded-full border-primary-foreground'>
            <Pressable
              onPress={() => setViewMode("list")}
              className={`px-4 py-1.5 ${viewMode === "list" ? "bg-primary-foreground" : ""}`}
            >
              <Feather
                style={{ transform: [{ rotate: "90deg" }] }}
                name='bar-chart-2'
                size={24}
                color='black'
              />
            </Pressable>
            <Pressable
              onPress={() => setViewMode("grid")}
              className={`px-4 py-1.5 ${viewMode === "grid" ? "bg-primary-foreground" : ""}`}
            >
              <Entypo name='grid' size={24} color='black' />
            </Pressable>
          </View>

          {/* Edit Button */}
          <Pressable className='p-2'>
            <MaterialCommunityIcons
              name='square-edit-outline'
              size={24}
              color='black'
              className="!text-primary"
            />
          </Pressable>
        </View>

        {/* Starred Items - List View */}
        {viewMode === "list" ? (
          <FlatList
            key='list-view'
            data={starredItemsWithIcons}
            renderItem={({ item }) => (
              <ListTile
                leading={item.icon}
                title={item.text}
                trailing={<Ionicons name='star' size={20} color='#FFA500' />}
                onPress={() => router.push(item.route as Href)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            className='rounded-lg bg-grey-0'
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={10}
          />
        ) : (
          /* Starred Items - Grid View */
          <FlatList
            key='grid-view'
            data={starredItemsWithIcons}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
            renderItem={({ item }) => (
              <Card
                icon={item.icon}
                text={item.text}
                onPress={() => router.push(item.route as Href)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={6}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StarredScreen;

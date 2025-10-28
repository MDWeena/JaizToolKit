import { Card, Header, ListTile } from "@/components/shared";
import { productsData } from "@/constants/data";
import { useStarred } from "@/contexts/StarredContext";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Href, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useState } from "react";
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
  const { starredItems, loading, toggleStar } = useStarred();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [isEditMode, setIsEditMode] = useState(false);

  // Reset edit mode when navigating away
  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsEditMode(false);
      };
    }, [])
  );

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
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar style="auto" />
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#004081" />
        </View>
      </SafeAreaView>
    );
  }

  if (starredItems.length === 0) {
    return (
      <SafeAreaView style={{ paddingTop: 20 }} className="flex-1 bg-background">
        <StatusBar style="auto" />
        <ScrollView className="flex-1 px-5">
          <Header title="Favorite" />
          <View className="flex-row items-center overflow-hidden border rounded-full border-primary-foreground">
            <Pressable
              onPress={() => setViewMode("list")}
              className={`px-4 py-1.5 ${viewMode === "list" ? "bg-primary-foreground" : ""}`}
            >
              <Feather
                style={{ transform: [{ rotate: "90deg" }] }}
                name="bar-chart-2"
                size={24}
                color="black"
              />
            </Pressable>
            <Pressable
              onPress={() => setViewMode("grid")}
              className={`px-4 py-1.5 ${viewMode === "grid" ? "bg-primary-foreground" : ""}`}
            >
              <Entypo name="grid" size={24} color="black" />
            </Pressable>
          </View>

          {/* Empty state */}
          <View className="items-center justify-center flex-1 py-20">
            <Ionicons name="star-outline" size={80} color="#D1D5DB" />
            <Text className="mt-4 text-xl font-semibold text-grey-900">
              No Starred Items
            </Text>
            <Text className="px-10 mt-2 text-sm text-center text-grey-600">
              Star items to view them here
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ paddingTop: 20 }} className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header with view toggle and edit button */}
        <Header title="Favorite" />
        <View className="flex-row items-center justify-between gap-3 mb-6">
          {/* View Toggle */}
          <View className="flex-row items-center overflow-hidden border rounded-full border-primary-foreground">
            <Pressable
              onPress={() => setViewMode("list")}
              className={`px-4 py-1.5 ${viewMode === "list" ? "bg-primary-foreground" : ""}`}
            >
              <Feather
                style={{ transform: [{ rotate: "90deg" }] }}
                name="bar-chart-2"
                size={24}
                color="black"
              />
            </Pressable>
            <Pressable
              onPress={() => setViewMode("grid")}
              className={`px-4 py-1.5 ${viewMode === "grid" ? "bg-primary-foreground" : ""}`}
            >
              <Entypo name="grid" size={24} color="black" />
            </Pressable>
          </View>

          {/* Edit Button */}
          <Pressable className="p-2" onPress={() => setIsEditMode(!isEditMode)}>
            <MaterialCommunityIcons
              name={isEditMode ? "close" : "square-edit-outline"}
              size={24}
              color="black"
              className="!text-primary"
            />
          </Pressable>
        </View>

        {/* Starred Items - List View */}
        {viewMode === "list" ? (
          <FlatList
            key="list-view"
            data={starredItemsWithIcons}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between mb-2">
                <ListTile
                  leading={item.icon}
                  title={item.text}
                  trailing={
                    isEditMode ? (
                      <Pressable
                        onPress={() => toggleStar(item)}
                        className="ml-2"
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={20}
                          color="#EF4444"
                        />
                      </Pressable>
                    ) : (
                      <Ionicons name="star" size={20} color="#FFA500" />
                    )
                  }
                  onPress={() => !isEditMode && router.push(item.route as Href)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            className="rounded-lg bg-grey-0"
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={10}
          />
        ) : (
          /* Starred Items - Grid View */
          <FlatList
            key="grid-view"
            data={starredItemsWithIcons}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
            renderItem={({ item }) => (
              <View className="relative">
                <Card
                  icon={item.icon}
                  text={item.text}
                  onPress={() => !isEditMode && router.push(item.route as Href)}
                />
                {isEditMode && (
                  <Pressable
                    onPress={() => toggleStar(item)}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5"
                  >
                    <MaterialCommunityIcons
                      name="delete"
                      size={16}
                      color="white"
                    />
                  </Pressable>
                )}
              </View>
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

import { Feather, Ionicons } from "@expo/vector-icons";
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

import { EditIcon, GridIcon } from "@/assets/images/svgs/favorite";
import { Card, Header, ListTile } from "@/components/shared";
import { productsData } from "@/constants/data";
import { useStarred } from "@/contexts/StarredContext";
import { PageItem } from "@/types/page";
import { cn } from "@/lib/utils";

type ViewMode = "list" | "grid";

type StarredListItem = Pick<PageItem, "id" | "text" | "route"> & {
  icon: React.ReactNode;
};

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
  const starredItemsWithIcons = useMemo<StarredListItem[]>(() => {
    return starredItems.map((starredItem) => {
      const productData = productsData.find((p) => p.id === starredItem.id);
      return {
        id: starredItem.id,
        text: starredItem.text,
        route: starredItem.route,
        icon: productData?.icon || <></>,
      };
    });
  }, [starredItems]);

  const onItemPress = useCallback(
    (route?: Href) => {
      if (!route || isEditMode) return;
      router.navigate(route);
    },
    [isEditMode, router]
  );

  const renderTrailing = useCallback(
    (item: StarredListItem) => {
      if (isEditMode) {
        return (
          <Pressable onPress={() => toggleStar(item)} className="ml-2">
            <Feather name="trash" size={20} color="#EF4444" />
          </Pressable>
        );
      }
      return <Ionicons name="star" size={20} color="#FFA500" />;
    },
    [isEditMode, toggleStar]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: StarredListItem; index: number }) => {
      if (viewMode === "list") {
        return (
          <View className="flex-row items-center justify-between mt-2">
            <ListTile
              leading={item.icon}
              title={item.text}
              trailing={renderTrailing(item)}
              onPress={() => onItemPress(item.route as Href | undefined)}
            />
          </View>
        );
      }

      return (
        <View className="relative ">
          <Card
            icon={item.icon}
            text={item.text}
            onPress={() => onItemPress(item.route as Href | undefined)}
            className="flex-1"
          />
          {isEditMode && (
            <Pressable
              onPress={() => toggleStar(item)}
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5"
            >
              <Feather name="trash" size={16} color="white" />
            </Pressable>
          )}
        </View>
      );
    },
    [isEditMode, onItemPress, renderTrailing, toggleStar, viewMode]
  );

  // unified item renderer, used by both list and grid views

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

  return (
    <SafeAreaView style={{ paddingTop: 20 }} className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header with view toggle and edit button */}
        <Header title="Favorite" />
        {starredItemsWithIcons.length > 0 && (
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
                <GridIcon />
              </Pressable>
            </View>

            {/* Edit Button */}
            <Pressable
              className="p-2"
              onPress={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? <Text>close</Text> : <EditIcon />}
            </Pressable>
          </View>
        )}
        {starredItemsWithIcons.length === 0 ? (
          <View>
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
          </View>
        ) : viewMode === "list" ? (
          <FlatList
            key="list-view"
            data={starredItemsWithIcons}
            renderItem={renderItem}
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
          <FlatList
            key="grid-view"
            data={starredItemsWithIcons}
            numColumns={2}
            // columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
            renderItem={renderItem}
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

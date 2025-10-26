import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import Colors from "@/constants/Colors";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import LogoutBottomSheet from "@/feaatures/logout";
import {
  HomeIcon,
  LogoutIcon,
  SettingsIcon,
  FavoriteIcon,
} from "@/assets/images/svgs/tab-icons";

export default function TabLayout() {
  const { colorScheme } = useTheme();
  const { showBottomSheet } = useBottomSheet();
  const activeColor = Colors[colorScheme].tint;
  const inactiveColor = Colors[colorScheme].tabIconDefault;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 16,
          fontWeight: "600",
          marginTop: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {
            height: 100,
            paddingBottom: 10,
            paddingTop: 10,
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          },
        }),
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='starred'
        options={{
          title: "Starred",
          tabBarIcon: ({ color }) => (
            <FavoriteIcon width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SettingsIcon width={28} height={28} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='logout'
        options={{
          title: "Logout",
          tabBarIcon: ({ color }) => (
            <LogoutIcon width={28} height={28} fill={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            showBottomSheet(<LogoutBottomSheet />);
          },
        }}
      />
    </Tabs>
  );
}

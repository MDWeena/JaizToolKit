import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/shared/header";
import { ListTile } from "@/components/shared/list-tile";
import { Button } from "@/components/ui/button";
import Images from "@/constants/Images";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSelector: React.FC<{
  currentTheme: "system" | "light" | "dark";
  onApply: (theme: "system" | "light" | "dark") => void;
  onClose: () => void;
}> = ({ currentTheme, onApply, onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState<
    "system" | "light" | "dark"
  >(currentTheme);

  const handleApply = () => {
    onApply(selectedTheme);
    onClose();
  };

  return (
    <View className="px-2 pt-2 pb-6">
      <View className="items-center mb-4">
        <Text className="text-xl font-semibold text-grey-900">Choose Theme</Text>
      </View>
      <View className="gap-4 mb-6">
        {(["system", "light", "dark"] as const).map((option) => (
          <Button
            key={option}
            variant="outline"
            selected={selectedTheme === option}
            onPress={() => setSelectedTheme(option)}
            className="h-16"
          >
            <View className="flex-row items-center justify-between w-full px-4">
              <Text className="text-lg font-bold text-grey-900">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
              {selectedTheme === option ? (
                <View className="items-center justify-center w-6 h-6 border-2 rounded-full border-primary">
                  <View className="w-3 h-3 rounded-full bg-primary" />
                </View>
              ) : (
                <View className="items-center justify-center w-6 h-6 border-2 rounded-full border-grey-200">
                  <View className="w-3 h-3 rounded-full bg-grey-200" />
                </View>
              )}
            </View>
          </Button>
        ))}
      </View>
      <Button variant="default" className="h-14 rounded-2xl" onPress={handleApply}>
        <Text className="text-lg font-semibold text-white">Apply</Text>
      </Button>
    </View>
  );
};

const SettingsScreen = () => {
  const [enabled, setEnabled] = useState(false);
  const { theme: appTheme, setTheme: setAppTheme } = useTheme();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  const handleThemeSheet = () => {
    showBottomSheet(
      <ThemeSelector
        currentTheme={appTheme}
        onApply={(newTheme) => {
          setAppTheme(newTheme);
          hideBottomSheet();
        }}
        onClose={hideBottomSheet}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={{ paddingTop: 20 }} className="flex-1 bg-background">
        <StatusBar style="auto" />
        <ScrollView className="flex-1 px-5">
          <Header title="Settings" />
          <Header
            title="Michael"
            subtitle="Michael@example.com"
            userNameClassName="text-xl"
            profileImage={Images.profileImagePlaceholder}
          />
          <View className="bg-grey-0">
            <ListTile
              title="Enable Biometrics"
              leading={<Feather name="bell" size={24} />}
              accessories={[
                {
                  component: (
                    <ListTile.Switch value={enabled} onValueChange={setEnabled} />
                  ),
                  position: "end",
                  onPress: () => setEnabled(!enabled),
                },
              ]}
            />
            <ListTile
              title="Theme"
              leading={<Feather name="bell" size={24} />}
              trailing={
                <View className="flex-row items-center">
                  <Text>
                    {appTheme.charAt(0).toUpperCase() + appTheme.slice(1)}
                  </Text>
                  <Feather name="chevron-right" size={26} color="#D94E05" />
                </View>
              }
              onPress={handleThemeSheet}
            />
            <ListTile
              title="Help and Support"
              leading={<Feather name="bell" size={24} />}
              trailing={
                <Feather name="chevron-right" size={26} color="#D94E05" />
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SettingsScreen;

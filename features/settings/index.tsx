import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { Header } from "@/components/shared/header";
import { ListTile } from "@/components/shared/list-tile";
import { Button } from "@/components/ui/button";
import Images from "@/constants/Images";
import { useBottomSheet } from "@/contexts/BottomSheetContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "@/components/ui/Text";
import { BiometricsIcon, HelpIcon, ThemeIcon } from "@/assets/images/svgs/settings";
import { useAuthStore } from "@/store/auth.store";
import { navigateToWebView } from "@/utils/navigateToWebView";

const HELP_SUPPORT_URL = 'https://jaizbankplc.com/contact-us';

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
    <View className='px-2 pt-2 pb-6'>
      <View className='items-center mb-4'>
        <Text className='text-xl font-semibold text-grey-900'>
          Choose Theme
        </Text>
      </View>
      <View className='gap-4 mb-6'>
        {(["system", "light", "dark"] as const).map((option) => (
          <Button
            key={option}
            variant='outline'
            selected={selectedTheme === option}
            onPress={() => setSelectedTheme(option)}
            className='h-16'
          >
            <View className='flex-row items-center justify-between w-full px-4'>
              <Text className='text-lg font-bold text-text'>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
              {selectedTheme === option ? (
                <View className='items-center justify-center w-6 h-6 border-2 rounded-full border-primary'>
                  <View className='w-3 h-3 rounded-full bg-primary' />
                </View>
              ) : (
                <View className='items-center justify-center w-6 h-6 border-2 rounded-full border-grey-200'>
                  <View className='w-3 h-3 rounded-full bg-grey-200' />
                </View>
              )}
            </View>
          </Button>
        ))}
      </View>
      <Button
        variant='default'
        className='h-14 rounded-2xl'
        onPress={handleApply}
      >
        <Text className='text-lg font-interSemiBold text-text-foreground'>Apply</Text>
      </Button>
    </View>
  );
};

const SettingsScreen = () => {
  const [enabled, setEnabled] = useState(false);
  const { user } = useAuthStore();
  const { theme: appTheme, setTheme: setAppTheme } = useTheme();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const router = useRouter();
  const handleThemeSheet = () => {
    showBottomSheet(
      <ThemeSelector
        currentTheme={appTheme}
        onApply={(newTheme) => {
          setAppTheme(newTheme);
          hideBottomSheet();
        }}
        onClose={hideBottomSheet}
      />,
      { cornerRadius: "small" }
    );
  };

  return (
    <>
      <SafeAreaView className='flex-1 bg-background'>
        <StatusBar style='auto' />
        <ScrollView className='flex-1 px-5'>
          <Header title='Settings' />
          <Header
            title={user?.name ?? ''}
            subtitle={user?.email ?? ''}
            userNameClassName='text-xl'
            profileImage={Images.profileImagePlaceholder}
          />
          <View className='border rounded-lg bg-grey-0 border-grey-200'>
            <ListTile
              title='Enable Biometrics'
              leading={<BiometricsIcon />}
              accessories={[
                {
                  component: (
                    <ListTile.Switch
                      value={enabled}
                      onValueChange={setEnabled}
                    />
                  ),
                  position: "end",
                  onPress: () => setEnabled(!enabled),
                },
              ]}
            />
            {/* <ListTile
              title='Theme'
              leading={<ThemeIcon />}
              trailing={
                <View className='flex-row items-center'>
                  <Text>
                    {appTheme.charAt(0).toUpperCase() + appTheme.slice(1)}
                  </Text>
                  <Feather name='chevron-right' size={26} color='#004081' />
                </View>
              }
              onPress={handleThemeSheet}
            /> */}
            <ListTile
              title='Help and Support'
              leading={<HelpIcon />}
              onPress={() => navigateToWebView(router, {
                url: HELP_SUPPORT_URL,
                title: 'Help and Support',
                loadingText: 'Loading Jaiz Bank Help and Support...',
                errorTitle: 'Failed to load help and support.',
                errorMessage: 'Please check your internet connection or try again later.',
              })}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SettingsScreen;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../Header';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ paddingTop: 20 }} className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        <Header title="Settings" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

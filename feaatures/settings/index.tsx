import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/header";
import Images from "@/constants/Images";
import { ListTile } from "@/components/shared/list-tile";
import { Feather } from "@expo/vector-icons";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ paddingTop: 20 }} className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        <Header title='Settings' />
        <Header
          title='Michael'
          subtitle='Michael@example.com'
          userNameClassName='text-xl'
          profileImage={Images.profileImagePlaceholder}
        />
        <View className='bg-grey-0'>
          <ListTile
            title='Share'
            trailing={<Feather name='share-2' size={24} color='#007AFF' />}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

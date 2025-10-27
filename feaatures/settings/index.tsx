import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/shared/header";
import Images from "@/constants/Images";
import { ListTile } from "@/components/shared/list-tile";
import { Feather } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [enabled, setEnabled] = useState(false);
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
            title='Enable Biometrics'
            leading={<Feather name='bell' size={24} />}
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
            title='Theme'
            leading={<Feather name='bell' size={24} />}
            trailing={
              <View className='flex-row items-center'>
                <Text>System</Text>
                <Feather name='chevron-right' size={26} color='#D94E05' />
              </View>
            }
          />
          <ListTile
            title='Help and Support'
            leading={<Feather name='bell' size={24} />}
            trailing={
              <Feather name='chevron-right' size={26} color='#D94E05' />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

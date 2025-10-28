import React from "react";
import { FlatList, Pressable, ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "@/components/shared/header";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { teenAccountData } from "@/constants/data";

interface TeenAccount {
  id: number;
  section: string;
  content: string[];
  icon: React.ReactNode;
}

const TeensAccountsScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <ScrollView className='flex-1 px-5'>
        <Pressable
          hitSlop={20}
          onPress={() => router.canGoBack() && router.dismissAll()}
        >
          <Ionicons name='arrow-back' size={25} />
        </Pressable>

        {/* Header Section */}
        <Header title='Teens Account' />
        <FlatList<TeenAccount>
          data={teenAccountData}
          renderItem={({ item }) => (
            <Collapsible className='mb-3'>
              <CollapsibleTrigger className='bg-white' iconLeft={item.icon}>
                <Text className='text-lg left text-'>{item.section}</Text>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 bg-white">
                <Text className='text-sm leading-normal text-secondary-foreground'>
                  {item.content.flat()}
                </Text>
              </CollapsibleContent>
            </Collapsible>
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={6}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeensAccountsScreen;

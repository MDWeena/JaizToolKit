import React from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Header } from "@/components/shared/header";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { jaizDomicilliaryAccountData } from "./data";
import { PageSection } from "@/types/page";

const DomicilliaryAccountScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Back Button */}
        <Pressable
          hitSlop={20}
          className="mb-5"
          onPress={() => router.canGoBack() && router.back()}
        >
          <Ionicons name="arrow-back" size={25} />
        </Pressable>

        {/* Header Section */}
        <Header title="Jaiz Domicilliary Account" />

        {/* Tier List */}
        <FlatList<PageSection>
          data={jaizDomicilliaryAccountData}
          renderItem={({ item }) => (
            <Collapsible className="mb-3">
              <CollapsibleTrigger className="bg-white" iconLeft={item.icon}>
                <Text className="text-lg font-semibold">{item.section}</Text>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-5 pb-5 bg-white">
                {item.content.map((list, index) => (
                  <View key={index} className="flex-row items-start mb-1">
                    {/* Dot bullet */}
                    <Text className="text-lg leading-snug mr-2">•</Text>

                    {/* List text */}
                    <Text className="flex-1 text-sm leading-normal text-secondary-foreground">
                      {list}
                    </Text>
                  </View>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={6}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DomicilliaryAccountScreen;

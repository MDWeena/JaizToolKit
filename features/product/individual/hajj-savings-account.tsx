import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton, Header } from "@/components/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PageSection } from "@/types/page";
import { hajjSavingsAccountData } from "../data";

const HajjSavingsAccountScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      <ScrollView className="flex-1 px-5">
        <Header title="Hajj Savings Account" />
        <FlatList<PageSection>
          data={hajjSavingsAccountData}
          renderItem={({ item }) => (
            <Collapsible className="mb-3">
              <CollapsibleTrigger className="bg-white" iconLeft={item.icon}>
                <Text className="text-lg font-interSemiBold">{item.section}</Text>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-5 pb-5 bg-white">
                {item.content.map((list, index) => (
                  <View key={index} className="flex-row items-start mb-1">
                    <Text className="mr-2 text-lg leading-snug">•</Text>
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

export default HajjSavingsAccountScreen;

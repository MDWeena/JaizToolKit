import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header, BackButton } from "@/components/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { japsaTermDepositData } from "./data";
import { PageSection } from "@/types/page";

const JapsaTermDepositScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <BackButton />
      <ScrollView className="flex-1 px-5">
        <Header title="Japsa Term Deposit" />
        <FlatList<PageSection>
          data={japsaTermDepositData}
          renderItem={({ item }) => (
            <Collapsible className="mb-3">
              <CollapsibleTrigger className="bg-white" iconLeft={item.icon}>
                <Text className="text-lg font-semibold">{item.section}</Text>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-5 pb-5 bg-white">
                {item.content.map((list, index) => (
                  <View key={index} className="flex-row items-start mb-1">
                    <Text className="text-lg leading-snug mr-2">•</Text>
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

export default JapsaTermDepositScreen;

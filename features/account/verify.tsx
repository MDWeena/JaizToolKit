import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab";
import { TextField } from "@/components/ui/input";
import { Header } from "@/components/shared";
import { KeyboardAvoidingView, Platform, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("phone-number");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleVerify = async () => {
    setIsLoading(true);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);

    // Navigate to officer details page
    router.push("/(tabs)/(home)");
  };
  return (
    <SafeAreaView className='flex-1 bg-background'>
      <StatusBar style='auto' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          className='flex-1 px-5'
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'
        >
          {/* Header Section */}
          <Pressable
            hitSlop={20}
            onPress={() => router.canGoBack() && router.dismissAll()}
          >
            <Ionicons name='arrow-back' size={25} />
          </Pressable>
          {/* Header Section */}
          <Header title='Verify Account' />
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
          >
            <TabsList className=''>
              <TabsTrigger value='phone-number' className='flex-1'>
                Phone Number
              </TabsTrigger>
              <TabsTrigger value='name' className='flex-1'>
                Name
              </TabsTrigger>
            </TabsList>
            <TabsContent value='phone-number'>
              <TextField
                className='!mt-3 w-full'
                InputProps={{
                  placeholder: "Phone Number",
                  textContentType: "telephoneNumber",
                  keyboardType: "phone-pad",
                  inputMode: "tel",
                }}
              />
              <Button
                onPress={handleVerify}
                size='lg'
                className='mt-10'
                disabled={isLoading}
              >
                <Text className="text-sm font-semibold text-primary-foreground">{isLoading ? "Verifying..." : "Verify"}</Text>
              </Button>
            </TabsContent>
            <TabsContent value='name'>
              <TextField
                className='!mt-5 w-full'
                InputProps={{
                  placeholder: "Account Name",
                  textContentType: "name",
                }}
              />
              <Button
                onPress={handleVerify}
                size='lg'
                className='mt-10'
                disabled={isLoading}
              >
                <Text className="text-sm font-semibold text-primary-foreground">{isLoading ? "Verifying..." : "Verify"}</Text>
              </Button>
            </TabsContent>
          </Tabs>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

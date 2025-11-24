import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton, Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { Text } from 'react-native';

export default function LoginInRequestScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('customer-name');
  const [isLoading, setIsLoading] = React.useState(false);
  const { showBottomSheet } = useBottomSheet();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Log in Detail Request" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="customer-name" className="flex-1">
              <Text>Customer Name</Text>
            </TabsTrigger>
            <TabsTrigger value="access-code" className="flex-1">
              <Text>Access Code</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="customer-name">
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Customer Name',
              }}
            />

            <Button className="mt-8 !min-w-full" disabled={isLoading}>
              Search
            </Button>
          </TabsContent>
          <TabsContent className="gap-5" value="access-code">
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Access Code',
              }}
            />

            <Button className="mt-8 !min-w-full" disabled={isLoading}>
              Search
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

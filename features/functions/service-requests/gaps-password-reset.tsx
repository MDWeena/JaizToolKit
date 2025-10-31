import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '@/components/common/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/button/tabs';
import TextField from '@/components/common/inputs/text-field';
import { ThemedText } from '@/components/common/text';
import { Header } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function GapsPasswordResetScreen() {
  const [activeTab, setActiveTab] = React.useState('customer-phone');

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Reset GAPS Password" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full bg-white">
            <TabsTrigger value="customer-phone" className="flex-1">
              <ThemedText
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'customer-phone'
                    ? '!text-primary'
                    : '!text-darkGray'
                )}
              >
                Customer Name
              </ThemedText>
            </TabsTrigger>
            <TabsTrigger value="access-code" className="flex-1">
              <ThemedText
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'access-code'
                    ? '!text-primary'
                    : '!text-darkGray'
                )}
              >
                Access Code
              </ThemedText>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="customer-phone">
            <TextField
              className="!mt-5 w-full"
              label="Customer Name"
              InputProps={{
                placeholder: 'Enter Customer Name',
              }}
            />

            <Button size="large" className="mt-12 !min-w-full" loading={false}>
              Search
            </Button>
          </TabsContent>
          <TabsContent value="access-code">
            <TextField
              className="!mt-5 w-full"
              label="Access Code"
              InputProps={{
                placeholder: 'Enter Access Code',
              }}
            />
            <Button size="large" className="mt-12 !min-w-full" loading={false}>
              Search
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

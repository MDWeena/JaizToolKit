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
import { BalanceSheet } from './balance-sheet';
import { CustomerDetailsSheet } from './details-sheet';

export default function CustomerDetailsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('balance');
  const [isLoading, setIsLoading] = React.useState(false);

  const { showBottomSheet, hideBottomSheet } = useBottomSheet();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="View Customer Details" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="balance" className="flex-1">
              <Text>Balance</Text>
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              <Text>Details</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="balance">
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Name',
                editable: false,
              }}
            />
            <Button
              onPress={() =>
                showBottomSheet(<BalanceSheet onClose={hideBottomSheet} />)
              }
              className="mt-12 !min-w-full"
              disabled={isLoading}
            >
              Search
            </Button>
          </TabsContent>
          <TabsContent value="details">
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Account Name',
                editable: false,
              }}
            />
            <Button
              onPress={() =>
                showBottomSheet(
                  <CustomerDetailsSheet onClose={hideBottomSheet} />
                )
              }
              className="mt-12 !min-w-full"
              disabled={isLoading}
            >
              Search
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

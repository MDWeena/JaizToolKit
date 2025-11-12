import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton, Header } from '@/components/shared';
import { DatePicker } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/input';
import SuccessSheet from '@/components/ui/success-sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { cn } from '@/lib/utils';
import { Text } from 'react-native';

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('statement');
  const [isLoading, setIsLoading] = React.useState(false);
  const { showBottomSheet } = useBottomSheet();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="View Transactions" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full bg-white">
            <TabsTrigger value="statement" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'statement' ? '!text-primary' : '!text-darkGray'
                )}
              >
                Statement
              </Text>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'history' ? '!text-primary' : '!text-darkGray'
                )}
              >
                History
              </Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="statement">
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Account Name',
                editable: false,
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Period',
              }}
            />

            <DatePicker
              value={new Date()}
              onChange={(date) => {}}
              placeholder="Start Date"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
            />

            <DatePicker
              value={new Date()}
              onChange={(date) => {}}
              placeholder="End Date"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
            />

            <Button
              onPress={() =>
                showBottomSheet(
                  <SuccessSheet message="Your account statement has been sent to mic******@gmail.com" />
                )
              }
              className="mt-12 !min-w-full"
              disabled={isLoading}
            >
              Send Statement
            </Button>
          </TabsContent>
          <TabsContent value="history">
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
            <TextField
              className="!mt-5 w-full"
              InputProps={{
                placeholder: 'Period',
              }}
            />
            <Button
              onPress={() => router.push('/functions/rm/transactions/history')}
              className="mt-12 !min-w-full"
              disabled={isLoading}
            >
              View Transactions
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

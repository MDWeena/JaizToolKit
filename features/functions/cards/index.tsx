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

export default function LinkingScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('link-card');
  const { showBottomSheet } = useBottomSheet();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Card" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full bg-white">
            <TabsTrigger value="link-card" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'link-card' ? '!text-primary' : '!text-darkGray'
                )}
              >
                Link Card
              </Text>
            </TabsTrigger>
            <TabsTrigger value="resend-pin" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'resend-pin'
                    ? '!text-primary'
                    : '!text-darkGray'
                )}
              >
                Resend Pin
              </Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="link-card">
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
                placeholder: 'Card Number',
                editable: true,
              }}
            />
            <DatePicker
              value={undefined}
              onChange={(date) => {}}
              placeholder="Card Expiry Date"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
            />

            <Button
              className="mt-12 !min-w-full"
              onPress={() =>
                showBottomSheet(
                  <SuccessSheet message="Your card has been linked to your account successfully." />
                )
              }
            >
              Link Card
            </Button>
          </TabsContent>
          <TabsContent className="gap-5" value="resend-pin">
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

            <Button
              className="mt-12 !min-w-full"
              onPress={() =>
                showBottomSheet(
                  <SuccessSheet message="Pin sent successfully to 090******81" />
                )
              }
            >
              Send Pin
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

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
import { Text } from 'react-native';

export default function LinkingScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('bvn');
  const [isLoading, setIsLoading] = React.useState(false);
  const { showBottomSheet } = useBottomSheet();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Link BVN/NIN" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="bvn" className="flex-1">
              <Text>BVN</Text>
            </TabsTrigger>
            <TabsTrigger value="nin" className="flex-1">
              <Text>NIN</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="bvn">
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />

            <DatePicker
              value={undefined}
              onChange={(date) => {}}
              placeholder="Date of Birth"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
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
                placeholder: 'Phone Number',
                editable: false,
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'BVN',
                keyboardType: 'numeric',
              }}
            />

            <Button
              className="mt-12 !min-w-full"
              onPress={() =>
                showBottomSheet(
                  <SuccessSheet message="Your BVN has been linked to your account successfully." />
                )
              }
            >
              Link BVN
            </Button>
          </TabsContent>
          <TabsContent className="gap-5" value="nin">
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Account Number',
              }}
            />
            <DatePicker
              value={undefined}
              onChange={(date) => {}}
              placeholder="Date of Birth"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
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
                placeholder: 'Phone Number',
                editable: false,
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'NIN',
                keyboardType: 'numeric',
              }}
            />
            <Button
              className="mt-12 !min-w-full"
              onPress={() =>
                showBottomSheet(
                  <SuccessSheet message="Your NIN has been linked to your account successfully." />
                )
              }
            >
              Link NIN
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

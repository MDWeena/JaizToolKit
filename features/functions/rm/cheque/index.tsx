import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton, Header } from '@/components/shared';
import { DatePicker } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tab';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { cn } from '@/lib/utils';
import { Text } from 'react-native';
import DeleteChequeSheet from './delete-cheque-sheet';

export default function ChequeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState('confirm');
  const [isLoading, setIsLoading] = React.useState(false);
  const { showBottomSheet } = useBottomSheet();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Confirm/Delete Cheque" />
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full bg-white">
            <TabsTrigger value="confirm" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'confirm' ? '!text-primary' : '!text-darkGray'
                )}
              >
                Confirm
              </Text>
            </TabsTrigger>
            <TabsTrigger value="delete" className="flex-1">
              <Text
                className={cn(
                  '!text-primary !font-medium',
                  activeTab === 'delete' ? '!text-primary' : '!text-darkGray'
                )}
              >
                Delete
              </Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent className="gap-5" value="confirm">
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
                placeholder: 'Cheque Number',
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Amount',
                keyboardType: 'numeric',
              }}
            />

            <DatePicker
              value={undefined}
              onChange={(date) => {}}
              placeholder="Cheque Date"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Beneficiary Name',
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Remarks',
              }}
            />

            <Button className="mt-12 !min-w-full" disabled={isLoading}>
              Confirm
            </Button>
          </TabsContent>
          <TabsContent className="gap-5" value="delete">
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
                placeholder: 'Cheque Number',
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Amount',
                keyboardType: 'numeric',
              }}
            />

            <DatePicker
              value={undefined}
              onChange={(date) => {}}
              placeholder="Cheque Date"
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 100))
              }
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Beneficiary Name',
              }}
            />
            <TextField
              className="w-full"
              InputProps={{
                placeholder: 'Activation Status',
              }}
            />

            <Button
              className="mt-12 !min-w-full"
              onPress={() => showBottomSheet(<DeleteChequeSheet />)}
            >
              Delete
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}

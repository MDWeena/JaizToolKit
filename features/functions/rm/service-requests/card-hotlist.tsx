import { BackButton, Header } from '@/components/shared';
import { DatePicker } from '@/components/ui';
import { Button } from '@/components/ui/button';
import CustomSelect from '@/components/ui/custom-select';
import { TextField } from '@/components/ui/input';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CardHotlistScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <BackButton />
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Card Hotlist" />
        <TextField
          className="!mt-5 w-full"
          InputProps={{
            placeholder: 'Account Number',
          }}
        />
        <DatePicker
          className="mt-5"
          value={undefined}
          onChange={(date) => {}}
          placeholder="Date of Birth"
          maximumDate={new Date()}
          minimumDate={
            new Date(new Date().setFullYear(new Date().getFullYear() - 100))
          }
        />

        <TextField
          className="!mt-5 w-full"
          InputProps={{
            placeholder: 'Account Name',
            editable: false,
          }}
        />

        <CustomSelect
          className="!mt-5 w-full"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          placeholder="Card Type"
        />

        <CustomSelect
          className="!mt-5 w-full"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          placeholder="Reason"
        />

        <Button className="!mt-12">Hotlist Card</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardHotlistScreen;

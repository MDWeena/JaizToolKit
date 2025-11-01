import { Header } from '@/components/shared';
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
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Card Hotlist" />
        <TextField
          className="!mt-5 w-full"
          label="Account Number"
          InputProps={{
            placeholder: 'Enter NUBAN',
          }}
        />
        <TextField
          className="!mt-5 w-full"
          label="Account Name"
          InputProps={{
            placeholder: 'MICHAEL GWENDOLYN',
            editable: false,
          }}
        />

        <CustomSelect
          className="!mt-5 w-full"
          label="Card Type"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          placeholder="Select Card"
        />

        <CustomSelect
          className="!mt-5 w-full"
          label="Reason"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          placeholder="Select Reason"
        />

        <Button className="!mt-12">Hotlist Card</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardHotlistScreen;

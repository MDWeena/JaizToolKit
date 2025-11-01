import { Header } from '@/components/shared';
import { Button } from '@/components/ui/button';
import CustomSelect from '@/components/ui/custom-select';
import { TextField } from '@/components/ui/input';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestTrackerScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Request Tracker" />
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

        <CustomSelect
          className="!mt-5 w-full"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          placeholder="Request Type"
        />

        <Button className="!mt-12">Search</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestTrackerScreen;

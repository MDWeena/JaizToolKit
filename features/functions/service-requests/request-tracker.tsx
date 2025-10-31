import Button from '@/components/common/button';
import CustomSelect from '@/components/common/inputs/custom-select';
import TextField from '@/components/common/inputs/text-field';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../Header';

const RequestTrackerScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <ScrollView className="flex-1 px-5">
        {/* Header Section */}
        <Header title="Request Tracker" />
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
          label="Request type"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          placeholder="Select Request"
        />

        <Button className="!mt-12" fullWidth>
          Search
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RequestTrackerScreen;

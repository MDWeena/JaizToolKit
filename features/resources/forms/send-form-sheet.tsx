import { Text, TextField } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import React from 'react';
import { View } from 'react-native';

const SendFormSheet = () => {
  const { hideBottomSheet } = useBottomSheet();

  return (
    <>
      <View className="mb-12">
        <View className="pb-4 border-b border-gray-300">
          <Text fontWeight="bold" className="text-[1rem] text-center">
            {'Send Form(s)'}
          </Text>
        </View>

        <TextField
          className="mt-8"
          label="Email Address"
          containerClassName="!bg-transparent border border-gray-300"
          InputProps={{
            placeholder: 'Enter email',
            keyboardType: 'email-address',
          }}
        />
      </View>
      <View className="gap-4">
        <Button onPress={hideBottomSheet} size="lg">
          <Text
            className="text-base font-semibold text-primary-foreground"
            fontWeight="bold"
          >
            {'Send Form(s)'}
          </Text>
        </Button>

        <Button onPress={hideBottomSheet} variant={'outline'} size="lg">
          <Text className="text-base" fontWeight="bold">
            Back
          </Text>
        </Button>
      </View>
    </>
  );
};

export default SendFormSheet;

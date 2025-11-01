import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AgreementModel {
  agree: boolean;
  setAgree: (value: boolean) => void;
}
const Agreement = ({ agree, setAgree }: AgreementModel) => {
  return (
    <View className="flex-row items-center justify-start w-full border-red-400">
      {/* <Checkbox
        className={cn(
          'w-8 px-0 border-[1.5px] rounded-sm',
          agree && '!border-primary'
        )}
        value={agree}
        onValueChange={() => setAgree(!agree)}
        color={agree ? '#D94E05' : undefined}
      /> */}
      <Text className="ml-2 !text-sm">
        I agree to the{' '}
      </Text>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text
          className="!text-sm underline !text-primary"
        >
          Data Privacy Policy
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Agreement;

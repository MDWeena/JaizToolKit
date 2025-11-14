import { Button } from '@/components/ui/button';
import Images from '@/constants/Images';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface Props {
  message?: string;
  title?: string;
}

const SuccessSheet = ({ message, title }: Props) => {
  const { hideBottomSheet } = useBottomSheet();

  return (
    <>
      <View className="items-center w-4/5 mx-auto mb-8">
        <View className="">
          <Image source={Images.success} />
        </View>
        <Text className="text-2xl font-interMedium text-center text-grey-900 mt-6">
          {title || 'Successful'}
        </Text>

        <Text className="text-center mt-2">{message}</Text>
      </View>
      <View className="gap-4">
        <Button onPress={hideBottomSheet} size="lg">
          <Text className="text-base font-semibold text-primary-foreground">
            Done
          </Text>
        </Button>
      </View>
    </>
  );
};

export default SuccessSheet;

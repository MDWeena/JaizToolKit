import { Button } from '@/components/ui/button';
import Images from '@/constants/Images';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import React from 'react';
import { Image, Text, View } from 'react-native';

const DeleteChequeSheet = () => {
  const { hideBottomSheet } = useBottomSheet();
  const [done, setDone] = React.useState(false);

  return (
    <>
      <View className="items-center w-4/5 mx-auto mb-8">
        <View className="">
          <Image source={done ? Images.success : Images.confirm} />
        </View>
        <Text className="text-2xl font-interMedium text-center text-grey-900 mt-6">
          {done ? 'Successful' : 'Delete Cheque?'}
        </Text>

        <Text className="text-center mt-2">
          {done
            ? 'Your cheque has been successfully deleted.'
            : 'Are you sure you want to delete this cheque?'}
        </Text>
      </View>
      <View className="gap-4">
        <Button
          onPress={done ? hideBottomSheet : () => setDone(true)}
          size="lg"
        >
          <Text className="text-base font-semibold text-primary-foreground">
            {done ? 'Close' : 'Delete'}
          </Text>
        </Button>

        {!done && (
          <Button onPress={hideBottomSheet} size="lg" variant="outline">
            <Text className="text-base font-semibold">Go Back</Text>
          </Button>
        )}
      </View>
    </>
  );
};

export default DeleteChequeSheet;

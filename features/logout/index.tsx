import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { Button } from '@/components/ui/button';
import { WarningIcon } from '@/assets/images/svgs/warning';

const LogoutBottomSheet = () => {
  const { hideBottomSheet } = useBottomSheet();
  const router = useRouter();

  const handleLogout = useCallback((): void => {
    hideBottomSheet();
    // Perform logout logic here
    console.log('User logged out');
    // router.dismissTo('/(auth)');
  }, [hideBottomSheet]);

  return (
    <>
      <View className="items-center w-4/5 mx-auto mb-20">
        <View className='p-5 mb-6 border rounded-xl border-error/20 bg-error/10'>
          <WarningIcon />
        </View>
        <Text className="text-2xl font-semibold text-center text-grey-900">
          Logout?
        </Text>
        <Text className="text-base text-center text-grey-600">
          Are you sure you want to logout?
        </Text>
      </View>
      <View className="gap-4">
        <Button
         size="lg"
          onPress={handleLogout}
        >
          <Text className="text-base font-semibold text-primary-foreground">
            Logout
          </Text>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onPress={hideBottomSheet}
        >
          <Text className="text-base font-semibold text-grey-900">
            Cancel
          </Text>
        </Button>
      </View>
    </>
  );
};

export default LogoutBottomSheet;

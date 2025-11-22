import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import { WarningIcon } from '@/assets/images/svgs/warning';
import { Button } from '@/components/ui/button';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useAuthStore } from '@/store/auth.store';

const LogoutBottomSheet = () => {
  const { hideBottomSheet } = useBottomSheet();
  const { setUser, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = useCallback((): void => {
    // don't clear the last logged in user
    if (user) {
      user.accessToken = undefined;
      setUser(user);
    }

    hideBottomSheet();
    // Perform logout logic here
    router.dismissTo('/(auth)/login');
  }, [hideBottomSheet]);

  return (
    <>
      <View className="items-center w-4/5 mx-auto mb-20">
        <View className="p-5 mb-6 border rounded-xl border-error/20 bg-error/10">
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
        <Button size="lg" onPress={handleLogout}>
          <Text className="text-base font-semibold text-primary-foreground">
            Logout
          </Text>
        </Button>

        <Button variant="outline" size="lg" onPress={hideBottomSheet}>
          <Text className="text-base font-semibold text-grey-900">Cancel</Text>
        </Button>
      </View>
    </>
  );
};

export default LogoutBottomSheet;

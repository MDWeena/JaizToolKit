import Octicons from '@expo/vector-icons/Octicons';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';

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
      <View className="items-center w-3/5 mx-auto mb-6">
        <Octicons name="alert-fill" size={24} color="red" />
        <Text className="text-2xl text-center text-gray-600">
          Are you sure you want to logout?
        </Text>
      </View>
      <View className="gap-4">
        <TouchableOpacity
          className="items-center px-6 py-4 rounded-lg bg-primary active:bg-red-600"
          onPress={handleLogout}
        >
          <Text  className="text-base !text-white">
            Logout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center px-6 py-4 rounded-lg bg-primary/20"
          onPress={hideBottomSheet}
        >
          <Text className="text-base !text-primary">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LogoutBottomSheet;

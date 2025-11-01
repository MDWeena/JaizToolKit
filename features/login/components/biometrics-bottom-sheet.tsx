import { Button } from '@/components/ui/button';
import Images from '@/constants/Images';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useBiometrics } from '@/hooks/useBiometrics';
import { AuthenticationType } from 'expo-local-authentication';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';

type BiometricsState = 'enable' | 'failed' | 'successful';

const BiometricsBottomSheet = () => {
  const [state, setState] = useState<BiometricsState>('enable');
  const { hideBottomSheet } = useBottomSheet();
  const { authMethods, bioAuth } = useBiometrics();
  const isTouchId = authMethods.includes(AuthenticationType.FINGERPRINT)
    ? true
    : false;
  const idText = isTouchId ? 'Touch ID' : 'Face ID';

  const enable = async () => {
    const isEnabled = await bioAuth();

    if (!isEnabled) setState('successful');
    else setState('failed');
  };

  return (
    <>
      <View className="items-center w-4/5 mx-auto mb-8">
        <View className="">
          <Image
            source={
              state === 'enable'
                ? isTouchId
                  ? Images.enableTouchId
                  : Images.enableFaceId
                : state === 'failed'
                  ? Images.failed
                  : Images.success
            }
          />
        </View>
        <Text className="text-2xl font-interMedium text-center text-grey-900 mt-6">
          {state === 'enable' ? (
            <>Enable {idText}</>
          ) : state === 'failed' ? (
            <>{idText} not enabled</>
          ) : (
            <>{idText} enabled</>
          )}
        </Text>
      </View>
      <View className="gap-4">
        <Button
          onPress={state === 'successful' ? hideBottomSheet : enable}
          size="lg"
        >
          <Text className="text-base font-semibold text-primary-foreground">
            {state === 'enable'
              ? 'Enable Now'
              : state === 'failed'
                ? 'Try Again'
                : 'Close'}
          </Text>
        </Button>

        {state != 'successful' && (
          <Button variant="outline" size="lg" onPress={hideBottomSheet}>
            <Text className="text-base font-semibold text-grey-900">
              {state === 'enable' ? 'Maybe Later' : 'Go Back'}
            </Text>
          </Button>
        )}
      </View>
    </>
  );
};

export default BiometricsBottomSheet;

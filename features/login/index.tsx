import { FaceIdIcon } from '@/assets/images/svgs/login-icons';
import Logo from '@/assets/images/svgs/logo';
import { useToast } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/input';
import { Text } from '@/components/ui/Text';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useBiometrics } from '@/hooks/useBiometrics';
import { login } from '@/services/auth.service';
import { useAuthStore, useLoginState } from '@/store/auth.store';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BiometricsBottomSheet from './components/biometrics-bottom-sheet';

const { height } = Dimensions.get('screen');

type Inputs = {
  staffId: string;
  password: string;
};

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [hasOpenedBiometricsConfigSheet, setHasOpenedBiometricsConfigSheet] =
    useState(false);

  const { authMethods, bioAuth, isConfigured } = useBiometrics();
  const { setUser, user } = useAuthStore();
  const isUserLoggedIn = useMemo(() => !!user, [user]);
  const { setLoginState } = useLoginState();
  const { showBottomSheet } = useBottomSheet();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      staffId: user?.id ?? '',
      password: '',
    },
  });

  const [password] = watch(['password']);

  const onSuccess = () => {
    router.push('/(tabs)/(home)');
    setLoginState(true);
    reset();
  };

  const { mutateAsync: _login, isPending: loggingIn } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: login,
    onSuccess(response) {
      if (!response?.success) {
        showToast({
          message: response?.message ?? 'Login failed. Please try again.',
          linkText: '',
          onLinkPress: () => {},
        });
        return;
      }

      const payload = response?.data?.data;
      if (!payload?.user || !payload?.token) {
        showToast({
          message: 'Unable to complete login.',
          linkText: '',
          onLinkPress: () => {},
        });
        return;
      }

      setUser({ ...payload.user, accessToken: payload.token, password });

      showToast({
        message: 'Logged in successfully!',
        linkText: '',
        onLinkPress: () => {},
      });

      if (!isConfigured && !hasOpenedBiometricsConfigSheet) {
        setHasOpenedBiometricsConfigSheet(true);
        showBottomSheet(<BiometricsBottomSheet onSuccess={onSuccess} />);
        return;
      }

      onSuccess();
    },
    onError(error: any) {
      const message =
        error?.message ||
        'Unable to log in at the moment. Please check your internet connection.';
      showToast({
        message,
        linkText: '',
        onLinkPress: () => {},
      });
    },
  });

  const onSubmit = async (formData: Inputs) => {
    await _login({ staffid: formData.staffId, password: formData.password });
  };

  const onBiometricClick = async () => {
    const result = await bioAuth();
    if (result.success) {
      onSubmit({
        staffId: user?.id!,
        password: user?.password!,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-white">
      <View
        className="flex items-center justify-center flex-1 z-1"
        style={{ height }}
      >
        {/* Logo and heading */}
        <Logo />
        <Text className="!mt-3 text-[1.5rem] font-interMedium text-center">
          Welcome!
        </Text>
        <Text className="mt-3 text-center font-light text-[1.2rem] text-[#2F3036CC] mb-8">
          Kindly login with your system credentials
        </Text>

        {/* Staff ID Field */}
        <Controller
          name="staffId"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              className="!mt-5 w-full"
              inputPrefix={
                <Ionicons name="mail-outline" color={'#00000040'} size={25} />
              }
              InputProps={{
                placeholder: 'Staff ID',
                value: value ?? '',
                onChangeText: onChange,
                onBlur: onBlur,
              }}
              helperText={errors?.staffId?.message}
            />
          )}
        />

        {/* Password Field */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            minLength: {
              value: 8,
              message: 'Password must not be less than 8 characters',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              className="!mt-5 w-full"
              inputPrefix={
                <Ionicons
                  name="lock-closed-outline"
                  color={'#00000040'}
                  size={25}
                />
              }
              inputSuffix={
                <TouchableWithoutFeedback
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off-outline'}
                    color={'#00000040'}
                    size={25}
                  />
                </TouchableWithoutFeedback>
              }
              InputProps={{
                placeholder: 'Password',
                value: value ?? '',
                onChangeText: onChange,
                onBlur: onBlur,
                secureTextEntry: !showPassword,
              }}
              helperText={errors?.password?.message}
            />
          )}
        />

        {/* Login Button */}
        <Button
          loading={loggingIn}
          onPress={(e) => !loggingIn && handleSubmit(onSubmit)(e)}
          className="mt-24 !min-w-full"
          size={'lg'}
        >
          <Text className="text-white font-bold">Log In</Text>
        </Button>

        {/* Biometrics Login */}
        {isConfigured && isUserLoggedIn && authMethods?.length > 0 && (
          <>
            <View className="my-6 flex items-center gap-3 flex-row">
              <View className="h-[.8px] flex-1 bg-gray-300" />
              <Text className="text-gray-500">or Login with</Text>
              <View className="h-[.8px] flex-1 bg-gray-300" />
            </View>

            <View className="flex-row items-center justify-center gap-4">
              {authMethods.includes(
                LocalAuthentication.AuthenticationType.FINGERPRINT
              ) && (
                <View>
                  <Pressable onPress={onBiometricClick}>
                    <View className="w-[60px] h-[60px] border bg-white border-gray-300 rounded-md flex items-center justify-center">
                      <Ionicons name="finger-print-outline" size={25} />
                    </View>
                  </Pressable>
                  <Text className="mt-2 text-center text-gray-500">
                    Touch ID
                  </Text>
                </View>
              )}

              {authMethods.includes(
                LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
              ) && (
                <View>
                  <Pressable onPress={onBiometricClick}>
                    <View className="w-[60px] h-[60px] border bg-white border-gray-300 rounded-md flex items-center justify-center">
                      <FaceIdIcon />
                    </View>
                  </Pressable>
                  <Text className="mt-2 text-center text-gray-500">
                    Face ID
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

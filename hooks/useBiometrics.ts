import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

type ReturnType = {
  authMethods: LocalAuthentication.AuthenticationType[];
  bioAuth: () => Promise<LocalAuthentication.LocalAuthenticationResult>;
  isConfigured: boolean;
  clearBiometrics: VoidFunction;
};

const BIOMETRICS_CONFIGURED = 'BIOMETRICS';

export const useBiometrics = () => {
  const [authMethods, setAuthMethods] = useState<
    LocalAuthentication.AuthenticationType[]
  >([]);
  const [isBiometricSetup, setIsBiometricSetup] = useState<boolean>(false);

  const bioAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      biometricsSecurityLevel: 'weak',
      fallbackLabel: 'Sign in with email and password',
    });

    if (result.success) {
      await SecureStore.setItemAsync(BIOMETRICS_CONFIGURED, 'true');
      setIsBiometricSetup(true);
    }

    return result;
  };

  const clearBiometrics = async () => {
    await SecureStore.deleteItemAsync(BIOMETRICS_CONFIGURED);
  };

  useEffect(() => {
    const getAuthMethods = async () => {
      LocalAuthentication.supportedAuthenticationTypesAsync().then(
        (authTypes) => {
          setAuthMethods(authTypes);
        }
      );
    };

    getAuthMethods();
  }, []);

  useEffect(() => {
    const checkBiometricSetup = async () => {
      const isBiometricSetup = await SecureStore.getItemAsync(
        BIOMETRICS_CONFIGURED
      );

      if (isBiometricSetup) {
        setIsBiometricSetup(true);
      } else {
        setIsBiometricSetup(false);
      }
    };

    checkBiometricSetup();
  }, []);

  return {
    authMethods,
    bioAuth,
    isConfigured: isBiometricSetup,
    clearBiometrics,
  };
};

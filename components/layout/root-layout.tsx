import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '@/app/global.css';
import 'react-native-reanimated';

import { ToastProvider } from '@/components/shared/toast';
import { BottomSheetProvider } from '@/contexts/BottomSheetContext';
import { StarredProvider } from '@/contexts/StarredContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useAuthStore, useLoginState } from '@/store/auth.store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...Ionicons.font,
    ...Feather.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { user } = useAuthStore();
  const { hasLoggedIn } = useLoginState();

  const isAuthenticated = !!user && hasLoggedIn;

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 20 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider>
            <BottomSheetProvider>
              <StarredProvider>
                <Stack initialRouteName="(auth)">
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(app)"
                      options={{ headerShown: false }}
                    />
                  </Stack.Protected>
                </Stack>
              </StarredProvider>
            </BottomSheetProvider>
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

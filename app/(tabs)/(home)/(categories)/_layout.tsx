import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Platform, Pressable } from 'react-native';

export default function StackLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        contentStyle: { marginTop: Platform.OS === 'ios' ? -30 : -40 },
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable
            hitSlop={20}
            onPress={() =>
              router.canGoBack() && router.dismissAll()
            }
          >
            <Ionicons name="arrow-back" size={25} />
          </Pressable>
        ),
      }}
    />
  );
}

// import { Ionicons } from '@expo/vector-icons';
// import { Stack, useRouter } from 'expo-router';
// import { Platform, Pressable } from 'react-native';

// export default function AppLayout() {
//   const router = useRouter();

//   return (
//     <Stack
//       screenOptions={{
//         headerTitle: '',
//         headerStyle: {
//           backgroundColor: 'transparent',
//         },
//         contentStyle: { marginTop: Platform.OS === 'ios' ? -30 : -40 },
//         headerShadowVisible: false,
//         headerLeft: () => (
//           <Pressable
//             hitSlop={20}
//             onPress={() => router.canGoBack() && router.back()}
//           >
//             <Ionicons name="arrow-back" size={25} />
//           </Pressable>
//         ),
//       }}
//     />
//   );
// }
import { Ionicons } from '@expo/vector-icons';
import { Slot, Stack, useRouter } from 'expo-router';

export default function AppLayout() {
  const router = useRouter();

  return (
    <Slot />
  );
}

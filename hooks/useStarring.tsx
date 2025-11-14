import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useToast } from '@/components/shared/toast';
import { Text } from '@/components/ui/Text';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useStarred } from '@/contexts/StarredContext';
import { StarredItem } from '@/types/page';

interface UseStarringOptions {
  starredItem?: StarredItem;
  onLongPress?: () => void;
}

interface UseStarringReturn {
  handleLongPress: () => void;
  isItemStarred: boolean;
}

export const useStarring = ({
  starredItem,
  onLongPress,
}: UseStarringOptions): UseStarringReturn => {
  const router = useRouter();
  const { showBottomSheet, hideBottomSheet } = useBottomSheet();
  const { isStarred, toggleStar } = useStarred();
  const { showToast, dismissToast } = useToast();

  const handleStarringLongPress = useCallback(() => {
    if (!starredItem || !starredItem.text) return;

    const itemIsStarred = isStarred(starredItem.text);

    showBottomSheet(
      <View>
        <View className="items-center pb-4 mb-4 border-b border-b-secondary-foreground/10">
          <Text className="text-xl font-semibold text-grey-900">
            {starredItem.text}
          </Text>
        </View>
        <Pressable
          className="flex-row items-center justify-between gap-3 p-5 border border-secondary-foreground/10 rounded-xl"
          onPress={() => {
            toggleStar(starredItem as any).then(() => {
              hideBottomSheet();
              // Show toast after adding to starred
              if (!itemIsStarred) {
                showToast({
                  message: 'Added to Starred',
                  linkText: 'See List',
                  onLinkPress: () => {
                    router.push('/(tabs)/starred');
                    dismissToast();
                  },
                  position: 'bottom',
                });
              }
            });
          }}
        >
          <Text className="text-[1.1rem] text-text">
            {itemIsStarred ? 'Remove from Starred' : 'Add to Starred'}
          </Text>
          <Ionicons
            name={itemIsStarred ? 'star' : 'star-outline'}
            size={20}
            color={itemIsStarred ? '#FFA500' : '#9CA3AF'}
          />
        </Pressable>
      </View>,
      {
        cornerRadius: 'medium',
        snapPoints: ['20%', '10%'],
      }
    );
  }, [
    starredItem,
    isStarred,
    toggleStar,
    showBottomSheet,
    hideBottomSheet,
    showToast,
    dismissToast,
    router,
  ]);

  const handleLongPress = useCallback(() => {
    if (starredItem && starredItem.text) {
      handleStarringLongPress();
    } else if (onLongPress) {
      onLongPress();
    }
  }, [starredItem, handleStarringLongPress, onLongPress]);

  const isItemStarred = Boolean(
    starredItem && starredItem.text && isStarred(starredItem.text)
  );

  return {
    handleLongPress,
    isItemStarred,
  };
};


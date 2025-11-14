import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useStarring } from '@/hooks/useStarring';
import { cn } from '@/lib/utils';
import { StarredItem } from '@/types/page';
import { Text } from '../ui/Text';


// Define props interface for ReusableCard
interface ReusableCardProps {
  onPress: () => void;
  onLongPress?: () => void;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  starredItem?: StarredItem;
}

// Reusable Card Component
export const Card: React.FC<ReusableCardProps> = ({
  onPress,
  onLongPress,
  icon,
  text,
  className,
  starredItem,
}) => {
  const { handleLongPress, isItemStarred } = useStarring({
    starredItem,
    onLongPress,
  });

  return (
    <>
      <Pressable
        className={cn(
          'flex-col flex-1 justify-between gap-3 p-7 border bg-grey-0 rounded-xl mb-2 min-h-32',
          className
        )}
        onPress={onPress}
        onLongPress={handleLongPress}
      >
        <View>{icon}</View>
        <Text className="text-[1.1rem] text-text">{text}</Text>
      </Pressable>
      {starredItem && starredItem.text && isItemStarred && (
        <View className="absolute top-2 right-2">
          <Ionicons name="star" size={20} color="#FFA500" />
        </View>
      )}
    </>
  );
};

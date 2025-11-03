import React from 'react';
import { Dimensions, Pressable, View } from 'react-native';

import { cn } from '@/lib/utils';
import { Text } from '../ui/Text';

const { width } = Dimensions.get('window');

// Define props interface for ReusableCard
interface ReusableCardProps {
  onPress: () => void;
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

// Reusable Card Component
export const Card: React.FC<ReusableCardProps> = ({
  onPress,
  icon,
  text,
  className,
}) => {
  return (
    <Pressable
      className={cn(
        'flex-col flex-1 justify-between gap-3 p-7 border bg-grey-0 rounded-xl mb-[1rem] min-h-32',
        className
      )}
      onPress={onPress}
    >
      <View>{icon}</View>
      <Text className="text-[1.1rem] text-text">{text}</Text>
    </Pressable>
  );
};

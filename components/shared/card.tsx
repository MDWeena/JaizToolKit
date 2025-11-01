import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

import { cn } from '@/lib/utils';

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
        'flex-col flex-1 justify-between gap-3 p-7 bg-white rounded-xl mb-[1rem] min-h-[155px]',
        className
      )}
      onPress={onPress}
    >
      <View>{icon}</View>
      <Text className="text-[1.1rem]">{text}</Text>
    </Pressable>
  );
};

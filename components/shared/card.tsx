import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

import { cn } from '@/lib';

const { width } = Dimensions.get('window');

// Define props interface for ReusableCard
interface ReusableCardProps {
  onPress: () => void;
  icon?: React.ReactNode;
  text?: string;
  direction?: 'row' | 'column';
}

// Reusable Card Component
export const Card: React.FC<ReusableCardProps> = ({
  onPress,
  icon,
  text,
  direction = 'column',
}) => {
  return (
    <Pressable
      className="items-center justify-center gap-3 py-8 mb-5 bg-white border shadow-sm rounded-xl shadow-black/5 border-gray"
      style={{
        width: (width - 60) / 2,
        flexDirection: direction || 'column',
      }}
      onPress={onPress}
    >
      <>
        <View>{icon}</View>
        <Text
          className={cn(
            '!text-sm text-fauxBlack',
            direction === 'column' && 'text-base'
          )}
        >
          {text}
        </Text>
      </>
    </Pressable>
  );
};

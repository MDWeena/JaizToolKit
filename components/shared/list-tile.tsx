import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

// Define props interface for ReusableCard
interface ReusableCardProps {
  onPress: () => void;
  onLongPress?: () => void;
  icon?: React.ReactNode;
  text?: string;
  description?: string;
  iconRight?: React.ReactNode;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckboxPress?: () => void;
  textClassName?: string;
}

// Reusable Card Component
export const ListTile: React.FC<ReusableCardProps> = ({
  onPress,
  onLongPress,
  icon,
  text,
  description,
  iconRight = <Feather name='chevron-right' size={26} color='#D94E05' />,
  showCheckbox = false,
  isChecked = false,
  textClassName,
  
  onCheckboxPress,
}) => {
  return (
    <Pressable
      className='flex-row items-center justify-between gap-3 p-5 mb-5 bg-white border shadow-sm rounded-xl shadow-black/5 border-gray'
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View
        className={cn(
          "flex-row justify-center gap-3",
          description ? "items-start" : "items-center"
        )}
        >
        {showCheckbox && (
          <TouchableOpacity
            onPress={onCheckboxPress}
            className={cn(
              "w-6 h-6 rounded border items-center justify-center",
              isChecked ? "bg-primary border-primary" : "bg-white border-gray"
            )}
          >
            {isChecked && <Feather name='check' size={16} color='white' />}
          </TouchableOpacity>
        )}
        {icon}
        <View className='gap-4'>
          <Text
            className={cn('text-[1.1rem] text-black leading-1', textClassName)}
          >
            {text}
          </Text>
          {description && (
            <Text className='text-sm text-black/50'>
              {description}
            </Text>
          )}
        </View>
      </View>
      {!showCheckbox && iconRight}
    </Pressable>
  );
};

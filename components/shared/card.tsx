import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";

const { width } = Dimensions.get("window");

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
        "flex-col flex-1 items-center justify-center gap-3 p-8 mb-3 bg-white border rounded-xl border-primary",
        className
      )}
      onPress={onPress}
    >
      <View>{icon}</View>
      <Text>{text}</Text>
    </Pressable>
  );
};

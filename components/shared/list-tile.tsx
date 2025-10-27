import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Position = "start" | "end";

interface AccessoryConfig {
  component: React.ReactNode;
  position: Position;
  onPress?: () => void;
}

interface ListTileProps {
  onPress?: () => void;
  onLongPress?: () => void;
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  accessories?: AccessoryConfig[];
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  disabled?: boolean;
}

// Define the component
const ListTileComponent: React.FC<ListTileProps> = ({
  onPress,
  onLongPress,
  title,
  subtitle,
  leading,
  trailing = <Feather name='chevron-right' size={26} color='#D94E05' />,
  accessories = [],
  titleClassName,
  subtitleClassName,
  containerClassName,
  contentClassName,
  disabled = false,
}) => {
  const startAccessories = accessories.filter(
    (acc) => acc.position === "start"
  );
  const endAccessories = accessories.filter((acc) => acc.position === "end");

  const renderAccessory = (config: AccessoryConfig, index: number) => {
    if (config.onPress) {
      return (
        <Pressable
          key={index}
          onPress={config.onPress}
          disabled={disabled}
          hitSlop={8}
        >
          {config.component}
        </Pressable>
      );
    }
    return <View key={index}>{config.component}</View>;
  };

  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-between gap-3 p-5 mb-5 bg-white border shadow-sm rounded-xl shadow-black/5 border-gray",
        disabled && "opacity-50",
        containerClassName
      )}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      <View
        className={cn(
          "flex-row flex-1 gap-3",
          subtitle ? "items-start" : "items-center",
          contentClassName
        )}
      >
        {startAccessories.length > 0 && (
          <View className='flex-row items-center gap-2'>
            {startAccessories.map(renderAccessory)}
          </View>
        )}

        {leading && (
          <View className='items-center justify-center'>{leading}</View>
        )}

        <View className='flex-1 gap-1'>
          <Text
            className={cn(
              "text-[1.1rem] text-black leading-tight",
              titleClassName
            )}
            numberOfLines={2}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              className={cn(
                "text-sm text-black/50 leading-tight",
                subtitleClassName
              )}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {(trailing || endAccessories.length > 0) && (
        <View className='flex-row items-center gap-2'>
          {accessories.length === 0 && trailing}
          {endAccessories.map(renderAccessory)}
        </View>
      )}
    </Pressable>
  );
};

// Define the sub-components
const Checkbox: React.FC<{
  checked: boolean;
  onPress: () => void;
  disabled?: boolean;
}> = ({ checked, onPress, disabled }) => (
  <View
    className={cn(
      "w-6 h-6 rounded border items-center justify-center",
      checked ? "bg-primary border-primary" : "bg-white border-gray",
      disabled && "opacity-50"
    )}
  >
    {checked && <Feather name='check' size={16} color='white' />}
  </View>
);

const Switch: React.FC<{
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}> = ({ value, onValueChange, disabled }) => {
  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      className={cn(
        "w-12 h-6 rounded-full p-1",
        value ? "bg-primary" : "bg-gray-300",
        disabled && "opacity-50"
      )}
    >
      <View
        className={cn(
          "w-4 h-4 bg-white rounded-full",
          value ? "self-end" : "self-start"
        )}
      />
    </Pressable>
  );
};

// Merge component with sub-components
export const ListTile = Object.assign(ListTileComponent, {
  Checkbox,
  Switch,
});
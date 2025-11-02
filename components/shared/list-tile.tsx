import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { Text } from "../ui/Text";

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
  trailing = <Feather name='chevron-right' size={26} color='#004081' />,
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
        "flex-row items-center justify-between gap-3 p-5 mb-5",
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
              "text-[1.1rem] text-text leading-tight",
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
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const thumbTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 14.5],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      data-state={value ? "checked" : "unchecked"}
      className={cn("relative w-12 h-8 rounded-full", 
        value
          ? "bg-primary"
          : "bg-grey-300",
        disabled && "opacity-50")}
    >
    
        <Animated.View
          className="w-7 h-7 bg-white rounded-full absolute"
          style={{
            transform: [{ translateX: thumbTranslateX }],
            top: "50%",
            marginTop: -12,
            marginLeft: 2,
            marginRight: 2,
          }}
        />
    </Pressable>
  );
};

// Merge component with sub-components
export const ListTile = Object.assign(ListTileComponent, {
  Checkbox,
  Switch,
});
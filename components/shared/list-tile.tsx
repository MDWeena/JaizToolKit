// import { cn } from "@/lib/utils";
// import Feather from "@expo/vector-icons/Feather";
// import React from "react";
// import { Pressable, Text, TouchableOpacity, View } from "react-native";

// // Define props interface for ReusableCard
// interface ReusableCardProps {
//   onPress: () => void;
//   onLongPress?: () => void;
//   icon?: React.ReactNode;
//   text?: string;
//   description?: string;
//   iconRight?: React.ReactNode;
//   showCheckbox?: boolean;
//   isChecked?: boolean;
//   onCheckboxPress?: () => void;
//   textClassName?: string;
// }

// // Reusable Card Component
// export const ListTile: React.FC<ReusableCardProps> = ({
//   onPress,
//   onLongPress,
//   icon,
//   text,
//   description,
//   iconRight = <Feather name='chevron-right' size={26} color='#D94E05' />,
//   showCheckbox = false,
//   isChecked = false,
//   textClassName,

//   onCheckboxPress,
// }) => {
//   return (
//     <Pressable
//       className='flex-row items-center justify-between gap-3 p-5 mb-5 bg-white border shadow-sm rounded-xl shadow-black/5 border-gray'
//       onPress={onPress}
//       onLongPress={onLongPress}
//     >
//       <View
//         className={cn(
//           "flex-row justify-center gap-3",
//           description ? "items-start" : "items-center"
//         )}
//         >
//         {showCheckbox && (
//           <TouchableOpacity
//             onPress={onCheckboxPress}
//             className={cn(
//               "w-6 h-6 rounded border items-center justify-center",
//               isChecked ? "bg-primary border-primary" : "bg-white border-gray"
//             )}
//           >
//             {isChecked && <Feather name='check' size={16} color='white' />}
//           </TouchableOpacity>
//         )}
//         {icon}
//         <View className='gap-4'>
//           <Text
//             className={cn('text-[1.1rem] text-black leading-1', textClassName)}
//           >
//             {text}
//           </Text>
//           {description && (
//             <Text className='text-sm text-black/50'>
//               {description}
//             </Text>
//           )}
//         </View>
//       </View>
//       {!showCheckbox && iconRight}
//     </Pressable>
//   );
// };

import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

type Position = "start" | "end";

interface AccessoryConfig {
  component: React.ReactNode;
  position: Position;
  onPress?: () => void;
}

interface ListTileProps {
  onPress?: () => void;
  onLongPress?: () => void;

  // Main content
  title: string;
  subtitle?: string;

  // Icon at the start
  leading?: React.ReactNode;

  // Accessory components (checkbox, switch, icon, etc.)
  trailing?: React.ReactNode;

  // Advanced: Multiple accessories with position control
  accessories?: AccessoryConfig[];

  // Styling
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  contentClassName?: string;

  // Layout
  disabled?: boolean;
}

export const ListTile: React.FC<ListTileProps> = ({
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

  // Organize accessories by position
  const startAccessories = accessories.filter(
    (acc) => acc.position === "start"
  );
  const endAccessories = accessories.filter((acc) => acc.position === "end");

  // Render an accessory with optional press handler
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
      {/* Start Section: Start accessories + Leading icon + Content */}
      <View
        className={cn(
          "flex-row flex-1 gap-3",
          subtitle ? "items-start" : "items-center",
          contentClassName
        )}
      >
        {/* Start accessories (e.g., checkbox on the left) */}
        {startAccessories.length > 0 && (
          <View className='flex-row items-center gap-2'>
            {startAccessories.map(renderAccessory)}
          </View>
        )}

        {/* Leading icon/component */}
        {leading && (
          <View className='items-center justify-center'>{leading}</View>
        )}

        {/* Text content */}
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

      {/* End Section: Trailing icon + End accessories */}
      {(trailing || endAccessories.length > 0) && (
        <View className='flex-row items-center gap-2'>
          {/* Trailing icon/component (only if no accessories specified) */}
          {accessories.length === 0 && trailing}

          {/* End accessories (e.g., switch, checkbox on the right) */}
          {endAccessories.map(renderAccessory)}
        </View>
      )}
    </Pressable>
  );
};

export const Checkbox: React.FC<{
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

export const Switch: React.FC<{
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}> = ({ value, onValueChange, disabled }) => {
  // Use React Native Switch or custom implementation
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

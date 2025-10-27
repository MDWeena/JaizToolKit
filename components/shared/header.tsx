import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface HeaderProps {
  profileImage?: ImageSourcePropType;
  userName?: string;
  userId?: string;
  title?: string;
  subtitle?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  userNameClassName?: string;
  userIdClassName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  profileImage,
  userName,
  userId,
  title,
  subtitle,
  showNotification = false,
  onNotificationPress,
  userNameClassName = "",
  userIdClassName = "",
}) => {
  const renderContent = () => {
    if (userName) {
      return (
        <>
          <Text className={cn(userNameClassName)}>Hello, {userName}</Text>
          <Text className={cn("text-sm text-text", userIdClassName)}>
            Finacle ID: {userId}
          </Text>
        </>
      );
    }

    return (
      <>
        <Text className={cn("text-text", userNameClassName)}>
          {title}
        </Text>
        {subtitle && (
          <Text className={cn("text-sm text-text", userIdClassName)}>
            {subtitle}
          </Text>
        )}
      </>
    );
  };

  const { colorScheme } = useTheme();
  const bellColor = Colors[colorScheme]?.background;

  return (
    <View className='flex-row items-center justify-between mb-5'>
      <View className='flex-row items-center'>
        {profileImage && (
          <Image
            source={profileImage}
            className='mr-3 rounded-full h-14 w-14'
          />
        )}
        <View className='gap-1'>{renderContent()}</View>
      </View>
      {showNotification && (
        <TouchableOpacity
          className='self-start p-2 rounded-full bg-primary'
          onPress={onNotificationPress}
        >
          <Feather name='bell' size={24} color={bellColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

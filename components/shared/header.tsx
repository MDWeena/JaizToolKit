import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "../ui/Text";

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
  const { colorScheme } = useTheme();

  const truncatedUserName = userName
    ? userName.length > 10
      ? userName.split(" ")[0].slice(0, 10) + "..."
      : userName
    : "";

  const mainText = userName ? `Hello, ${truncatedUserName}` : title;
  const secondaryText = userName ? `User ID: ${userId}` : subtitle;

  return (
    <View className="flex-row items-center gap-4 justify-between mb-4">
      <View className="flex-row items-center">
        {profileImage && (
          <Image
            source={profileImage}
            className="mr-3 rounded-full h-14 w-14"
          />
        )}
        <View className="gap-1">
          <Text
            className={cn(
              "text-3xl text-text font-interSemiBold",
              userNameClassName
            )}
          >
            {mainText}
          </Text>
          {secondaryText && (
            <Text className={cn("text-sm text-grey-600", userIdClassName)}>
              {secondaryText}
            </Text>
          )}
        </View>
      </View>
      {showNotification && (
        <TouchableOpacity
          className="self-start p-2 rounded-full bg-primary"
          onPress={onNotificationPress}
        >
          <Feather
            name="bell"
            size={24}
            color={Colors[colorScheme]?.background}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

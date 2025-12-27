import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { CopyIcon } from "@/assets/images/svgs/account";

type Props = {
  label: string;
  value: string;
  canCopy?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  leadingIcon?: React.ReactNode;
};

export const FieldRow: React.FC<Props> = ({
  label,
  value,
  canCopy,
  onCopy,
  copied,
  leadingIcon,
}) => {
  return (
    <View className="flex flex-row items-center gap-3 py-3">
      {leadingIcon}
      <View className="flex-1">
        <Text className="mb-1 text-sm text-grey-600">{label}</Text>
        <View className="flex-row items-center justify-between">
          <Text
            className="text-base text-grey-900"
            numberOfLines={1}
          >
            {value}
          </Text>
          {canCopy ? (
            <Pressable
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={`Copy ${label}`}
              onPress={onCopy}
            >
              {copied ? (
                <Feather name="check" size={18} color="#10B981" />
              ) : (
                <CopyIcon color="#6B7280" />
              )}
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

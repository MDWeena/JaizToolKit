import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
  canCopy?: boolean;
  onCopy?: () => void;
  copied?: boolean;
};

export const FieldRow: React.FC<Props> = ({ label, value, canCopy, onCopy, copied }) => {
  return (
    <View className="py-3">
      <Text className="text-xs text-grey-600 mb-1">{label}</Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-grey-900" numberOfLines={1}>
          {value}
        </Text>
        {canCopy ? (
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={`Copy ${label}`}
            onPress={onCopy}
          >
            <Feather name={copied ? "check" : "copy"} size={18} color={copied ? "#10B981" : undefined} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};



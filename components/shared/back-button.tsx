import { BackArrowIcon } from "@/assets/images/svgs/settings";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

interface BackButtonProps {
  activeStep?: number;
  onStepBack?: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  activeStep,
  onStepBack,
  className,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (typeof activeStep === "number" && activeStep > 1) {
      if (onStepBack) onStepBack();
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.dismissAll();
  };

  return (
    <Pressable
      hitSlop={20}
      accessibilityRole="button"
      onPress={handlePress}
      className={cn("pl-5 pb-4", className)}
    >
      <BackArrowIcon />
    </Pressable>
  );
};


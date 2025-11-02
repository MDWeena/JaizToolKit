import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { clsx } from "clsx";

// Define the props for your custom Text component
interface AppTextProps extends TextProps {
  className?: string;
  color?: string;
  font?: string;
}
export const Text: React.FC<AppTextProps> = ({
  className = "",
  color,
  font,
  style,
  children,
  ...props
}) => {
  const baseClasses = "text-[#2F3036CC] font-inter";

  const combinedClasses = clsx(
    baseClasses,
    className
  );

  return (
    <RNText
      className={combinedClasses}
      style={[
        style,
        color && color.startsWith("#") ? { color } : {},
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
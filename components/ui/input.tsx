import { cn } from "@/lib/utils";
import React, { FC, ReactNode, RefObject, useState } from "react";
import {
  Platform,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { Text } from "./Text";

interface Props extends ViewProps {
  multiline?: boolean;
  inputPrefix?: ReactNode;
  inputSuffix?: ReactNode;
  label?: string;
  LabelProps?: TextProps;
  InputProps?: TextInputProps;
  HelperTextProps?: TextProps;
  helperText?: string;
  helperTextStyle?: "custom" | "error";
  ignoreFocus?: boolean;
  InputRef?: (ref: TextInput) => void | RefObject<TextInput | null>;
}

const TextField: FC<Props> = ({
  inputPrefix,
  inputSuffix,
  label,
  LabelProps,
  InputProps,
  HelperTextProps,
  helperText,
  helperTextStyle = "error",
  ignoreFocus,
  InputRef,
  ...props
}) => {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <View {...props}>
      {label && (
        <Text
          {...LabelProps}
          className={cn("font-interMedium mb-2", LabelProps?.className)}
        >
          {label}
        </Text>
      )}
      <View
        className={cn(
          "relative bg-[#E1E1E4] rounded-[12px]",
          inputFocused && "border border-primary",
          inputPrefix ? "pl-16" : "pl-4",
          inputSuffix ? "pr-16" : "pr-4",
          helperTextStyle === "error" && helperText && "border-red-500"
        )}
      >
        {inputPrefix && (
          <View
            className={cn(
              "absolute top-[50%] -translate-y-[50%] left-4",
              props.multiline && "top-4 translate-y-0"
            )}
          >
            {inputPrefix}
          </View>
        )}
        <TextInput
          ref={InputRef as unknown as RefObject<TextInput | null>}
          onFocus={() => !ignoreFocus && setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          autoCapitalize={"none"}
          secureTextEntry={!!InputProps?.secureTextEntry}
          className={cn(
            "py-5 transparent text-[1.2rem] font-inter placeholder:text-gray",
            props.multiline && "min-h-[120px]",
            Platform.OS === "ios" && "py-4",
            InputProps?.className
          )}
          numberOfLines={props.multiline ? 4 : 1}
          {...InputProps}
        />

        {inputSuffix && (
          <View
            className={cn(
              "absolute top-[50%] -translate-y-[50%] right-4",
              props.multiline && "top-4 translate-y-0"
            )}
          >
            {inputSuffix}
          </View>
        )}
      </View>

      {helperText && (
        <Text
          {...HelperTextProps}
          className={cn(
            "!text-[1rem] mt-1 pl-1 !text-red-500",
            HelperTextProps?.className
          )}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

TextField.displayName = "TextField";

export { TextField };

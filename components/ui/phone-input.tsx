import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, FieldError, useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import PhoneInput, {
  ICountry,
} from "react-native-international-phone-number";

interface CustomPhoneInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  defaultCountry?: ICountry['cca2'];
  error?: FieldError;
  selectedCountry: ICountry | undefined;
  onChangeSelectedCountry: (country: ICountry) => void;
  autoFocus?: boolean;
  onPhoneNumberChange?: () => void;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  name,
  control,
  placeholder = "Mobile Number",
  defaultCountry = "NG",
  error,
  selectedCountry,
  onChangeSelectedCountry,
  autoFocus = false,
  onPhoneNumberChange,
}) => {
  const value = useWatch({ control, name });

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value: fieldValue } }) => (
          <PhoneInput
            phoneInputStyles={{
              container: {
                paddingVertical: 10,
                backgroundColor: "#E1E1E4",
              },
              divider: { display: "none" },
              callingCode: {
                fontWeight: "normal",
                fontSize: 14,
                paddingRight: 2,
              },
              flagContainer: {
                backgroundColor: "#E1E1E4",
              },
            }}
            customCaret={() => (
              <Ionicons
                className="absolute right-0"
                name="chevron-down"
                size={18}
                color="black"
              />
            )}
            placeholder={placeholder}
            defaultCountry={defaultCountry}
            autoFocus={autoFocus}
            value={fieldValue}
            onChangePhoneNumber={(val) => {
              onChange(val);
              if (onPhoneNumberChange) onPhoneNumberChange();
            }}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={onChangeSelectedCountry}
          />
        )}
      />
      {error && value && (
        <Text className="mt-1 text-sm text-red-500">
          {String(error.message)}
        </Text>
      )}
    </View>
  );
};

export default CustomPhoneInput;

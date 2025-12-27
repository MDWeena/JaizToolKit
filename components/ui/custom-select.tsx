import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel
} from '@/components/ui/select';
import React from 'react';
import { Text, View } from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  groupLabel?: string;
  size?: 'small' | 'medium' | 'large' | 'full' | number[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  size = 'medium',
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {/* Label */}
      {label && <SelectLabel className="mb-2 text-gray-700 font-interMedium">{label}</SelectLabel>}

      {/* Select Component */}
      <Select
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
        triggerClassName="rounded-xl px-3 py-2 min-h-[60px]"
        size={size}
      >
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
      </Select>
    </View>
  );
};

export default CustomSelect;

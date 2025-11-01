import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false
}) => {
  return (
    <View className={`mb-4 ${className}`}>
      {/* Label */}
      {label && <Text className="mb-2 font-medium text-gray-700">{label}</Text>}

      {/* Select Component */}
      <Select
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full"
        triggerClassName="rounded-xl px-3 py-2 min-h-[60px]"
      >
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} className='flex-1' value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </Select>
    </View>
  );
};

export default CustomSelect;

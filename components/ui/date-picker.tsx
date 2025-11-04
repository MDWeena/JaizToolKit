import React, { useState } from "react";
import { Platform, Pressable, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select Date",
  minimumDate,
  maximumDate,
  className = "",
}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    setSelectedDate(currentDate);
    if (onChange) {
      onChange(currentDate);
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View className={`${className}`}>
      {/* Label */}
      {label && <Text className='mb-2 font-medium'>{label}</Text>}
      {/* Date Input */}
      <Pressable
        onPress={showDatePicker}
        className='bg-[#E1E1E4] flex flex-row rounded-xl px-4 py-5  min-h-[50px] justify-between items-center'
      >
        <Text className={cn("text-lg",selectedDate ? "text-grey-900" : "text-grey-600")}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </Text>

        <Feather name="calendar" size={24} className="!text-grey-600"/>
      </Pressable>

      {/* Date Picker Modal */}
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={selectedDate || new Date()}
          mode='date'
          is24Hour={true}
          display='default'
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export { DatePicker };

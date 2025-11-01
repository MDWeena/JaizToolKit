import React, { FC, useRef, useState } from 'react';
import {
  TextInput,
  TextInputKeyPressEvent,
  View,
} from 'react-native';
import { TextField } from './input';


interface Props {
  length: number;
  onOtpChange?: (otp: string) => void;
}

const OtpField: FC<Props> = ({ length, onOtpChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (onOtpChange) onOtpChange(newOtp.join(''));

      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: TextInputKeyPressEvent,
    index: number
  ) => {
    const key = (e.nativeEvent as any)?.key;
    if (key === 'Backspace') {
      if (index >= 0) {
        if (index > 0) inputs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        if (onOtpChange) onOtpChange(newOtp.join(''));
      }
    }
  };

  return (
    <View className="flex flex-row gap-3">
      {otp.map((digit, index) => (
        <TextField
          className="flex-1"
          key={index}
          InputRef={(ref) => {
            inputs.current[index] = ref;
          }}
          InputProps={{
            keyboardType: 'number-pad',
            maxLength: 1,
            value: digit,
            onChangeText: (text) => handleChange(text, index),
            onKeyPress: (e) => handleKeyPress(e, index),
            autoFocus: index === 0,
            className: "h-[65]"
          }}
        />
      ))}
    </View>
  );
};

export default OtpField;

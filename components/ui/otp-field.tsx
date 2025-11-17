// import React, { FC, useRef, useState } from 'react';
// import {
//   TextInput,
//   TextInputKeyPressEvent,
//   View,
// } from 'react-native';
// import { TextField } from './input';


// interface Props {
//   length: number;
//   onOtpChange?: (otp: string) => void;
// }

// const OtpField: FC<Props> = ({ length, onOtpChange }) => {
//   const [otp, setOtp] = useState(Array(length).fill(''));
//   const inputs = useRef<(TextInput | null)[]>([]);

//   const handleChange = (text: string, index: number) => {
//     // Handle multi-character paste
//     if (text.length > 1) {
//       // Extract only digits and limit to available slots
//       const digits = text.replace(/\D/g, '').split('').slice(0, length - index);
//       const newOtp = [...otp];
      
//       // Fill fields starting from current index
//       // First digit goes to current field, rest to subsequent fields
//       digits.forEach((digit, i) => {
//         const targetIndex = index + i;
//         if (targetIndex < length) {
//           newOtp[targetIndex] = digit;
//         }
//       });
      
//       setOtp(newOtp);
//       if (onOtpChange) onOtpChange(newOtp.join(''));
      
//       // Focus on the next empty field or blur if all filled
//       const nextIndex = index + digits.length;
//       if (nextIndex < length) {
//         inputs.current[nextIndex]?.focus();
//       } else {
//         // Blur the last field if all fields are filled
//         inputs.current[length - 1]?.blur();
//       }
//       return;
//     }
    
//     // Handle single character input
//     if (/^\d$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);
//       if (onOtpChange) onOtpChange(newOtp.join(''));

//       if (index < length - 1) {
//         inputs.current[index + 1]?.focus();
//       }
//     } else if (text === '') {
//       // Handle clearing (backspace)
//       const newOtp = [...otp];
//       newOtp[index] = '';
//       setOtp(newOtp);
//       if (onOtpChange) onOtpChange(newOtp.join(''));
//     }
//   };

//   const handleKeyPress = (
//     e: TextInputKeyPressEvent,
//     index: number
//   ) => {
//     const key = (e.nativeEvent as any)?.key;
//     if (key === 'Backspace') {
//       if (index >= 0) {
//         if (index > 0) inputs.current[index - 1]?.focus();
//         const newOtp = [...otp];
//         newOtp[index] = '';
//         setOtp(newOtp);
//         if (onOtpChange) onOtpChange(newOtp.join(''));
//       }
//     }
//   };

//   return (
//     <View className="flex flex-row gap-3">
//       {otp.map((digit, index) => (
//         <TextField
//           className="flex-1"
//           key={index}
//           InputRef={(ref) => {
//             inputs.current[index] = ref;
//           }}
//           InputProps={{
//             keyboardType: 'number-pad',
//             textContentType: "oneTimeCode",
//             value: digit,
//             onChangeText: (text) => handleChange(text, index),
//             onKeyPress: (e) => handleKeyPress(e, index),
//             autoFocus: index === 0,
//             className: "h-[65]"
//           }}
//         />
//       ))}
//     </View>
//   );
// };

// export { OtpField };

import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import {
  TextInput,
  TextInputKeyPressEvent,
  View
} from 'react-native';
import { TextField } from './input';

interface Props {
  length: number;
  onOtpChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
}

export interface OtpFieldHandle {
  focus: () => void;
  clear: () => void;
}

const OtpField = forwardRef<OtpFieldHandle, Props>(
  ({ length, onOtpChange, onComplete, autoFocus = false }, ref) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<(TextInput | null)[]>([]);
    const isProcessingPaste = useRef(false);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputs.current[0]?.focus();
      },
      clear: () => {
        setOtp(Array(length).fill(""));
        onOtpChange?.("");
      },
    }));

    const updateOtp = useCallback(
      (newOtp: string[]) => {
        setOtp(newOtp);
        const otpString = newOtp.join('');
        onOtpChange?.(otpString);
        
        // Call onComplete if all fields are filled
        if (otpString.length === length && !otpString.includes("")) {
          onComplete?.(otpString);
        }
      },
      [length, onOtpChange, onComplete]
    );

    const focusInput = useCallback((index: number) => {
      // Small delay to ensure state updates are processed
      requestAnimationFrame(() => {
        inputs.current[index]?.focus();
      });
    }, []);

    const handleChange = useCallback((text: string, index: number) => {
      // Prevent processing if we're already handling a paste
      if (isProcessingPaste.current) {
        return;
      }

      // Handle paste with multiple characters
      if (text.length > 1) {
        isProcessingPaste.current = true;
        
        // Extract only digits
        const digits = text.replace(/\D/g, '').split('');
        const newOtp = [...otp];
        
        // Calculate how many digits we can fill from current position
        const availableSlots = length - index;
        const digitsToFill = digits.slice(0, availableSlots);
        
        // Fill fields starting from current index
        digitsToFill.forEach((digit, i) => {
          newOtp[index + i] = digit;
        });
        
        updateOtp(newOtp);
        
        // Focus management after paste
        const nextEmptyIndex = newOtp.findIndex((val, i) => i >= index && val === '');
        const targetIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
        
        // Use timeout to allow state to settle before focusing
        setTimeout(() => {
          if (targetIndex < length) {
            focusInput(targetIndex);
          } else {
            inputs.current[length - 1]?.blur();
          }
          isProcessingPaste.current = false;
        }, 0);
        
        return;
      }
      
      // Handle single character input
      const newOtp = [...otp];
      
      if (/^\d$/.test(text)) {
        // Valid digit entered
        newOtp[index] = text;
        updateOtp(newOtp);
        
        // Auto-advance to next field
        if (index < length - 1) {
          focusInput(index + 1);
        } else {
          // Blur on last field when filled
          inputs.current[index]?.blur();
        }
      } else if (text === '') {
        // Handle manual clear
        newOtp[index] = '';
        updateOtp(newOtp);
      }
    }, [otp, length, updateOtp, focusInput]);

    const handleKeyPress = useCallback((
      e: TextInputKeyPressEvent,
      index: number
    ) => {
      const key = e.nativeEvent.key;
      
      if (key === 'Backspace') {
        const newOtp = [...otp];
        
        if (otp[index] !== '') {
          // Clear current field if it has value
          newOtp[index] = '';
          updateOtp(newOtp);
        } else if (index > 0) {
          // Move to previous field and clear it
          newOtp[index - 1] = '';
          updateOtp(newOtp);
          focusInput(index - 1);
        }
      }
    }, [otp, updateOtp, focusInput]);

    const handleFocus = useCallback((index: number) => {
      // Select the text when focusing to make it easier to replace
      inputs.current[index]?.setNativeProps({ selection: { start: 0, end: 1 } });
    }, []);

    return (
      <View className="flex flex-row gap-3">
        {otp.map((digit, index) => (
          <TextField
            className="flex-1 border-red-500 border-1"
            key={index}
            InputRef={(ref) => {
              inputs.current[index] = ref;
            }}
            InputProps={{
              keyboardType: 'number-pad',
              textContentType: 'oneTimeCode',
              value: digit,
              onChangeText: (text) => handleChange(text, index),
              onKeyPress: (e) => handleKeyPress(e, index),
              onFocus: () => handleFocus(index),
              autoFocus: autoFocus && index === 0,
              // maxLength: 1,
              selectTextOnFocus: true,
              returnKeyType: index === length - 1 ? 'done' : 'next',
              blurOnSubmit: index === length - 1,
              className: 'h-[65] px-2.5 text-center border-1 border-blue-500',
            }}
          />
        ))}
      </View>
    );
  }
);

OtpField.displayName = "OtpField";

export { OtpField };


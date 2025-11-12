import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

// Define the props for your custom Text component
interface AppTextProps extends TextProps {
  className?: string;
  color?: string;
  font?: string;
  fontWeight?: 'normal' | 'bold' | 'medium' | 'light';
}
export const Text: React.FC<AppTextProps> = ({
  className = '',
  color,
  font,
  style,
  children,
  fontWeight = 'normal',
  ...props
}) => {
  const baseClasses = cn(
    'text-[#2F3036CC]',
    fontWeight === 'normal' && 'font-inter',
    fontWeight === 'bold' && 'font-interBold',
    fontWeight === 'medium' && 'font-interMedium',
    fontWeight === 'light' && 'font-interLight',
    font ? font : ''
  );

  const combinedClasses = clsx(baseClasses, className);

  return (
    <RNText
      className={combinedClasses}
      style={[style, color && color.startsWith('#') ? { color } : {}]}
      {...props}
    >
      {children}
    </RNText>
  );
};

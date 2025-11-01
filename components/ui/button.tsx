import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
    Pressable,
    type PressableStateCallbackType,
    type PressableProps as RNPressableProps,
    Text,
    View,
    type ViewStyle,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export const buttonVariants = cva(
  'flex-row items-center justify-center rounded-lg',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm',
        outline: 'border border-grey-300 bg-transparent text-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm',
        ghost: 'text-foreground',
        link: 'text-primary underline',
        selection: 'border-2 border-border bg-background',
      },
      size: {
        default: 'h-12 px-4',
        sm: 'h-10 px-3',
        lg: 'h-16 px-6',
        icon: 'h-12 w-12',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'selection',
        selected: true,
        className: 'border-primary bg-primary/5',
      },
      {
        variant: 'outline',
        selected: true,
        className: 'border-primary ring-1 ring-primary/20',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      selected: false,
    },
  }
);

export interface ButtonProps
  extends Omit<RNPressableProps, 'style'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  style?: ViewStyle;
  asChild?: boolean;
  selected?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      selected,
      asChild = false,
      children,
      loading,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);

    return (
      <Pressable
        className={cn(buttonVariants({ variant, size, selected, className }))}
        ref={ref}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        {...props}
      >
        {(state: PressableStateCallbackType) => (
          <View
            className={`flex-row items-center justify-center gap-2 ${
              state.pressed || isPressed ? 'opacity-80' : ''
            }`}
          >
            {loading ? (
              <>
                <FontAwesome
                  name="spinner"
                  size={18}
                  className="animate-spin"
                  color={'white'}
                />
              </>
            ) : (
              <>
                {typeof children === 'string' ? (
                  <Text className="text-white font-[500]">{children}</Text>
                ) : typeof children === 'function' ? (
                  children(state)
                ) : (
                  children
                )}
              </>
            )}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button };

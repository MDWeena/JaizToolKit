import { cn } from '@/lib/utils';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: '',
  onValueChange: () => {},
});

const Tabs = React.forwardRef<View, TabsProps>(
  ({ defaultValue, value, onValueChange, children, className }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(
      value || defaultValue || ''
    );

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setSelectedValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    return (
      <TabsContext.Provider
        value={{
          value: selectedValue,
          onValueChange: handleValueChange,
        }}
      >
        <View ref={ref} className={cn('w-full', className)}>
          {children}
        </View>
      </TabsContext.Provider>
    );
  }
);

const TabsList = React.forwardRef<View, TabsListProps>(
  ({ children, className }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'flex-row items-center justify-center rounded-xl bg-grey-200 p-2',
          'h-14',
          className
        )}
      >
        {children}
      </View>
    );
  }
);

const TabsTrigger = React.forwardRef<View, TabsTriggerProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue, onValueChange } =
      React.useContext(TabsContext);
    const isSelected = selectedValue === value;

    return (
      <Pressable
        ref={ref}
        onPress={() => onValueChange(value)}
        className={cn(
          'flex-1 items-center justify-center rounded-lg px-3 h-full',
          isSelected ? 'bg-grey-0' : 'bg-transparent',
          className
        )}
      >
        <Text
          className={cn(
            'text-primary font-medium',
            isSelected ? 'text-grey-900' : 'text-grey-600'
          )}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

const TabsContent = React.forwardRef<View, TabsContentProps>(
  ({ value, children, className }, ref) => {
    const { value: selectedValue } = React.useContext(TabsContext);
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    return (
      <View ref={ref} className={cn('mt-4', className)}>
        {children}
      </View>
    );
  }
);

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, TabsList, TabsTrigger };

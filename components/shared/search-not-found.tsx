import { ErrorIcon } from '@/assets/images/svgs/warning';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Text, View } from 'react-native';

interface SearchNotFoundProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  suggestions?: string;
  hideResult?: boolean;
  hideBackButton?: boolean;
}

export const SearchNotFound: React.FC<SearchNotFoundProps> = ({
  searchQuery = '',
  setSearchQuery,
  suggestions = "Sorry, we can't find what you are looking for. Maybe, a little spelling mistake?",
  hideBackButton,
  hideResult,
}) => {
  return (
    <>
      {searchQuery && !hideResult && (
        <Text className=" text-darkGray">
          Search result{' '}
          <Text className="font-interBold !text-primary">
            &apos;{searchQuery}&apos;
          </Text>
        </Text>
      )}

      <View className="items-center">
        <ErrorIcon />

        <Text className="mb-3 text-2xl text-center font-interMedium">
          Search <Text className="text-2xl font-interBold">not found</Text>
        </Text>

        {suggestions && (
          <View className="w-4/5 mt-2">
            <Text className="text-sm leading-normal text-center text-gray-600">
              {suggestions}
            </Text>
          </View>
        )}
      </View>
      {!hideBackButton && (
        <Button
          className="mt-20"
          onPress={() => setSearchQuery && setSearchQuery('')}
        >
          <Text className="text-primary-foreground">Back to Home</Text>
        </Button>
      )}
    </>
  );
};

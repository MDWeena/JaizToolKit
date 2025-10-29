import React from "react";
import { Text, View } from "react-native";
import { Button } from "@/components/ui/button";
import ErrorIcon from "@/assets/images/svgs/warning";

interface SearchNotFoundProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  suggestions?: string;
}

export const SearchNotFound: React.FC<SearchNotFoundProps> = ({
  searchQuery = "",
  setSearchQuery,
  suggestions = "Sorry, we can't find what you are looking for. Maybe, a little spelling mistake?",
}) => {
  return (
    <>
      {searchQuery && (
        <Text className=' text-darkGray'>
          Search result{" "}
          <Text className='font-bold !text-primary'>
            &apos;{searchQuery}&apos;
          </Text>
        </Text>
      )}

      <View className='items-center'>
        <ErrorIcon />

        <Text className='mb-4 text-2xl font-medium text-center'>
          Search{" "}
          <Text className='text-2xl font-bold'>not found</Text>
        </Text>

        <View className='w-4/5 mt-2'>
          <Text className='text-sm leading-normal text-center text-gray-600'>
            {suggestions}
          </Text>
        </View>
      </View>
      <Button
        className='mt-20'
        onPress={() => setSearchQuery && setSearchQuery("")}
      >
        <Text className='text-primary-foreground'>Back to Home</Text>
      </Button>
    </>
  );
};

import {
  BackButton,
  Header,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { Collapsible, Text } from '@/components/ui';
import Chip from '@/components/ui/chip';
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { faqsData } from '@/constants/data';
import { useSearch } from '@/hooks/useSearch';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQScreen = () => {
  const [faqs, setFaqs] = useState(faqsData);
  const [category, setCategory] = useState<string | null>('All');
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredFaqs,
    hasResults,
    hasQuery,
  } = useSearch(faqs, {
    searchFields: ['question', 'answer', 'categories'],
  });

  const categories = useMemo(() => {
    const categories: string[] = ['All'];

    faqsData.forEach((faq) => {
      faq.categories.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });
    return categories;
  }, []);

  useEffect(() => {
    if (category && category.toLowerCase() !== 'all') {
      const filteredFaqs = faqsData.filter((faq) =>
        faq.categories
          .map((cat) => cat.toLowerCase())
          .includes(category.toLowerCase())
      );
      setFaqs(filteredFaqs);
    } else {
      setFaqs(faqsData);
    }
  }, [category]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <BackButton />

      <ScrollView className="flex-1 px-5">
        <Header title="FAQs" />
        <SearchBar
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          horizontal={true}
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="gap-2"
          renderItem={({ item }) => (
            <Chip
              text={item}
              onSelect={() => setCategory(item)}
              isSelected={category === item}
            />
          )}
        />

        {hasQuery && !hasResults ? (
          <View className="mt-10">
            <SearchNotFound hideBackButton hideResult />
          </View>
        ) : (
          <FlatList
            data={filteredFaqs}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName="pb-10"
            className="mt-4"
            renderItem={({ item }) => (
              <>
                <Collapsible className="mb-3">
                  <CollapsibleTrigger className="bg-white">
                    <Text className="text-lg" fontWeight="bold">
                      {item.question}
                    </Text>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="px-5 pb-5 bg-white">
                    <Text className="flex-1 text-sm leading-normal text-secondary-foreground">
                      {item.answer}
                    </Text>
                  </CollapsibleContent>
                </Collapsible>
              </>
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;

import {
  BackButton,
  Header,
  SearchBar,
  SearchNotFound,
} from '@/components/shared';
import { Button, Checkbox, Text } from '@/components/ui';
import Chip from '@/components/ui/chip';
import { formsData } from '@/constants/data';
import { useBottomSheet } from '@/contexts/BottomSheetContext';
import { useSearch } from '@/hooks/useSearch';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SendFormSheet from './send-form-sheet';

const FormsScreen = () => {
  const { showBottomSheet } = useBottomSheet();
  const [forms, setForms] = useState(formsData);
  const [formsToBeSent, setFormsToBeSent] = useState<typeof formsData>([]);
  const [category, setCategory] = useState<string | null>('All');
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredForms,
    hasResults,
    hasQuery,
  } = useSearch(forms, {
    searchFields: ['name', 'categories'],
  });

  const categories = useMemo(() => {
    const categories: string[] = ['All'];

    formsData.forEach((faq) => {
      faq.categories.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });
    return categories;
  }, []);

  const toggleSelection = (form: (typeof formsData)[0]) => {
    const isSelected = formsToBeSent.find((f) => f.id === form.id);
    if (isSelected)
      setFormsToBeSent((prev) => prev.filter((f) => f.id != form.id));
    else setFormsToBeSent((prev) => [...prev, form]);
  };

  useEffect(() => {
    if (category && category.toLowerCase() !== 'all') {
      const filteredForms = formsData.filter((faq) =>
        faq.categories
          .map((cat) => cat.toLowerCase())
          .includes(category.toLowerCase())
      );
      setForms(filteredForms);
    } else {
      setForms(formsData);
    }
  }, [category]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />
      <BackButton />

      <View className="flex-1 px-5">
        <Header title="Forms" />
        <SearchBar
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View className="max-w-fit">
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
        </View>
        <View className="flex-1">
          {hasQuery && !hasResults ? (
            <View className="mt-10">
              <SearchNotFound hideBackButton hideResult />
            </View>
          ) : (
            <FlatList
              data={filteredForms}
              keyExtractor={(item) => item.id.toString()}
              contentContainerClassName="pb-10 gap-4"
              className="mt-4"
              renderItem={({ item }) => {
                const isFormSelected = formsToBeSent.find(
                  (f) => f.id === item.id
                );

                return (
                  <Pressable
                    onPress={() => toggleSelection(item)}
                    className="flex items-center gap-2 flex-row border bg-white p-4 rounded-lg border-gray-300"
                  >
                    <Checkbox
                      className="!border-gray-300"
                      checked={!!isFormSelected}
                      onPress={() => toggleSelection(item)}
                    />
                    <Text>{item.name}</Text>
                  </Pressable>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <Button
          onPress={() => showBottomSheet(<SendFormSheet />)}
          disabled={formsToBeSent.length === 0}
          className="mt-8"
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FormsScreen;

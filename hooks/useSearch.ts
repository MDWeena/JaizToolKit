import { useEffect, useMemo, useState } from 'react';

export interface SearchableItem {
  text?: string;
  keywords?: string[];
  [key: string]: any;
}

interface UseSearchOptions<T> {
  searchFields?: (keyof T & keyof SearchableItem)[];
  caseSensitive?: boolean;
}

export function useSearch<T extends SearchableItem>(
  items: T[],
  options: UseSearchOptions<T> = {}
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the raw search query to avoid filtering on every keystroke
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(handle);
  }, [searchQuery]);

  const { searchFields = ['text', 'keywords'], caseSensitive = false } =
    options;

  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;

    const query = caseSensitive
      ? debouncedQuery.trim()
      : debouncedQuery.toLowerCase().trim();

    return items.filter((item) => {
      return searchFields.some((field) => {
        if (field === 'text') {
          const text = caseSensitive ? item.text : item.text?.toLowerCase();
          return text?.includes(query);
        }

        if (field === 'keywords' && item.keywords) {
          return item.keywords.some((keyword) => {
            const keywordText = caseSensitive ? keyword : keyword.toLowerCase();
            return keywordText.includes(query);
          });
        }

        if (typeof item[field] === 'string') {
          const fieldText = caseSensitive
            ? (item[field] as string)
            : (item[field] as string)?.toLowerCase();
          return fieldText.includes(query);
        }

        if (Array.isArray(item[field])) {
          return (item[field] as string[]).some((val) => {
            const valText = caseSensitive ? val : val.toLowerCase();
            return valText.includes(query);
          });
        }

        return false;
      });
    });
  }, [items, debouncedQuery, searchFields, caseSensitive]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
    hasQuery: debouncedQuery.trim().length > 0,
  };
}

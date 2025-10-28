import { useMemo, useState } from 'react';

interface SearchableItem {
  text: string;
  keywords?: string[];
}

interface UseSearchOptions {
  searchFields?: (keyof SearchableItem)[];
  caseSensitive?: boolean;
}

export function useSearch<T extends SearchableItem>(
  items: T[],
  options: UseSearchOptions = {}
) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const {
    searchFields = ['text', 'keywords'],
    caseSensitive = false
  } = options;

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    const query = caseSensitive 
      ? searchQuery.trim() 
      : searchQuery.toLowerCase().trim();

    return items.filter((item) => {
      return searchFields.some(field => {
        if (field === 'text') {
          const text = caseSensitive ? item.text : item.text.toLowerCase();
          return text.includes(query);
        }
        
        if (field === 'keywords' && item.keywords) {
          return item.keywords.some(keyword => {
            const keywordText = caseSensitive ? keyword : keyword.toLowerCase();
            return keywordText.includes(query);
          });
        }
        
        return false;
      });
    });
  }, [items, searchQuery, searchFields, caseSensitive]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
    hasResults: filteredItems.length > 0,
    hasQuery: searchQuery.trim().length > 0,
  };
}

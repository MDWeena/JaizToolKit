import { StarredItem } from "@/types/page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface StarredContextType {
  starredItems: StarredItem[];
  isStarred: (text: string) => boolean;
  toggleStar: (item: StarredItem) => Promise<void>;
  clearAll: () => Promise<void>;
  loading: boolean;
}

const StarredContext = createContext<StarredContextType | undefined>(undefined);

const STORAGE_KEY = "@starred_items";

// Helper function to normalize text (lowercase, no spaces)
const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, "");
};

export const StarredProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [starredItems, setStarredItems] = useState<StarredItem[]>([]);
  const [loading, setLoading] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load starred items on mount
  useEffect(() => {
    loadStarredItems();
  }, []);

  const loadStarredItems = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setStarredItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading starred items:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveStarredItems = (items: StarredItem[]) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        // Exclude icon from storage since React components can't be serialized
        const itemsToStore = items.map(({ icon, ...rest }) => rest);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itemsToStore));
      } catch (error) {
        console.error("Error saving starred items:", error);
      }
    }, 200);
  };

  const isStarred = (text: string): boolean => {
    const normalizedText = normalizeText(text);
    return starredItems.some(
      (item) => normalizeText(item.text) === normalizedText
    );
  };

  const toggleStar = async (item: StarredItem) => {
    setStarredItems((prevItems) => {
      const normalizedItemText = normalizeText(item.text);
      const isCurrentlyStarred = prevItems.some(
        (starred) => normalizeText(starred.text) === normalizedItemText
      );
      let newItems: StarredItem[];

      if (isCurrentlyStarred) {
        newItems = prevItems.filter(
          (starred) => normalizeText(starred.text) !== normalizedItemText
        );
      } else {
        newItems = [item, ...prevItems];
      }

      saveStarredItems(newItems);
      return newItems;
    });
  };

  const clearAll = async () => {
    setStarredItems([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <StarredContext.Provider
      value={{
        starredItems,
        isStarred,
        toggleStar,
        clearAll,
        loading,
      }}
    >
      {children}
    </StarredContext.Provider>
  );
};

export const useStarred = () => {
  const context = useContext(StarredContext);
  if (!context) {
    throw new Error("useStarred must be used within a StarredProvider");
  }
  return context;
};

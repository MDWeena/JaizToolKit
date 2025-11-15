import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { usePathname } from 'expo-router';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from './ThemeContext';

type CornerRadiusOption = 'large' | 'medium' | 'small';

interface ShowOptions {
  cornerRadius?: CornerRadiusOption;
  snapPoints?: string[];
}

interface BottomSheetContextType {
  showBottomSheet: (component: ReactNode, options?: ShowOptions) => void;
  hideBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [snapPoints, setSnapPoints] = useState<string[]>(['25%', '50%']);
  const [bottomSheetComponent, setBottomSheetComponent] = useState<ReactNode>();
  const [options, setOptions] = useState<ShowOptions>({});

  const showBottomSheet = useCallback(
    (component: ReactNode, showOptions?: ShowOptions): void => {
      const opts = showOptions ?? { cornerRadius: 'large' };
      setOptions(opts);
      if (opts.snapPoints) {
        setSnapPoints(opts.snapPoints);
      } else {
        setSnapPoints(['25%', '50%']); // Default
      }
      setBottomSheetComponent(component);
      bottomSheetRef.current?.expand();
    },
    []
  );

  const hideBottomSheet = useCallback((): void => {
    setBottomSheetComponent(undefined);
    bottomSheetRef.current?.close();
  }, []);

  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    // If pathname changed and bottom sheet is open, close it
    if (prevPathnameRef.current !== pathname && bottomSheetComponent) {
      hideBottomSheet();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, bottomSheetComponent, hideBottomSheet]);

  const contextValue: BottomSheetContextType = useMemo(
    () => ({
      showBottomSheet,
      hideBottomSheet,
    }),
    [showBottomSheet, hideBottomSheet]
  );
  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: isDark ? '#181820' : '#ffffff',
          borderTopLeftRadius:
            options.cornerRadius === 'large'
              ? 50
              : options.cornerRadius === 'medium'
                ? 30
                : undefined,
          borderTopRightRadius:
            options.cornerRadius === 'large'
              ? 50
              : options.cornerRadius === 'medium'
                ? 30
                : undefined,
        }}
        handleIndicatorStyle={{
          backgroundColor: isDark ? '#53587a' : '#dde0e1',
        }}
        containerStyle={{
          backgroundColor: bottomSheetComponent ? 'rgba(0,0,0,0.5)' : undefined,
        }}
        onClose={() => {
          setBottomSheetComponent(undefined);
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
      >
        <BottomSheetView className="flex-1 px-6 py-4 max-h-[90vh]">
          {bottomSheetComponent}
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

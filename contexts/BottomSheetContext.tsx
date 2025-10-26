import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

interface BottomSheetContextType {
  showBottomSheet: (component: ReactNode) => void;
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [bottomSheetComponent, setBottomSheetComponent] = useState<ReactNode>();

  const showBottomSheet = useCallback((component: ReactNode): void => {
    setBottomSheetComponent(component);
    bottomSheetRef.current?.expand();
  }, []);

  const hideBottomSheet = useCallback((): void => {
    setBottomSheetComponent(undefined);
    bottomSheetRef.current?.close();
  }, []);

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
        style={{ borderRadius: 300 }}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
        handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}
        containerStyle={{
          backgroundColor: bottomSheetComponent ? 'rgba(0,0,0,0.5)' : undefined,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
            onPress={() => setBottomSheetComponent(undefined)}
          />
        )}
      >
        <BottomSheetView
          style={{ borderRadius: 300 }}
          className="flex-1 px-6 py-4 !rounded-3xl"
        >
          {bottomSheetComponent}
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

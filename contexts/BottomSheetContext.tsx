import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type CornerRadiusOption = "large" | "medium" | "small";

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
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
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
  const [snapPoints, setSnapPoints] = useState<string[]>(["25%", "50%"]);
  const [bottomSheetComponent, setBottomSheetComponent] = useState<ReactNode>();
  const [options, setOptions] = useState<ShowOptions>({});

  const showBottomSheet = useCallback(
    (component: ReactNode, showOptions?: ShowOptions): void => {
      const opts = showOptions ?? { cornerRadius: "large" };
      setOptions(opts);
      if (opts.snapPoints) {
        setSnapPoints(opts.snapPoints);
      } else {
        setSnapPoints(["25%", "50%"]); // Default
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
          backgroundColor: "#ffffff",
          borderTopLeftRadius:
            options.cornerRadius === "large" ? 50 : options.cornerRadius === "medium" ? 30 : undefined,
          borderTopRightRadius:
            options.cornerRadius === "large" ? 50 : options.cornerRadius === "medium" ? 30 : undefined,
        }}
        handleIndicatorStyle={{ backgroundColor: "#d1d5db" }}
        containerStyle={{
          backgroundColor: bottomSheetComponent ? "rgba(0,0,0,0.5)" : undefined,
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
        <BottomSheetView className="flex-1 px-6 py-4">
          {bottomSheetComponent}
        </BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

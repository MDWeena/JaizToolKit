import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Animated, Pressable, Text, View } from "react-native";

type ToastPosition = "top" | "bottom";

interface ToastProps {
  message: string;
  linkText: string;
  onLinkPress: () => void;
  onDismiss: () => void;
  duration?: number;
  position?: ToastPosition;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  linkText,
  onLinkPress,
  onDismiss,
  duration = 3000,
  position = "top",
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onDismiss();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const positionStyle = position === "top" 
    ? { top: 60 }
    : { bottom: 100 };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        position: "absolute",
        ...positionStyle,
        left: 20,
        right: 20,
        zIndex: 9999,
      }}
    >
      <View className="p-4 bg-white shadow-lg rounded-2xl">
        <View className="flex-row items-center gap-3">
          <View className="flex-1">
            <Text className="text-sm text-gray-600">{message}</Text>
          </View>
          <Pressable onPress={onLinkPress}>
            <Text className="text-sm font-semibold text-error">
              {linkText}
            </Text>
          </Pressable>
          <Pressable onPress={onDismiss}>
            <Ionicons name="close" size={20} color="#9CA3AF" />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

interface ToastContextType {
  showToast: (props: Omit<ToastProps, "onDismiss">) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = React.useState<Omit<ToastProps, "onDismiss"> | null>(null);

  const showToast = (props: Omit<ToastProps, "onDismiss">) => {
    setToast(props);
  };

  const dismissToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          {...toast}
          onDismiss={dismissToast}
          position={toast.position || "top"}
        />
      )}
    </ToastContext.Provider>
  );
};


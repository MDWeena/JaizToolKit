import { cn } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Animated, Pressable, Text, View } from "react-native";

type ToastPosition = "top" | "bottom";

interface ToastProps {
  message: string;
  linkText?: string;
  onLinkPress?: () => void;
  onDismiss: () => void;
  duration?: number;
  position?: ToastPosition;
  type?: "default" | "info" | "success" | "error" | "warning";
  icon?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  linkText,
  onLinkPress,
  onDismiss,
  duration = 3000,
  position = "top",
  type = "default",
  icon = false,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        onDismiss();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const positionStyle = position === "top" 
    ? { top: 60 }
    : { bottom: 110 };

  const containerColor = type === "default" ? "bg-gray-200 border-gray-200" : type === "info" ? "border-primary/40 bg-blue-100" : type === "success" ? "border-success/40 bg-green-100" : type === "error" ? "border-error/40 bg-red-100" : "bg-gray-200 border-gray-200";
  const textColor = type === "default" ? "text-gray-600" : type === "info" ? "text-primary" : type === "success" ? "text-success" : type === "error" ? "text-error" : "text-gray-600";
  const iconColor = type === "default" ? "#9CA3AF" : type === "info" ? "#007AFF" : type === "success" ? "#00C853" : type === "error" ? "#FF0000" : "#9CA3AF"; 
  const iconName = type === "default" ? "information-circle" : type === "info" ? "information-circle" : type === "success" ? "checkmark-circle" : type === "error" ? "alert-circle" : "information-circle"; 
  
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
      <View className={cn("p-4", containerColor, "border rounded-2xl")}>
        <View className="flex-row items-center gap-3">
          {icon && <Ionicons name={iconName} size={20} color={iconColor} />}
          <View className="flex-1">
            <Text className={cn("text-sm", textColor)}>{message}</Text>
          </View>
          <Pressable onPress={onLinkPress}>
            <Text className="text-sm font-semibold text-error">
              {linkText}
            </Text>
          </Pressable>
          <Pressable onPress={onDismiss}>
            <Ionicons name="close" size={20} color={iconColor} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

interface ToastContextType {
  showToast: (props: Omit<ToastProps, "onDismiss">) => void;
  dismissToast: () => void;
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
    <ToastContext.Provider value={{ showToast, dismissToast }}>
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


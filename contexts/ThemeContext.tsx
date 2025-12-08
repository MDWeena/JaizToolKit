import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { View, useColorScheme as useSystemColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from "@/lib/theme";
import { StatusBar } from "expo-status-bar";

const THEME_STORAGE_KEY = '@app_theme_preference';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
    theme: ThemeMode;
    setTheme: (m: ThemeMode) => void;
    colorScheme: 'light' | 'dark';
    toggleTheme: () => void;
    isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const system = useSystemColorScheme() ?? 'light';
    const [theme, setThemeState] = useState<ThemeMode>('light');
    const [isLoading, setIsLoading] = useState(true);

    // Load theme preference on mount
    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
                setThemeState(savedTheme as ThemeMode);
            }
        } catch (error) {
            console.error('Failed to load theme preference:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setTheme = async (newTheme: ThemeMode) => {
        try {
            setThemeState(newTheme);
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    const colorScheme = theme === 'system' ? system : theme;
    const isDark = colorScheme === 'dark';
    const navTheme = isDark ? DarkTheme : DefaultTheme;

    const toggleTheme = () => {
        const nextTheme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
        setTheme(nextTheme);
    };

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            colorScheme: colorScheme as 'light' | 'dark',
            toggleTheme,
            isLoading,
        }),
        [theme, colorScheme, isLoading]
    );

    // Show nothing or a splash screen while loading theme preference
    if (isLoading) {
        return null; // Or return a splash screen component
    }

    return (
        <ThemeContext.Provider value={value}>
            <NavThemeProvider value={navTheme}>
                <StatusBar style="dark" />
                <View style={themes[colorScheme]} className={`flex-1 ${isDark ? 'dark' : ''}`}>
                    {children}
                </View>
            </NavThemeProvider>
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
}
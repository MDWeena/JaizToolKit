import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary": "0 64 129", // Primary
    "--color-primary-foreground": "255 255 255", // Primary Foreground
    "--color-secondary": "255 192 0", // Orange
    "--color-secondary-foreground": "41 40 50", // Faux Black
    "--color-background": "248 248 250", // Grey Scale/100
    "--color-background-foreground": "41 40 50", // Faux Black
    "--color-grey-0": "255 255 255", // Grey Scale/0
    "--color-grey-200": "240 240 240", // Grey Scale/200
    "--color-grey-300": "221 224 225", // Grey Scale/300
    "--color-grey-600": "156 155 164", // Grey Scale/600
    "--color-grey-medium": "83 88 122", // Grey - Medium
    "--color-grey-900": "24 24 32", // Grey Scale/900
    "--color-error": "231 0 0", // Error/600
    "--color-success": "53 194 32", // Success/600
    "--color-text": "41 40 50", // Faux Black
    "--color-text-foreground": "255 255 255", // Text Foreground
  }),
  dark: vars({
    "--color-primary": "255 255 255", // Primary (white)
    "--color-primary-foreground": "41 40 50", // Primary Foreground (Faux Black)
    "--color-secondary": "255 192 0", // Secondary (same as light)
    "--color-secondary-foreground": "255 255 255", // Secondary Foreground (white)
    "--color-background": "24 24 32", // Grey Scale/900 (dark background)
    "--color-background-foreground": "255 255 255", // Background Foreground (white)
    "--color-grey-0": "24 24 32", // Grey Scale/0 (dark background)
    "--color-grey-200": "83 88 122", // Grey - Medium (lighter grey for dark)
    "--color-grey-300": "83 88 122", // grey Scale/300
    "--color-grey-600": "156 155 164", // Grey Scale/600 (same)
    "--color-grey-medium": "240 240 240", // Grey Scale/200 (lighter for contrast)
    "--color-grey-900": "41 40 50", // Faux Black (deep dark)
    "--color-error": "231 0 0", // Error/600 (same)
    "--color-success": "53 194 32", // Success/600 (same)
    "--color-text": "255 255 255", // Text (white)
    "--color-text-foreground": "41 40 50", // Text Foreground (Faux Black)
  }),
}; 
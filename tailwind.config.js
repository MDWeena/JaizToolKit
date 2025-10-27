/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    './providers/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
    './feaatures/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          foreground: "rgb(var(--color-background-foreground) / <alpha-value>)",
        },
        text: {
          DEFAULT: "rgb(var(--color-text) / <alpha-value>)",
          foreground: "rgb(var(--color-text-foreground) / <alpha-value>)",
        },
        grey: {
          200: "rgb(var(--color-grey-200) / <alpha-value>)",
          600: "rgb(var(--color-grey-600) / <alpha-value>)",
          medium: "rgb(var(--color-grey-medium) / <alpha-value>)",
          900: "rgb(var(--color-grey-900) / <alpha-value>)",
        },
        error: {
          DEFAULT: "rgb(var(--color-error) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--color-success) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": {
          "--color-primary": "0 64 129",
          "--color-primary-foreground": "255 255 255",
          "--color-secondary": "255 192 0",
          "--color-secondary-foreground": "41 40 50",
          "--color-background": "255 255 255",
          "--color-background-foreground": "41 40 50",
          "--color-grey-200": "240 240 240",
          "--color-grey-600": "156 155 164",
          "--color-grey-medium": "83 88 122",
          "--color-grey-900": "24 24 32",
          "--color-error": "231 0 0",
          "--color-success": "53 194 32",
          "--color-text": "41 40 50",
          "--color-text-foreground": "255 255 255",
        }
      })
    }
  ],
}
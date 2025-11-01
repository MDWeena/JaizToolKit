/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    './contexts/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './constants/**/*.{js,jsx,ts,tsx}',

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
          0: "rgb(var(--color-grey-0) / <alpha-value>)",
          200: "rgb(var(--color-grey-200) / <alpha-value>)",
          300: "rgb(var(--color-grey-300) / <alpha-value>)",
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
            fontFamily: {
        inter: ["Inter-Regular", "Inter"], // optionally override `sans`
        interBold: ["Inter-Bold", "Inter"], // optionally override `sans`
        interMedium: ["Inter-Medium", "Inter"], // optionally override `sans`
        interLight: ["Inter-Light", "Inter"], // optionally override `sans`
        interThin: ["Inter-Thin", "Inter"], // optionally override `sans`
        interExtraLight: ["Inter-ExtraLight", "Inter"], // optionally override `sans`
        interExtraBold: ["Inter-ExtraBold", "Inter"], // optionally override `sans`
        interBlack: ["Inter-Black", "Inter"], // optionally override `sans`
        interSemiBold: ["Inter-SemiBold", "Inter"], // optionally override `sans`
        interItalic: ["Inter-Italic", "Inter"], // optionally override `sans`
        interMediumItalic: ["Inter-MediumItalic", "Inter"], // optionally override `sans`
        interBoldItalic: ["Inter-BoldItalic", "Inter"], // optionally override `sans`
        interLightItalic: ["Inter-LightItalic", "Inter"], // optionally override `sans`
        interThinItalic: ["Inter-ThinItalic", "Inter"], // optionally override `sans`
        interExtraLightItalic: ["Inter-ExtraLightItalic", "Inter"], // optionally override `sans`
        interExtraBoldItalic: ["Inter-ExtraBoldItalic", "Inter"], // optionally override `sans`
        interBlackItalic: ["Inter-BlackItalic", "Inter"], // optionally override `sans`
        interSemiBoldItalic: ["Inter-SemiBoldItalic", "Inter"], // optionally override `sans`
        interVariable: ["Inter-Variable", "Inter"], // optionally override `sans`
        interVariableItalic: ["Inter-VariableItalic", "Inter"], // optionally override `sans`
        sans: ["Inter-Regular", "Inter"], // optionally override `sans`
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
          "--color-background": "248 248 250", 
          "--color-background-foreground": "41 40 50", 
          "--color-grey-0": "255 255 255", 
          "--color-grey-200": "240 240 240",
          "--color-grey-300": "221 224 225",
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
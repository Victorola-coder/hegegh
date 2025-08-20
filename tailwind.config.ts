import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004225",
          50: "#F0F9F4",
          100: "#DCF2E3",
          200: "#BBE4C9",
          300: "#8AD0A3",
          400: "#4FB575",
          500: "#2A9D5A",
          600: "#1F7F47",
          700: "#1C653B",
          800: "#1A5132",
          900: "#004225",
        },
        secondary: {
          DEFAULT: "#CFAE35",
          50: "#FEFCF0",
          100: "#FDF7D9",
          200: "#FBEDB3",
          300: "#F8E083",
          400: "#F4D154",
          500: "#F0C23A",
          600: "#E1A51F",
          700: "#BB8319",
          800: "#96681C",
          900: "#CFAE35",
        },
        accent: {
          DEFAULT: "#B8860B",
          50: "#FEFBF0",
          100: "#FDF6D9",
          200: "#FBECB3",
          300: "#F8DD83",
          400: "#F4CA54",
          500: "#F0B23A",
          600: "#E18F1F",
          700: "#BB6B19",
          800: "#96541C",
          900: "#B8860B",
        },
        light: {
          DEFAULT: "#FDFBF7",
          50: "#FFFFFF",
          100: "#FDFBF7",
          200: "#F9F6F0",
          300: "#F5F1E8",
          400: "#F0EBE0",
          500: "#EBE5D8",
          600: "#E6DFD0",
          700: "#E1D9C8",
          800: "#DCD3C0",
          900: "#D7CDB8",
        },
        dark: {
          DEFAULT: "#333333",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#333333",
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"],
        display: ["var(--font-plus-jakarta-sans)"],
        inter: ["var(--font-inter)"],
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "text-shimmer": "text-shimmer 2.5s ease-in-out infinite alternate",
        "background-shine": "background-shine 2s linear infinite",
        "wisdom-sparkle": "wisdom-sparkle 3s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 0 rgba(0, 66, 37, 0.4)",
          },
          "100%": {
            boxShadow: "0 0 20px rgba(0, 66, 37, 0.8)",
          },
        },
        "text-shimmer": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "100% 50%",
          },
        },
        "background-shine": {
          from: {
            backgroundPosition: "200% 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        "wisdom-sparkle": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.1) rotate(180deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        glass:
          "linear-gradient(113.49deg, rgba(255, 255, 255, 0.1) -0.7%, rgba(255, 255, 255, 0.05) 100%)",
        "glass-dark":
          "linear-gradient(113.49deg, rgba(0, 0, 0, 0.1) -0.7%, rgba(0, 0, 0, 0.05) 100%)",
        "gradient-text": "linear-gradient(to right, #004225, #CFAE35, #B8860B)",
        "gradient-border": "linear-gradient(to right, #004225, #CFAE35)",
        shine:
          "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
        "wisdom-pattern": "url('/wisdom-pattern.svg')",
      },
    },
  },
  plugins: [],
};

export default config;

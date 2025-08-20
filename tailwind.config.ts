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
          DEFAULT: "#8B5CF6",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        accent: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        dark: {
          DEFAULT: "#1F2937",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        light: "#FFFFFF",
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
            boxShadow: "0 0 0 rgba(139, 92, 246, 0.4)",
          },
          "100%": {
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.8)",
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
        "gradient-text": "linear-gradient(to right, #8B5CF6, #F59E0B, #10B981)",
        "gradient-border": "linear-gradient(to right, #8B5CF6, #F59E0B)",
        shine:
          "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
        "wisdom-pattern": "url('/wisdom-pattern.svg')",
      },
    },
  },
  plugins: [],
};

export default config;

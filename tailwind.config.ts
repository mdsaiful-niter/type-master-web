import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        panel: {
          DEFAULT: "hsl(var(--panel-bg))",
          border: "hsl(var(--panel-border))",
          header: "hsl(var(--panel-header))",
          "header-fg": "hsl(var(--panel-header-fg))",
        },
        key: {
          DEFAULT: "hsl(var(--key-bg))",
          border: "hsl(var(--key-border))",
          shadow: "hsl(var(--key-shadow))",
          active: "hsl(var(--key-active))",
          "active-fg": "hsl(var(--key-active-fg))",
          error: "hsl(var(--key-error))",
          "error-fg": "hsl(var(--key-error-fg))",
          next: "hsl(var(--key-next))",
        },
        finger: {
          "pinky-left": "hsl(var(--finger-pinky-left))",
          "ring-left": "hsl(var(--finger-ring-left))",
          "middle-left": "hsl(var(--finger-middle-left))",
          "index-left": "hsl(var(--finger-index-left))",
          thumb: "hsl(var(--finger-thumb))",
          "index-right": "hsl(var(--finger-index-right))",
          "middle-right": "hsl(var(--finger-middle-right))",
          "ring-right": "hsl(var(--finger-ring-right))",
          "pinky-right": "hsl(var(--finger-pinky-right))",
        },
        progress: {
          bar: "hsl(var(--progress-bar))",
          bg: "hsl(var(--progress-bg))",
        },
        hand: {
          bg: "hsl(var(--hand-bg))",
          outline: "hsl(var(--hand-outline))",
          highlight: "hsl(var(--finger-highlight))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

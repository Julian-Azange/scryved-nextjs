import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
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
                sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",

                // --- SYLVEN PALETTE ---
                background: "#ececec",
                foreground: "#171717",

                primary: {
                    DEFAULT: "#171717",
                    foreground: "#ffffff",
                    dark: "#000000",
                },

                secondary: {
                    DEFAULT: "#ffffff",
                    foreground: "#171717",
                },

                accent: {
                    DEFAULT: "#D2FF3A", // Lime-yellow accent
                    cyan: "#63E6FF",    // Cyan accent
                    foreground: "#171717",
                },

                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#171717",
                },
                popover: {
                    DEFAULT: "#ffffff",
                    foreground: "#171717",
                },
                muted: {
                    DEFAULT: "#a3a3a3", // Light gray for text
                    foreground: "#525252", // Darker gray text
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
                shine: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                shine: "shine 1.5s infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
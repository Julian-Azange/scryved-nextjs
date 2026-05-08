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
                sans: ["var(--font-poppins)", "Inter Placeholder", "sans-serif"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "#7bcb3b", // Usamos tu verde principal para el anillo de foco

                // --- TU PALETA PERSONALIZADA APLICADA AQUI ---

                // Fondo de la página (Tu antiguo 'primary')
                background: "#02020A",
                foreground: "#ffffff", // Texto blanco sobre fondo oscuro

                // Color Principal - Botones y acciones (Tu antiguo 'accent')
                primary: {
                    DEFAULT: "#7bcb3b",
                    foreground: "#02020A", // Texto oscuro sobre botón verde
                    dark: "#68a932",       // Para hover
                },

                // Color Secundario - Elementos destacados (Tu antiguo 'secondary')
                secondary: {
                    DEFAULT: "#a3e635",
                    foreground: "#02020A",
                    dark: "#84cc16",       // Para hover
                },

                // Tu color personalizado Devil
                devil: {
                    DEFAULT: "#0c0d0c",
                    dark: "#0c0d0c",
                },

                // Un color oscuro extra para tarjetas o menús (Tu antiguo 'primary-dark')
                card: {
                    DEFAULT: "#0c0d0c", // Usando tu tono devil/dark como base de tarjetas
                    foreground: "#ffffff",
                },
                popover: {
                    DEFAULT: "#010105", // Tu antiguo 'primary-dark'
                    foreground: "#ffffff",
                },

                // Colores de sistema (Mantenemos los defaults o los oscurecemos)
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "#1a1a20", // Un gris oscuro para texto secundario
                    foreground: "#a1a1aa",
                },
                accent: {
                    DEFAULT: "#1a1a20", // Para efectos hover en listas
                    foreground: "#ffffff",
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
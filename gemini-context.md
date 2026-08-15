# Contexto del Proyecto: Scryved-Next

Este documento sirve para poner en contexto a Gemini (o cualquier otro asistente de IA) sobre el estado actual, las tecnologías y la arquitectura del proyecto `scryved-next`.

## 🛠 Stack Tecnológico y Dependencias Principales

- **Framework:** Next.js 16.1.1 (App Router)
- **Librería UI:** React 19.2.3
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 3.4.1 (con `tailwindcss-animate`, `tailwind-merge`, `clsx`, `class-variance-authority`)
- **Componentes UI:** Radix UI Primitives (Dialog, Dropdown Menu, Separator, Slot)
- **Animaciones e Interacciones:** 
  - `framer-motion` (Animaciones)
  - `lenis` (Smooth scrolling)
- **Mapas y 3D:** 
  - `mapbox-gl` / `maplibre-gl` (Mapas)
  - `three` (Three.js para 3D)
  - `vanta` (Fondos animados/3D)
- **Internacionalización (i18n):** `next-intl`
- **Iconografía:** `lucide-react`
- **Temas:** `next-themes` (Modo claro/oscuro)

## 📁 Estructura del Proyecto

El proyecto sigue una estructura moderna de Next.js utilizando el directorio `src`:

```
scryved-next/
├── src/
│   ├── app/
│   │   ├── [locale]/     # Rutas internacionalizadas (App Router)
│   │   ├── robots.ts     # Configuración de SEO
│   │   └── sitemap.ts    # Configuración de SEO
│   ├── components/
│   │   ├── icons/        # Iconos SVG o componentes de iconos
│   │   ├── layout/       # Componentes de estructura (Header, Footer, etc.)
│   │   ├── sections/     # Secciones grandes de las páginas
│   │   └── ui/           # Componentes base / atómicos (usualmente shadcn/ui o similares)
│   ├── i18n/             # Configuración de next-intl
│   ├── lib/              # Funciones de utilidad (ej. utilidades para tailwind)
│   └── middleware.ts     # Middleware para manejo de rutas, especialmente i18n
├── messages/             # Archivos JSON con las traducciones para next-intl
├── public/               # Assets estáticos (imágenes, fuentes, etc.)
├── CONTENT_REFERENCE.md  # Referencia de contenido del proyecto
└── package.json
```

## 🧠 Convenciones y Patrones Identificados

1. **App Router e i18n:** El enrutamiento de la aplicación está encapsulado bajo `src/app/[locale]`, lo que indica que **todas** las páginas están internacionalizadas por defecto usando `next-intl`.
2. **Componentes Modulares:** La separación en `ui`, `layout`, y `sections` sugiere un enfoque de diseño modular (posiblemente influenciado por patrones como el de `shadcn/ui` al usar Radix + Tailwind).
3. **Experiencia de Usuario (UX) Inmersiva:** La inclusión de `three`, `vanta`, `framer-motion`, y `lenis` indica que el proyecto tiene un fuerte enfoque en micro-interacciones, scroll suave y fondos/elementos visuales complejos.
4. **Mapas Integrados:** Se cuenta con soporte para mapas interactivos (`mapbox-gl`/`maplibre-gl`), ideal para visualización de locaciones o datos geoespaciales.

## 📝 Instrucciones para Gemini (Al leer este archivo)

- **Generación de Componentes:** Al generar nuevos componentes, utiliza **Tailwind CSS** y **Lucide React** para iconos. Si es un componente interactivo complejo, considera usar **Framer Motion**.
- **Enrutamiento:** Recuerda que al enlazar a otras páginas, debes tener en cuenta la estructura de rutas internacionalizadas `/[locale]/...` y utilizar los hooks/componentes de navegación de `next-intl`.
- **Estilos Dinámicos:** Utiliza la función de utilidad `cn` (habitualmente en `src/lib/utils.ts` que combina `clsx` y `twMerge`) para manejar clases condicionales.
- **Componentes de Servidor vs Cliente:** Next.js 16 usa React Server Components por defecto. Añade `'use client'` al principio de los archivos solo cuando utilices hooks de React (useState, useEffect), animaciones de Framer Motion, o eventos del DOM (onClick).

---
*Archivo generado para proporcionar contexto base de Scryved-Next.*

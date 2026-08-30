# 📚 Guía de Uso - Traducciones y SEO en Scryved v2.0

## 🚀 Inicio Rápido

### 1. Acceder a Traducciones en un Componente

```tsx
'use client';

import { useScryvedTranslations } from '@/lib/seo-helpers';

export default function HeroSection() {
  const { hero, services } = useScryvedTranslations();

  return (
    <section>
      <h1>{hero.title_line1}</h1>
      <h2>{hero.title_line2}</h2>
      <p>{hero.subtitle}</p>
      <button>{hero.cta_primary}</button>
    </section>
  );
}
```

### 2. Generar Metadata en una Página

```tsx
// app/[locale]/servicios/page.tsx
import { generateScryvedMetadata } from '@/lib/seo-helpers';

export const metadata = generateScryvedMetadata({
  title: 'Servicios de Desarrollo Software | Scryved Pitalito',
  description: 'Desarrollo web, apps móviles, software personalizado, diseño UI/UX, DevOps, QA y seguridad. Soluciones completas para tu negocio.',
  keywords: ['servicios desarrollo', 'consultoría IT', 'desarrollo web profesional'],
  ogImage: '/og-services.png',
  canonical: 'https://scryved.com/es/servicios',
  locale: 'es'
});

export default function ServicesPage() {
  const { services } = useScryvedTranslations();
  
  return (
    // ... contenido de servicios
  );
}
```

### 3. Inyectar Schema Markup (JSON-LD)

```tsx
// app/[locale]/layout.tsx
import { SchemaMarkup } from '@/lib/seo-helpers';
import { organizationSchema } from '@/lib/seo-schema';

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <SchemaMarkup schema={organizationSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 📖 Estructura de Traducción (JSON)

### Acceder a Propiedades

```tsx
const { hero } = useScryvedTranslations();

// Todos estos están disponibles:
hero.tagline              // "Innovación Digital"
hero.title_line1          // "Transformamos tus Ideas en"
hero.title_line2          // "Software de Clase Mundial"
hero.subtitle             // "Desarrollo web, aplicaciones..."
hero.description          // "Somos Scryved, una agencia..."
hero.cta_primary          // "Comenzar Proyecto"
hero.cta_secondary        // "Ver Proyectos"
hero.keywords             // Array de keywords
```

### Servicios (Array)

```tsx
const { services } = useScryvedTranslations();

// services.items es un array
services.items.forEach(service => {
  console.log(service.id);           // "web", "mobile", etc
  console.log(service.title);        // "Desarrollo Web Profesional"
  console.log(service.description);  // Descripción completa
  console.log(service.features);     // Array de features
  console.log(service.cta);          // "Consultar Proyecto Web"
  console.log(service.icon);         // "globe"
  console.log(service.keywords);     // Array de keywords
});
```

### Kits de Seguridad (Array)

```tsx
const { security } = useScryvedTranslations();

// security.kits es un array de 3 kits
security.kits.forEach(kit => {
  console.log(kit.id);              // "kit_4k_pro", etc
  console.log(kit.title);           // "Kit Hikvision 4K Pro"
  console.log(kit.price);           // "$3.000.000"
  console.log(kit.currency);        // "COP"
  console.log(kit.badge);           // "Más Vendido"
  console.log(kit.features);        // Array de features
  console.log(kit.whatsapp_message);// Mensaje pre-llenado
});
```

---

## 🎨 Ejemplos de Componentes

### Ejemplo 1: Service Card

```tsx
'use client';

import { useScryvedTranslations } from '@/lib/seo-helpers';

export function ServiceCard({ serviceId }) {
  const { services } = useScryvedTranslations();
  const service = services.items.find(s => s.id === serviceId);

  return (
    <div className="p-6 border border-lime-500/20 rounded-lg">
      <h3 className="text-xl font-bold">{service.title}</h3>
      <p className="text-gray-300">{service.description}</p>
      
      <ul className="mt-4 space-y-2">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-lime-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button className="mt-6 btn-primary">{service.cta}</button>
    </div>
  );
}
```

### Ejemplo 2: Security Kit Card

```tsx
'use client';

import { useScryvedTranslations } from '@/lib/seo-helpers';

export function SecurityKitCard({ kitId }) {
  const { security } = useScryvedTranslations();
  const kit = security.kits.find(k => k.id === kitId);

  return (
    <div className="relative p-8 bg-white/5 border border-lime-500/30 rounded-3xl">
      {kit.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-500 text-black px-4 py-1 rounded-full text-sm font-bold">
          {kit.badge}
        </div>
      )}

      <h3 className="text-2xl font-bold">{kit.title}</h3>
      <p className="text-gray-400 mt-2">{kit.description}</p>
      
      <div className="mt-4 text-3xl font-bold">
        {kit.price}
        <span className="text-lg text-gray-400"> {kit.currency}</span>
      </div>

      <ul className="mt-6 space-y-3">
        {kit.features.map((feature, idx) => (
          <li key={idx} className="flex gap-3">
            <span className="text-lime-500 flex-shrink-0">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/573143035929?text=${encodeURIComponent(kit.whatsapp_message)}`}
        target="_blank"
        className="mt-8 w-full btn-primary block text-center"
      >
        {kit.cta}
      </a>
    </div>
  );
}
```

### Ejemplo 3: Hero Section

```tsx
'use client';

import { useScryvedTranslations } from '@/lib/seo-helpers';

export function HeroSection() {
  const { hero } = useScryvedTranslations();

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl text-center">
        <p className="text-lime-500 font-bold mb-4">{hero.tagline}</p>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {hero.title_line1}
          <br />
          <span className="text-lime-500">{hero.title_line2}</span>
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {hero.subtitle}
        </p>

        <div className="flex gap-4 justify-center">
          <button className="btn-primary">{hero.cta_primary}</button>
          <button className="btn-secondary">{hero.cta_secondary}</button>
        </div>
      </div>
    </section>
  );
}
```

---

## 🔍 SEO Helpers - Funciones Útiles

### Validar Meta Tags

```tsx
import { validateMetaTags } from '@/lib/seo-helpers';

const warnings = validateMetaTags(
  'Mi Titulo SEO',
  'Mi descripción para Google...'
);

// Retorna array de advertencias si no cumplen estándares
console.log(warnings); // ["Título muy corto (< 30 caracteres)"]
```

### Construir URL Canónica

```tsx
import { buildCanonicalUrl } from '@/lib/seo-helpers';

const url = buildCanonicalUrl('/servicios', 'es');
// Retorna: https://scryved.com/es/servicios
```

### Crear Breadcrumbs

```tsx
import { createBreadcrumbs } from '@/lib/seo-helpers';

const breadcrumbs = createBreadcrumbs([
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Desarrollo Web', path: '/servicios#web' }
], 'es');

// Retorna array listo para JSON-LD schema
```

### Formatear Precio para Schema

```tsx
import { formatPriceForSchema } from '@/lib/seo-helpers';

const schemaPrice = formatPriceForSchema('$3.000.000');
// Retorna: "3000000"
```

---

## 📱 Uso de i18n (next-intl)

El proyecto ya tiene configurado `next-intl` para manejar español e inglés:

```tsx
// En cualquier componente cliente
'use client';

import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations();
  
  return <h1>{t('Hero.title_line1')}</h1>;
}
```

O usa el hook personalizado (más simple):

```tsx
'use client';

import { useScryvedTranslations } from '@/lib/seo-helpers';

export function Component() {
  const { hero } = useScryvedTranslations();
  
  return <h1>{hero.title_line1}</h1>;
}
```

---

## 📊 Estructura de Archivos Traducción

```
messages/
├── es.json          # Español - 2000+ líneas completas
└── en.json          # Inglés - 2000+ líneas completas

Cada archivo contiene:
├── Metadata (titles, descriptions, keywords)
├── Navigation (menú)
├── Hero (sección inicio)
├── About (sobre nosotros)
├── Services (servicios)
├── Security (seguridad)
├── Portfolio (proyectos)
├── Contact (contacto)
├── Footer (pie)
└── SEO (schema, keywords locales)
```

---

## ✅ Checklist para Nueva Página

- [ ] Crear archivo `page.tsx` en `app/[locale]/[seccion]/`
- [ ] Importar `generateScryvedMetadata` y crear metadata
- [ ] Importar `useScryvedTranslations` en componentes
- [ ] Usar `SchemaMarkup` en layout si es necesario
- [ ] Validar meta tags con `validateMetaTags()`
- [ ] Probar en español e inglés
- [ ] Validar en Google Rich Results Test

---

## 🔗 Archivos Clave

| Archivo | Propósito | Ubicación |
|---------|-----------|-----------|
| `messages/es.json` | Traducciones español | `/messages/` |
| `messages/en.json` | Traducciones inglés | `/messages/` |
| `lib/seo-helpers.tsx` | Funciones SEO | `/lib/` |
| `lib/seo-schema.ts` | JSON-LD schemas | `/lib/` |
| `app/robots.ts` | Archivo robots.txt | `/app/` |
| `app/sitemap.ts` | Sitemap XML | `/app/` |
| `docs/SEO_STRATEGY.md` | Estrategia SEO completa | `/docs/` |

---

## 🎯 Próximos Pasos

1. Crear componentes para cada sección (Hero, Services, Security, etc)
2. Implementar animaciones con Framer Motion
3. Agregar formulario de contacto funcional
4. Implementar blog para contenido SEO
5. Configurar Google Analytics + Search Console
6. Crear página de política de privacidad y términos

---

**Última actualización**: 9 de Enero 2026
**Versión**: 2.0-beta

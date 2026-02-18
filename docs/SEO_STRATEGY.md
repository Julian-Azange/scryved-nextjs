# 🎯 Estrategia SEO Completa - Scryved v2.0

## 📋 Tabla de Contenidos
1. [Estructura de Contenido](#estructura-de-contenido)
2. [Optimizaciones On-Page](#optimizaciones-on-page)
3. [SEO Local](#seo-local)
4. [Schema Markup & Structured Data](#schema-markup)
5. [Technical SEO](#technical-seo)
6. [Keywords por Sección](#keywords-por-sección)

---

## 🏗️ Estructura de Contenido

### Arquitectura de URLs
```
scryved.com/
├── es/ (Español)
│   ├── servicios
│   ├── nosotros
│   ├── proyectos
│   ├── seguridad
│   └── contacto
└── en/ (Inglés)
    ├── services
    ├── about
    ├── projects
    ├── security
    └── contact
```

**Beneficio SEO**: URLs semánticas, estructura clara, fácil rastreo por Google.

---

## 📄 Optimizaciones On-Page

### 1. **Meta Titles & Descriptions**

#### Home (Español)
- **Title**: "Scryved | Desarrollo Web, Software y Seguridad en Pitalito, Huila"
- **Description**: "Agencia de software en Pitalito, Huila. Desarrollo web, apps móviles, software a medida y soluciones de seguridad CCTV. Expertos en tecnología para tu negocio."
- **Length**: Título 75 caracteres (✓), Description 160 caracteres (✓)

#### Services (Español)
- **Title**: "Servicios de Desarrollo Software | Scryved Pitalito"
- **Description**: "Desarrollo web, apps móviles, software personalizado, diseño UI/UX, DevOps, QA y seguridad. Soluciones completas para tu negocio."

#### Security (Español)
- **Title**: "Seguridad CCTV | Cámaras 4K y Alarmas Inteligentes | Scryved"
- **Description**: "Kits de videovigilancia 4K, alarmas inteligentes y domótica. Instalación profesional en Pitalito. Monitoreo desde app 24/7."

**Estándar**: Cada página tiene título único, description atractiva con keywords.

---

### 2. **Estructura de Encabezados (H1, H2, H3)**

```
H1: "Transformamos tus Ideas en Software de Clase Mundial" (único por página)
  H2: "Servicios de Desarrollo"
    H3: "Desarrollo Web Profesional"
    H3: "Aplicaciones Móviles Nativas"
    H3: "Software a Medida"
```

**Regla**: Un H1 por página, jerarquía lógica, keywords naturales.

---

### 3. **Contenido Optimizado**

Cada sección tiene:
- ✅ **Descripción compelling** (100-150 palabras)
- ✅ **Palabras clave naturales** (no stuffing)
- ✅ **Subtítulos estratégicos**
- ✅ **Listas con bullets** (fácil de leer)
- ✅ **CTAs claros** (conversión)
- ✅ **Enlaces internos** (linking strategy)

---

## 🗺️ SEO Local

### Estrategia Geo-Targeting

**Ubicación Principal**: Pitalito, Huila, Colombia
**Operación**: Colombia, Perú, Ecuador

### Keywords Locales por Ciudad

#### Pitalito
- "desarrollo web pitalito"
- "software pitalito"
- "apps móviles pitalito"
- "camaras seguridad pitalito"
- "alarmas inteligentes pitalito"

#### Huila (Regional)
- "agencia digital huila"
- "desarrollo software huila"
- "diseño web huila"

#### Colombia (Nacional)
- "desarrollo web colombia"
- "software colombia"
- "apps developer colombia"

---

### Business Profile Markup

```json
{
  "name": "Scryved",
  "type": "SoftwareDevelopmentCompany",
  "address": "Pitalito, Huila, Colombia",
  "phone": "+57 322 245 5334",
  "email": "scryved@gmail.com",
  "latitude": 1.8547,
  "longitude": -76.4171,
  "areaServed": ["Pitalito", "Huila", "Colombia", "Peru", "Ecuador"]
}
```

---

## 🏷️ Schema Markup & Structured Data

Implementado en `lib/seo-schema.ts`:

### 1. **Organization Schema**
- Información de la empresa
- Redes sociales
- Ubicación exacta
- Número de empleados
- Fecha de fundación

### 2. **Local Business Schema**
- Horarios de operación
- Teléfono y email
- Calificaciones y reseñas
- Auge ratingValue: 4.9/5

### 3. **Service Schema** (para cada servicio)
- Tipo de servicio
- Proveedor (Scryved)
- Área de cobertura
- Rango de precio

### 4. **Product Schema** (para kits de seguridad)
- Nombre del producto
- Descripción
- Precio
- Disponibilidad

### 5. **FAQ Schema**
- Preguntas frecuentes
- Respuestas estructuradas
- Aparición en Featured Snippets

### 6. **Breadcrumb Schema**
- Navegación clara
- Navegación por migas de pan en resultados

---

## 🔧 Technical SEO

### 1. **robots.txt** (`app/robots.ts`)
```
- Allow: /
- Disallow: /admin, /api, /private
- Sitemap: https://scryved.com/sitemap.xml
- Crawl-delay: 1 segundo
```

### 2. **sitemap.xml** (`app/sitemap.ts`)
- 13+ URLs principales
- Frecuencia de cambio (weekly, monthly)
- Prioridad (1.0, 0.9, 0.8)
- Bilingüe (ES/EN)

### 3. **Meta Tags**
- ✅ Charset UTF-8
- ✅ Viewport responsive
- ✅ Theme color (#000000)
- ✅ OG Tags para redes sociales
- ✅ Canonical URLs

### 4. **Performance SEO**
- Next.js 15 (optimización automática)
- Imágenes optimizadas (next/image)
- CSS Tailwind (minificado)
- Lazy loading
- Code splitting

---

## 🎯 Keywords por Sección

### HOME - Keywords Generales
```
Primario: "desarrollo web", "software a medida", "aplicaciones móviles"
Secundarios: "agencia digital", "soluciones tecnológicas", "Pitalito"
LSI: "innovación digital", "transformación tecnológica", "soluciones escalables"
```

### SERVICES - Keywords de Servicios
```
Web:
  - desarrollo web pitalito
  - sitios web responsive
  - optimización seo web

Mobile:
  - aplicaciones móviles ios android
  - desarrollo app react native
  - apps nativas pitalito

Custom Software:
  - software a medida
  - crm erp personalizado
  - sistemas administrativos

DevOps:
  - devops cloud solutions
  - infraestructura aws google cloud
  - ci/cd pipelines

QA:
  - testing software
  - control de calidad
  - qa automation
```

### SECURITY - Keywords Seguridad
```
Primarios:
  - camaras seguridad 4k
  - cctv pitalito
  - alarmas inteligentes

Secundarios:
  - hikvision pitalito
  - videovigilancia profesional
  - domótica segura
  - monitoreo remoto

Locales:
  - camaras seguridad pitalito
  - alarmas pitalito
  - cctv huila
  - seguridad electrónica colombia
```

### PORTFOLIO - Keywords de Proyectos
```
- portafolio proyectos software
- casos de éxito desarrollo
- aplicaciones desplegadas
- ejemplos trabajos realizados
- proyectos en vivo
```

### CONTACT - Keywords de Contacto
```
- contacto scryved
- cotizar desarrollo
- presupuesto software
- consulta gratis
- contactar desarrollador pitalito
```

---

## 📊 Métricas SEO Objetivo (6 meses)

| Métrica | Objetivo | Estrategia |
|---------|----------|-----------|
| **Posiciones Top 3** | 15+ keywords | Content + backlinks |
| **Tráfico Orgánico** | 1000+ sesiones/mes | SEO + Blog |
| **CTR** | 3%+ | Title + Meta optimizados |
| **Tiempo en sitio** | 3+ minutos | Contenido relevante |
| **Conversión** | 3%+ | Landing pages + CTA |
| **Local Pack** | Aparición Google Maps | Local Schema + Reviews |

---

## 🔗 Estrategia de Linkbuilding

### Internas
- Links contextuales entre servicios
- Breadcrumbs
- Footer links a páginas principales

### Externas (Próximas acciones)
- Directorios locales colombianos
- Citaciones en Google My Business
- Partnerships con otros agencias
- Guest posting en blogs tech

---

## 📱 Mobile SEO

- ✅ Responsive design (Tailwind CSS)
- ✅ Mobile-first indexing
- ✅ Fast page load (Next.js optimization)
- ✅ Touch-friendly buttons (min 48px)
- ✅ Legibilidad móvil

---

## 🌐 Internacionalización (i18n) & SEO

```
/es/ → hreflang="es-CO"
/en/ → hreflang="en-US"
Home → hreflang="x-default"
```

Cada página tiene atributo `hreflang` para evitar contenido duplicado.

---

## 📅 Plan de Acción (30-90 días)

### Mes 1: Foundation
- [ ] Validar JSON-LD en Google Rich Results
- [ ] Submit sitemap a Google Search Console
- [ ] Crear Google My Business (Pitalito)
- [ ] Implementar tracking GA4 + GSC

### Mes 2: Content
- [ ] Blog con 4 artículos (SEO)
- [ ] Case studies de proyectos
- [ ] FAQ expandida

### Mes 3: Growth
- [ ] Backlink building
- [ ] Optimización de conversión
- [ ] Análisis y ajustes

---

## ✅ Checklist de Validación

- [x] Meta titles únicos y optimizados
- [x] Meta descriptions con keywords
- [x] Estructura H1-H2-H3 clara
- [x] Schema markup completo (6 tipos)
- [x] robots.txt y sitemap.xml
- [x] Keywords locales integrados
- [x] OG tags para redes sociales
- [x] Canonical URLs
- [x] Mobile responsive
- [x] Links internos estratégicos

---

**Última actualización**: 9 de Enero 2026
**Versión**: 2.0
**Auditor**: Arquitecto de Software Senior

/**
 * SCRYVED V2.0 - MAPA DE CONTENIDO & SEO
 * Archivo de referencia rápida
 */

// ============================================
// 📁 ARCHIVOS DE CONTENIDO
// ============================================

export const CONTENT_FILES = {
    SPANISH: '/messages/es.json',
    ENGLISH: '/messages/en.json',
    SEO_SCHEMA: '/lib/seo-schema.ts',
    SEO_HELPERS: '/lib/seo-helpers.tsx',
    ROBOTS: '/app/robots.ts',
    SITEMAP: '/app/sitemap.ts',
};

// ============================================
// 📋 ESTRUCTURA DE CONTENIDO
// ============================================

export const SECTIONS = {
    METADATA: {
        title: 'Meta titles, descriptions, keywords',
        file: 'messages/es.json > Metadata',
    },
    NAVIGATION: {
        title: 'Menú principal',
        file: 'messages/es.json > Navigation',
    },
    HERO: {
        title: 'Sección de inicio con CTA',
        file: 'messages/es.json > Hero',
    },
    ABOUT: {
        title: 'Sobre Scryved - Misión, fortalezas, stats',
        file: 'messages/es.json > About',
    },
    SERVICES: {
        title: '6 Servicios con features y keywords',
        file: 'messages/es.json > Services',
        count: 6,
        items: [
            'Desarrollo Web',
            'Aplicaciones Móviles',
            'Diseño UI/UX',
            'Software a Medida',
            'DevOps & Cloud',
            'Control de Calidad (QA)',
        ],
    },
    PORTFOLIO: {
        title: '11 Proyectos destacados',
        file: 'messages/es.json > Portfolio',
        count: 11,
    },
    CONTACT: {
        title: 'Formulario + Info + Redes',
        file: 'messages/es.json > Contact',
    },
    FOOTER: {
        title: 'Enlaces, legal, contacto',
        file: 'messages/es.json > Footer',
    },
    SEO: {
        title: 'Schema data + Keywords locales',
        file: 'messages/es.json > SEO',
    },
};

// ============================================
// 🎯 KEYWORDS PRINCIPALES
// ============================================

export const KEYWORDS = {
    LOCAL_PITALITO: [
        'desarrollo web pitalito',
        'software pitalito',
        'apps móviles pitalito',
        'camaras de seguridad pitalito',
        'alarmas inteligentes pitalito',
        'agencia digital pitalito',
    ],
    LOCAL_HUILA: [
        'agencia digital huila',
        'desarrollo software huila',
        'diseño web huila',
    ],
    GLOBAL: [
        'desarrollo web',
        'aplicaciones móviles',
        'software a medida',
        'agencia digital',
        'consultoría IT',
    ],
};

// ============================================
// 🔧 FUNCIONES DISPONIBLES
// ============================================

export const HELPERS = {
    useScryvedTranslations: {
        description: 'Hook para acceder a traducciones',
        usage: "const { hero, services } = useScryvedTranslations()",
        file: 'lib/seo-helpers.tsx',
    },
    generateScryvedMetadata: {
        description: 'Genera metadata optimizada',
        usage: 'export const metadata = generateScryvedMetadata({...})',
        file: 'lib/seo-helpers.tsx',
    },
    SchemaMarkup: {
        description: 'Componente para inyectar JSON-LD',
        usage: '<SchemaMarkup schema={organizationSchema} />',
        file: 'lib/seo-helpers.tsx',
    },
    validateMetaTags: {
        description: 'Valida si meta tags cumplen estándares',
        usage: 'const warnings = validateMetaTags(title, description)',
        file: 'lib/seo-helpers.tsx',
    },
    buildCanonicalUrl: {
        description: 'Construye URLs canónicas',
        usage: 'buildCanonicalUrl("/servicios", "es")',
        file: 'lib/seo-helpers.tsx',
    },
    createBreadcrumbs: {
        description: 'Crea breadcrumbs para navegación',
        usage: 'createBreadcrumbs([{name, path}], locale)',
        file: 'lib/seo-helpers.tsx',
    },
};

// ============================================
// 🏗️ ESTRUCTURA DE URLS
// ============================================

export const URL_STRUCTURE = {
    base: 'https://scryved.com',
    locales: {
        es: '/es',
        en: '/en',
    },
    routes: {
        ES: {
            home: '/es',
            services: '/es/servicios',
            about: '/es/nosotros',
            contact: '/es/contacto',
            portfolio: '/es/proyectos',
        },
        EN: {
            home: '/en',
            services: '/en/services',
            about: '/en/about',
            contact: '/en/contact',
            portfolio: '/en/projects',
        },
    },
};

// ============================================
// 📊 ESTADÍSTICAS
// ============================================

export const STATS = {
    projects_completed: 50,
    client_satisfaction: 99,
    team_members: 12,
    years_experience: 3,
};

// ============================================
// 💰 PRICING (Kits)
// ============================================
// ============================================
// 🏢 INFORMACIÓN DE EMPRESA
// ============================================

export const COMPANY_INFO = {
    name: 'Scryved',
    location: 'Pitalito, Huila, Colombia',
    coordinates: {
        latitude: 1.8547,
        longitude: -76.4171,
    },
    contact: {
        phone: '+57 322 245 5334',
        email: 'scryved@gmail.com',
        whatsapp: '573222455334',
    },
    hours: {
        days: 'Monday to Friday',
        start: '08:00',
        end: '18:00',
        timezone: 'America/Bogota',
    },
    founded: 2023,
};

// ============================================
// 📚 DOCUMENTACIÓN
// ============================================

export const DOCUMENTATION = {
    SEO_STRATEGY: '/docs/SEO_STRATEGY.md',
    USAGE_GUIDE: '/docs/USAGE_GUIDE.md',
    CONTENT_REFERENCE: '/CONTENT_REFERENCE.md',
    COMPLETION_SUMMARY: '/docs/COMPLETION_SUMMARY.md',
};

// ============================================
// ✨ CONFIGURACIÓN VISUAL
// ============================================

export const VISUAL_CONFIG = {
    brand_color: '#22c55e', // Verde Neón
    background: '#000000',  // Negro absoluto
    accent: '#22c55e',
    effects: ['glow', 'glassmorphism', 'blur'],
    animations: ['scroll-reveal', 'hover-effects', 'page-transitions'],
    framework: 'Next.js 15',
    ui_library: 'Shadcn UI',
    css_framework: 'Tailwind CSS v3',
    animation_library: 'Framer Motion',
};

// ============================================
// 🔍 SEO CHECKLIST
// ============================================

export const SEO_CHECKLIST = {
    technical: {
        robots_txt: true,
        sitemap_xml: true,
        hreflang_tags: true,
        mobile_responsive: true,
        performance: 'Next.js optimized',
    },
    on_page: {
        unique_titles: true,
        descriptions: true,
        h_hierarchy: true,
        keyword_integration: true,
        internal_links: true,
    },
    schema_markup: {
        organization: true,
        local_business: true,
        services: true,
        products: true,
        faq: true,
        breadcrumb: true,
    },
    local_seo: {
        location: 'Pitalito, Huila',
        phone: '+57 322 245 5334',
        keywords_local: true,
        area_served: ['Pitalito', 'Huila', 'Colombia', 'Peru', 'Ecuador'],
    },
};

// ============================================
// 🎯 PRÓXIMAS ACCIONES
// ============================================

export const NEXT_STEPS = [
    {
        step: 1,
        title: 'Construir Componentes',
        items: [
            'Navbar (glassmorphism)',
            'Hero Section',
            'Services Grid',
            
            'Portfolio',
            'Contact Form',
            'Footer',
        ],
    },
    {
        step: 2,
        title: 'Implementar Animaciones',
        items: [
            'Scroll reveal effects',
            'Glow effects',
            'Hover animations',
            'Page transitions',
        ],
    },
    {
        step: 3,
        title: 'Configuración SEO Avanzada',
        items: [
            'Google Search Console',
            'Google Analytics 4',
            'Google My Business',
            'Bing Webmaster Tools',
        ],
    },
];

// ============================================
// 📞 CONTACTO
// ============================================

export const CONTACT = {
    phone: '+57 322 245 5334',
    email: 'scryved@gmail.com',
    whatsapp: 'https://wa.me/573222455334',
    location: 'Pitalito, Huila, Colombia',
};

export default {
    CONTENT_FILES,
    SECTIONS,
    KEYWORDS,
    HELPERS,
    URL_STRUCTURE,
    STATS,
    
    COMPANY_INFO,
    DOCUMENTATION,
    VISUAL_CONFIG,
    SEO_CHECKLIST,
    NEXT_STEPS,
    CONTACT,
};

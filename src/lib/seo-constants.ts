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
    SECURITY: {
        title: '3 Kits de seguridad con precios',
        file: 'messages/es.json > Security',
        count: 3,
        kits: [
            { name: 'Kit Hikvision 4K Pro', price: '$3.000.000' },
            { name: 'Kit Negocio Esencial', price: '$1.800.000' },
            { name: 'Alarmas & Domótica', price: 'Cotizar' },
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
    SECURITY: [
        'camaras 4k',
        'cctv pitalito',
        'alarmas inteligentes',
        'videovigilancia profesional',
        'domótica segura',
        'hikvision pitalito',
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
            security: '/es/seguridad',
            contact: '/es/contacto',
            portfolio: '/es/proyectos',
        },
        EN: {
            home: '/en',
            services: '/en/services',
            about: '/en/about',
            security: '/en/security',
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

export const PRICING = {
    hikvision_4k_pro: {
        price: 3000000,
        currency: 'COP',
        features: [
            '2 Cámaras Bala 4K Exterior',
            '2 Cámaras Domo 4K Interior',
            'DVR 4 Canales 4K con IA',
            'Disco Duro 1TB',
            'Instalación + Configuración',
        ],
    },
    business_essential: {
        price: 1800000,
        currency: 'COP',
        features: [
            '4 Cámaras 1080p Full HD',
            'DVR 4 Canales',
            'Disco Duro 1TB',
            'Instalación profesional',
        ],
    },
    alarms_automation: {
        price: 'QUOTE',
        currency: 'COP',
        features: [
            'Panel WiFi/GSM',
            'Sensores PIR',
            'Sensores magnéticos',
            'Sirena de potencia',
            'App Control + Alexa/Google',
        ],
    },
};

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
            'Security Kits',
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
    PRICING,
    COMPANY_INFO,
    DOCUMENTATION,
    VISUAL_CONFIG,
    SEO_CHECKLIST,
    NEXT_STEPS,
    CONTACT,
};

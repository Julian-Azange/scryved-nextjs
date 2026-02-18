/**
 * SEO & i18n Helper Functions
 * Facilita el acceso a traducciones y optimizaciones SEO desde cualquier componente
 */

import { useTranslations } from 'next-intl';
import { Metadata } from 'next';

// Tipos
export interface MetadataParams {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonical?: string;
    locale?: 'es' | 'en';
}

/**
 * Hook para acceder a traducciones de forma estructurada
 */
export const useScryvedTranslations = () => {
    const t = useTranslations();

    return {
        // Metadatos
        metadata: {
            title: t('Metadata.title'),
            description: t('Metadata.description'),
            keywords: t('Metadata.keywords'),
        },
        // Navegación
        nav: {
            home: t('Navigation.home'),
            services: t('Navigation.services'),
            about: t('Navigation.about'),
            portfolio: t('Navigation.portfolio'),
            security: t('Navigation.security'),
            contact: t('Navigation.contact'),
            cta: t('Navigation.cta'),
        },
        // Hero
        hero: {
            tagline: t('Hero.tagline'),
            title_line1: t('Hero.title_line1'),
            title_line2: t('Hero.title_line2'),
            subtitle: t('Hero.subtitle'),
            description: t('Hero.description'),
            cta_primary: t('Hero.cta_primary'),
            cta_secondary: t('Hero.cta_secondary'),
        },
        // About
        about: {
            tag: t('About.tag'),
            title_part1: t('About.title_part1'),
            title_part2: t('About.title_part2'),
            subtitle: t('About.subtitle'),
            description_main: t('About.description_main'),
            mission: t('About.mission'),
            vision: t('About.vision'),
            stats: t('About.stats'),
            values: t('About.values'),
        },
        // Services
        services: {
            tag: t('Services.tag'),
            title_part1: t('Services.title_part1'),
            title_part2: t('Services.title_part2'),
            subtitle: t('Services.subtitle'),
            description: t('Services.description'),
            items: t('Services.items'),
            cta_button: t('Services.cta_button'),
        },
        // Security
        security: {
            tag: t('Security.tag'),
            title_part1: t('Security.title_part1'),
            title_part2: t('Security.title_part2'),
            subtitle: t('Security.subtitle'),
            description: t('Security.description'),
            features: t('Security.features'),
            kits: t('Security.kits'),
            installation_process: t('Security.installation_process'),
        },
        // Portfolio
        portfolio: {
            tag: t('Portfolio.tag'),
            title_part1: t('Portfolio.title_part1'),
            title_part2: t('Portfolio.title_part2'),
            subtitle: t('Portfolio.subtitle'),
            description: t('Portfolio.description'),
            projects: t('Portfolio.projects'),
        },
        // Contact
        contact: {
            tag: t('Contact.tag'),
            title_part1: t('Contact.title_part1'),
            title_part2: t('Contact.title_part2'),
            subtitle: t('Contact.subtitle'),
            description: t('Contact.description'),
            form: t('Contact.form'),
            info: t('Contact.info'),
            social: t('Contact.social'),
        },
        // Footer
        footer: {
            description: t('Footer.description'),
            services: t('Footer.services'),
            company: t('Footer.company'),
            legal: t('Footer.legal'),
            address: t('Footer.address'),
            phone: t('Footer.phone'),
            email: t('Footer.email'),
            copyright: t('Footer.copyright'),
        },
        // SEO
        seo: {
            local_business: t('SEO.local_business'),
            keywords_global: t('SEO.keywords_global'),
            keywords_local: t('SEO.keywords_local'),
        },
    };
};

/**
 * Generador de Metadata para Next.js 13+ (App Router)
 * Uso en layout.tsx o page.tsx
 */
export const generateScryvedMetadata = (
    params: MetadataParams
): Metadata => {
    const locale = params.locale || 'es';
    const baseUrl = 'https://scryved.com';

    return {
        title: params.title,
        description: params.description,
        keywords: params.keywords || [],
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: params.canonical || baseUrl,
            languages: {
                'es-CO': `${baseUrl}/es`,
                'en-US': `${baseUrl}/en`,
                'x-default': baseUrl,
            },
        },
        openGraph: {
            type: 'website',
            locale: locale === 'es' ? 'es_CO' : 'en_US',
            url: params.canonical || baseUrl,
            title: params.title,
            description: params.description,
            images: [
                {
                    url: params.ogImage || `${baseUrl}/og-default.png`,
                    width: 1200,
                    height: 630,
                    alt: 'Scryved - Software Development Agency',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: params.title,
            description: params.description,
            images: [params.ogImage || `${baseUrl}/og-default.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
};

/**
 * Componente para inyectar JSON-LD Schema Markup
 * Uso: <SchemaMarkup schema={organizationSchema} />
 */
export const SchemaMarkup = ({ schema }: { schema: Record<string, any> }) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
);

/**
 * Formateador de precios para schema markup
 */
export const formatPriceForSchema = (price: string): string => {
    return price.replace(/[^\d]/g, '');
};

/**
 * Constructor de URL canónica
 */
export const buildCanonicalUrl = (path: string, locale: 'es' | 'en' = 'es'): string => {
    const baseUrl = 'https://scryved.com';
    return `${baseUrl}/${locale}${path}`;
};

/**
 * Constructor de Breadcrumb para navegación
 */
export const createBreadcrumbs = (
    items: Array<{ name: string; path: string }>,
    locale: 'es' | 'en' = 'es'
) => {
    return items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: buildCanonicalUrl(item.path, locale),
    }));
};

/**
 * Validador de meta tags
 * Retorna advertencias si no cumplen estándares SEO
 */
export const validateMetaTags = (title: string, description: string): string[] => {
    const warnings: string[] = [];

    if (title.length < 30) warnings.push('Título muy corto (< 30 caracteres)');
    if (title.length > 60) warnings.push('Título muy largo (> 60 caracteres)');

    if (description.length < 120) warnings.push('Description muy corta (< 120 caracteres)');
    if (description.length > 160) warnings.push('Description muy larga (> 160 caracteres)');

    if (!title.includes('Scryved')) warnings.push('Marca (Scryved) no incluida en título');

    return warnings;
};

/**
 * Generator de meta robots tags
 */
export const getMetaRobots = (
    options: {
        index?: boolean;
        follow?: boolean;
        snippet?: boolean;
        imagePreview?: boolean;
        videoPreview?: boolean;
    } = {}
): string => {
    const {
        index = true,
        follow = true,
        snippet = true,
        imagePreview = true,
        videoPreview = true,
    } = options;

    let robots = `${index ? 'index' : 'noindex'},${follow ? 'follow' : 'nofollow'}`;

    if (!snippet) robots += ',nosnippet';
    if (!imagePreview) robots += ',noimageindex';
    if (!videoPreview) robots += ',novideopreview';

    return robots;
};

/**
 * Helper para links internos con rel attributes SEO
 */
export const getInternalLinkAttrs = (target: string, isExternal: boolean = false) => {
    return {
        rel: isExternal ? 'external noopener' : 'prefetch',
        target: isExternal ? '_blank' : '_self',
    };
};

export default useScryvedTranslations;

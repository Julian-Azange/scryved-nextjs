import { MetadataRoute } from 'next';

/**
 * sitemap.xml - Genera un mapa del sitio para SEO
 * Incluye todas las rutas principales con información de prioridad
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://scryved.com';

    const paths = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/servicios/desarrollo-software', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/servicios/mantenimiento-equipos', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/team', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
        { path: '/gracias', priority: 0.1, changeFrequency: 'yearly' as const },
    ];

    const locales = ['es', 'en'];

    const routes: MetadataRoute.Sitemap = [];

    // Para cada ruta, generar las versiones localizadas
    paths.forEach(({ path, priority, changeFrequency }) => {
        locales.forEach((locale) => {
            routes.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency,
                priority,
                alternates: {
                    languages: {
                        es: `${baseUrl}/es${path}`,
                        en: `${baseUrl}/en${path}`,
                    },
                },
            });
        });
    });

    return routes;
}

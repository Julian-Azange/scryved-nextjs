import { MetadataRoute } from 'next';

/**
 * sitemap.xml - Genera un mapa del sitio para SEO
 * Incluye todas las rutas principales con información de prioridad
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://scryved.com';

    // Todas las rutas reales soportadas en la aplicación
    const paths = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/team', priority: 0.8, changeFrequency: 'monthly' as const },
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

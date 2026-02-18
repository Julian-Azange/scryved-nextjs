import { MetadataRoute } from 'next';

/**
 * robots.txt - Especifica reglas para bots de búsqueda
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api', '/private', '/*.json$'],
                crawlDelay: 1,
            },
            {
                userAgent: 'AdsBot-Google',
                allow: '/',
            },
        ],
        sitemap: 'https://scryved.com/sitemap.xml',
    };
}

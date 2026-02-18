/**
 * SEO Schema Markup Generator - JSON-LD Structured Data
 * Optimizado para Google Rich Snippets, Local Business, y FAQs
 */

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Scryved",
    url: "https://scryved.com",
    logo: "https://scryved.com/logo.png",
    description: "Agencia de desarrollo de software en Pitalito, Huila, Colombia. Soluciones web, móviles y de seguridad inteligente.",
    sameAs: [
        "https://www.linkedin.com/company/scryved",
        "https://www.instagram.com/scryved",
        "https://www.facebook.com/scryved",
        "https://wa.me/573222455334"
    ],
    address: {
        "@type": "PostalAddress",
        streetAddress: "Pitalito",
        addressLocality: "Pitalito",
        addressRegion: "Huila",
        postalCode: "410001",
        addressCountry: "CO"
    },
    telephone: "+573222455334",
    email: "scryved@gmail.com",
    areaServed: [
        { "@type": "City", name: "Pitalito" },
        { "@type": "Region", name: "Huila" },
        { "@type": "Country", name: "Colombia" },
        { "@type": "Country", name: "Peru" },
        { "@type": "Country", name: "Ecuador" }
    ],
    founder: [ // Corregido de 'founders' a 'founder' (estándar Schema.org)
        {
            "@type": "Person",
            name: "Cristian Julian Murcia Palomares"
        }
    ],
    foundingDate: "2023",
    numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 12
    }
};

export const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Scryved - Agencia de Software",
    image: "https://scryved.com/images/scryved-office.jpg",
    description: "Desarrollo de software profesional, aplicaciones web y móviles, y soluciones de seguridad inteligente en Pitalito.",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Pitalito",
        addressLocality: "Pitalito",
        addressRegion: "Huila",
        postalCode: "410001",
        addressCountry: "CO"
    },
    telephone: "+573222455334",
    email: "scryved@gmail.com",
    url: "https://scryved.com",
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
            description: "Colombia Time"
        }
    ],
    priceRange: "$$",
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "99"
    },
    review: [
        {
            "@type": "Review",
            author: { "@type": "Person", name: "Sarah Johnson" },
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            reviewBody: "Scryved transformó nuestro negocio con su solución de software a medida. Su equipo fue profesional y superó nuestras expectativas.",
            datePublished: "2025-12-01"
        },
        {
            "@type": "Review",
            author: { "@type": "Person", name: "Michael Chen" },
            reviewRating: { "@type": "Rating", ratingValue: "5" },
            reviewBody: "Trabajar con Scryved fue un punto de inflexión para nuestra empresa. La atención al detalle fue excepcional.",
            datePublished: "2025-11-15"
        }
    ]
};

export const servicesSchema = (serviceId: string, serviceName: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
        "@type": "LocalBusiness",
        name: "Scryved"
    },
    description: description,
    url: `https://scryved.com/servicios#${serviceId}`,
    areaServed: {
        "@type": "Place",
        name: ["Colombia", "Peru", "Ecuador"]
    },
    priceRange: "$$"
});

export const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "¿Cuánto cuesta desarrollar una aplicación web?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "El costo de una aplicación web depende de la complejidad, características y alcance del proyecto. Ofrecemos presupuestos personalizados. Contáctanos para una consulta gratuita."
            }
        },
        {
            "@type": "Question",
            name: "¿Cuál es el tiempo de desarrollo promedio?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Los tiempos varían según el proyecto. Un sitio web simple puede tomar 2-4 semanas, mientras que una aplicación compleja puede tomar 3-6 meses. Proporcionamos cronogramas realistas en la propuesta."
            }
        },
        {
            "@type": "Question",
            name: "¿Ofrecen soporte después del lanzamiento?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Sí. Ofrecemos soporte técnico, mantenimiento, actualizaciones y mejoras continuas. Todos nuestros proyectos incluyen soporte a largo plazo."
            }
        },
        {
            "@type": "Question",
            name: "¿Cómo funcionan los kits de seguridad?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Nuestros kits incluyen cámaras 4K, DVR, instalación profesional y una app móvil para monitoreo remoto 24/7. Grabación continua incluida."
            }
        }
    ]
};

export const productSchema = (productName: string, price: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: description,
    image: "https://scryved.com/images/products/default.jpg",
    brand: {
        "@type": "Brand",
        name: "Scryved"
    },
    offers: {
        "@type": "Offer",
        url: "https://scryved.com/seguridad",
        priceCurrency: "COP",
        price: price.replace("$", "").replace(/\./g, ""), // Regex para reemplazar todos los puntos, no solo el primero
        availability: "https://schema.org/InStock",
        seller: {
            "@type": "LocalBusiness",
            name: "Scryved"
        }
    }
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
    }))
});

// SEO Meta Tags Helper
export const generateMetaTags = (page: "home" | "services" | "about" | "portfolio" | "contact" | "security") => {
    const defaults = {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1",
        "theme-color": "#000000"
    };

    const pageData: Record<string, { title: string; description: string; keywords: string; ogImage: string }> = {
        home: {
            title: "Scryved | Desarrollo Web, Software y Seguridad en Pitalito, Huila",
            description: "Agencia de software en Pitalito, Huila. Desarrollo web, apps móviles, software a medida y soluciones de seguridad CCTV. Expertos en tecnología.",
            keywords: "desarrollo web pitalito, software pitalito, apps móviles, camaras seguridad, alarmas inteligentes",
            ogImage: "https://scryved.com/og-home.png"
        },
        services: {
            title: "Servicios de Desarrollo Software | Scryved Pitalito",
            description: "Desarrollo web, apps móviles, software personalizado, diseño UI/UX, DevOps, QA y seguridad. Soluciones completas para tu negocio.",
            keywords: "servicios desarrollo, consultoría IT, desarrollo web profesional",
            ogImage: "https://scryved.com/og-services.png"
        },
        about: {
            title: "Sobre Scryved | Agencia de Software Pitalito",
            description: "Conoce el equipo de Scryved. 3 años transformando ideas en software de calidad mundial. 50+ proyectos, 99 clientes satisfechos.",
            keywords: "agencia software pitalito, equipo desarrolladores, soluciones digitales",
            ogImage: "https://scryved.com/og-about.png"
        },
        portfolio: {
            title: "Portafolio de Proyectos | Scryved",
            description: "Explora 50+ proyectos desarrollados por Scryved. E-commerce, apps móviles, dashboards, CRM y más. Casos de éxito verificados.",
            keywords: "proyectos desarrollados, portafolio software, casos de éxito",
            ogImage: "https://scryved.com/og-portfolio.png"
        },
        contact: {
            title: "Contacto Scryved | Escríbenos",
            description: "Contáctanos en Pitalito. Presupuestos sin costo, consultas técnicas, y soporte profesional. Teléfono +57 322 245 5334.",
            keywords: "contacto scryved, presupuesto software, consulta gratis",
            ogImage: "https://scryved.com/og-contact.png"
        },
        security: {
            title: "Seguridad CCTV | Cámaras 4K y Alarmas Inteligentes | Scryved",
            description: "Kits de videovigilancia 4K, alarmas inteligentes y domótica. Instalación profesional en Pitalito. Monitoreo desde app 24/7.",
            keywords: "camaras seguridad pitalito, cctv 4k, alarmas inteligentes, hikvision",
            ogImage: "https://scryved.com/og-security.png"
        }
    };

    return {
        ...defaults,
        ...pageData[page]
    };
};

// Sitemap generator helper
export const generateSitemapEntry = (path: string, changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never", priority: number) => ({
    loc: `https://scryved.com${path}`,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq,
    priority
});

// robots.txt entries
export const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /private

Sitemap: https://scryved.com/sitemap.xml
Crawl-delay: 1
`;
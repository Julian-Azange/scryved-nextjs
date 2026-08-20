export default function LocalSchema() {
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Scryved",
        "url": "https://scryved.com",
        "logo": "https://scryved.com/assets/logos/LOGO.png",
        "description": "Desarrollo de software a medida, aplicaciones móviles y soluciones tecnológicas empresariales.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pitalito",
            "addressRegion": "Huila",
            "addressCountry": "CO"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+57-322-245-5334",
            "contactType": "customer service"
        }
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ComputerStore", "ProfessionalService"],
        "name": "Scryved - Desarrollo de Software y Soporte Técnico",
        "image": "https://scryved.com/assets/logos/ICONO.png",
        "url": "https://scryved.com",
        "telephone": "+573222455334",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pitalito",
            "addressRegion": "Huila",
            "addressCountry": "CO"
        },
        "areaServed": {
            "@type": "City",
            "name": "Pitalito"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 1.8537,
            "longitude": -76.0435
        },
        "makesOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Desarrollo de Software a Medida"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Mantenimiento y Formateo de Computadores"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Desarrollo de Aplicaciones Móviles"
                }
            }
        ],
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        },
        "priceRange": "$$"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
        </>
    );
}

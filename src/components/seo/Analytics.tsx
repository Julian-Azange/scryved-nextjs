'use client';

import Script from 'next/script';

export default function Analytics() {
    // Reemplaza esto con tu verdadero ID de seguimiento (ej: G-XXXXXXXXXX)
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

    if (!GA_TRACKING_ID) {
        return null; // No renderizamos nada si no hay ID
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    );
}

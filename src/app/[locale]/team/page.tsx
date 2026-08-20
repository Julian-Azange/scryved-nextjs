import { getTranslations } from 'next-intl/server';
import Team from '@/src/components/sections/Team';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Team' });
    const baseUrl = 'https://scryved.com';
    const canonicalUrl = `${baseUrl}/${locale}/team`;

    return {
        title: `Scryved | ${t('tag')}`,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            url: canonicalUrl,
        },
    };
}

export default function TeamPage() {
    return (
        <main className="min-h-screen pt-16" style={{ background: '#050505' }}>
            <Team />
        </main>
    );
}

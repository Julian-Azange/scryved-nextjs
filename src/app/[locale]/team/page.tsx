import { getTranslations } from 'next-intl/server';
import Team from '@/src/components/sections/Team';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Team' });
    return {
        title: `Scryved | ${t('tag')}`,
    };
}

export default function TeamPage() {
    return (
        <main className="min-h-screen pt-16" style={{ background: '#050505' }}>
            <Team />
        </main>
    );
}

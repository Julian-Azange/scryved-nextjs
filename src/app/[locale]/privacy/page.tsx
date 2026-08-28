import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `Privacidad | ${t('title')}`,
        description: 'Política de Privacidad de Scryved.',
    };
}

export default function PrivacyPage() {
    const t = useTranslations('Privacy');

    return (
        <div className="min-h-[100dvh] pt-32 pb-20 relative overflow-hidden" style={{ background: '#050505' }}>
            {/* Background Decorations */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#a3e635]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                opacity: 0.4,
            }} />

            <div className="container px-6 md:px-12 mx-auto max-w-4xl relative z-10">
                <div className="mb-12">
                    <div className="w-16 h-16 bg-[#a3e635]/10 rounded-2xl border border-[#a3e635]/20 flex items-center justify-center mb-6">
                        <Shield className="w-8 h-8 text-[#a3e635]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">
                        {t('title')} <span className="text-[#a3e635]">{t('title_highlight')}</span>
                    </h1>
                    <p className="text-white/50 text-lg">{t('updated')}{new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-invert prose-lg max-w-none">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-white/70">
                        
                        {[0, 1, 2, 3, 4].map((index) => (
                            <section key={index}>
                                <h2 className="text-2xl font-bold text-white mb-4">{t(`sections.${index}.title`)}</h2>
                                <p>{t(`sections.${index}.content`)}</p>
                                
                                {/* Si la sección tiene una lista (ej. indice 1) */}
                                {index === 1 && (
                                    <ul className="list-disc pl-6 mt-4 space-y-2">
                                        {[0, 1, 2, 3, 4].map((liIndex) => (
                                            <li key={liIndex}>{t(`sections.1.list.${liIndex}`)}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

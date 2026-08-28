import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '@/src/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `Gracias | ${t('title')}`,
        description: 'Mensaje enviado correctamente a Scryved.',
    };
}

export default function GraciasPage() {
    const t = useTranslations('Gracias');

    return (
        <div className="min-h-[100dvh] flex items-center justify-center pt-20 pb-20 relative overflow-hidden" style={{ background: '#050505' }}>
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] bg-[#a3e635]/10 rounded-full blur-[120px] pointer-events-none" />
            
            {/* Noise Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                opacity: 0.4,
            }} />

            <div className="container px-6 md:px-12 mx-auto relative z-10">
                <div className="max-w-2xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-[0_0_50px_rgba(163,230,53,0.05)] text-center">
                    
                    <div className="w-24 h-24 bg-[#a3e635]/10 rounded-full border-2 border-[#a3e635]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(163,230,53,0.2)]">
                        <CheckCircle2 className="w-12 h-12 text-[#a3e635]" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                        {t('title')} <span className="text-[#a3e635]">{t('title_highlight')}</span>
                    </h1>
                    
                    <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10">
                        {t('description')}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/"
                            className="w-full sm:w-auto bg-[#a3e635] text-[#050505] font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#b4f041] hover:scale-105 transition-all duration-300"
                        >
                            {t('back_home')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        
                        <Link 
                            href="/#portfolio"
                            className="w-full sm:w-auto bg-white/5 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            {t('view_portfolio')}
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

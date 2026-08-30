import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Target, Lightbulb, Compass, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Team from '@/src/components/sections/Team';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'About' });
    const baseUrl = 'https://scryved.com';
    const canonicalUrl = `${baseUrl}/${locale}/about`;

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

const aboutStyles = `
@keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
}
.bento-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: all 0.4s ease;
}
.bento-card:hover {
    background: rgba(163, 230, 53, 0.04);
    border-color: rgba(163, 230, 53, 0.15);
    box-shadow: 0 10px 40px -10px rgba(163, 230, 53, 0.1);
}
.text-glow {
    text-shadow: 0 0 30px rgba(163, 230, 53, 0.4);
}
`;

export default function AboutPage() {
    const t = useTranslations('About');
    const philosophy = t.raw('philosophy') as string[];
    const whatWeAre = t.raw('what_we_are') as string[];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: aboutStyles }} />
            <main
                className="min-h-screen text-white relative overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Hero-like Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Glowing Orbs */}
                    <div
                        className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 60%)',
                            filter: 'blur(80px)',
                            animation: 'pulse-slow 8s infinite alternate'
                        }}
                    />
                    <div
                        className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 60%)',
                            filter: 'blur(80px)',
                            animation: 'pulse-slow 12s infinite alternate-reverse'
                        }}
                    />
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                    {/* Radial gradient mask for grid */}
                    <div className="absolute inset-0 bg-[#050505] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
                </div>

                <div className="relative z-10 w-full pt-32 pb-20 px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px]">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase mb-6"
                            style={{ border: '1px solid rgba(163,230,53,0.2)', background: 'rgba(163,230,53,0.05)', color: '#a3e635' }}>
                            <Compass className="w-3 h-3" />
                            {t('tag')}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-white mb-4">
                            {t('title_part1')} <span className="text-[#a3e635] italic text-glow">{t('title_part2')}</span>
                        </h1>
                    </div>

                    {/* Compact Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        
                        {/* What we are (Main Card) */}
                        <div className="bento-card rounded-3xl p-8 md:p-10 lg:col-span-2 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Sparkles className="w-32 h-32 text-[#a3e635]" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 flex items-center gap-3 relative z-10">
                                <div className="w-1.5 h-8 rounded-full bg-[#a3e635]" />
                                {t('what_we_are_title')}
                            </h2>
                            <div className="flex flex-col gap-4 relative z-10 text-white/70 font-medium text-[0.95rem] md:text-base leading-relaxed">
                                {whatWeAre.slice(0, 3).map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/5 relative z-10 flex gap-3 items-start">
                                <div className="mt-1 w-2 h-2 rounded-full bg-[#a3e635] flex-shrink-0" />
                                <p className="text-white/90 font-semibold italic">"{t('quote')}"</p>
                            </div>
                        </div>

                        {/* Mission & Vision Column */}
                        <div className="flex flex-col gap-6 lg:gap-8">
                            {/* Mission */}
                            <div className="bento-card rounded-3xl p-8 flex-1 flex flex-col justify-center group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#a3e635]/10 border border-[#a3e635]/20 group-hover:scale-110 transition-transform">
                                    <Target className="w-6 h-6 text-[#a3e635]" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-[0.2em] text-[#a3e635]">{t('mission_title')}</h3>
                                <p className="text-white/60 text-sm leading-relaxed font-medium">{t('mission')}</p>
                            </div>

                            {/* Vision */}
                            <div className="bento-card rounded-3xl p-8 flex-1 flex flex-col justify-center group">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#a3e635]/10 border border-[#a3e635]/20 group-hover:scale-110 transition-transform">
                                    <Lightbulb className="w-6 h-6 text-[#a3e635]" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-[0.2em] text-[#a3e635]">{t('vision_title')}</h3>
                                <p className="text-white/60 text-sm leading-relaxed font-medium">{t('vision')}</p>
                            </div>
                        </div>

                        {/* Philosophy (Full width bottom row) */}
                        <div className="bento-card rounded-3xl p-8 md:p-10 lg:col-span-3">
                            <h3 className="text-xs font-bold text-white mb-8 uppercase tracking-[0.2em] text-center text-white/30">Nuestra Filosofía</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {philosophy.slice(0, 6).map((line, i) => (
                                    <div key={i} className="flex items-start gap-3 group">
                                        <CheckCircle2 className="w-5 h-5 text-[#a3e635] shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <p className="text-[0.9rem] text-white/60 group-hover:text-white/90 font-medium leading-relaxed transition-colors">{line}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ Team Section ═══ */}
                <div className="relative z-10 w-full bg-[#050505] pb-20">
                    <Team />
                </div>
            </main>
        </>
    );
}

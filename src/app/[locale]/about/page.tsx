import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Target, Lightbulb, Compass, Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
@keyframes about-orb-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, 40px) scale(1.1); }
}
@keyframes about-orb-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -30px) scale(0.9); }
}
.about-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    transition: background 0.5s ease, border-color 0.5s ease;
}
.about-card:hover {
    background: rgba(163, 230, 53, 0.03) !important;
    border-color: rgba(163, 230, 53, 0.12) !important;
}
.about-icon-wrap {
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.about-card:hover .about-icon-wrap {
    transform: scale(1.1);
}
.philosophy-line {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
}
.philosophy-line:last-child {
    border-bottom: none;
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
                {/* ═══ Animated Background ═══ */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute"
                        style={{
                            top: '5%',
                            right: '-10%',
                            width: '50vw',
                            height: '50vw',
                            maxWidth: '700px',
                            maxHeight: '700px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.07) 0%, transparent 60%)',
                            filter: 'blur(90px)',
                            animation: 'about-orb-1 28s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '20%',
                            left: '-15%',
                            width: '45vw',
                            height: '45vw',
                            maxWidth: '600px',
                            maxHeight: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                            animation: 'about-orb-2 20s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                            opacity: 0.4,
                        }}
                    />
                </div>

                <div className="relative z-10 w-full">

                    {/* ═══ SECTION 1: Hero — Viewport height ═══ */}
                    <section className="min-h-[100dvh] flex flex-col justify-between px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] pt-28 pb-12">

                        {/* Top bar */}
                        <div className="flex justify-between items-start w-full">
                            <div
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                                style={{
                                    border: '1px solid rgba(163, 230, 53, 0.2)',
                                    background: 'rgba(163, 230, 53, 0.05)',
                                    color: '#a3e635',
                                }}
                            >
                                <Compass className="w-3 h-3" style={{ color: '#a3e635' }} />
                                {t('tag')}
                            </div>
                            <div className="hidden md:flex flex-col items-end gap-1">
                                <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>[//]</span>
                                <span className="text-[11px] font-mono tracking-widest" style={{ color: '#a3e635' }}>// NOSOTROS</span>
                            </div>
                        </div>

                        {/* Center: Title + Split Layout */}
                        <div className="flex-1 flex flex-col justify-center py-10">

                            {/* Massive Title */}
                            <div className="w-full overflow-hidden mb-12 md:mb-16">
                                <h1 className="text-[clamp(3rem,9vw,12rem)] font-black tracking-tighter leading-[0.85] uppercase text-white">
                                    {t('title_part1')}
                                </h1>
                                <span className="text-[clamp(3rem,9vw,12rem)] font-black tracking-tighter leading-[0.85] italic uppercase" style={{ color: '#a3e635' }}>
                                    {t('title_part2')}
                                </span>
                            </div>

                            {/* Two-column philosophy layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

                                {/* Left: Intro statement */}
                                <div
                                    className="p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem]"
                                    style={{
                                        background: 'rgba(163, 230, 53, 0.04)',
                                        border: '1px solid rgba(163, 230, 53, 0.1)',
                                    }}
                                >
                                    <p className="text-[clamp(1.1rem,2vw,1.8rem)] font-bold text-white leading-snug tracking-tight mb-6">
                                        {philosophy[0]}
                                    </p>
                                    <p className="text-[clamp(0.9rem,1.4vw,1.15rem)] font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                                        {philosophy[1]}
                                    </p>
                                </div>

                                {/* Right: Numbered philosophy lines */}
                                <div className="flex flex-col">
                                    {philosophy.slice(2).map((line, i) => (
                                        <div key={i} className="philosophy-line">
                                            <span
                                                className="text-[11px] font-mono mt-1 flex-shrink-0 w-6"
                                                style={{ color: '#a3e635' }}
                                            >
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <p
                                                className="text-[clamp(0.9rem,1.5vw,1.2rem)] font-medium leading-relaxed"
                                                style={{ color: i === philosophy.slice(2).length - 1 ? '#ffffff' : 'rgba(255,255,255,0.5)' }}
                                            >
                                                {line}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom scroll hint */}
                        <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                            <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
                            <span className="text-[11px] font-mono tracking-[0.2em] uppercase">Scroll para explorar</span>
                        </div>
                    </section>

                    {/* ═══ SECTION 2: What We Are ═══ */}
                    <section
                        className="px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] py-24 md:py-32"
                        style={{ borderTop: '1px solid rgba(163, 230, 53, 0.06)' }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                            {/* Left: Content */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 mb-10">
                                    <Sparkles className="w-5 h-5 md:w-7 md:h-7" style={{ color: '#a3e635' }} />
                                    <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold tracking-tighter text-white">{t('what_we_are_title')}</h2>
                                </div>

                                <div className="flex flex-col gap-0">
                                    {whatWeAre.map((paragraph, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-4 py-5"
                                            style={{ borderBottom: index < whatWeAre.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                                        >
                                            <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#a3e635', opacity: 0.6 }} />
                                            <p
                                                className="text-[clamp(0.9rem,1.3vw,1.1rem)] font-medium leading-relaxed"
                                                style={{ color: index >= whatWeAre.length - 2 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)' }}
                                            >
                                                {paragraph}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Image with glassmorphism frame */}
                            <div className="relative">
                                <div
                                    className="relative h-[380px] md:h-[520px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden"
                                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    <Image
                                        src="/assets/gallery/image2.jpeg"
                                        alt="Scryved Office"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] hover:scale-105"
                                    />
                                    {/* Green tint overlay */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(135deg, rgba(163,230,53,0.06) 0%, transparent 50%)' }}
                                    />
                                </div>

                                {/* Floating quote card */}
                                <div
                                    className="absolute -bottom-6 left-6 right-6 md:left-8 md:right-8 p-6 md:p-8 rounded-2xl"
                                    style={{
                                        background: 'rgba(5, 5, 5, 0.92)',
                                        backdropFilter: 'blur(24px)',
                                        border: '1px solid rgba(163, 230, 53, 0.15)',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                                    }}
                                >
                                    <div className="w-6 h-0.5 mb-4" style={{ background: '#a3e635' }} />
                                    <p className="text-white font-semibold text-sm md:text-base leading-relaxed italic">{t('quote')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══ SECTION 3: Mission & Vision ═══ */}
                    <section className="px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] pt-24 pb-28 md:pt-32 md:pb-36">

                        {/* Section label */}
                        <div className="flex items-center gap-4 mb-12 md:mb-16">
                            <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(163,230,53,0.3)' }} />
                            <span className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: '#a3e635' }}>PROPÓSITO</span>
                            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Mission */}
                            <div className="about-card p-8 md:p-12 rounded-[2rem]">
                                <div
                                    className="about-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                                    style={{ background: 'rgba(163,230,53,0.08)', border: '1px solid rgba(163,230,53,0.15)' }}
                                >
                                    <Target className="w-6 h-6 md:w-7 md:h-7" style={{ color: '#a3e635' }} />
                                </div>
                                <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: '#a3e635' }}>
                                    {t('mission_title')}
                                </p>
                                <h3 className="text-xl md:text-2xl xl:text-3xl font-bold mb-5 tracking-tight text-white leading-snug">
                                    Descubrir, diseñar,<br />desarrollar.
                                </h3>
                                <p className="text-[clamp(0.85rem,1.1vw,1rem)] font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    {t('mission')}
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="about-card p-8 md:p-12 rounded-[2rem]">
                                <div
                                    className="about-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                                    style={{ background: 'rgba(163,230,53,0.08)', border: '1px solid rgba(163,230,53,0.15)' }}
                                >
                                    <Lightbulb className="w-6 h-6 md:w-7 md:h-7" style={{ color: '#a3e635' }} />
                                </div>
                                <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: '#a3e635' }}>
                                    {t('vision_title')}
                                </p>
                                <h3 className="text-xl md:text-2xl xl:text-3xl font-bold mb-5 tracking-tight text-white leading-snug">
                                    Complejidad en<br />claridad.
                                </h3>
                                <p className="text-[clamp(0.85rem,1.1vw,1rem)] font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    {t('vision')}
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    );
}

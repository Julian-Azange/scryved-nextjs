'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, Code2, Server, Database, Smartphone, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

const founderStyles = `
@keyframes founder-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-20px, 30px) scale(1.08); }
}
@keyframes founder-line-in {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
}
`;

const iconMap: Record<string, any> = {
    software: Code2,
    support: Server,
    data: Database,
    cloud: Globe,
    mobile: Smartphone,
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export default function Founder() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });
    const t = useTranslations('Founder');
    const certBadges = t.raw('certBadges') as string[];
    const credentials = t.raw('credentials') as { id: string; label: string; years: string }[];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: founderStyles }} />
            <section
                ref={ref}
                id="founder"
                className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute" style={{
                        top: '20%', left: '-8%',
                        width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(163, 230, 53, 0.07) 0%, transparent 60%)',
                        filter: 'blur(90px)',
                        animation: 'founder-orb 22s ease-in-out infinite',
                    }} />
                    <div className="absolute" style={{
                        bottom: '-5%', right: '5%',
                        width: '40vw', height: '40vw', maxWidth: '500px', maxHeight: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 60%)',
                        filter: 'blur(100px)',
                    }} />
                    {/* Noise */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
                        opacity: 0.4,
                    }} />
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.1), transparent)',
                    }} />
                </div>

                {/* ═══ Content ═══ */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] py-20 md:py-28"
                >
                    {/* Top Bar */}
                    <motion.div variants={fadeUp} className="flex justify-between items-start w-full mb-12 md:mb-16">
                        <div
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                            style={{ border: '1px solid rgba(163,230,53,0.2)', background: 'rgba(163,230,53,0.05)', color: '#a3e635' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }} />
                            {t('tag')}
                        </div>
                        <div className="hidden md:flex flex-col items-end gap-1">
                            <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>[07]</span>
                            <span className="text-[11px] font-mono tracking-widest" style={{ color: '#a3e635' }}>{t('ceo')}</span>
                        </div>
                    </motion.div>

                    {/* Main Grid: Photo | Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-28 items-center">

                        {/* ─── LEFT: Photo Column ─── */}
                        <motion.div variants={fadeUp} className="flex flex-col gap-6">

                            {/* Photo frame */}
                            <div className="relative">
                                <div
                                    className="relative w-full max-w-md mx-auto lg:mx-0 rounded-[2rem] overflow-hidden"
                                    style={{
                                        aspectRatio: '3/4',
                                        border: '1px solid rgba(163,230,53,0.12)',
                                        boxShadow: '0 0 80px rgba(163,230,53,0.05)',
                                    }}
                                >
                                    <Image
                                        src="/assets/team/julian.jpg"
                                        alt="Julian Palomares – CEO Scryved"
                                        fill
                                        className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-[1.5s]"
                                    />
                                    {/* Subtle gradient bottom overlay */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-1/3"
                                        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.8), transparent)' }}
                                    />
                                </div>

                                {/* Floating role badge — bottom-left of photo */}
                                <div
                                    className="absolute bottom-4 left-4 md:bottom-6 md:left-6 px-4 py-3 rounded-xl"
                                    style={{
                                        background: 'rgba(5,5,5,0.9)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(163,230,53,0.2)',
                                    }}
                                >
                                    <p className="text-white font-black text-sm md:text-base tracking-tight leading-none">{t('photo_name')}</p>
                                    <p className="font-mono tracking-widest uppercase text-[10px] mt-1" style={{ color: '#a3e635' }}>{t('photo_role')}</p>
                                </div>

                                {/* Experience badge — top-right */}
                                <div
                                    className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center"
                                    style={{
                                        background: '#a3e635',
                                        boxShadow: '0 0 40px rgba(163,230,53,0.3)',
                                    }}
                                >
                                    <span className="font-black text-2xl md:text-3xl text-[#050505] leading-none">{t('years_num')}</span>
                                    <span className="text-[8px] md:text-[9px] font-bold text-[#050505] uppercase tracking-wide">{t('years_text')}</span>
                                </div>
                            </div>

                            {/* Certification badges */}
                            <div className="flex flex-wrap gap-2 max-w-md mx-auto lg:mx-0">
                                {certBadges.map((cert) => (
                                    <div
                                        key={cert}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
                                        style={{
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: 'rgba(255,255,255,0.6)',
                                        }}
                                    >
                                        <BadgeCheck className="w-3 h-3" style={{ color: '#a3e635' }} />
                                        {cert}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ─── RIGHT: Content Column ─── */}
                        <motion.div variants={stagger} className="flex flex-col gap-8 md:gap-10">

                            {/* Title */}
                            <motion.div variants={fadeUp} className="overflow-hidden">
                                <h2 className="text-[clamp(2.5rem,6vw,8rem)] font-black tracking-tighter leading-[0.85] uppercase text-white">
                                    {t('name_part1')}
                                </h2>
                                <span className="text-[clamp(2.5rem,6vw,8rem)] font-black tracking-tighter leading-[0.85] italic uppercase" style={{ color: '#a3e635' }}>
                                    {t('name_part2')}
                                </span>
                            </motion.div>

                            {/* Role & title */}
                            <motion.div variants={fadeUp} className="flex flex-col gap-1">
                                <p className="text-white/40 text-xs font-mono tracking-[0.2em] uppercase">{t('profession')}</p>
                                <div className="h-px w-12" style={{ background: 'rgba(163,230,53,0.4)' }} />
                            </motion.div>

                            {/* Founder quote */}
                            <motion.div
                                variants={fadeUp}
                                className="p-6 md:p-8 rounded-2xl"
                                style={{
                                    background: 'rgba(163,230,53,0.04)',
                                    border: '1px solid rgba(163,230,53,0.1)',
                                    borderLeft: '3px solid #a3e635',
                                }}
                            >
                                <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                                    "{t('quote_part1')}<span style={{ color: '#a3e635' }} className="font-bold">{t('quote_brand')}</span>{t('quote_part2')}"
                                </p>
                            </motion.div>

                            {/* Credentials list */}
                            <motion.div variants={stagger} className="flex flex-col gap-0">
                                <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-4" style={{ color: '#a3e635' }}>
                                    {t('exp_tag')}
                                </p>
                                {credentials.map(({ id, label, years }) => {
                                    const Icon = iconMap[id] || Code2;
                                    return (
                                        <motion.div
                                            key={label}
                                            variants={fadeUp}
                                            className="flex items-center gap-4 py-3.5 group"
                                            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                                style={{ background: 'rgba(163,230,53,0.08)', border: '1px solid rgba(163,230,53,0.12)' }}
                                            >
                                                <Icon className="w-4 h-4" style={{ color: '#a3e635' }} />
                                            </div>
                                            <span className="flex-1 text-sm md:text-base font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                                                {label}
                                            </span>
                                            <span className="text-xs font-mono tracking-widest" style={{ color: '#a3e635' }}>
                                                {years}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* CTA */}
                            <motion.div variants={fadeUp}>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(163,230,53,0.3)]"
                                    style={{ background: '#a3e635', color: '#050505' }}
                                >
                                    {t('cta')}
                                    <span className="text-lg">→</span>
                                </a>
                            </motion.div>

                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}

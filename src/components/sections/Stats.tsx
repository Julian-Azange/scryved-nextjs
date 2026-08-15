'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Star } from 'lucide-react';

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
};

/* ─── CSS Keyframes ─── */
const statsStyles = `
@keyframes stats-orb-drift-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(40px, -60px) scale(1.08); }
    66% { transform: translate(-30px, -30px) scale(0.95); }
}
@keyframes stats-orb-drift-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-50px, 40px) scale(1.1); }
    66% { transform: translate(30px, 60px) scale(0.93); }
}
@keyframes stats-grid-scroll {
    0% { transform: perspective(400px) rotateX(65deg) translateY(0); }
    100% { transform: perspective(400px) rotateX(65deg) translateY(50px); }
}
`;

/* ─── Counter Animation Hook ─── */
function AnimatedStat({ value, suffix = '' }: { value: string; suffix?: string }) {
    // Extract numeric part for potential animation
    const numericMatch = value.match(/^([+]?)(\d+\.?\d*)/);
    const prefix = value.replace(/[\d.]+.*/, '');
    
    return (
        <motion.span
            variants={scaleIn}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tighter leading-none"
            style={{ color: '#a3e635' }}
        >
            {value}
        </motion.span>
    );
}

export default function Stats() {
    const t = useTranslations('Stats');

    // For the continuous marquee
    const marqueeText = t('marquee').repeat(5);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: statsStyles }} />
            <section className="relative overflow-hidden" style={{ background: '#050505' }}>

                {/* ═══ MARQUEE BAR ═══ */}
                <div
                    className="w-full py-3 md:py-4 overflow-hidden flex whitespace-nowrap relative z-10"
                    style={{
                        background: 'linear-gradient(90deg, #a3e635, #65a30d, #a3e635)',
                    }}
                >
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="flex font-bold text-sm md:text-base uppercase tracking-widest items-center"
                        style={{ color: '#050505' }}
                    >
                        <span className="shrink-0">{marqueeText}</span>
                        <span className="shrink-0">{marqueeText}</span>
                    </motion.div>
                </div>

                {/* ═══ MAIN CONTENT — fits in viewport ═══ */}
                <div className="relative min-h-[calc(100vh-52px)] flex flex-col">

                    {/* ─── Animated Background ─── */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        {/* Glowing Orb 1 — top-left green */}
                        <div
                            className="absolute"
                            style={{
                                top: '-15%',
                                left: '-10%',
                                width: '45vw',
                                height: '45vw',
                                maxWidth: '650px',
                                maxHeight: '650px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(163, 230, 53, 0.1) 0%, rgba(163, 230, 53, 0.03) 40%, transparent 70%)',
                                filter: 'blur(80px)',
                                animation: 'stats-orb-drift-1 22s ease-in-out infinite',
                            }}
                        />

                        {/* Glowing Orb 2 — bottom-right */}
                        <div
                            className="absolute"
                            style={{
                                bottom: '-10%',
                                right: '-5%',
                                width: '40vw',
                                height: '40vw',
                                maxWidth: '600px',
                                maxHeight: '600px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 40%, transparent 70%)',
                                filter: 'blur(90px)',
                                animation: 'stats-orb-drift-2 28s ease-in-out infinite',
                            }}
                        />

                        {/* Subtle center glow */}
                        <div
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '50vw',
                                height: '50vw',
                                maxWidth: '700px',
                                maxHeight: '700px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(163, 230, 53, 0.04) 0%, transparent 60%)',
                                filter: 'blur(60px)',
                            }}
                        />

                        {/* Perspective grid at bottom */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-[30vh] overflow-hidden"
                            style={{ opacity: 0.04 }}
                        >
                            <div
                                style={{
                                    width: '200%',
                                    height: '200%',
                                    marginLeft: '-50%',
                                    backgroundImage: `
                                        linear-gradient(rgba(163, 230, 53, 0.6) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(163, 230, 53, 0.6) 1px, transparent 1px)
                                    `,
                                    backgroundSize: '60px 60px',
                                    animation: 'stats-grid-scroll 8s linear infinite',
                                    transformOrigin: 'center top',
                                }}
                            />
                        </div>

                        {/* Noise texture */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                                opacity: 0.4,
                            }}
                        />

                        {/* Horizontal accent line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.15), transparent)',
                            }}
                        />
                    </div>

                    {/* ─── Content Layer ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] flex flex-col justify-between flex-grow py-6 md:py-8 lg:py-10"
                    >
                        {/* Top separator row */}
                        <motion.div
                            variants={fadeUp}
                            className="w-full pt-3 flex justify-between items-center text-[10px] md:text-xs font-mono uppercase mb-4 md:mb-6 lg:mb-8"
                            style={{
                                borderTop: '1px solid rgba(163, 230, 53, 0.1)',
                                color: 'rgba(255,255,255,0.3)',
                            }}
                        >
                            <span>{t('section_id')}</span>
                            <span style={{ color: '#a3e635' }}>{t('section_title')}</span>
                            <span>{t('year')}</span>
                        </motion.div>

                        {/* Main Grid: Rating + Statement */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 flex-grow items-center">

                            {/* Left: Rating */}
                            <motion.div
                                variants={fadeUp}
                                className="col-span-1 lg:col-span-4 flex flex-col items-start lg:items-center"
                            >
                                <div className="flex items-baseline mb-4">
                                    <span
                                        className="text-[clamp(4rem,14vw,9rem)] font-bold tracking-tighter leading-none"
                                        style={{ color: '#ffffff' }}
                                    >
                                        {t('score')}
                                    </span>
                                    <span
                                        className="text-xl lg:text-3xl font-bold tracking-tighter ml-2"
                                        style={{ color: 'rgba(255,255,255,0.25)' }}
                                    >
                                        {t('score_max')}
                                    </span>
                                </div>
                                <div className="flex gap-1.5 md:gap-2">
                                    {[...Array(10)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Star className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" style={{ color: '#a3e635', fill: '#a3e635' }} />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right: Statement & Numbers */}
                            <motion.div
                                variants={fadeUp}
                                className="col-span-1 lg:col-span-8 flex flex-col justify-center"
                            >
                                <h2
                                    className="text-[clamp(1.3rem,3.2vw,2.8rem)] font-bold leading-[0.95] tracking-tighter uppercase mb-6 md:mb-8 lg:mb-10"
                                    style={{ color: 'rgba(255,255,255,0.9)' }}
                                >
                                    {t('statement')}
                                </h2>

                                {/* Stats Row */}
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 pt-6 md:pt-8"
                                    style={{ borderTop: '1px solid rgba(163, 230, 53, 0.1)' }}
                                >
                                    <motion.div variants={fadeUp}>
                                        <AnimatedStat value={t('stat1_value')} />
                                        <p
                                            className="text-[10px] md:text-xs font-mono uppercase tracking-widest max-w-[200px] mt-3"
                                            style={{ color: 'rgba(255,255,255,0.3)' }}
                                        >
                                            {t('stat1_label')}
                                        </p>
                                    </motion.div>
                                    <motion.div variants={fadeUp}>
                                        <AnimatedStat value={t('stat2_value')} />
                                        <p
                                            className="text-[10px] md:text-xs font-mono uppercase tracking-widest max-w-[200px] mt-3"
                                            style={{ color: 'rgba(255,255,255,0.3)' }}
                                        >
                                            {t('stat2_label')}
                                        </p>
                                    </motion.div>
                                    <motion.div variants={fadeUp}>
                                        <AnimatedStat value={t('stat3_value')} />
                                        <p
                                            className="text-[10px] md:text-xs font-mono uppercase tracking-widest max-w-[200px] mt-3"
                                            style={{ color: 'rgba(255,255,255,0.3)' }}
                                        >
                                            {t('stat3_label')}
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom accent */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-8 md:mt-12"
                        >
                            <div
                                className="w-full h-px"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.12), transparent)',
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}

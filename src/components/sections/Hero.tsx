'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

/* ─── Text Slider ─── */
const TextSlider = () => {
    const t = useTranslations('Hero');
    const texts = t.raw('slider_texts') as string[];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((i) => (i + 1) % texts.length), 3500);
        return () => clearInterval(timer);
    }, [texts.length]);

    return (
        <div className="relative h-8 md:h-10 overflow-hidden w-full md:w-[650px] flex justify-start md:justify-end items-center">
            <AnimatePresence mode="popLayout">
                <motion.h3
                    key={index}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute text-[clamp(11px,3.2vw,1.5rem)] md:text-[1.35rem] lg:text-[1.5rem] font-bold tracking-tight uppercase whitespace-nowrap text-left md:text-right"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                    {texts[index]}
                </motion.h3>
            </AnimatePresence>
        </div>
    );
};

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const titleVariants: Variants = {
    hidden: { y: "120%", opacity: 0 },
    visible: {
        y: 0, opacity: 1,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
};

const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
};

const glowPulse: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 2, ease: "easeOut" }
    }
};

/* ─── Floating Particles Component ─── */
const FloatingParticles = () => {
    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.5 + 0.1,
    }));

    return (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: p.id % 3 === 0 ? '#a3e635' : 'rgba(255,255,255,0.4)',
                    }}
                    animate={{
                        y: [0, -30, 0, 20, 0],
                        x: [0, 15, -10, 5, 0],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 0.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

/* ─── Scroll Down Indicator ─── */
const ScrollIndicator = () => (
    <motion.div
        variants={fadeVariants}
        className="flex flex-col items-center gap-3"
    >
        <div className="relative flex items-center justify-center">
            <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: '#a3e635' }}
                animate={{
                    boxShadow: [
                        '0 0 4px rgba(163, 230, 53, 0.4)',
                        '0 0 20px rgba(163, 230, 53, 0.8)',
                        '0 0 4px rgba(163, 230, 53, 0.4)',
                    ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
        <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, #a3e635, transparent)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
            className="text-[10px] font-mono tracking-[0.3em] uppercase"
            style={{ color: '#a3e635' }}
        >
            Scroll Down
        </span>
    </motion.div>
);

/* ─── CSS Keyframes (injected via style tag) ─── */
const heroStyles = `
@keyframes hero-orb-float-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(50px, -80px) scale(1.1); }
    50% { transform: translate(-30px, -120px) scale(0.95); }
    75% { transform: translate(80px, -40px) scale(1.05); }
}
@keyframes hero-orb-float-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(-60px, 60px) scale(1.15); }
    50% { transform: translate(40px, 100px) scale(0.9); }
    75% { transform: translate(-80px, 30px) scale(1.08); }
}
@keyframes hero-orb-float-3 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(70px, -50px) scale(1.12); }
    66% { transform: translate(-40px, 70px) scale(0.92); }
}
@keyframes hero-grid-move {
    0% { transform: perspective(400px) rotateX(60deg) translateY(0); }
    100% { transform: perspective(400px) rotateX(60deg) translateY(50px); }
}
@keyframes hero-shine-sweep {
    0% { transform: translateX(-200%) rotate(25deg); }
    100% { transform: translateX(200%) rotate(25deg); }
}
@keyframes hero-ring-rotate {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}
`;

export default function Hero() {
    const t = useTranslations('Hero');
    const services = t.raw('services') as string[];
    const heroRef = useRef<HTMLElement>(null);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
            <section
                ref={heroRef}
                id="home"
                className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden pt-28 pb-10"
                style={{ background: '#050505' }}
            >
                {/* ═══ ANIMATED BACKGROUND LAYER ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

                    {/* Radial vignette overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #050505 100%)',
                        }}
                    />

                    {/* Glowing Orb 1 — Large green, top-right */}
                    <motion.div
                        variants={glowPulse}
                        initial="hidden"
                        animate="visible"
                        className="absolute"
                        style={{
                            top: '-10%',
                            right: '-5%',
                            width: '55vw',
                            height: '55vw',
                            maxWidth: '800px',
                            maxHeight: '800px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.15) 0%, rgba(163, 230, 53, 0.05) 40%, transparent 70%)',
                            filter: 'blur(80px)',
                            animation: 'hero-orb-float-1 25s ease-in-out infinite',
                        }}
                    />

                    {/* Glowing Orb 2 — Teal/cyan, bottom-left */}
                    <motion.div
                        variants={glowPulse}
                        initial="hidden"
                        animate="visible"
                        className="absolute"
                        style={{
                            bottom: '-15%',
                            left: '-10%',
                            width: '50vw',
                            height: '50vw',
                            maxWidth: '700px',
                            maxHeight: '700px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.04) 40%, transparent 70%)',
                            filter: 'blur(100px)',
                            animation: 'hero-orb-float-2 30s ease-in-out infinite',
                        }}
                    />

                    {/* Glowing Orb 3 — Subtle warm green, center */}
                    <div
                        className="absolute"
                        style={{
                            top: '30%',
                            left: '40%',
                            width: '30vw',
                            height: '30vw',
                            maxWidth: '500px',
                            maxHeight: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, transparent 60%)',
                            filter: 'blur(60px)',
                            animation: 'hero-orb-float-3 20s ease-in-out infinite',
                        }}
                    />

                    {/* Perspective grid at the bottom */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[40vh] overflow-hidden"
                        style={{ opacity: 0.06 }}
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
                                animation: 'hero-grid-move 8s linear infinite',
                                transformOrigin: 'center top',
                            }}
                        />
                    </div>

                    {/* Circular ring accent — decorative */}
                    <div
                        className="absolute"
                        style={{
                            top: '20%',
                            right: '10%',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            border: '1px solid rgba(163, 230, 53, 0.06)',
                            animation: 'hero-ring-rotate 60s linear infinite',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            top: '18%',
                            right: '8%',
                            width: '450px',
                            height: '450px',
                            borderRadius: '50%',
                            border: '1px solid rgba(163, 230, 53, 0.03)',
                            animation: 'hero-ring-rotate 80s linear infinite reverse',
                        }}
                    />

                    {/* Noise texture overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                            opacity: 0.5,
                        }}
                    />

                    {/* Floating particles */}
                    <FloatingParticles />
                </div>

                {/* ═══ CONTENT ═══ */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full relative z-10 px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] flex flex-col justify-between h-full min-h-[75vh]"
                >
                    {/* TOP METADATA */}
                    <motion.div
                        variants={fadeVariants}
                        className="flex justify-between items-start w-full font-medium text-[11px] md:text-xs tracking-tight mb-6 md:mb-8"
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="inline-block w-1.5 h-1.5 rounded-full"
                                style={{ background: '#a3e635' }}
                            />
                            <span>(©2018 — ©2026)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>{t('based_in')}</span>
                        </div>
                    </motion.div>

                    {/* CENTER BLOCK */}
                    <div className="flex flex-col justify-center flex-grow w-full py-4 md:py-8">

                        {/* TAG LINE */}
                        <motion.div
                            variants={fadeVariants}
                            className="flex items-center gap-3 mb-6 md:mb-8"
                        >
                            <span
                                className="inline-block w-2 h-2 rounded-sm"
                                style={{ background: '#a3e635' }}
                            />
                            <span
                                className="text-[11px] md:text-xs font-mono tracking-[0.25em] uppercase"
                                style={{ color: '#a3e635' }}
                            >
                                Software Studio
                            </span>
                        </motion.div>

                        {/* HUGE TITLE — Split style like the reference */}
                        <div className="w-full mb-6 md:mb-10 overflow-hidden">
                            <motion.h1 variants={titleVariants} className="flex flex-col">
                                {/* Semantic SEO text, visually hidden */}
                                <span className="sr-only">Desarrollo de Software a Medida en Pitalito y Soluciones Digitales</span>
                                
                                {/* Line 1 */}
                                <div className="flex items-baseline gap-3 md:gap-6" aria-hidden="true">
                                    <span
                                        className="text-[clamp(3rem,10vw,15rem)] leading-[0.85] font-bold tracking-[-0.04em] uppercase"
                                        style={{ color: '#ffffff' }}
                                    >
                                        {t('title_line1')}
                                    </span>
                                    {/* Year badge — like reference */}
                                    <motion.span
                                        variants={fadeVariants}
                                        className="hidden md:inline-block text-[11px] font-mono tracking-wide self-start mt-4"
                                        style={{ color: '#a3e635' }}
                                    >
                                        © 2026
                                    </motion.span>
                                </div>
                                {/* Line 2 — Italic accent */}
                                <div className="flex items-start gap-2 md:gap-4 flex-wrap" aria-hidden="true">
                                    <span
                                        className="text-[clamp(3rem,10vw,15rem)] leading-[0.85] font-bold tracking-[-0.04em] italic"
                                        style={{ color: '#a3e635' }}
                                    >
                                        {t('title_line2')}
                                    </span>
                                    <span
                                        className="text-xl md:text-3xl lg:text-5xl ml-1 md:ml-2 mt-1 md:mt-3 font-bold"
                                        style={{ color: '#a3e635' }}
                                    >
                                        ®
                                    </span>
                                </div>
                            </motion.h1>
                        </div>

                        {/* MIDDLE SECTION: Info + Slider — like the reference's subtitle area */}
                        <motion.div
                            variants={fadeVariants}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8"
                        >
                                {/* Left: Avatars & Stats */}
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2 md:-space-x-3">
                                        <div
                                            className="w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden relative z-40"
                                            style={{ border: '2px solid rgba(163, 230, 53, 0.4)' }}
                                        >
                                            <Image src="/assets/team/julian.jpg" alt="Julian CEO" fill className="object-cover" />
                                        </div>
                                        <div
                                            className="w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden relative z-30"
                                            style={{ border: '2px solid rgba(163, 230, 53, 0.3)' }}
                                        >
                                            <Image src="/assets/team/fabian.jpeg" alt="Fabian CO-CEO" fill className="object-cover" />
                                        </div>
                                        <div
                                            className="w-7 h-7 md:w-9 md:h-9 rounded-full overflow-hidden relative z-20"
                                            style={{ border: '2px solid rgba(163, 230, 53, 0.2)' }}
                                        >
                                            <Image src="/assets/team/tobias.jpg" alt="Tobias CTO" fill className="object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-[1px]">
                                        <span className="font-bold text-[10px] md:text-[11px] leading-none tracking-widest" style={{ color: '#ffffff' }}>
                                            SCRYVED
                                        </span>
                                        <span
                                            className="text-[8px] md:text-[9px] font-mono tracking-widest uppercase leading-none mt-1"
                                            style={{ color: 'rgba(255,255,255,0.35)' }}
                                        >
                                            {t('team_text')}
                                        </span>
                                    </div>
                                </div>

                            {/* Right: Vertical Text Slider */}
                            <div className="flex justify-start md:justify-end w-full md:w-auto">
                                <TextSlider />
                            </div>
                        </motion.div>
                    </div>

                    {/* BOTTOM SECTION */}
                    <motion.div
                        variants={fadeVariants}
                        className="flex flex-col md:flex-row justify-between items-start w-full mb-8 md:mb-10 gap-10 md:gap-4"
                    >
                        {/* Left: Description */}
                        <div className="max-w-[280px] md:max-w-[320px] w-full">
                            <p className="text-[14px] md:text-[15px] font-medium tracking-tight leading-[1.4]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                {t('description_part1')}
                                <span style={{ color: 'rgba(255,255,255,0.35)' }}>{t('description_part2')}</span>
                                {' '}{t('description_part3')}
                            </p>
                        </div>

                        {/* Center: Scroll indicator */}
                        <div className="hidden md:flex justify-center">
                            <ScrollIndicator />
                        </div>

                        {/* Right: Services List */}
                        <div className="flex flex-col gap-2 min-w-[220px] w-full md:w-auto md:items-start text-left">
                            {services.map((service, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2.5 transition-colors cursor-default group"
                                >
                                    <span
                                        className="text-[9px] md:text-[10px] font-mono uppercase"
                                        style={{ color: 'rgba(163, 230, 53, 0.5)' }}
                                    >
                                        0{i + 1})
                                    </span>
                                    <span
                                        className="text-[13px] md:text-[14px] font-medium tracking-tight group-hover:text-white/50 transition-colors"
                                        style={{ color: 'rgba(255,255,255,0.7)' }}
                                    >
                                        {service}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* BRANDS LOGOS */}
                    <motion.div
                        variants={fadeVariants}
                        className="w-full flex justify-between items-center gap-6 overflow-hidden pt-4 md:pt-6"
                        style={{ borderTop: '1px solid rgba(163, 230, 53, 0.08)' }}
                    >
                        <div className="relative w-24 md:w-36 lg:w-48 h-8 md:h-10 lg:h-12 opacity-40 hover:opacity-80 transition-all duration-300" style={{ filter: 'brightness(0) invert(1)' }}>
                            <Image src="/assets/brands/smartpay.png" alt="SmartPay" fill className="object-contain object-left" />
                        </div>
                        <div className="relative w-24 md:w-36 lg:w-48 h-8 md:h-10 lg:h-12 opacity-40 hover:opacity-80 transition-all duration-300" style={{ filter: 'brightness(0) invert(1)' }}>
                            <Image src="/assets/brands/finanlock.png" alt="FinanLock" fill className="object-contain" />
                        </div>
                        <div className="relative w-24 md:w-36 lg:w-48 h-8 md:h-10 lg:h-12 opacity-40 hover:opacity-80 transition-all duration-300" style={{ filter: 'brightness(0) invert(1)' }}>
                            <Image src="/assets/brands/osmarpay.png" alt="OsmarPay" fill className="object-contain" />
                        </div>
                        <div className="relative w-24 md:w-36 lg:w-48 h-8 md:h-10 lg:h-12 opacity-40 hover:opacity-80 transition-all duration-300" style={{ filter: 'brightness(0) invert(1)' }}>
                            <Image src="/assets/brands/fono.png" alt="FonoSalud" fill className="object-contain object-right" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import LogoMarquee from '../ui/LogoMarquee';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="home" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background pt-32">

            {/* --- 1. FONDO DE CUADRÍCULA (GRID) --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* --- 2. AURORA VERDE (GLOW) REPOTENCIADA --- */}
            {/* Capa 1: Verde Lima Brillante (Centro) */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-[100%] bg-primary/40 blur-[120px] opacity-70 pointer-events-none mix-blend-screen z-0" />

            {/* Capa 2: Verde Oscuro/Bosque (Profundidad) */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-[100%] bg-green-600/30 blur-[100px] opacity-60 pointer-events-none z-0" />


            {/* --- CONTENIDO --- */}
            <div className="container relative z-10 px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto flex max-w-5xl flex-col items-center text-center"
                >
                    {/* BADGE TIPO CÁPSULA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-lg"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse shadow-[0_0_10px_#a3e635]"></span>
                        <span className="text-sm font-medium text-gray-200 tracking-wide">
                            {t('badge')}
                        </span>
                    </motion.div>

                    {/* TÍTULO PRINCIPAL */}
                    <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white sm:text-7xl xl:text-8xl leading-[1.1] drop-shadow-2xl">
                        <span className="block">{t('title_line1')}</span>

                        {/* Texto Gradiente */}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 pb-4">
                            {t('title_line2')}
                        </span>
                    </h1>

                    {/* SUBTÍTULO */}
                    <p className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed font-light">
                        {t('subtitle')}
                    </p>

                    {/* BOTÓN (ESTILO PILL BLANCO) */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href="#contact"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-gray-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                        >
                            <span>{t('cta_primary')}</span>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:rotate-45">
                                <ArrowRight size={14} />
                            </div>
                        </a>
                    </motion.div>

                </motion.div>
            </div>

            {/* --- SLIDER DE LOGOS --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="relative mt-20 w-full border-t border-white/5 bg-background/30 backdrop-blur-sm z-10"
            >
                <LogoMarquee />
            </motion.div>

        </section>
    );
}
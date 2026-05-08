'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import LogoMarquee from '../ui/LogoMarquee';

// Variantes para el efecto cascada (stagger)
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Tiempo entre cada elemento
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } // Easing tipo "Spring" suave
    },
};

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="home" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black pt-32 pb-20">

            {/* --- 1. FONDO DE CUADRÍCULA ANIMADO --- */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
            />

            {/* --- 2. AURORAS CON RESPIRACIÓN ORGANICA --- */}
            {/* Capa 1 */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-15%] left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-[100%] bg-primary/30 blur-[120px] pointer-events-none mix-blend-screen z-0"
            />

            {/* Capa 2 */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-[100%] bg-green-600/20 blur-[100px] pointer-events-none z-0"
            />

            {/* --- CONTENIDO PRINCIPAL --- */}
            <div className="container relative z-10 px-4 md:px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto flex max-w-5xl flex-col items-center text-center"
                >
                    {/* BADGE TIPO CÁPSULA */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-2xl transition-colors hover:bg-white/10">
                            <span className="relative flex h-2.5 w-2.5 mr-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_#a3e635]"></span>
                            </span>
                            <span className="text-sm font-medium text-gray-200 tracking-wide flex items-center gap-2">
                                {t('badge')} <Sparkles size={14} className="text-primary" />
                            </span>
                        </div>
                    </motion.div>

                    {/* TÍTULO PRINCIPAL */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl xl:text-8xl leading-[1.1] drop-shadow-2xl">
                            <span className="block">{t('title_line1')}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 pb-4">
                                {t('title_line2')}
                            </span>
                        </h1>
                    </motion.div>

                    {/* SUBTÍTULO */}
                    <motion.div variants={itemVariants}>
                        <p className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed font-light">
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    {/* BOTONES (Añadí un botón secundario para dar balance visual) */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href="#contact"
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-all hover:bg-gray-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
                            >
                                <span>{t('cta_primary')}</span>
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                                    <ArrowRight size={16} />
                                </div>
                            </a>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a
                                href="#portfolio"
                                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/5"
                            >
                                <span>Ver Portafolio</span>
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- SLIDER DE LOGOS --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="relative mt-24 w-full max-w-[1400px] mx-auto z-10"
            >
                <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
                <LogoMarquee />
            </motion.div>
        </section>
    );
}
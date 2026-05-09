'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { QrCode, ShoppingBag, ExternalLink, Sparkles, Check } from 'lucide-react';

export default function Showcase() {
    const t = useTranslations('Showcase');

    // Variantes tipadas para evitar errores en Vercel
    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, rotateY: 10 },
        visible: { opacity: 1, scale: 1, rotateY: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
    };

    return (
        <section id="showcase" className="relative py-32 bg-[#050505] overflow-hidden">

            {/* --- FONDO --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* --- HEADER --- */}
                <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-24 flex flex-col items-center"
                >
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-xl">
                        <span className="text-sm font-medium text-gray-200 tracking-wide uppercase flex items-center gap-2">
                            <Sparkles size={14} className="text-primary/70" /> {t('tag')}
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                        <span className="text-white">{t('title_part1')} </span>
                        <span className="bg-gradient-to-br from-primary via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
                            {t('title_part2')}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="flex flex-col gap-32">
                    {/* =========================================
                        BLOQUE 1: MENÚ DIGITAL (MEDUSA)
                    ========================================= */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Contenido Texto */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit mb-6">
                                <QrCode size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">{t('menu.badge')}</span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('menu.title')}</h3>
                            <p className="text-primary/80 font-mono text-sm mb-6">{t('menu.subtitle')}</p>

                            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                                {t('menu.description')}
                            </p>

                            <ul className="space-y-4 mb-10">
                                {t.raw('menu.features').map((feat: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-primary" />
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://medusa.scryved.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold w-fit hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                {t('menu.cta')}
                                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </motion.div>

                        {/* Contenido Visual Gigante */}
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full lg:w-1/2 order-1 lg:order-2 perspective-[1000px]"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />
                                {/* REEMPLAZA CON LA IMAGEN REAL DE MEDUSA */}
                                <Image
                                    src="/assets/sites/medusa.png"
                                    alt="Medusa Menú Digital"
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Overlay Glass para dar toque premium */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">medusa.scryved.com</span>
                                        <span className="text-green-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> En Vivo</span>
                                    </div>
                                    <QrCode className="text-white/50" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* =========================================
                        BLOQUE 2: E-COMMERCE (FREEDOM)
                    ========================================= */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                        {/* Contenido Visual Gigante (Ahora a la izquierda) */}
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full lg:w-1/2 perspective-[1000px]"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-50" />
                                {/* REEMPLAZA CON LA IMAGEN REAL DE FREEDOM */}
                                <Image
                                    src="/assets/sites/freedom.jpeg"
                                    alt="Freedom Store E-commerce"
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">freedom.scryved.com</span>
                                        <span className="text-blue-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> En Vivo</span>
                                    </div>
                                    <ShoppingBag className="text-white/50" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Contenido Texto (Ahora a la derecha) */}
                        <motion.div
                            variants={fadeUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full lg:w-1/2 flex flex-col"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit mb-6">
                                <ShoppingBag size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">{t('store.badge')}</span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('store.title')}</h3>
                            <p className="text-blue-400/80 font-mono text-sm mb-6">{t('store.subtitle')}</p>

                            <p className="text-gray-400 text-lg font-light leading-relaxed mb-8">
                                {t('store.description')}
                            </p>

                            <ul className="space-y-4 mb-10">
                                {t.raw('store.features').map((feat: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <Check size={14} className="text-blue-400" />
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://freedom.scryved.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold w-fit hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                {t('store.cta')}
                                <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
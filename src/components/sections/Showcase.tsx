'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { QrCode, ShoppingBag, ExternalLink, Sparkles, Check } from 'lucide-react';

export default function Showcase() {
    const t = useTranslations('Showcase');

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
    };

    const bentoItemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
    };

    return (
        <section id="showcase" className="relative py-32 bg-[#050505] overflow-hidden">
            {/* --- FONDO --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-30 mix-blend-screen" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* --- HEADER --- */}
                <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 flex flex-col items-center"
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

                {/* --- BENTO GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    
                    {/* BENTO ITEM 1: MEDUSA (Wide) */}
                    <motion.div
                        variants={bentoItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="lg:col-span-3 group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 shadow-2xl flex flex-col lg:flex-row h-auto lg:h-[500px] backdrop-blur-sm hover:border-primary/50 transition-colors duration-500"
                    >
                        {/* Gradient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Content */}
                        <div className="p-8 lg:p-10 flex flex-col justify-center w-full lg:w-1/2 z-10 relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit mb-6">
                                <QrCode size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">{t('menu.badge')}</span>
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('menu.title')}</h3>
                            <p className="text-primary/80 font-mono text-xs mb-4">{t('menu.subtitle')}</p>
                            
                            <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                                {t('menu.description')}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {t.raw('menu.features').slice(0,2).map((feat: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={12} className="text-primary" />
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="https://medusa.scryved.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-primary transition-colors mt-auto w-fit"
                            >
                                {t('menu.cta')}
                                <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </a>
                        </div>

                        {/* Image */}
                        <div className="relative w-full lg:w-1/2 h-64 lg:h-full mt-auto lg:mt-0 overflow-hidden rounded-tl-3xl lg:rounded-tl-none lg:rounded-bl-3xl lg:rounded-l-3xl">
                            {/* Subtle mask to fade the edge on desktop */}
                            <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111113] to-transparent z-10" />
                            <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#111113] to-transparent z-10" />
                            
                            <Image
                                src="/assets/sites/medusa.png"
                                alt="Medusa Menú Digital"
                                fill
                                className="object-cover object-top lg:object-left-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </motion.div>

                    {/* BENTO ITEM 2: FREEDOM (Tall) */}
                    <motion.div
                        variants={bentoItemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="lg:col-span-2 group relative rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 shadow-2xl flex flex-col h-auto lg:h-[500px] backdrop-blur-sm hover:border-blue-500/50 transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Content */}
                        <div className="p-8 lg:p-10 flex flex-col z-10 relative">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 w-fit mb-6">
                                <ShoppingBag size={14} />
                                <span className="text-xs font-bold uppercase tracking-wider">{t('store.badge')}</span>
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('store.title')}</h3>
                            <p className="text-blue-400/80 font-mono text-xs mb-4">{t('store.subtitle')}</p>
                            
                            <p className="text-gray-400 text-sm font-light leading-relaxed mb-6 line-clamp-2">
                                {t('store.description')}
                            </p>

                            <a
                                href="https://freedom.scryved.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/btn relative inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-blue-400 transition-colors w-fit"
                            >
                                {t('store.cta')}
                                <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </a>
                        </div>

                        {/* Image Peeking from bottom */}
                        <div className="relative w-full h-64 lg:h-full mt-auto flex-grow overflow-hidden rounded-t-2xl mx-auto w-[90%] border-t border-x border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                            <Image
                                src="/assets/sites/freedom.jpeg"
                                alt="Freedom Store E-commerce"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
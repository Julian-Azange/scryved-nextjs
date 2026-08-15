'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { Maximize2, X, Sparkles } from 'lucide-react';

const images = [
    '/assets/gallery/image1.jpeg',
    '/assets/gallery/image2.jpeg',
    '/assets/gallery/image3.jpeg',
    '/assets/gallery/image4.jpeg',
    '/assets/gallery/image5.jpeg',
    '/assets/gallery/image6.jpeg',
    '/assets/gallery/image7.jpeg',
    '/assets/gallery/image8.jpeg',
];

export default function Gallery() {
    const t = useTranslations('Gallery');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section id="gallery" className="relative py-32 bg-transparent overflow-hidden">

            {/* --- FONDO UNIFICADO (Cuadrícula y Auroras) --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* --- ENCABEZADO --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 flex flex-col items-center"
                >
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-xl">
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_#a3e635]"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200 tracking-wide uppercase flex items-center gap-2">
                            {t('tag')} <Sparkles size={14} className="text-primary/70" />
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                        <span className="text-white">{t('title_part1')} </span>
                        <span className="bg-gradient-to-br from-primary via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
                            {t('title_part2')}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* --- GRID DE MARCOS FLOTANTES --- */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {images.map((imgSrc, index) => {
                        // Generamos valores pseudo-aleatorios basados en el índice para que cada cuadro flote distinto
                        const floatDuration = 4 + (index % 3) * 1.5;
                        const floatDelay = index * 0.2;

                        return (
                            <motion.div
                                key={index}
                                // Animación de entrada al hacer scroll
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="break-inside-avoid relative"
                            >
                                {/* Animación infinita de flotación (independiente de la entrada) */}
                                <motion.div
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{
                                        duration: floatDuration,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: floatDelay
                                    }}
                                >
                                    <motion.div
                                        layoutId={`gallery-frame-${index}`}
                                        onClick={() => setSelectedId(index)}
                                        whileHover={{ scale: 1.02 }}
                                        className={cn(
                                            "group relative p-3 rounded-[2rem] cursor-pointer",
                                            "bg-white/[0.02] border border-white/5",
                                            "backdrop-blur-xl overflow-hidden shadow-lg",
                                            "hover:bg-white/[0.05] hover:border-primary/30 hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.2)]",
                                            "transition-colors duration-500"
                                        )}
                                    >
                                        {/* Contenedor de la Imagen */}
                                        <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                                            <Image
                                                src={imgSrc}
                                                alt={`Instalación Scryved ${index + 1}`}
                                                width={600}
                                                height={800} // El alto se ajustará automáticamente por el masonry
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                                            />

                                            {/* Resplandor y Botón de Zoom (Glassmorphism) en Hover */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                                <div className="bg-white/10 border border-white/20 p-4 rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl backdrop-blur-md">
                                                    <Maximize2 size={24} className="group-hover:text-primary transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* --- MODAL LIGHTBOX PREMIUM --- */}
            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Botón Cerrar */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-6 right-6 z-50 p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-xl backdrop-blur-md"
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Imagen Expandida */}
                        <motion.div
                            layoutId={`gallery-frame-${selectedId}`}
                            className="relative w-auto h-auto max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10 bg-[#0a0a0a] p-2 sm:p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image
                                    src={images[selectedId]}
                                    alt="Vista detallada"
                                    width={1600}
                                    height={1600}
                                    className="w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
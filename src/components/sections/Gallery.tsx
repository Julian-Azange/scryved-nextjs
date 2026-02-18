'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { Camera, X, ZoomIn } from 'lucide-react';

// Imágenes de ejemplo expandidas para el mosaico.
// Reemplaza con tus fotos reales de instalaciones en public/assets/gallery/
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
    // Ya no necesitamos los textos de los items del JSON para la grilla.

    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section id="gallery" className="relative py-24 bg-zinc-950 overflow-hidden">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6">

                {/* Encabezado */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Camera className="w-4 h-4 text-primary" />
                        <span className="text-primary text-sm font-bold uppercase tracking-wider">
                            {t('tag')}
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        {t('title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">{t('title_part2')}</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                {/* --- Grid Mosaico (Masonry con CSS Columns) --- 
          Usamos 'columns-' para crear el efecto de Pinterest.
          'space-y-4' da el espaciado vertical entre items de la misma columna.
        */}
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
                    {images.map((imgSrc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }} // Delay más rápido para muchas fotos
                            layoutId={`gallery-image-${index}`}
                            onClick={() => setSelectedId(index)}
                            // 'break-inside-avoid' es crucial para que las imágenes no se corten entre columnas
                            className={cn(
                                "group relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid",
                                "border border-white/10 bg-zinc-900/50"
                            )}
                        >
                            {/* Imagen: Usamos width y height arbitrarios para que next/image calcule el aspecto 
                  y el navegador lo acomode en la columna. 
                  Importante: No usar 'fill' aquí para el efecto mosaico real. */}
                            <Image
                                src={imgSrc}
                                alt={`Instalación Scryved ${index + 1}`}
                                width={600}
                                height={800} // Altura base, el navegador la ajustará según la imagen real
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                            />

                            {/* Overlay Hover Simple con Icono */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-primary/80 p-3 rounded-full text-black transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <ZoomIn size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Modal Lightbox (Limpio, solo imagen) */}
            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // Fondo más oscuro para mayor contraste
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Botón Cerrar Flotante */}
                        <button className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-primary hover:text-black transition-all">
                            <X size={28} />
                        </button>

                        <motion.div
                            layoutId={`gallery-image-${selectedId}`}
                            // Contenedor de imagen flexible que se adapta a la pantalla sin recortar
                            className="relative w-auto h-auto max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Imagen en el modal: Usamos 'intrinsic' o 'responsive' behavior con width/height reales si se tienen, 
                  o un contenedor flexible como ahora. 'object-contain' asegura que se vea entera. */}
                            <Image
                                src={images[selectedId]}
                                alt="Vista detallada"
                                width={1200} // Valores altos para asegurar buena calidad
                                height={1200}
                                className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
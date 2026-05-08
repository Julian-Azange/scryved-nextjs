'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, LayoutGrid, ArrowRight } from 'lucide-react';
import { Link } from '@/src/i18n/routing';
import ColombiaFlag from '../icons/ColombiaFlag';
import PeruFlag from '../icons/PeruFlag';
import EcuadorFlag from '../icons/EcuadorFlag';

// Variantes de animación
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Componente Tarjeta de Imagen (Spotlight Effect)
const ImageCard = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            variants={itemVariants}
            className={`group relative rounded-2xl border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Efecto Spotlight (Luz del mouse) */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(132, 204, 22, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            {/* Imagen */}
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Overlay oscuro para unificar tonos */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
        </motion.div>
    );
};

// Badge de País
const CountryBadge = ({ Icon, label }: { Icon: any, label: string }) => (
    <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default select-none">
        <div className="w-5 h-5 rounded-full overflow-hidden shadow-sm relative">
            <Icon className="w-full h-full object-cover" />
        </div>
        <span className="text-gray-300 text-xs font-medium uppercase tracking-wide">{label}</span>
    </div>
);

export default function FinanLock() {
    const t = useTranslations('FinanLock'); // Usaremos el namespace 'FinanLock'
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Lista de características desde traducciones (asumiendo keys feature1, feature2...)
    const featureKeys = ['feature1', 'feature2', 'feature3', 'feature4'];

    const images = [
        { src: '/assets/images/devices.jpeg', alt: 'FinanLock Devices' },
        { src: '/assets/images/smartpay.png', alt: 'Dashboard' },
        { src: '/assets/images/tienda.jpg', alt: 'Retail' },
        { src: '/assets/images/tienda-2.jpg', alt: 'Analytics' },
    ];

    return (
        <section id="finanlock" ref={sectionRef} className="relative py-24 min-h-screen bg-black overflow-hidden flex items-center">

            {/* --- BACKGROUND EFFECTS --- */}
            {/* Glow de fondo (Verde y Azul sutil) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" />
            </div>
            {/* Textura de ruido */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-0 mix-blend-overlay"></div>


            <div className="container relative z-10 px-4 md:px-6">

                {/* --- HEADER DE SECCIÓN --- */}
                <motion.div
                    className="text-center mb-20 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {/* Badge de Sección */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                        <LayoutGrid size={14} />
                        {t('section_tag')}
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        {t('title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-emerald-500">{t('title_part2')}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                        {t('description_main')}
                    </p>
                </motion.div>

                {/* --- CONTENIDO PRINCIPAL --- */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* COLUMNA IZQUIERDA: DETALLES */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-6">
                            {t('subtitle')}
                        </motion.h3>

                        <motion.div variants={itemVariants} className="relative pl-6 mb-10 border-l-2 border-primary/30">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {t('description_detail')}
                            </p>
                        </motion.div>

                        {/* Disponibilidad */}
                        <motion.div variants={itemVariants} className="mb-10">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{t('availability')}</h4>
                            <div className="flex flex-wrap gap-3">
                                <CountryBadge Icon={ColombiaFlag} label="Colombia" />
                                <CountryBadge Icon={PeruFlag} label="Perú" />
                                <CountryBadge Icon={EcuadorFlag} label="Ecuador" />
                            </div>
                        </motion.div>

                        {/* Lista de Features */}
                        <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-y-4 gap-x-6 mb-12">
                            {featureKeys.map((key) => (
                                <div key={key} className="flex items-start group">
                                    <div className="mt-1 mr-3 min-w-[20px]">
                                        <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-gray-400 font-medium group-hover:text-gray-200 transition-colors">
                                        {t(`features.${key}`)}
                                    </span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Botón de Acción */}
                        <motion.div variants={itemVariants}>
                            <a
                                href="https://finanlock.com" // URL de tu producto
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] transform hover:-translate-y-1"
                            >
                                {t('cta_button')}
                                <ArrowRight size={18} />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* COLUMNA DERECHA: GRID DE IMÁGENES (BENTO) */}
                    <motion.div
                        className="grid grid-cols-2 gap-4 h-[600px] relative"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Las tarjetas tienen alturas diferentes para el efecto asimétrico */}
                        <ImageCard src={images[0].src} alt={images[0].alt} className="row-span-2 h-full" /> {/* Alta Izquierda */}
                        <ImageCard src={images[1].src} alt={images[1].alt} className="h-64" /> {/* Corta Derecha Arriba */}
                        <ImageCard src={images[2].src} alt={images[2].alt} className="h-auto grow" /> {/* Resto Derecha Abajo */}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
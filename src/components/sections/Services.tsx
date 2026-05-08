'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
// Actualicé algunos iconos a versiones más elegantes de Lucide
import { Code2, Smartphone, Cpu, Cloud, PenTool, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Mapeo de iconos actualizado para un look más técnico/premium
const iconMap: Record<string, any> = {
    'web': Code2,
    'mobile': Smartphone,
    'custom_software': Cpu,
    'ui_ux': PenTool,
    'devops': Cloud,
    'qa': ShieldCheck,
};

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    features: string[];
}

export default function Services() {
    const t = useTranslations('Services');
    const services = t.raw('items') as ServiceItem[];

    // Animaciones
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        }
    };

    return (
        <section id="services" className="relative py-32 overflow-hidden bg-black">

            {/* --- 1. FONDO DE CUADRÍCULA ANIMADO Y DEGRADADO (Estilo Hero) --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Auroras de fondo para dar volumen */}
            <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* --- HEADER DE LA SECCIÓN --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 flex flex-col items-center"
                >
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-xl">
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_#a3e635]"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200 tracking-wide flex items-center gap-2">
                            {t('tag')} <Sparkles size={14} className="text-primary/70" />
                        </span>
                    </div>

                    {/* Título */}
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

                {/* --- GRID DE SERVICIOS --- */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.id] || Code2;

                        return (
                            <motion.div
                                key={service.id}
                                variants={itemVariant}
                                whileHover={{ y: -8, scale: 1.01 }}
                                className="group relative"
                            >
                                <div className={cn(
                                    'relative h-full flex flex-col p-8 rounded-[2rem]',
                                    'bg-white/[0.02] border border-white/5',
                                    'backdrop-blur-xl overflow-hidden',
                                    'transition-all duration-500 ease-out',
                                    'hover:bg-white/[0.04] hover:border-primary/30',
                                    'hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]'
                                )}>
                                    {/* Resplandor interior en hover */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col h-full">

                                        {/* Icono Premium Refinado */}
                                        <div className={cn(
                                            'relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8',
                                            'bg-gradient-to-b from-white/5 to-transparent border border-white/10 shadow-inner',
                                            'group-hover:from-primary/10 group-hover:border-primary/40',
                                            'transition-all duration-500 overflow-hidden'
                                        )}>
                                            {/* Efecto de borde superior brillante (Glass reflection) */}
                                            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:via-primary/60 transition-colors duration-500" />

                                            {/* Icono con trazo fino (strokeWidth) y efecto glow en hover */}
                                            <Icon
                                                strokeWidth={1.5}
                                                className="w-8 h-8 text-gray-300 group-hover:text-primary transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(163,230,53,0.6)] group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Título y Descripción */}
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-400 text-base leading-relaxed mb-8 flex-grow font-light">
                                            {service.description}
                                        </p>

                                        {/* Lista de características (Sin botón debajo, esta es la última parte visual) */}
                                        <ul className="space-y-3 mb-2">
                                            {(service.features || []).slice(0, 3).map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/80 flex-shrink-0 group-hover:bg-primary group-hover:shadow-[0_0_8px_#a3e635] transition-all" />
                                                    <span className="font-medium tracking-wide">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
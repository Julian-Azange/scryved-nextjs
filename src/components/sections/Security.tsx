'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
// Actualizamos a iconos más representativos y estilizados
import { Check, ShieldCheck, Cctv, Siren, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SecurityKit {
    id: string;
    title: string;
    tagline: string;
    price: string;
    currency: string;
    description: string;
    features: string[];
    badge?: string;
    price_note?: string;
}

export default function SecurityKits() {
    const t = useTranslations('Security');

    // 1. Configuración Visual: Iconos actualizados
    const kitConfig: Record<string, { icon: any, featured: boolean }> = {
        'kit_4k_pro': { icon: Cctv, featured: false },
        'kit_business': { icon: ShieldCheck, featured: true }, // Destacado
        'kit_alarms': { icon: Siren, featured: false },
    };

    const rawKits = t.raw('kits') as SecurityKit[];

    // Animaciones sincronizadas con el resto del sitio
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariant: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
        },
    };

    return (
        <section id="security" className="relative py-32 overflow-hidden bg-black">

            {/* --- 1. CONTINUIDAD DEL FONDO (Cuadrícula y Auroras) --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="absolute top-1/3 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-30 pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* --- HEADER DE LA SECCIÓN --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 flex flex-col items-center"
                >
                    {/* Badge unificado */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-xl">
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_#a3e635]"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200 tracking-wide flex items-center gap-2">
                            {t('tag')} <Zap size={14} className="text-primary/70" />
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

                {/* --- GRID DE PRECIOS/KITS --- */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8"
                >
                    {rawKits.map((kitData) => {
                        const config = kitConfig[kitData.id] || { icon: Cctv, featured: false };
                        const Icon = config.icon;
                        const isFeatured = config.featured;

                        return (
                            <motion.div
                                key={kitData.id}
                                variants={itemVariant}
                                whileHover={{ y: -8, scale: 1.01 }}
                                className={cn(
                                    'group relative',
                                    isFeatured ? 'md:z-20' : 'z-10'
                                )}
                            >
                                <div className={cn(
                                    'relative h-full flex flex-col p-8 rounded-[2rem]',
                                    'bg-white/[0.02] border',
                                    'backdrop-blur-xl overflow-hidden',
                                    'transition-all duration-500 ease-out',
                                    isFeatured
                                        ? 'border-primary/40 shadow-[0_0_40px_-15px_rgba(163,230,53,0.2)] bg-white/[0.04]'
                                        : 'border-white/5 hover:bg-white/[0.04] hover:border-primary/30 hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]'
                                )}>

                                    {/* Resplandor interior */}
                                    <div className={cn(
                                        "absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500",
                                        isFeatured ? "bg-primary/20 opacity-100" : "bg-primary/20 opacity-0 group-hover:opacity-100"
                                    )} />

                                    <div className="relative z-10 flex flex-col h-full">

                                        {/* HEADER DE LA CARD: Icono + Badge */}
                                        <div className="flex justify-between items-start mb-8">
                                            {/* Icono Premium */}
                                            <div className={cn(
                                                'relative w-16 h-16 rounded-2xl flex items-center justify-center',
                                                'bg-gradient-to-b from-white/5 to-transparent border shadow-inner',
                                                'transition-all duration-500 overflow-hidden',
                                                isFeatured
                                                    ? 'border-primary/50 from-primary/10'
                                                    : 'border-white/10 group-hover:from-primary/10 group-hover:border-primary/40'
                                            )}>
                                                <div className={cn(
                                                    "absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-50 transition-colors duration-500",
                                                    isFeatured ? "via-primary/80" : "via-white/30 group-hover:via-primary/60"
                                                )} />
                                                <Icon
                                                    strokeWidth={1.5}
                                                    className={cn(
                                                        "w-8 h-8 transition-all duration-500",
                                                        isFeatured
                                                            ? "text-primary drop-shadow-[0_0_15px_rgba(163,230,53,0.6)]"
                                                            : "text-gray-300 group-hover:text-primary group-hover:drop-shadow-[0_0_15px_rgba(163,230,53,0.6)] group-hover:scale-110"
                                                    )}
                                                />
                                            </div>

                                            {/* BADGE "MÁS VENDIDO" INTEGRADO (Ya no se recorta) */}
                                            {kitData.badge && (
                                                <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md">
                                                    <span className="text-primary text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                                                        <Sparkles size={10} /> {kitData.badge}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Título y Tagline */}
                                        <h3 className={cn(
                                            "text-2xl font-bold mb-1 transition-colors duration-300 tracking-tight",
                                            isFeatured ? "text-white" : "text-white group-hover:text-primary"
                                        )}>
                                            {kitData.title}
                                        </h3>
                                        <p className="text-primary/80 text-xs font-semibold uppercase tracking-widest mb-4">
                                            {kitData.tagline}
                                        </p>

                                        {/* Descripción */}
                                        <p className="text-gray-400 text-sm mb-6 flex-grow font-light leading-relaxed">
                                            {kitData.description}
                                        </p>

                                        {/* Bloque de Precio Premium */}
                                        <div className="mb-8 p-5 bg-black/40 rounded-2xl border border-white/5 backdrop-blur-sm">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-white tracking-tighter">
                                                    {kitData.price}
                                                </span>
                                                {kitData.price !== 'Cotizar' && kitData.price !== 'Quote' && (
                                                    <span className="text-gray-500 text-sm font-medium">
                                                        {kitData.currency}
                                                    </span>
                                                )}
                                            </div>
                                            {kitData.price_note && (
                                                <p className="text-gray-500 text-xs mt-2 font-light">{kitData.price_note}</p>
                                            )}
                                        </div>

                                        {/* Lista de características pulida */}
                                        <ul className="space-y-3 mb-2">
                                            {(kitData.features || []).map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <Check
                                                        strokeWidth={2.5}
                                                        className={cn(
                                                            "w-4 h-4 flex-shrink-0 mt-0.5 transition-colors",
                                                            isFeatured ? "text-primary" : "text-primary/60 group-hover:text-primary"
                                                        )}
                                                    />
                                                    <span className="text-gray-300 text-sm tracking-wide font-light">
                                                        {feature}
                                                    </span>
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
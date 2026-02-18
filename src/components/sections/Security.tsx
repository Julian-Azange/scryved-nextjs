'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/src/i18n/routing'; // Usamos el Link optimizado para i18n
import { motion } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import { Check, ShieldCheck, Video, Radio, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Definimos la interfaz para TypeScript basada en tu JSON
interface SecurityKit {
    id: string;
    title: string;
    tagline: string;
    price: string;
    currency: string;
    description: string;
    features: string[];
    cta: string;
    badge?: string;
    price_note?: string;
}

export default function SecurityKits() {
    const t = useTranslations('Security');
    const locale = useLocale();

    // 1. Configuración Visual: Mapeamos los IDs del JSON a Iconos y Estado Destacado
    const kitConfig: Record<string, { icon: any, featured: boolean }> = {
        'kit_4k_pro': { icon: Video, featured: false },
        'kit_business': { icon: ShieldCheck, featured: true }, // Este es el destacado
        'kit_alarms': { icon: Radio, featured: false },
    };

    // 2. Datos: Obtenemos el array crudo del JSON para evitar errores de IDs
    const rawKits = t.raw('kits') as SecurityKit[];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section id="security" className="relative py-24 overflow-hidden bg-black">
            {/* Background glow effects */}
            <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-500/5 rounded-full blur-3xl opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className={cn(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                        'bg-green-500/10 border border-green-500/30 mb-8'
                    )}>
                        <Zap className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-semibold">
                            {t('tag')}
                        </span>
                    </div>

                    <h2 className={cn(
                        'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter',
                        'mb-4 leading-tight'
                    )}>
                        <span className="text-white">{t('title_part1')} </span>
                        <span className="bg-gradient-to-r from-green-500 via-green-400 to-green-500 bg-clip-text text-transparent">
                            {t('title_part2')}
                        </span>
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {rawKits.map((kitData) => {
                        // Obtenemos config visual usando el ID del JSON
                        // Si el ID no coincide, usamos valores por defecto para no romper la app
                        const config = kitConfig[kitData.id] || { icon: Video, featured: false };
                        const Icon = config.icon;
                        const isFeatured = config.featured;

                        return (
                            <motion.div
                                key={kitData.id}
                                variants={itemVariant}
                                className={cn(
                                    'relative rounded-2xl overflow-hidden flex flex-col',
                                    isFeatured ? 'md:scale-105 md:z-20 shadow-2xl shadow-green-900/20' : ''
                                )}
                            >
                                {/* Featured border animation */}
                                {isFeatured && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                )}

                                <div
                                    className={cn(
                                        'relative h-full p-8 rounded-2xl backdrop-blur-lg flex flex-col',
                                        'border transition-all duration-300',
                                        'hover:shadow-lg hover:shadow-green-500/20',
                                        isFeatured
                                            ? 'bg-green-500/10 border-green-500/50 hover:border-green-500/80'
                                            : 'bg-zinc-900/50 border-white/10 hover:border-green-500/40 hover:bg-green-500/5'
                                    )}
                                >
                                    {/* Featured Badge (MÁS VENDIDO) */}
                                    {kitData.badge && (
                                        <div className={cn(
                                            'absolute -top-3 left-1/2 -translate-x-1/2',
                                            'px-4 py-1 rounded-full bg-green-500 text-black text-xs font-bold',
                                            'shadow-lg shadow-green-500/50 tracking-wider uppercase'
                                        )}>
                                            {kitData.badge}
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={cn(
                                        'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
                                        'transition-all duration-300',
                                        isFeatured
                                            ? 'bg-green-500/30 border border-green-500/60 text-green-300'
                                            : 'bg-green-500/10 border border-green-500/30 text-green-400'
                                    )}>
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {kitData.title}
                                    </h3>

                                    {/* Tagline */}
                                    <p className="text-green-400 text-xs font-semibold uppercase tracking-wide mb-4">
                                        {kitData.tagline}
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm mb-6 flex-grow">
                                        {kitData.description}
                                    </p>

                                    {/* Price Section */}
                                    <div className="mb-8 p-4 bg-black/20 rounded-xl border border-white/5">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white">
                                                {kitData.price}
                                            </span>
                                            {/* Solo mostramos moneda si es un precio numérico, no 'Cotizar' */}
                                            {kitData.price !== 'Cotizar' && kitData.price !== 'Quote' && (
                                                <span className="text-gray-500 text-sm font-medium">
                                                    {kitData.currency}
                                                </span>
                                            )}
                                        </div>
                                        {kitData.price_note && (
                                            <p className="text-gray-500 text-xs mt-1">{kitData.price_note}</p>
                                        )}
                                    </div>

                                    {/* Features List - Blindado con (|| []) */}
                                    <ul className="space-y-3 mb-8">
                                        {(kitData.features || []).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link href="/contact" className="mt-auto">
                                        <Button
                                            className={cn(
                                                'w-full rounded-full px-6 py-3 font-bold transition-all duration-300',
                                                'flex items-center justify-center gap-2 group',
                                                isFeatured
                                                    ? 'bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-500/50 hover:shadow-green-500/80'
                                                    : 'bg-transparent border border-green-500/50 text-green-400 hover:bg-green-500 hover:text-black hover:border-transparent'
                                            )}
                                        >
                                            {kitData.cta}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={cn(
                        'p-8 rounded-2xl',
                        'bg-green-500/5 border border-green-500/20',
                        'text-center backdrop-blur-sm'
                    )}
                >
                    <p className="text-gray-300 mb-4 text-lg">
                        {locale === 'es'
                            ? '¿Necesitas una instalación a medida para tu empresa?'
                            : 'Do you need a custom installation for your company?'}
                    </p>
                    <Link href="/contact">
                        <Button
                            variant="outline"
                            className={cn(
                                'rounded-full px-8 py-2',
                                'border-green-500/50 hover:border-green-500 text-green-400 hover:text-green-300',
                                'hover:bg-green-500/10 font-semibold'
                            )}
                        >
                            {locale === 'es' ? 'Contactar Especialista' : 'Contact Specialist'}
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
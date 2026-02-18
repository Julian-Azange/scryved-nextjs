'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/src/i18n/routing';
import { motion } from 'framer-motion';
import { Button } from '@/src/components/ui/button';
import { Code, Smartphone, Zap, Cloud, Palette, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Mapeo de iconos basado en el 'id' que viene en el JSON
const iconMap: Record<string, any> = {
    'web': Code,
    'mobile': Smartphone,
    'custom_software': Zap,
    'ui_ux': Palette,
    'devops': Cloud,
    'qa': CheckCircle2,
};

// Definimos la interfaz de cómo se ve un item en tu JSON para TypeScript
interface ServiceItem {
    id: string;
    title: string;
    description: string;
    features: string[];
    cta: string;
}

export default function Services() {
    const t = useTranslations('Services');
    const locale = useLocale();

    // MAGIA AQUÍ: Usamos t.raw('items') para obtener el Array real del JSON.
    // Esto evita tener que llamar t('items.0.features.0') manualmante.
    const services = t.raw('items') as ServiceItem[];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="services" className="relative py-24 overflow-hidden bg-black">
            {/* Animated background glow */}
            <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-20" />

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
                        'bg-primary/10 border border-primary/30 mb-8'
                    )}>
                        <span className="text-primary text-sm font-semibold">
                            {t('tag')}
                        </span>
                    </div>

                    <h2 className={cn(
                        'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter',
                        'mb-4 leading-tight'
                    )}>
                        <span className="text-white">{t('title_part1')} </span>
                        <span className="bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent">
                            {t('title_part2')}
                        </span>
                    </h2>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => {
                        const Icon = iconMap[service.id] || Code;

                        return (
                            <motion.div key={service.id} variants={itemVariant}>
                                <div className={cn(
                                    'group relative p-8 rounded-2xl h-full flex flex-col',
                                    'bg-zinc-900/50 border border-white/5',
                                    'backdrop-blur-lg hover:backdrop-blur-xl',
                                    'hover:bg-primary/5 hover:border-primary/50',
                                    'transition-all duration-300 overflow-hidden',
                                    'hover:shadow-lg hover:shadow-primary/20'
                                )}>
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon */}
                                        <div className={cn(
                                            'w-14 h-14 rounded-xl flex items-center justify-center mb-6',
                                            'bg-primary/10 border border-primary/30',
                                            'group-hover:bg-primary/20 group-hover:border-primary/60',
                                            'group-hover:shadow-lg group-hover:shadow-primary/30',
                                            'transition-all duration-300'
                                        )}>
                                            <Icon className="w-7 h-7 text-primary group-hover:text-green-300 transition-colors" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                                            {service.description}
                                        </p>

                                        {/* Features List (Tomamos las primeras 3 features del array) */}
                                        <ul className="space-y-2 mb-6">
                                            {/* Usamos (service.features || []) para evitar el error si es undefined */}
                                            {(service.features || []).slice(0, 3).map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <Link href="/contact" className="mt-auto">
                                            <Button
                                                className={cn(
                                                    'w-full rounded-full px-4 py-2 text-sm font-semibold',
                                                    'bg-transparent border border-primary/30 text-primary',
                                                    'hover:bg-primary hover:border-primary hover:text-black',
                                                    'transition-all duration-300 flex items-center justify-center gap-2',
                                                    'group/btn'
                                                )}
                                                variant="ghost"
                                            >
                                                {service.cta}
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400 mb-6">
                        {locale === 'es' ? '¿Necesitas algo más específico?' : 'Need something more specific?'}
                    </p>
                    <Link href="/contact">
                        <Button
                            className={cn(
                                'rounded-full px-8 py-3',
                                'bg-primary hover:bg-green-600 text-black font-bold',
                                'shadow-lg shadow-primary/50 hover:shadow-primary/80',
                                'transition-all duration-300'
                            )}
                        >
                            {locale === 'es' ? 'Solicita una consulta gratuita' : 'Request a free consultation'}
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
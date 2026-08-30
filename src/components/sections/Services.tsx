'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    features: string[];
    cta?: string;
}

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
};

/* ─── CSS Keyframes ─── */
const servicesStyles = `
@keyframes services-orb-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -50px) scale(1.06); }
    50% { transform: translate(-20px, -80px) scale(0.97); }
    75% { transform: translate(50px, -30px) scale(1.03); }
}
@keyframes services-orb-2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-40px, 50px) scale(1.08); }
    66% { transform: translate(25px, 70px) scale(0.94); }
}
`;

/* ─── Service Icon Map ─── */
const serviceIcons: Record<string, string> = {
    web: '◇',
    mobile: '◈',
    custom_software: '⬡',
    ui_ux: '◎',
    devops: '⬢',
    qa: '△',
};

export default function Services() {
    const t = useTranslations('Services');
    const services = t.raw('items') as ServiceItem[];
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: servicesStyles }} />
            <section
                id="services"
                className="relative overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Orb 1 — top-right */}
                    <div
                        className="absolute"
                        style={{
                            top: '-10%',
                            right: '-8%',
                            width: '40vw',
                            height: '40vw',
                            maxWidth: '600px',
                            maxHeight: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.08) 0%, rgba(163, 230, 53, 0.02) 40%, transparent 70%)',
                            filter: 'blur(80px)',
                            animation: 'services-orb-1 24s ease-in-out infinite',
                        }}
                    />
                    {/* Orb 2 — bottom-left */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '-10%',
                            left: '-8%',
                            width: '35vw',
                            height: '35vw',
                            maxWidth: '500px',
                            maxHeight: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 60%)',
                            filter: 'blur(90px)',
                            animation: 'services-orb-2 30s ease-in-out infinite',
                        }}
                    />
                    {/* Noise */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                            opacity: 0.4,
                        }}
                    />
                    {/* Top line accent */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.12), transparent)',
                        }}
                    />
                </div>

                {/* ═══ Content ═══ */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] py-20 md:py-28 lg:py-32"
                >
                    {/* ─── Header ─── */}
                    {/* ─── Header ─── */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col mb-16 md:mb-24 w-full"
                    >
                        {/* Top row: Tag and Section Counter */}
                        <div className="flex justify-between items-start w-full mb-8 md:mb-12">
                            {/* Tag */}
                            <div
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                                style={{
                                    border: '1px solid rgba(163, 230, 53, 0.2)',
                                    background: 'rgba(163, 230, 53, 0.05)',
                                    color: '#a3e635',
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ background: '#a3e635' }}
                                />
                                {t('tag')}
                            </div>

                            {/* Section counter */}
                            <div className="hidden md:flex flex-col items-end gap-1">
                                <span
                                    className="text-[11px] font-mono tracking-widest uppercase"
                                    style={{ color: 'rgba(255,255,255,0.25)' }}
                                >
                                    [02]
                                </span>
                                <span
                                    className="text-[11px] font-mono tracking-widest"
                                    style={{ color: '#a3e635' }}
                                >
                                    // SERVICIOS
                                </span>
                            </div>
                        </div>

                        {/* Huge Title Container (Hero Style) */}
                        <div className="w-full flex flex-col mb-8 overflow-hidden">
                            <h2
                                className="text-[clamp(3.5rem,10vw,14rem)] font-bold tracking-tighter leading-[0.85] uppercase"
                                style={{ color: '#ffffff' }}
                            >
                                {t('title_part1')}
                            </h2>
                            <div className="flex items-start">
                                <span
                                    className="text-[clamp(3.5rem,10vw,14rem)] font-bold tracking-tighter leading-[0.85] italic uppercase"
                                    style={{ color: '#a3e635' }}
                                >
                                    {t('title_part2')}
                                </span>
                            </div>
                        </div>

                        {/* Subtitle */}
                        <p
                            className="text-[clamp(0.95rem,1.5vw,1.25rem)] font-medium max-w-xl leading-relaxed"
                            style={{ color: 'rgba(255,255,255,0.45)' }}
                        >
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    {/* ─── Services Accordion ─── */}
                    <motion.div
                        variants={fadeUp}
                        className="w-full flex flex-col"
                        style={{ borderTop: '1px solid rgba(163, 230, 53, 0.1)' }}
                    >
                        {services.map((service, index) => {
                            const isHovered = hoveredIndex === index;
                            const icon = serviceIcons[service.id] || '◆';

                            return (
                                <div
                                    key={service.id}
                                    className="group cursor-pointer transition-colors duration-500"
                                    style={{
                                        borderBottom: '1px solid rgba(163, 230, 53, 0.08)',
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                >
                                    <div className="flex flex-col md:flex-row py-6 md:py-8 transition-all duration-500 ease-out">

                                        {/* Number & Title */}
                                        <div className="w-full md:w-1/2 flex items-start gap-6 md:gap-10">
                                            <span
                                                className="text-[11px] md:text-sm font-mono mt-2 transition-colors duration-500"
                                                style={{
                                                    color: isHovered ? '#a3e635' : 'rgba(255,255,255,0.2)',
                                                }}
                                            >
                                                {(index + 1).toString().padStart(2, '0')})
                                            </span>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                {/* Icon */}
                                                <span
                                                    className="text-lg md:text-xl transition-all duration-500"
                                                    style={{
                                                        color: isHovered ? '#a3e635' : 'rgba(255,255,255,0.15)',
                                                        transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                                                    }}
                                                >
                                                    {icon}
                                                </span>
                                                <h3
                                                    className={cn(
                                                        "text-[clamp(1.4rem,3vw,2.8rem)] font-bold tracking-tighter transition-colors duration-500"
                                                    )}
                                                    style={{
                                                        color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.5)',
                                                    }}
                                                >
                                                    {service.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Expandable Content */}
                                        <div className="w-full md:w-1/2 mt-4 md:mt-0 pl-12 md:pl-0">
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    height: isHovered ? "auto" : 0,
                                                    opacity: isHovered ? 1 : 0
                                                }}
                                                className="overflow-hidden"
                                                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                                            >
                                                <div className="pb-4 md:pb-6">
                                                    <p
                                                        className="text-[clamp(0.9rem,1.2vw,1.1rem)] leading-relaxed mb-6"
                                                        style={{ color: 'rgba(255,255,255,0.5)' }}
                                                    >
                                                        {service.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2.5 mb-2">
                                                        {(service.features || []).map((feature, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                                                                style={{
                                                                    background: 'rgba(163, 230, 53, 0.05)',
                                                                    border: '1px solid rgba(163, 230, 53, 0.1)',
                                                                }}
                                                            >
                                                                <div
                                                                    className="w-1.5 h-1.5 rounded-full"
                                                                    style={{ background: '#a3e635' }}
                                                                />
                                                                <span
                                                                    className="text-xs md:text-sm font-medium tracking-wide"
                                                                    style={{ color: 'rgba(255,255,255,0.85)' }}
                                                                >
                                                                    {feature}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Bottom line accent */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px z-10"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.1), transparent)',
                    }}
                />
            </section>
        </>
    );
}
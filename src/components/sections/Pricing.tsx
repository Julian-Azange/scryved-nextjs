'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';

/* ─── Animation Variants ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

/* ─── Helpers ─── */
const CheckIcon = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
        <circle cx="8" cy="8" r="8" fill="rgba(163,230,53,0.12)" />
        <path d="M5 8L7 10L11 6" stroke="#a3e635" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.938-1.418A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.956 7.956 0 01-4.066-1.115l-.292-.173-3.036.872.853-3.099-.19-.317A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
    </svg>
);

/* ─── Format price to abbreviated string ─── */
function abbreviatePrice(price: string): string {
    // price comes as "1.000.000", "50.000", etc.
    const clean = price.replace(/\./g, '');
    const num = parseInt(clean, 10);
    if (num >= 1_000_000) return `${num / 1_000_000}M`;
    if (num >= 1_000) return `${num / 1_000}K`;
    return price;
}

type Plan = {
    id: string;
    name: string;
    tagline: string;
    price: string;
    featured: boolean;
    features: string[];
};

export default function Pricing() {
    const t = useTranslations('Pricing');
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

    const plans = t.raw('plans') as Plan[];
    const whatsappNumber = '573222455334';

    const buildWhatsAppLink = (planName: string) => {
        const msg = encodeURIComponent(
            `Hola Scryved! 👋 Me interesa el plan *${planName}* y quisiera más información sobre precios y detalles.`
        );
        return `https://wa.me/${whatsappNumber}?text=${msg}`;
    };

    return (
        <section
            id="pricing"
            ref={sectionRef}
            className="relative overflow-hidden py-24 md:py-32"
            style={{ background: '#050505' }}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
                    width: '80vw', height: '60vw', maxWidth: '1000px', maxHeight: '700px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(163, 230, 53, 0.04) 0%, transparent 65%)',
                    filter: 'blur(100px)',
                }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.12), transparent)',
                }} />
            </div>

            <div className="container relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px]">

                {/* ─── Header ─── */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="mb-16 md:mb-20"
                >
                    <motion.div variants={fadeUp} className="flex justify-between items-start mb-6">
                        <span
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                            style={{ border: '1px solid rgba(163,230,53,0.2)', background: 'rgba(163,230,53,0.05)', color: '#a3e635' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }} />
                            {t('tag')}
                        </span>
                        <span className="hidden md:block text-[11px] font-mono tracking-widest text-white/20">[05]</span>
                    </motion.div>

                    <motion.h2 variants={fadeUp} className="text-[clamp(3rem,9vw,11rem)] font-black tracking-tighter leading-[0.85] uppercase text-white mb-5">
                        {t('title')}{' '}
                        <span className="text-[#a3e635] italic">{t('title_highlight')}</span>
                    </motion.h2>

                    <motion.p variants={fadeUp} className="text-base md:text-lg text-white/45 max-w-2xl leading-relaxed">
                        {t('subtitle')}
                    </motion.p>
                </motion.div>

                {/* ─── Cards Grid: 2 cols on md, 3 on xl, last row centered ─── */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                >
                    {plans.map((plan, index) => {
                        /* Center the last row if odd item count */
                        const isLast = index === plans.length - 1;
                        const totalOdd = plans.length % 3 !== 0 && isLast;

                        return (
                            <motion.div
                                key={plan.id}
                                variants={fadeUp}
                                className={`relative flex flex-col rounded-2xl overflow-hidden ${totalOdd ? 'lg:col-start-2' : ''}`}
                                style={{
                                    background: plan.featured
                                        ? 'linear-gradient(145deg, rgba(163,230,53,0.09) 0%, rgba(163,230,53,0.03) 100%)'
                                        : 'rgba(255,255,255,0.025)',
                                    border: plan.featured
                                        ? '1px solid rgba(163,230,53,0.35)'
                                        : '1px solid rgba(255,255,255,0.07)',
                                    boxShadow: plan.featured
                                        ? '0 0 50px rgba(163,230,53,0.07), inset 0 1px 0 rgba(163,230,53,0.15)'
                                        : 'none',
                                }}
                            >
                                {/* Featured Badge */}
                                {plan.featured && (
                                    <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-1 rounded-b-lg"
                                            style={{ background: '#a3e635', color: '#050505' }}>
                                            {t('featured_badge')}
                                        </span>
                                    </div>
                                )}

                                <div className={`flex flex-col flex-1 p-7 md:p-8 gap-6 ${plan.featured ? 'pt-10' : ''}`}>

                                    {/* ── Top row: Name + Abbreviated Price ── */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                                                {plan.name}
                                            </h3>
                                            <p className="text-[11px] text-white/35 font-mono mt-0.5">{plan.tagline}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[9px] font-mono tracking-widest uppercase text-white/25 mb-0.5">{t('from')}</p>
                                            <p className={`font-black tracking-tight leading-none text-2xl md:text-3xl ${plan.featured ? 'text-[#a3e635]' : 'text-white'}`}>
                                                ${abbreviatePrice(plan.price)}
                                            </p>
                                            <p className="text-[9px] text-white/20 font-mono mt-0.5">{t('currency')}</p>
                                        </div>
                                    </div>

                                    {/* ── Divider ── */}
                                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                                    {/* ── Features ── */}
                                    <div className="flex flex-col gap-2.5 flex-1">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/25 mb-1">{t('includes')}</p>
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckIcon />
                                                <span className="text-[12px] md:text-[13px] text-white/55 leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ── CTA ── */}
                                    <a
                                        href={buildWhatsAppLink(plan.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Cotizar ${plan.name} por WhatsApp`}
                                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-[13px] tracking-wide transition-all duration-300 mt-auto"
                                        style={plan.featured ? {
                                            background: '#a3e635',
                                            color: '#050505',
                                        } : {
                                            background: 'rgba(255,255,255,0.04)',
                                            color: 'rgba(255,255,255,0.7)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!plan.featured) {
                                                e.currentTarget.style.borderColor = 'rgba(163,230,53,0.3)';
                                                e.currentTarget.style.color = 'white';
                                                e.currentTarget.style.background = 'rgba(163,230,53,0.06)';
                                            } else {
                                                e.currentTarget.style.background = 'white';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!plan.featured) {
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                            } else {
                                                e.currentTarget.style.background = '#a3e635';
                                            }
                                        }}
                                    >
                                        <WhatsAppIcon />
                                        {t('ask_price')}
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ─── Bottom Note ─── */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.4 }}
                    className="text-center text-[11px] text-white/20 font-mono mt-10 md:mt-12 tracking-wide max-w-xl mx-auto"
                >
                    * {t('note')}
                </motion.p>

            </div>
        </section>
    );
}

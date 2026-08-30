'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';

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
    const clean = price.replace(/\./g, '');
    const num = parseInt(clean, 10);
    if (isNaN(num)) return price;
    if (num >= 1_000_000) return `${num / 1_000_000}M`;
    if (num >= 1_000) return `${num / 1_000}K`;
    return price;
}

type Category = {
    id: string;
    label: string;
};

type Plan = {
    id: string;
    category: string;
    name: string;
    tagline: string;
    price: string;
    promo_message?: string;
    featured: boolean;
    features: string[];
};

export default function Pricing() {
    const t = useTranslations('Pricing');
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

    const categories = t.raw('categories') as Category[];
    const plans = t.raw('plans') as Plan[];
    
    // Set default active tab securely
    const [activeTab, setActiveTab] = useState<string>('web');
    
    useEffect(() => {
        if (categories && categories.length > 0) {
            setActiveTab(categories[0].id);
        }
    }, [categories]);

    const whatsappNumber = '573143025929';

    const buildWhatsAppLink = (planName: string) => {
        const msg = encodeURIComponent(
            `Hola Scryved! 👋 Me interesa el servicio de *${planName}* y quisiera más información sobre detalles y costos.`
        );
        return `https://wa.me/${whatsappNumber}?text=${msg}`;
    };

    const filteredPlans = plans.filter(p => p.category === activeTab);

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
                    className="mb-12 md:mb-16"
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

                {/* ─── Tabs Navigation ─── */}
                <motion.div 
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-center mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className="relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-colors duration-300"
                            style={{
                                color: activeTab === cat.id ? '#050505' : 'rgba(255,255,255,0.6)',
                            }}
                        >
                            {activeTab === cat.id && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 rounded-full z-0"
                                    style={{ background: '#a3e635' }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                />
                            )}
                            <span className="relative z-10">{cat.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* ─── Huge Background Text for Glassmorphism Effect ─── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 mt-32 md:mt-20">
                    <h1 className="text-[18vw] md:text-[14vw] font-black uppercase text-white/5 tracking-tighter whitespace-nowrap">
                        {t('title')}
                    </h1>
                </div>

                {/* ─── Cards Container: Grid (Alargaditas / Vertical Glass) ─── */}
                <motion.div
                    className="flex flex-wrap justify-center items-stretch gap-6 md:gap-8 w-full max-w-7xl mx-auto relative z-10"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPlans.map((plan) => (
                            <motion.div
                                key={plan.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className={`relative flex flex-col rounded-[2rem] overflow-hidden w-full sm:max-w-[360px] md:max-w-[380px] backdrop-blur-2xl`}
                                style={{
                                    background: plan.featured
                                        ? 'rgba(163, 230, 53, 0.04)'
                                        : 'rgba(255, 255, 255, 0.02)',
                                    border: plan.featured
                                        ? '1px solid rgba(163, 230, 53, 0.25)'
                                        : '1px solid rgba(255, 255, 255, 0.08)',
                                    boxShadow: plan.featured
                                        ? '0 0 60px rgba(163,230,53,0.06), inset 0 1px 0 rgba(163,230,53,0.15)'
                                        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                                }}
                            >
                                {/* Featured Badge */}
                                {plan.featured && (
                                    <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                                        <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-5 py-1.5 rounded-b-xl"
                                            style={{ background: '#a3e635', color: '#050505' }}>
                                            {t('featured_badge')}
                                        </span>
                                    </div>
                                )}

                                <div className={`flex flex-col flex-1 p-6 md:p-8 gap-5 ${plan.featured ? 'pt-10' : ''}`}>

                                    {/* ── Top section: Title -> Tagline -> Price ── */}
                                    <div className="flex flex-col gap-4 text-left">
                                        
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                                                {plan.name}
                                            </h3>
                                            <p className="text-xs md:text-[13px] text-white/50 font-mono leading-snug">{plan.tagline}</p>
                                        </div>

                                        <div className="flex flex-col mt-2">
                                            {plan.price !== 'Cotizar' && plan.price !== 'Get Quote' && (
                                                <p className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-1">{t('from')}</p>
                                            )}
                                            <div className="flex items-end gap-1">
                                                <p className={`font-black tracking-tighter leading-none text-3xl md:text-4xl ${plan.featured ? 'text-[#a3e635]' : 'text-white'}`}>
                                                    {plan.price === 'Cotizar' || plan.price === 'Get Quote' ? plan.price : `$${plan.price}`}
                                                </p>
                                            </div>
                                            {plan.price !== 'Cotizar' && plan.price !== 'Get Quote' && (
                                                <p className="text-[10px] text-white/30 font-mono mt-2">{t('currency')}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Promo Message ── */}
                                    {plan.promo_message && (
                                        <div className="bg-[#a3e635]/10 border border-[#a3e635]/20 rounded-xl p-3 mt-1">
                                            <p className="text-[#a3e635] text-[12px] font-medium leading-relaxed">
                                                {plan.promo_message}
                                            </p>
                                        </div>
                                    )}

                                    {/* ── Divider ── */}
                                    <div className="w-full" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

                                    {/* ── Features List (Single Column for Vertical Elongation) ── */}
                                    <div className="flex flex-col gap-4 flex-1 mt-2">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckIcon />
                                                <span className="text-[14px] text-white/70 leading-relaxed">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* ── CTA ── */}
                                    <a
                                        href={buildWhatsAppLink(plan.name)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Cotizar ${plan.name} por WhatsApp`}
                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-[13px] tracking-wide transition-all duration-300 mt-6"
                                        style={plan.featured ? {
                                            background: '#a3e635',
                                            color: '#050505',
                                            boxShadow: '0 0 30px rgba(163,230,53,0.25)',
                                        } : {
                                            background: 'rgba(255,255,255,0.06)',
                                            backdropFilter: 'blur(12px)',
                                            WebkitBackdropFilter: 'blur(12px)',
                                            color: 'rgba(255,255,255,0.85)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!plan.featured) {
                                                e.currentTarget.style.borderColor = 'rgba(163,230,53,0.4)';
                                                e.currentTarget.style.color = '#a3e635';
                                                e.currentTarget.style.background = 'rgba(163,230,53,0.08)';
                                                e.currentTarget.style.boxShadow = '0 0 20px rgba(163,230,53,0.1)';
                                            } else {
                                                e.currentTarget.style.background = 'white';
                                                e.currentTarget.style.boxShadow = '0 0 40px rgba(163,230,53,0.4)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!plan.featured) {
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            } else {
                                                e.currentTarget.style.background = '#a3e635';
                                                e.currentTarget.style.boxShadow = '0 0 30px rgba(163,230,53,0.25)';
                                            }
                                        }}
                                    >
                                        <WhatsAppIcon />
                                        {t('ask_price')}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
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

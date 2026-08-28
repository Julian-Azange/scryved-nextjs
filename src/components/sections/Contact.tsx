'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import { useRouter } from '@/src/i18n/routing';

/* ─── Animation Variants ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

/* ─── CSS Keyframes ─── */
const contactStyles = `
@keyframes contact-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, 50px) scale(1.1); }
    66% { transform: translate(40px, -20px) scale(0.9); }
}
.social-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    text-decoration: none;
}
.social-btn:hover {
    border-color: rgba(163,230,53,0.25);
    background: rgba(163,230,53,0.05);
    transform: translateX(6px);
}
.social-btn:hover .social-icon {
    background: rgba(163,230,53,0.15);
    border-color: rgba(163,230,53,0.3);
}
.social-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    transition: all 0.3s ease;
}
`;

/* ─── Social SVG Icons ─── */
const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="#a3e635"/>
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#a3e635" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="4" stroke="#a3e635" strokeWidth="2" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#a3e635"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#a3e635"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.938-1.418A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.956 7.956 0 01-4.066-1.115l-.292-.173-3.036.872.853-3.099-.19-.317A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" fill="#a3e635"/>
    </svg>
);

export default function Contact() {
    const t = useTranslations('Contact');
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí normalmente iría la lógica para enviar el formulario a un backend
        router.push('/gracias');
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: contactStyles }} />
            <section
                id="contact"
                ref={sectionRef}
                className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute" style={{
                        top: '30%', right: '-10%',
                        width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(163, 230, 53, 0.06) 0%, transparent 60%)',
                        filter: 'blur(80px)',
                        animation: 'contact-orb 20s ease-in-out infinite alternate',
                    }} />
                    <div className="absolute" style={{
                        bottom: '-10%', left: '10%',
                        width: '40vw', height: '40vw', maxWidth: '500px', maxHeight: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 60%)',
                        filter: 'blur(90px)',
                        animation: 'contact-orb 25s ease-in-out infinite alternate-reverse',
                    }} />
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                        opacity: 0.4,
                    }} />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.15), transparent)',
                    }} />
                </div>

                {/* ═══ Content ═══ */}
                <div className="container relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] py-16 md:py-20 flex flex-col h-full justify-between">

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex flex-col h-full justify-between"
                    >
                        {/* ─── Header ─── */}
                        <div className="flex flex-col w-full mb-8 lg:mb-12">
                            <div className="flex justify-between items-start w-full mb-4 md:mb-8">
                                <motion.div variants={fadeUp}
                                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                                    style={{ border: '1px solid rgba(163, 230, 53, 0.2)', background: 'rgba(163, 230, 53, 0.05)', color: '#a3e635' }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }} />
                                    {t('tag')}
                                </motion.div>

                                <motion.div variants={fadeUp} className="hidden md:flex flex-col items-end gap-1">
                                    <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>[06]</span>
                                    <span className="text-[11px] font-mono tracking-widest" style={{ color: '#a3e635' }}>// CONTACTO</span>
                                </motion.div>
                            </div>

                            {/* Massive Title */}
                            <motion.div variants={fadeUp} className="w-full overflow-hidden">
                                <h2 className="text-[clamp(3.5rem,11vw,14rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white">
                                    {t('title').replace('.', '')}
                                    <span className="text-[#a3e635] italic">.</span>
                                </h2>
                            </motion.div>
                        </div>

                        {/* ─── Main Grid ─── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">

                            {/* Left: Description + Social Links */}
                            <motion.div variants={fadeUp} className="flex flex-col gap-8 md:gap-10">
                                <p
                                    className="text-[clamp(1rem,1.8vw,1.5rem)] font-medium max-w-lg tracking-tight leading-relaxed"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}
                                >
                                    {t('description')}
                                </p>

                                {/* ─── Social Links Block ─── */}
                                <div className="flex flex-col gap-3">
                                    <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: '#a3e635' }}>
                                        Síguenos
                                    </p>

                                    <a
                                        href="https://facebook.com/scryved"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="social-btn"
                                    >
                                        <div className="social-icon">
                                            <FacebookIcon />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-sm leading-none mb-0.5">Facebook</span>
                                            <span className="text-white/40 text-xs font-mono">@scryved</span>
                                        </div>
                                        <span className="ml-auto text-white/20 text-lg">→</span>
                                    </a>

                                    <a
                                        href="https://instagram.com/scryved"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="social-btn"
                                    >
                                        <div className="social-icon">
                                            <InstagramIcon />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-sm leading-none mb-0.5">Instagram</span>
                                            <span className="text-white/40 text-xs font-mono">@scryved</span>
                                        </div>
                                        <span className="ml-auto text-white/20 text-lg">→</span>
                                    </a>

                                    <a
                                        href={`https://wa.me/${t('info.phone').replace(/\s+/g, '').replace('+', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="WhatsApp"
                                        className="social-btn"
                                    >
                                        <div className="social-icon">
                                            <WhatsAppIcon />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-semibold text-sm leading-none mb-0.5">WhatsApp</span>
                                            <span className="text-white/40 text-xs font-mono">{t('info.phone')}</span>
                                        </div>
                                        <span className="ml-auto text-white/20 text-lg">→</span>
                                    </a>
                                </div>
                            </motion.div>

                            {/* Right: Form + Contact Details */}
                            <motion.div variants={fadeUp} className="flex flex-col lg:pl-10">
                                {/* Form */}
                                <form
                                    className="space-y-6 md:space-y-8 w-full max-w-xl mb-10 md:mb-12"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="group">
                                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#a3e635]/80">{t('form.fields.name')}</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-transparent border-b border-white/10 pb-3 md:pb-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a3e635] transition-colors text-base md:text-xl"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#a3e635]/80">{t('form.fields.email')}</label>
                                        <input
                                            type="email"
                                            placeholder="john@empresa.com"
                                            className="w-full bg-transparent border-b border-white/10 pb-3 md:pb-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a3e635] transition-colors text-base md:text-xl"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#a3e635]/80">{t('form.fields.message')}</label>
                                        <textarea
                                            placeholder={t('subtitle')}
                                            rows={1}
                                            className="w-full bg-transparent border-b border-white/10 pb-3 md:pb-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a3e635] transition-colors text-base md:text-xl resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#a3e635] text-[#050505] font-bold tracking-wide text-sm md:text-base py-4 md:py-5 rounded-full hover:bg-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] transition-all duration-300"
                                    >
                                        {t('form.button')}
                                    </button>
                                </form>

                                {/* Contact Details */}
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full max-w-xl">
                                    <div className="border-l-2 border-[#a3e635]/30 pl-4">
                                        <h3 className="text-white/50 text-xs font-mono tracking-widest uppercase mb-1">Email</h3>
                                        <a href={`mailto:${t('info.email')}`} className="text-white font-medium hover:text-[#a3e635] transition-colors text-sm md:text-base">
                                            {t('info.email')}
                                        </a>
                                    </div>
                                    <div className="border-l-2 border-[#a3e635]/30 pl-4">
                                        <h3 className="text-white/50 text-xs font-mono tracking-widest uppercase mb-1">Ubicación</h3>
                                        <p className="text-white font-medium text-sm md:text-base">{t('info.address')}</p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
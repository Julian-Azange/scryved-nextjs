'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link, usePathname } from '@/src/i18n/routing'; 

const footerStyles = `
@keyframes footer-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, -30px) scale(1.05); }
}
`;

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const targetId = href.replace('/#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', window.location.pathname);
            }
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: footerStyles }} />
            <footer 
                className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Center Glow */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '0%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60vw',
                            height: '40vw',
                            maxWidth: '800px',
                            maxHeight: '400px',
                            borderRadius: '50%',
                            background: 'radial-gradient(ellipse, rgba(163, 230, 53, 0.08) 0%, transparent 70%)',
                            filter: 'blur(80px)',
                            animation: 'footer-orb 15s ease-in-out infinite',
                        }}
                    />
                    {/* Noise Texture */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                            opacity: 0.4,
                        }}
                    />
                    {/* Top gradient line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.1), transparent)',
                        }}
                    />
                </div>

                {/* ═══ Content (Pushed slightly up to leave room for massive text) ═══ */}
                <div className="container relative z-10 px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] flex flex-col flex-grow justify-center pt-20 pb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        {/* Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 relative z-10">

                            {/* Column 1: Brand */}
                            <div className="space-y-8">
                                <div className="relative w-40 h-10">
                                    <Image
                                        src="/assets/logos/LOGO.png"
                                        alt="Scryved"
                                        fill
                                        className="object-contain object-left brightness-0 invert"
                                    />
                                </div>
                                <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-xs font-medium">
                                    {t('brand_description')}
                                </p>
                                <div className="flex gap-3 pt-2">
                                    <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
                                    <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
                                    <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
                                    <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
                                </div>
                            </div>

                            {/* Column 2: Navigation */}
                            <div>
                                <h4 className="font-bold text-white text-lg md:text-xl mb-6 md:mb-8 tracking-wide uppercase text-[10px] md:text-sm text-[#a3e635]">{t('company.title')}</h4>
                                <ul className="space-y-4 text-sm md:text-base font-semibold text-white/70">
                                    <li><Link href="/" className="hover:text-[#a3e635] transition-colors">Inicio</Link></li>
                                    <li><Link href="/about" className="hover:text-[#a3e635] transition-colors">Nosotros</Link></li>
                                    <li><Link href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="hover:text-[#a3e635] transition-colors">Servicios</Link></li>
                                    <li><Link href="/#portfolio" onClick={(e) => handleNavClick(e, '/#portfolio')} className="hover:text-[#a3e635] transition-colors">Portafolio</Link></li>
                                </ul>
                            </div>

                            {/* Column 3: Services */}
                            <div>
                                <h4 className="font-bold text-white text-lg md:text-xl mb-6 md:mb-8 tracking-wide uppercase text-[10px] md:text-sm text-[#a3e635]">{t('services.title')}</h4>
                                <ul className="space-y-4 text-sm md:text-base font-semibold text-white/70">
                                    <li><Link href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="hover:text-[#a3e635] transition-colors">Desarrollo Web</Link></li>
                                    <li><Link href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="hover:text-[#a3e635] transition-colors">Apps Móviles</Link></li>
                                    <li><Link href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="hover:text-[#a3e635] transition-colors">Diseño UI/UX</Link></li>
                                    <li><Link href="/#services" onClick={(e) => handleNavClick(e, '/#services')} className="hover:text-[#a3e635] transition-colors">Cloud & DevOps</Link></li>
                                </ul>
                            </div>

                            {/* Column 4: Contact */}
                            <div>
                                <h4 className="font-bold text-white text-lg md:text-xl mb-6 md:mb-8 tracking-wide uppercase text-[10px] md:text-sm text-[#a3e635]">{t('contact_title')}</h4>
                                <ul className="space-y-6 text-sm md:text-base font-medium text-white/70">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#a3e635] mt-0.5">📍</span>
                                        <span className="leading-relaxed">{t('address')}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-[#a3e635]">✉️</span>
                                        <a href={`mailto:${t('email')}`} className="hover:text-white transition-colors font-semibold">{t('email')}</a>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="text-[#a3e635]">📞</span>
                                        <a href={`tel:${t('phone').replace(/\s+/g, '')}`} className="hover:text-white transition-colors font-semibold">{t('phone')}</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </motion.div>
                </div>

                {/* --- BOTTOM PILL --- */}
                <div className="container relative z-10 px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] mb-8 md:mb-12">
                    <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-full px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-white/50 shadow-sm">
                        <p className="font-medium">© {currentYear} Scryved. {t('copyright')}</p>
                        <div className="flex gap-6 mt-4 md:mt-0 font-semibold uppercase tracking-widest text-[10px] md:text-xs">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>

                {/* --- MASSIVE BACKGROUND TEXT (Bottom Edge) --- */}
                <div className="relative w-full flex justify-center items-end select-none z-0 pointer-events-none overflow-hidden pb-4">
                    <h1 className="text-[clamp(5rem,18vw,25rem)] leading-[0.75] font-black tracking-tighter flex items-end">
                        <span 
                            className="text-transparent"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
                        >
                            SCRY
                        </span>
                        <span className="text-[#a3e635]">VED</span>
                    </h1>
                </div>

            </footer>
        </>
    );
}

// Componente SocialLink
const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:bg-[#a3e635] hover:text-[#050505] hover:border-[#a3e635] transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
    >
        {icon}
    </a>
);
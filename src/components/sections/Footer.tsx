'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from '@/src/i18n/routing'; // Asegúrate de que la ruta de importación sea la correcta

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-black text-white pt-24 pb-10 overflow-hidden min-h-[800px] flex flex-col justify-end">

            {/* --- 1. TEXTO GIGANTE DE FONDO --- */}
            <div className="absolute bottom-[-8%] left-0 w-full flex justify-center items-end select-none z-0 pointer-events-none">
                <h1 className="text-[24vw] leading-[0.75] font-black tracking-tighter flex items-end">
                    {/* Degradado Gris a Negro */}
                    <span className="bg-gradient-to-b from-zinc-500 via-zinc-800 to-black bg-clip-text text-transparent">
                        SCRY
                    </span>
                    {/* Degradado Verde a Negro */}
                    <span className="bg-gradient-to-b from-[#84cc16] via-[#65a30d] to-black bg-clip-text text-transparent">
                        VED
                    </span>
                </h1>
            </div>

            {/* --- 2. CONTENIDO PRINCIPAL (GLASS BOX) --- */}
            <div className="container relative z-10 px-4 md:px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    // ESTILO GLASS CON RUIDO
                    className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl overflow-hidden"
                >
                    {/* A. Textura de Ruido (Noise) */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>

                    {/* B. Brillo Superior (Luz Cenital) */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* C. Grid de Contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

                        {/* Columna 1: Marca */}
                        <div className="space-y-6">
                            <div className="relative w-40 h-10">
                                <Image
                                    src="/assets/logos/logo-light-green-toxic.png"
                                    alt="Scryved"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-xs font-medium">
                                {t('brand_description')}
                            </p>
                            <div className="flex gap-3 pt-2">
                                <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
                                <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
                                <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
                                <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} />
                            </div>
                        </div>

                        {/* Columna 2: Navegación */}
                        <div>
                            <h4 className="font-bold text-white text-lg mb-6">{t('company.title')}</h4>
                            <ul className="space-y-4 text-sm font-medium text-gray-400">
                                <li><Link href="/" className="hover:text-[#84cc16] transition-colors">Inicio</Link></li>
                                <li><Link href="/about" className="hover:text-[#84cc16] transition-colors">Nosotros</Link></li>
                                <li><Link href="/services" className="hover:text-[#84cc16] transition-colors">Servicios</Link></li>
                                <li><Link href="/portfolio" className="hover:text-[#84cc16] transition-colors">Portafolio</Link></li>
                            </ul>
                        </div>

                        {/* Columna 3: Servicios */}
                        <div>
                            <h4 className="font-bold text-white text-lg mb-6">{t('services.title')}</h4>
                            <ul className="space-y-4 text-sm font-medium text-gray-400">
                                <li><Link href="/services" className="hover:text-[#84cc16] transition-colors">Desarrollo Web</Link></li>
                                <li><Link href="/services" className="hover:text-[#84cc16] transition-colors">Apps Móviles</Link></li>
                                <li><Link href="/services" className="hover:text-[#84cc16] transition-colors">Diseño UI/UX</Link></li>
                                <li><Link href="/services" className="hover:text-[#84cc16] transition-colors">Cloud & DevOps</Link></li>
                            </ul>
                        </div>

                        {/* Columna 4: Contacto */}
                        <div>
                            <h4 className="font-bold text-white text-lg mb-6">{t('contact_title')}</h4>
                            <ul className="space-y-5 text-sm font-medium text-gray-400">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#84cc16] mt-0.5">📍</span>
                                    <span>{t('address')}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-[#84cc16]">✉️</span>
                                    <a href={`mailto:${t('email')}`} className="hover:text-white transition-colors">{t('email')}</a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-[#84cc16]">📞</span>
                                    <a href={`tel:${t('phone').replace(/\s+/g, '')}`} className="hover:text-white transition-colors">{t('phone')}</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </motion.div>
            </div>

            {/* --- 3. BARRA INFERIOR (PÍLDORA CON BLUR) --- */}
            <div className="container relative z-10 px-4 md:px-6 mb-10">
                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 shadow-lg">
                    <p>© {currentYear} Scryved. {t('copyright')}</p>
                    <div className="flex gap-6 mt-2 md:mt-0 font-medium">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}

// Componente SocialLink
const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#84cc16] hover:text-black hover:border-[#84cc16] transition-all duration-300 hover:-translate-y-1"
    >
        {icon}
    </a>
);
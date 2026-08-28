'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/routing';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    // Usaremos un namespace, pero si no existe, mostramos texto por defecto temporalmente
    // idealmente agregaríamos las keys en los archivos de traducción.
    const t = useTranslations('CookieBanner');

    useEffect(() => {
        // Comprobar si el usuario ya aceptó las cookies
        const hasAccepted = localStorage.getItem('scryved_cookies_accepted');
        if (!hasAccepted) {
            // Un pequeño retraso para que no aparezca de golpe al cargar la página
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('scryved_cookies_accepted', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] md:max-w-sm"
                >
                    <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 shadow-[0_0_40px_rgba(163,230,53,0.1)] relative overflow-hidden">
                        
                        {/* Pequeño brillo decorativo */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#a3e635]/20 rounded-full blur-2xl" />

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="bg-[#a3e635]/10 p-2.5 rounded-full border border-[#a3e635]/20 flex-shrink-0 mt-1">
                                <Cookie className="w-5 h-5 text-[#a3e635]" />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm md:text-base mb-1">
                                    {t.has('title') ? t('title') : 'Usamos Cookies'}
                                </h3>
                                <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-4">
                                    {t.has('description') ? t('description') : 'Utilizamos cookies para mejorar tu experiencia, analizar nuestro tráfico y personalizar el contenido.'}
                                    {' '}
                                    <Link href="/privacy" className="text-[#a3e635] hover:underline underline-offset-2">
                                        {t.has('privacy_link') ? t('privacy_link') : 'Política de privacidad'}
                                    </Link>.
                                </p>
                                
                                <div className="flex gap-3">
                                    <button
                                        onClick={acceptCookies}
                                        className="flex-1 bg-[#a3e635] hover:bg-[#b4f041] text-[#050505] font-bold py-2 px-4 rounded-xl text-xs md:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
                                    >
                                        {t.has('accept') ? t('accept') : 'Aceptar'}
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsVisible(false)}
                                className="absolute -top-2 -right-2 p-1.5 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

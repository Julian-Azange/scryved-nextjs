'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/src/i18n/routing'; // Importamos el Link configurado para i18n
import LanguageToggle from '../ui/LanguageToggle';
import { cn } from '@/src/lib/utils';

const Navbar = () => {
    const t = useTranslations('Navbar'); // Usamos el namespace 'Navbar'
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detectar scroll para cambiar el estilo del navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Bloquear scroll del body cuando el menú móvil está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    // Definición de ítems del menú
    // Nota: Usamos '/#id' para asegurar que funcione incluso si estamos en una subpágina
    const navItems = [
        { id: 'nav-home', name: t('home'), href: '/#home' },
        { id: 'nav-about', name: t('about'), href: '/#about' },
        { id: 'nav-smartpay', name: t('smartpay'), href: '/#smartpay' },
        { id: 'nav-deployed', name: t('deployed'), href: '/#proyectos-envivo' },
        { id: 'nav-services', name: t('services'), href: '/#services' },
        { id: 'nav-security', name: t('security'), href: '/#security' },
        { id: 'nav-team', name: t('team'), href: '/#team' },
        { id: 'nav-contact', name: t('contact'), href: '/#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed w-full z-50 transition-all duration-500",
                    scrolled
                        ? 'bg-black/60 backdrop-blur-md py-3 shadow-lg border-b border-white/5'
                        : 'bg-transparent py-5'
                )}
            >
                <div className="container relative flex justify-between items-center px-4 md:px-6 mx-auto">

                    {/* LOGO */}
                    <Link href="/" className="relative z-50">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Image
                                src="/assets/logos/logo-light-green-toxic.png" // Asegúrate de que esta ruta sea correcta en /public
                                alt="Scryved Logo"
                                width={150} // Ajusta según el tamaño real deseado
                                height={40}
                                className="h-8 md:h-10 w-auto object-contain"
                                priority // Carga prioritaria para el LCP (Largest Contentful Paint)
                            />
                        </motion.div>
                    </Link>

                    {/* DESKTOP MENU (Oculto en móvil) */}
                    <div className="hidden lg:flex items-center gap-2">
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="ml-4 pl-4 border-l border-white/20">
                            <LanguageToggle />
                        </div>
                    </div>

                    {/* MOBILE TOGGLE BUTTON (Visible solo en móvil/tablet) */}
                    <div className="lg:hidden flex items-center gap-4 z-50">
                        {/* Idioma visible en móvil fuera del menú */}
                        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                            <LanguageToggle />
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? 'rotate-45 translate-y-1 bg-primary' : '-translate-y-1'}`} />
                            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-out my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-out ${isOpen ? '-rotate-45 -translate-y-1.5 bg-primary' : 'translate-y-1'}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* MOBILE MENU FULL SCREEN OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-black/90 lg:hidden flex flex-col justify-center items-center"
                    >
                        {/* Fondo con ruido/textura */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                        <motion.ul
                            className="flex flex-col items-center space-y-6 text-center relative z-10 w-full px-8"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={{
                                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                            }}
                        >
                            {navItems.map((item) => (
                                <motion.li
                                    key={item.id}
                                    variants={{
                                        open: { y: 0, opacity: 1 },
                                        closed: { y: 20, opacity: 0 }
                                    }}
                                    className="w-full"
                                >
                                    <Link
                                        href={item.href}
                                        className="block text-3xl font-bold text-gray-300 hover:text-primary transition-colors tracking-tight py-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}

                            {/* Footer del menú móvil */}
                            <motion.li
                                variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}
                                className="pt-12 border-t border-white/10 w-full mt-8"
                            >
                                <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">Scryved Technologies</p>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
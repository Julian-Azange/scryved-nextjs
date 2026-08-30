'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/src/i18n/routing';
import LanguageToggle from '../ui/LanguageToggle';
import { cn } from '@/src/lib/utils';

const RollingText = ({ text }: { text: string }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className="relative overflow-hidden flex h-[1.2em] leading-[1.2em]"
        >
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" },
                }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="flex flex-col"
            >
                <span>{text}</span>
                <span className="text-[#a3e635] font-bold">{text}</span>
            </motion.div>
        </motion.div>
    );
};

const Navbar = () => {
    const t = useTranslations('Navbar');
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            setIsOpen(false);
            const targetId = href.replace('/#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', window.location.pathname);
            }
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        handleScroll(); // Ejecutar en el montaje inicial para prevenir el bug de transparencia
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navItems = [
        { id: 'nav-home', name: t('home'), number: '01', href: '/#home' },
        { id: 'nav-services', name: t('services'), number: '02', href: '/#services' },
        { id: 'nav-portfolio', name: t('portfolio') || 'Proyectos', number: '03', href: '/#portfolio' },
        { id: 'nav-about', name: t('about'), number: '04', href: '/about' },
        { id: 'nav-team', name: t('team') || 'Equipo', number: '05', href: '/team' },
        { id: 'nav-pricing', name: t('pricing') || 'Planes', number: '06', href: '/#pricing' },
        { id: 'nav-contact', name: t('contact') || 'Contacto', number: '07', href: '/#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed w-full z-50 transition-all duration-500 text-white",
                    isOpen 
                        ? 'bg-transparent py-6 md:py-8'
                        : scrolled
                            ? 'bg-[#050505]/40 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5'
                            : 'bg-transparent py-6 md:py-8'
                )}
            >
                {/* Mismos paddings y max-width que el Hero */}
                <div className="w-full relative flex justify-between items-center px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px]">

                    {/* LOGO */}
                    <Link href="/" className="relative z-50 flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-32 h-8 md:w-36 md:h-10 hidden md:block transition-all duration-500"
                            style={{ filter: 'brightness(0) invert(1)' }}
                        >
                            <Image 
                                src="/assets/logos/LOGO.png"
                                alt="Scryved Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-8 h-8 md:hidden transition-all duration-500"
                            style={{ filter: 'brightness(0) invert(1)' }}
                        >
                            <Image 
                                src="/assets/logos/ICONO.png"
                                alt="Scryved Icon"
                                fill
                                className="object-contain object-left"
                            />
                        </motion.div>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                        <ul className="flex items-center gap-8 xl:gap-10">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        onClick={(e) => handleNavClick(e, item.href)}
                                        className="relative flex items-start gap-1 text-[13px] md:text-sm font-medium transition-colors tracking-tight text-white/80 hover:text-white"
                                    >
                                        <RollingText text={item.name} />
                                        <span className="text-[9px] font-mono mt-0.5 text-white/40">{item.number}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* DESKTOP ACTIONS */}
                    <div className="hidden lg:flex items-center gap-5">
                        <LanguageToggle />
                        
                        <Link 
                            href="/#contact"
                            onClick={(e) => handleNavClick(e, '/#contact')}
                            className="flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full font-medium text-[13px] hover:scale-105 transition-all duration-500 shadow-[0_0_20px_rgba(163,230,53,0.15)] group bg-[#a3e635] text-[#050505]"
                        >
                            <div className="relative flex items-center">
                                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#050505]">
                                    <Image src="/assets/team/julian.jpg" alt="Contact" fill className="object-cover" />
                                </div>
                                <div className="absolute -right-2 w-4 h-4 rounded-full flex items-center justify-center shadow-sm border bg-[#050505] text-[#a3e635] border-[#a3e635]/20">
                                    <span className="text-[10px] font-bold leading-none">+</span>
                                </div>
                            </div>
                            <span className="ml-1 tracking-tight">{t('discuss_project')}</span>
                        </Link>
                    </div>

                    {/* MOBILE TOGGLE BUTTON */}
                    <div className="lg:hidden flex items-center gap-4 z-50">
                        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                            <LanguageToggle />
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ease-out bg-white ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                            <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ease-out my-0.5 bg-white ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block h-0.5 w-6 rounded-full transition-all duration-300 ease-out bg-white ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* MOBILE MENU FULL SCREEN OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px) brightness(1)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(32px) brightness(0.3)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px) brightness(1)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-black/60 lg:hidden flex flex-col justify-center items-center"
                    >
                        <motion.ul
                            className="flex flex-col items-center space-y-8 text-center relative z-10 w-full px-8"
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
                                    className="w-full flex justify-center items-start gap-2"
                                >
                                    <Link
                                        href={item.href}
                                        className="text-4xl font-semibold text-white hover:text-[#a3e635] transition-colors tracking-tight"
                                        onClick={(e) => handleNavClick(e, item.href)}
                                    >
                                        {item.name}
                                    </Link>
                                    <span className="text-sm text-[#a3e635] font-mono">{item.number}</span>
                                </motion.li>
                            ))}

                            <motion.li
                                variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}
                                className="w-full mt-8 flex justify-center"
                            >
                                <Link 
                                    href="/#contact"
                                    onClick={(e) => handleNavClick(e, '/#contact')}
                                    className="flex items-center gap-3 bg-[#a3e635] text-[#050505] pl-2 pr-8 py-2 rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(163,230,53,0.15)]"
                                >
                                    <div className="relative flex items-center">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                                            <Image src="/assets/team/julian.jpg" alt="Contact" fill className="object-cover" />
                                        </div>
                                        <div className="absolute -right-2.5 w-5 h-5 rounded-full bg-[#050505] flex items-center justify-center text-[#a3e635] shadow-sm border border-[#a3e635]/20">
                                            <span className="text-xs font-bold leading-none">+</span>
                                        </div>
                                    </div>
                                    <span className="ml-2">{t('discuss_project')}</span>
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const preloaderStyles = `
@keyframes preloader-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -20px) scale(1.1); }
}
`;

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Bloquear el scroll mientras carga
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = ''; 
        }, 2200); // Duración total del preloader

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    const word = "SCRYVED";

    // Variants para el stagger de las letras
    const container: Variants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const letter: Variants = {
        hidden: { y: "100%", opacity: 0, rotate: 10 },
        show: { 
            y: "0%", 
            opacity: 1, 
            rotate: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-10%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: '#050505', color: '#ffffff' }}
                >
                    <style dangerouslySetInnerHTML={{ __html: preloaderStyles }} />
                    
                    {/* Animated Green Background Orbs */}
                    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                        <div
                            className="absolute"
                            style={{
                                width: '40vw',
                                height: '40vw',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(163, 230, 53, 0.15) 0%, transparent 60%)',
                                filter: 'blur(60px)',
                                animation: 'preloader-orb 8s ease-in-out infinite alternate',
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden px-4 text-center">
                        {/* Logo Animado Letra por Letra */}
                        <motion.h1 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-none flex items-start overflow-hidden"
                        >
                            {word.split('').map((char, i) => (
                                <motion.span key={i} variants={letter} className="inline-block origin-bottom">
                                    {char}
                                </motion.span>
                            ))}
                            <motion.span 
                                variants={{
                                    hidden: { scale: 0, opacity: 0 },
                                    show: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 1, ease: [0.76, 0, 0.24, 1] } }
                                }}
                                className="text-[4vw] md:text-[3vw] lg:text-[2.5vw] mt-1 md:mt-3 ml-1"
                                style={{ color: '#a3e635' }}
                            >
                                ®
                            </motion.span>
                        </motion.h1>

                        {/* Slogan animado */}
                        <div className="overflow-hidden mt-6">
                            <motion.p
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
                                className="text-xs md:text-sm font-mono tracking-widest uppercase"
                                style={{ color: '#a3e635' }}
                            >
                                START HERE
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
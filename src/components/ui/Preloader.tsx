'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';

// Secuencia realista de un commit y deploy
const terminalSteps = [
    { text: "git add .", isCommand: true, delay: 100 },
    { text: "git commit -m 'feat: deploy perfect landing page'", isCommand: true, delay: 400 },
    { text: "[main 9017c31] feat: deploy perfect landing page", isCommand: false, delay: 600 },
    { text: " 12 files changed, 452 insertions(+), 12 deletions(-)", isCommand: false, delay: 700 },
    { text: "git push origin production", isCommand: true, delay: 1100 },
    { text: "Enumerating objects: 15, done.", isCommand: false, delay: 1300 },
    { text: "Counting objects: 100% (15/15), done.", isCommand: false, delay: 1400 },
    { text: "Writing objects: 100% (15/15), 2.45 MiB | 5.12 MiB/s, done.", isCommand: false, delay: 1550 },
    { text: "Total 15 (delta 8), reused 0 (delta 0)", isCommand: false, delay: 1650 },
    { text: "To https://github.com/scryved/core.git", isCommand: false, delay: 1750 },
    { text: "   a1b2c3d..9017c31  main -> production", isCommand: false, delay: 1800 },
    { text: "✓ Build successful in 1.2s", isCommand: false, color: "text-primary", delay: 2100 },
    { text: "🚀 Deployed to Edge Network. System online.", isCommand: false, color: "text-white font-bold", delay: 2400 }
];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [visibleLogs, setVisibleLogs] = useState<number>(0);

    useEffect(() => {
        // Bloquear el scroll mientras carga
        document.body.style.overflow = 'hidden';

        // Ejecutar la secuencia de logs basados en sus delays
        const timeouts: NodeJS.Timeout[] = [];

        terminalSteps.forEach((step, index) => {
            const timeout = setTimeout(() => {
                setVisibleLogs(index + 1);

                // Si es el último paso, esperar un poquito y cerrar el preloader
                if (index === terminalSteps.length - 1) {
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = 'auto'; // Restaurar scroll
                    }, 600); // Pequeña pausa para que el usuario alcance a leer el éxito
                }
            }, step.delay);
            timeouts.push(timeout);
        });

        return () => {
            timeouts.forEach(clearTimeout);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    // Salida ultra elegante: se difumina y sube ligeramente
                    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden px-4"
                >
                    {/* --- FONDOS SUTILES --- */}
                    <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                    {/* --- VENTANA DE TERMINAL --- */}
                    <div className="relative z-10 w-full max-w-2xl bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">

                        {/* Cabecera tipo Mac */}
                        <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 shrink-0">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50" />
                            </div>
                            <div className="flex-1 text-center text-gray-500 text-xs font-mono font-medium flex items-center justify-center gap-2">
                                <span>~/scryved-deploy</span>
                            </div>
                        </div>

                        {/* Cuerpo de la Terminal */}
                        <div className="p-5 h-[280px] sm:h-[320px] overflow-hidden flex flex-col justify-end font-mono text-xs sm:text-sm">
                            <div className="flex flex-col gap-1.5">
                                {terminalSteps.slice(0, visibleLogs).map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.1 }}
                                        className={cn(
                                            "flex items-start break-all",
                                            log.isCommand ? "text-white" : "text-gray-400",
                                            log.color
                                        )}
                                    >
                                        {/* Prefix para comandos */}
                                        {log.isCommand && (
                                            <span className="text-primary mr-2 shrink-0">scryved@admin:~$</span>
                                        )}
                                        {/* Prefix para outputs normales para alinear */}
                                        {!log.isCommand && (
                                            <span className="mr-2 opacity-0 shrink-0">scryved@admin:~$</span>
                                        )}
                                        <span>{log.text}</span>
                                    </motion.div>
                                ))}

                                {/* Cursor parpadeante */}
                                {visibleLogs < terminalSteps.length && (
                                    <div className="flex items-center mt-1">
                                        <span className="text-primary mr-2">scryved@admin:~$</span>
                                        <motion.div
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                            className="w-2 h-4 bg-primary"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
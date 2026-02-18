'use client';

import { useState, useRef } from "react";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, Github, Monitor, Smartphone, Code2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';

// Configuración técnica de las imágenes y tecnologías (esto no cambia mucho entre idiomas)
const projectsConfig = [
    {
        image: '/assets/sites/olimpo.png', // Ruta absoluta desde public
        url: 'https://olimpo-empresa.com/',
        technologies: ['React', 'Vite', 'Tailwind', 'Javascript']
    },
    {
        image: '/assets/sites/hotel.png',
        url: 'https://hotel-condado-pisco.vercel.app/',
        technologies: ['Angular', 'Vite', 'Tailwind', 'Javascript']
    },
    {
        image: '/assets/sites/smartpay.png',
        url: 'https://smartpay-oficial.com/landing',
        technologies: ['React', 'FastAPI', 'Postgres', 'Docker', 'K8s']
    },
    {
        image: '/assets/sites/urbano.png',
        url: 'https://urbano-frutas-exoticas.vercel.app/',
        technologies: ['React', 'Vite', 'Bootstrap', 'Javascript']
    },
    {
        image: '/assets/sites/aion.png',
        url: 'https://aion-ingenieria-st.vercel.app/',
        technologies: ['React', 'Vite', 'Tailwind', 'Typescript']
    },
    {
        image: '/assets/sites/feria.png',
        url: 'https://feria-cafe-de-origen.vercel.app/',
        technologies: ['Angular', 'Bootstrap', 'Javascript']
    },
    {
        image: '/assets/sites/iestap.png',
        url: 'https://iestap-biodiverso.com/',
        technologies: ['Php', 'Laravel', 'Blade', 'Angular', 'Tailwind']
    }
];

// --- COMPONENTE CARD ---
const DeployedCard = ({ project, onClick }: { project: any, onClick: () => void }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer transition-all duration-300 backdrop-blur-lg bg-zinc-900/50 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
        onClick={onClick}
    >
        {/* Header tipo navegador sutil */}
        <div className="bg-white/5 p-3 flex flex-row-reverse items-center gap-2 border-b border-white/10">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <div className="mr-2 text-[10px] text-gray-400 truncate font-mono bg-white/10 px-2 py-0.5 rounded w-full text-right opacity-70 group-hover:opacity-100 transition-opacity">
                {project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </div>
        </div>

        <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-white/5 z-0" />

            {/* Usamos next/image para optimización */}
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:translate-y-1"
                onError={(e: any) => { e.target.style.display = 'none' }} // Fallback simple
            />

            {/* Botón Hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-black/50 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-bold border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all transform scale-95 group-hover:scale-100">
                    Ver Demo
                </span>
            </div>
        </div>

        <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-white/5 text-primary text-[10px] rounded border border-white/10">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const Portfolio = () => {
    const t = useTranslations('Portfolio'); // Usamos la clave Portfolio del JSON nuevo
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [isLoadingIframe, setIsLoadingIframe] = useState(true);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    // Obtenemos los proyectos del JSON nuevo y los combinamos con la config técnica
    const rawProjects = t.raw('projects');

    // Filtramos solo los que coinciden con la config visual (los primeros 7 del JSON)
    // Esto asume que el orden en el JSON es el mismo que en projectsConfig
    const projects = rawProjects.slice(0, projectsConfig.length).map((projectData: any, index: number) => ({
        ...projectData,
        ...projectsConfig[index],
        id: index
    }));

    const handleProjectClick = (project: any) => {
        setIsLoadingIframe(true);
        setSelectedProject(project);
    };

    const closeModal = () => setSelectedProject(null);

    return (
        <section id="portfolio" ref={sectionRef} className="relative py-24 bg-black text-white overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-primary text-sm font-bold tracking-wider uppercase">
                            {t('tag')}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t('title_part1')} <span className="text-primary">{t('title_part2')}</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {projects.map((project: any) => (
                        <DeployedCard
                            key={project.id}
                            project={project}
                            onClick={() => handleProjectClick(project)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* MODAL RESPONSIVO MEJORADO (IOS GLASS STYLE) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            // ESTILO MODAL: Fondo oscuro traslúcido, borde brillante, sombra profunda
                            className="bg-black/80 backdrop-blur-2xl w-full max-w-[95vw] md:max-w-7xl aspect-[9/16] md:aspect-video max-h-[90vh] md:max-h-none rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col relative ring-1 ring-white/5"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header Tipo Navegador */}
                            <div className="h-14 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 shrink-0 backdrop-blur-md z-20">

                                {/* Botón externo */}
                                <a
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                    title="Abrir en pestaña nueva"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                {/* Título / URL central */}
                                <div className="flex-1 flex justify-center px-4 overflow-hidden">
                                    <div className="bg-black/20 border border-white/5 rounded-md px-4 py-1.5 flex items-center gap-2 max-w-md w-full justify-center group">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xs text-gray-400 font-mono truncate opacity-70 group-hover:opacity-100 transition-opacity">
                                            {selectedProject.url.replace(/^https?:\/\//, '')}
                                        </span>
                                    </div>
                                </div>

                                {/* Controles de Ventana (Semáforo Mac) */}
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-inner opacity-50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-inner opacity-50" />
                                    <button onClick={closeModal} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-inner" />
                                </div>

                            </div>

                            {/* Iframe Container */}
                            <div className="flex-1 relative w-full bg-white h-full">
                                {isLoadingIframe && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-xl bg-black/80 text-white z-10">
                                        {/* LOADER PERSONALIZADO (LIME) */}
                                        <div className="flex flex-row gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-primary animate-bounce"></div>
                                            <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
                                            <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
                                        </div>
                                        <p className="text-xs text-gray-400 font-mono tracking-wider uppercase animate-pulse">Conectando...</p>
                                    </div>
                                )}

                                <iframe
                                    src={selectedProject.url}
                                    title={selectedProject.title}
                                    className="w-full h-full border-0"
                                    onLoad={() => setIsLoadingIframe(false)}
                                    allowFullScreen
                                />
                            </div>

                            {/* Footer del Modal (Solo Movil) */}
                            <div className="md:hidden bg-gray-900/90 p-3 border-t border-white/5 text-center shrink-0 backdrop-blur-md">
                                <a
                                    href={selectedProject.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-white transition-colors"
                                >
                                    ABRIR EN EL NAVEGADOR
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
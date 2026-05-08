'use client';

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckCircle2, Server, AppWindow, MapPin, X, ChevronRight, Layers, LayoutTemplate } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';

// Mapeo técnico de proyectos (Imágenes y URLs que no se traducen)
const projectsConfig: Record<string, any> = {
    // --- SAAS ---
    'finanlock': {
        thumbnail: '/assets/images/dashboard.jpg', // Cambia por tu imagen real
        gallery: [
            '/assets/images/dashboard.jpg',
            '/assets/images/dispositivos.jpg', // Ajusta las rutas a las reales que subas
        ],
        url: 'https://finanlock.com'
    },
    'smartpay': {
        thumbnail: '/assets/sites/smartpay.png',
        gallery: [
            '/assets/sites/smartpay.png',
        ],
        url: 'https://smartpay-oficial.com'
    },
    'osmarpay': {
        thumbnail: '/assets/images/finanzas.jpg',
        gallery: [
            '/assets/images/finanzas.jpg',
        ],
        url: 'https://osmarpay.com'
    },
    'fonosalud': {
        thumbnail: '/assets/images/salud.jpg',
        gallery: [
            '/assets/images/salud.jpg',
        ],
        url: 'https://fonosalud.com.co'
    },
    // --- LANDING PAGES ---
    'olimpo': { thumbnail: '/assets/sites/olimpo.png', url: 'https://olimpo-empresa.com/' },
    'hotel': { thumbnail: '/assets/sites/hotel.png', url: 'https://hotel-condado-pisco.vercel.app/' },
    'urbano': { thumbnail: '/assets/sites/urbano.png', url: 'https://urbano-frutas-exoticas.vercel.app/' },
    'aion': { thumbnail: '/assets/sites/aion.png', url: 'https://aion-ingenieria-st.vercel.app/' },
    'iestap': { thumbnail: '/assets/sites/iestap.png', url: 'https://iestap-biodiverso.com/' }
};

export default function Portfolio() {
    const t = useTranslations('Portfolio');
    const [activeTab, setActiveTab] = useState<'saas' | 'web'>('saas');
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [activeGalleryImage, setActiveGalleryImage] = useState<number>(0);
    const [isLoadingIframe, setIsLoadingIframe] = useState(true);

    const rawProjects = t.raw('projects') as any[];

    // Unir el JSON con la configuración técnica
    const projects = rawProjects.map(p => ({ ...p, ...projectsConfig[p.id] }));
    const filteredProjects = projects.filter(p => p.category === activeTab);

    const handleProjectClick = (project: any) => {
        setIsLoadingIframe(true);
        setActiveGalleryImage(0);
        setSelectedProject(project);
    };

    return (
        <section id="portfolio" className="relative py-32 bg-black text-white overflow-hidden">

            {/* Continuidad del Grid de Fondo */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-xl">
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_#a3e635]"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200 tracking-wide uppercase">
                            {t('tag')}
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                        <span className="text-white">{t('title_part1')} </span>
                        <span className="bg-gradient-to-br from-primary via-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
                            {t('title_part2')}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* --- TABS --- */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('saas')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                                activeTab === 'saas' ? "bg-primary text-black shadow-lg shadow-primary/20" : "text-gray-400 hover:text-white"
                            )}
                        >
                            <Server className="w-4 h-4" />
                            {t('tabs.saas')}
                        </button>
                        <button
                            onClick={() => setActiveTab('web')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                                activeTab === 'web' ? "bg-primary text-black shadow-lg shadow-primary/20" : "text-gray-400 hover:text-white"
                            )}
                        >
                            <LayoutTemplate className="w-4 h-4" />
                            {t('tabs.web')}
                        </button>
                    </div>
                </div>

                {/* --- GRID DE PROYECTOS --- */}
                <motion.div
                    key={activeTab} // Fuerza re-animación al cambiar de tab
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project: any) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ y: -8, scale: 1.01 }}
                            onClick={() => handleProjectClick(project)}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative h-full flex flex-col p-4 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-primary/30 hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]">

                                {/* Header del Card (Tipo Mac) */}
                                <div className="flex gap-1.5 mb-4 px-2 pt-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>

                                {/* Imagen */}
                                <div className="relative h-56 rounded-xl overflow-hidden border border-white/10 mb-6">
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                                        onError={(e: any) => { e.target.style.display = 'none' }}
                                    />
                                    {/* Overlay Hover */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                        <div className="bg-primary text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.4)]">
                                            {activeTab === 'saas' ? 'Ver Detalles' : 'Ver Demo'}
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="px-2 pb-2 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        {project.location && (
                                            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                                                <MapPin className="w-3 h-3 text-primary" /> {project.location}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-400 text-sm font-light line-clamp-2 mb-4 flex-grow">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                                            <span key={i} className="text-xs font-medium px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* --- MODAL RESPONSIVO --- */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className={cn(
                                "bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col relative rounded-2xl overflow-hidden w-full max-h-[90vh]",
                                selectedProject.category === 'saas' ? "max-w-6xl" : "max-w-7xl aspect-[9/16] md:aspect-video"
                            )}
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header del Modal */}
                            <div className="h-14 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 shrink-0">
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectedProject(null)} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group">
                                        <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black" />
                                    </button>
                                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                                </div>
                                <div className="bg-black/30 px-4 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="text-xs font-mono text-gray-400">
                                        {selectedProject.url?.replace(/^https?:\/\//, '')}
                                    </span>
                                </div>
                                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-primary transition-colors">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>

                            {/* Contenido del Modal */}
                            {selectedProject.category === 'saas' ? (
                                // LAYOUT PARA SAAS (Galería + Detalles)
                                <div className="flex flex-col lg:flex-row flex-grow overflow-y-auto">
                                    {/* Izquierda: Galería */}
                                    <div className="w-full lg:w-3/5 bg-black/50 p-6 flex flex-col gap-4 border-r border-white/5">
                                        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50">
                                            <Image
                                                src={selectedProject.gallery?.[activeGalleryImage] || selectedProject.thumbnail}
                                                alt="Gallery Main"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        {selectedProject.gallery?.length > 1 && (
                                            <div className="flex gap-3 overflow-x-auto pb-2">
                                                {selectedProject.gallery.map((img: string, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveGalleryImage(idx)}
                                                        className={cn(
                                                            "relative w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all",
                                                            activeGalleryImage === idx ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"
                                                        )}
                                                    >
                                                        <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Derecha: Info Técnica y Features */}
                                    <div className="w-full lg:w-2/5 p-6 lg:p-8 flex flex-col">
                                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-xs font-bold text-primary mb-4 w-fit uppercase tracking-widest">
                                            <AppWindow className="w-3 h-3" /> Plataforma SaaS
                                        </div>

                                        <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                                        <p className="text-primary font-medium text-sm mb-6 uppercase tracking-wider">{selectedProject.tagline}</p>

                                        <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                                            {selectedProject.description}
                                        </p>

                                        <div className="mb-8">
                                            <h4 className="text-white font-semibold flex items-center gap-2 mb-4">
                                                <Layers className="w-4 h-4 text-primary" /> Módulos Principales
                                            </h4>
                                            <ul className="space-y-3">
                                                {selectedProject.features?.map((feat: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/10">
                                            <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Stack Tecnológico</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech: string, i: number) => (
                                                    <span key={i} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // LAYOUT PARA WEBS (Iframe)
                                <div className="relative flex-1 bg-white">
                                    {isLoadingIframe && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white z-10">
                                            <div className="flex gap-2 mb-4">
                                                <div className="w-3 h-3 rounded-full bg-primary animate-bounce" />
                                                <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
                                                <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
                                            </div>
                                            <p className="text-xs text-primary font-mono tracking-wider uppercase animate-pulse">Cargando Entorno...</p>
                                        </div>
                                    )}
                                    <iframe
                                        src={selectedProject.url}
                                        className="w-full h-full border-0"
                                        onLoad={() => setIsLoadingIframe(false)}
                                    />
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
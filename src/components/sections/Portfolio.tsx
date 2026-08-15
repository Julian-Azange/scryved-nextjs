'use client';

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';

const projectsConfig: Record<string, any> = {
    'finanlock': { thumbnail: '/assets/sites/finanlock.jpeg', gallery: ['/assets/sites/finanlock/dashboard.jpeg'], url: 'https://finanlock.com' },
    'smartpay': { thumbnail: '/assets/sites/smartpay.png', gallery: ['/assets/sites/smartpay.png'], url: 'https://smartpay-oficial.com' },
    'osmarpay': { thumbnail: '/assets/sites/osmarpay.jpeg', gallery: ['/assets/sites/osmarpay/dashboard.jpeg'], url: 'https://osmarpay.com' },
    'fonosalud': { thumbnail: '/assets/images/salud.jpg', gallery: ['/assets/images/salud.jpg'], url: 'https://fonosalud.com.co' },
    'gestor-studio': { thumbnail: '/assets/sites/gestor-studio.png', gallery: ['/assets/sites/gestor-studio.png'], url: 'https://gestor-studio.osmarpay.com' },
    'iestap': { thumbnail: '/assets/sites/iestap.png', gallery: ['/assets/sites/iestap.png'], url: 'https://iestap-biodiverso.com' },
    'medusa': { thumbnail: '/assets/sites/medusa.png', url: 'https://medusa.scryved.com' },
    'freedom': { thumbnail: '/assets/sites/freedom.png', url: 'https://freedom.scryved.com' },
    'hotel': { thumbnail: '/assets/sites/hotel.png', url: 'https://hotel-condado-pisco.vercel.app' },
    'urbano': { thumbnail: '/assets/sites/urbano.png', url: 'https://urbano-frutas-exoticas.vercel.app' },
    'aion': { thumbnail: '/assets/sites/aion.png', url: 'https://aion-ingenieria-st.vercel.app' }
};

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

/* ─── CSS Keyframes ─── */
const portfolioStyles = `
@keyframes portfolio-orb-1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(40px, 40px) scale(1.05); }
    66% { transform: translate(-20px, 60px) scale(0.95); }
}
`;

export default function Portfolio() {
    const t = useTranslations('Portfolio');
    const [activeTab, setActiveTab] = useState<'saas' | 'admin' | 'web'>('saas');
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [activeGalleryImage, setActiveGalleryImage] = useState<number>(0);
    const [isLoadingIframe, setIsLoadingIframe] = useState(true);

    const rawProjects = t.raw('projects') as any[];
    const projects = rawProjects.map(p => ({ ...p, ...projectsConfig[p.id] }));
    const filteredProjects = projects.filter(p => p.category === activeTab);

    const handleProjectClick = (project: any) => {
        setIsLoadingIframe(true);
        setActiveGalleryImage(0);
        setSelectedProject(project);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: portfolioStyles }} />
            <section
                id="portfolio"
                className="relative overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Orb 1 — center/right */}
                    <div
                        className="absolute"
                        style={{
                            top: '20%',
                            right: '-10%',
                            width: '50vw',
                            height: '50vw',
                            maxWidth: '700px',
                            maxHeight: '700px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.07) 0%, rgba(163, 230, 53, 0.02) 40%, transparent 70%)',
                            filter: 'blur(90px)',
                            animation: 'portfolio-orb-1 25s ease-in-out infinite',
                        }}
                    />
                    {/* Orb 2 — bottom left */}
                    <div
                        className="absolute"
                        style={{
                            bottom: '10%',
                            left: '-15%',
                            width: '45vw',
                            height: '45vw',
                            maxWidth: '600px',
                            maxHeight: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                        }}
                    />
                    {/* Noise */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                            opacity: 0.4,
                        }}
                    />
                </div>

                {/* ═══ Content ═══ */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] py-20 md:py-28 lg:py-32"
                >
                    {/* ─── Header ─── */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col w-full mb-16 md:mb-24"
                    >
                        {/* Top row: Tag and Section Counter */}
                        <div className="flex justify-between items-start w-full mb-8 md:mb-12">
                            {/* Tag */}
                            <div
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                                style={{
                                    border: '1px solid rgba(163, 230, 53, 0.2)',
                                    background: 'rgba(163, 230, 53, 0.05)',
                                    color: '#a3e635',
                                }}
                            >
                                <span
                                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{ background: '#a3e635' }}
                                />
                                {t('tag')}
                            </div>

                            {/* Section counter */}
                            <div className="hidden md:flex flex-col items-end gap-1">
                                <span
                                    className="text-[11px] font-mono tracking-widest uppercase"
                                    style={{ color: 'rgba(255,255,255,0.25)' }}
                                >
                                    [03]
                                </span>
                                <span
                                    className="text-[11px] font-mono tracking-widest"
                                    style={{ color: '#a3e635' }}
                                >
                                    // PORTAFOLIO
                                </span>
                            </div>
                        </div>

                        {/* Huge Title Container (Hero Style) */}
                        <div className="w-full flex flex-col mb-10 overflow-hidden">
                            <h2
                                className="text-[clamp(3.5rem,10vw,14rem)] font-bold tracking-tighter leading-[0.85] uppercase"
                                style={{ color: '#ffffff' }}
                            >
                                {t('title_part1')}
                            </h2>
                            <div className="flex items-start">
                                <span
                                    className="text-[clamp(3.5rem,10vw,14rem)] font-bold tracking-tighter leading-[0.85] italic uppercase"
                                    style={{ color: '#a3e635' }}
                                >
                                    {t('title_part2')}
                                </span>
                            </div>
                        </div>

                        {/* Subtitle & Tabs */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full border-b border-white/5 pb-8">
                            <p
                                className="text-[clamp(0.95rem,1.5vw,1.25rem)] font-medium max-w-xl leading-relaxed"
                                style={{ color: 'rgba(255,255,255,0.45)' }}
                            >
                                {t('subtitle')}
                            </p>

                            {/* Styled Tabs (Dark Mode) */}
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {[
                                    { id: 'saas', label: t('tabs.saas') },
                                    { id: 'admin', label: t('tabs.admin') },
                                    { id: 'web', label: t('tabs.web') },
                                ].map(tab => {
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={cn(
                                                "px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-sm font-semibold tracking-wide transition-all duration-300",
                                                isActive
                                                    ? "bg-[#a3e635] text-[#050505] shadow-[0_0_20px_rgba(163,230,53,0.3)]"
                                                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── Vertical Massive Cards ─── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col gap-24 md:gap-32 lg:gap-40"
                        >
                            {filteredProjects.map((project: any, index: number) => (
                                <div
                                    key={project.id}
                                    className="group cursor-pointer flex flex-col"
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-[#0a0a0a] mb-6 md:mb-10 border border-white/5 shadow-2xl">
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                            <div className="bg-[#a3e635] text-[#050505] px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg flex items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                                                {t('view_project')}
                                                <ChevronRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Typography below image */}
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 px-2 md:px-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs md:text-sm font-mono text-white/30 mb-2 uppercase tracking-widest">
                                                {(index + 1).toString().padStart(2, '0')} — {project.location || t('global')}
                                            </span>
                                            <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white transition-colors duration-500 group-hover:text-[#a3e635]">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="max-w-md lg:max-w-xl md:mt-6">
                                            <p className="text-base md:text-lg lg:text-xl text-white/50 font-medium leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Bottom line accent */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px z-10"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.1), transparent)',
                    }}
                />
            </section>

            {/* ═══ MODAL (Dark Theme) ═══ */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className={cn(
                                "bg-[#0a0a0a] shadow-2xl flex flex-col relative rounded-[2rem] overflow-hidden w-full max-h-[95vh] border border-white/10",
                                selectedProject.category === 'saas' ? "max-w-7xl" : "max-w-[1400px] aspect-video"
                            )}
                            initial={{ scale: 0.98, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.98, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="h-16 bg-[#111] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
                                <div className="flex gap-2.5">
                                    <button onClick={() => setSelectedProject(null)} className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group">
                                        <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-black" />
                                    </button>
                                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                                </div>
                                <div className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse" />
                                    <span className="text-xs font-mono text-white/50">
                                        {selectedProject.url?.replace(/^https?:\/\//, '')}
                                    </span>
                                </div>
                                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" aria-label="Visitar proyecto" className="p-2 text-white/50 hover:text-white transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>

                            {/* Modal Content */}
                            {selectedProject.category === 'saas' || selectedProject.category === 'admin' ? (
                                <div className="flex flex-col lg:flex-row flex-grow overflow-y-auto custom-scrollbar">
                                    {/* Left: Gallery */}
                                    <div className="w-full lg:w-3/5 bg-black/40 p-6 md:p-10 flex flex-col gap-6 border-r border-white/5">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                                            <Image
                                                src={selectedProject.gallery?.[activeGalleryImage] || selectedProject.thumbnail}
                                                alt="Gallery Main"
                                                fill
                                                className="object-cover md:object-contain"
                                            />
                                        </div>
                                        {selectedProject.gallery?.length > 1 && (
                                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar-horizontal">
                                                {selectedProject.gallery.map((img: string, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveGalleryImage(idx)}
                                                        className={cn(
                                                            "relative w-32 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300",
                                                            activeGalleryImage === idx ? "border-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.3)]" : "border-transparent opacity-50 hover:opacity-100"
                                                        )}
                                                    >
                                                        <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Info */}
                                    <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col bg-[#0a0a0a]">
                                        <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-3 text-white">{selectedProject.title}</h3>
                                        <p className="text-[#a3e635] font-bold text-sm mb-8 uppercase tracking-widest">{selectedProject.tagline}</p>
                                        <p className="text-lg text-white/50 font-medium leading-relaxed mb-10">
                                            {selectedProject.description}
                                        </p>

                                        <div className="mb-8">
                                            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2 text-white/70">
                                                {t('key_features')}
                                            </h4>
                                            <ul className="space-y-4">
                                                {selectedProject.features?.map((feat: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-4 text-white font-medium">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shrink-0 mt-2" />
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex-1 bg-[#0a0a0a]">
                                    {isLoadingIframe && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white z-10">
                                            <div className="w-8 h-8 border-4 border-white/10 border-t-[#a3e635] rounded-full animate-spin mb-4" />
                                            <p className="text-sm font-bold tracking-widest uppercase text-white/50 animate-pulse">{t('loading')}</p>
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
        </>
    );
}
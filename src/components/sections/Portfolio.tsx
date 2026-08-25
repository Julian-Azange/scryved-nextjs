'use client';

import { useState, useRef, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';

const projectsConfig: Record<string, any> = {
    'finanlock': { thumbnail: '/assets/mockups/finanlock.png', gallery: ['/assets/sites/finanlock/1.png', '/assets/sites/finanlock/2.png', '/assets/sites/finanlock/3.png', '/assets/sites/finanlock/4.png', '/assets/sites/finanlock/5.png'], url: 'https://finanlock.com' },
    'smartpay': { thumbnail: '/assets/mockups/smartpay.png', gallery: ['/assets/sites/smartpay/1.png', '/assets/sites/smartpay/2.png', '/assets/sites/smartpay/3.png', '/assets/sites/smartpay/4.png', '/assets/sites/smartpay/5.png'], url: 'https://smartpay-oficial.com' },
    'osmarpay': { thumbnail: '/assets/mockups/osmarpay.png', gallery: ['/assets/sites/osmarpay/1.png', '/assets/sites/osmarpay/2.png', '/assets/sites/osmarpay/3.png', '/assets/sites/osmarpay/4.png', '/assets/sites/osmarpay/5.png'], url: 'https://osmarpay.com' },
    'fonosalud': { thumbnail: '/assets/mockups/fonosalud.png', gallery: ['/assets/sites/fonosalud/1.png', '/assets/sites/fonosalud/2.png', '/assets/sites/fonosalud/3.png', '/assets/sites/fonosalud/4.png', '/assets/sites/fonosalud/5.png'], url: 'https://fonosalud.com.co' },
    'gestor-studio': { thumbnail: '/assets/mockups/gestor-studio.png', gallery: ['/assets/sites/gestor-studio/1.png', '/assets/sites/gestor-studio/2.png', '/assets/sites/gestor-studio/3.png', '/assets/sites/gestor-studio/4.png', '/assets/sites/gestor-studio/5.png'], url: 'https://gestor-studio.osmarpay.com' },
    'iestap': { thumbnail: '/assets/mockups/iestap.png', gallery: ['/assets/sites/iestap/1.png', '/assets/sites/iestap/2.png', '/assets/sites/iestap/3.png', '/assets/sites/iestap/4.png', '/assets/sites/iestap/5.png'], url: 'https://iestap-biodiverso.com' },
    'medusa': { thumbnail: '/assets/mockups/medusa.png', gallery: ['/assets/sites/medusa/1.png', '/assets/sites/medusa/2.png', '/assets/sites/medusa/3.png', '/assets/sites/medusa/4.png', '/assets/sites/medusa/5.png'], url: 'https://medusa.scryved.com' },
    'freedom': { thumbnail: '/assets/mockups/freedom.png', gallery: ['/assets/sites/freedom/1.png', '/assets/sites/freedom/2.png', '/assets/sites/freedom/3.png', '/assets/sites/freedom/4.png', '/assets/sites/freedom/5.png'], url: 'https://freedom.scryved.com' },
    'hotel': { thumbnail: '/assets/mockups/hotel-condado.png', gallery: ['/assets/sites/hotel/1.png', '/assets/sites/hotel/2.png', '/assets/sites/hotel/3.png', '/assets/sites/hotel/4.png', '/assets/sites/hotel/5.png'], url: 'https://hotel-condado-pisco.vercel.app' },
    'urbano': { thumbnail: '/assets/mockups/urbano.png', gallery: ['/assets/sites/urbano/1.png', '/assets/sites/urbano/2.png', '/assets/sites/urbano/3.png', '/assets/sites/urbano/4.png', '/assets/sites/urbano/5.png'], url: 'https://urbano-frutas-exoticas.vercel.app' },
    'aion': { thumbnail: '/assets/mockups/aion.png', gallery: ['/assets/sites/aion/1.png', '/assets/sites/aion/2.png', '/assets/sites/aion/3.png', '/assets/sites/aion/4.png', '/assets/sites/aion/5.png'], url: 'https://aion-ingenieria-st.vercel.app' }
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
    const galleryThumbsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (galleryThumbsRef.current && selectedProject?.gallery) {
            const activeThumb = galleryThumbsRef.current.children[activeGalleryImage] as HTMLElement;
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeGalleryImage, selectedProject]);

    // Bloquear el scroll del fondo cuando el modal está abierto
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

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
                {/* ═══ Animated Background (Optimized) ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
                    <div
                        className="absolute"
                        style={{
                            top: '10%',
                            right: '5%',
                            width: '40vw',
                            height: '40vw',
                            maxWidth: '500px',
                            maxHeight: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.05) 0%, transparent 60%)',
                            animation: 'portfolio-orb-1 30s ease-in-out infinite',
                        }}
                    />
                </div>

                {/* ═══ Content ═══ */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="relative z-10 w-full py-20 md:py-28 lg:py-32"
                >
                    {/* ─── Header ─── */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] mb-16 md:mb-24"
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

                    {/* ─── Glowing Background behind Grid ─── */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[#a3e635]/10 blur-[120px] rounded-full pointer-events-none z-0" />

                    {/* ─── Exact Apple Grid with Macbook Mockups ─── */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-12 w-full max-w-none px-2 md:px-4"
                        >
                            {filteredProjects.map((project: any, index: number) => {

                                // ── FONOSALUD: Morado/Violeta – SaaS Clínico ──
                                if (project.id === 'fonosalud') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-purple-500/25 hover:shadow-[0_0_60px_rgba(168,85,247,0.08)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(160deg, #0d0818 0%, #09060f 55%, #060608 100%)' }}>
                                        <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-600/12 rounded-full blur-3xl group-hover:bg-purple-600/18 transition-all duration-700 pointer-events-none"></div>
                                        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.07) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                        {/* Header */}
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div><span className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em]">SaaS · Salud</span></div>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">FonoSalud</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Sistema clínico para fonoaudiólogos. Gestión de pacientes, agenda y generación de RIPS.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)]">{t('view_project')}</button>
                                        </div>
                                        {/* Mockup centrado, con espacio */}
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(168,85,247,0.25)]" />
                                            </div>
                                        </div>
                                        {/* Stats strip – siempre visible */}
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '124', l: 'Pacientes' }, { v: '6.5h', l: 'Agendadas' }, { v: 'RIPS', l: 'Generación' }, { v: 'PDF', l: 'Reportes' }].map(s => (
                                                <div key={s.l} className="text-center flex-1">
                                                    <div className="text-sm font-black text-purple-300">{s.v}</div>
                                                    <div className="text-[10px] text-white/25">{s.l}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── OSMARPAY: Naranja – Fintech multi-dispositivo ──
                                if (project.id === 'osmarpay') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-orange-500/25 hover:shadow-[0_0_60px_rgba(249,115,22,0.08)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(150deg, #110800 0%, #0c0500 50%, #080808 100%)' }}>
                                        <div className="absolute -top-16 -right-16 w-80 h-80 bg-orange-500/12 rounded-full blur-3xl group-hover:bg-orange-500/18 transition-all duration-700 pointer-events-none"></div>
                                        {/* Header */}
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <div className="inline-flex mb-3 px-2.5 py-1 rounded-md bg-orange-500/15 border border-orange-500/25"><span className="text-[10px] font-mono text-orange-400 uppercase tracking-[0.15em] font-bold">Fintech · SaaS</span></div>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">OsmarPay</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Financiación para tiendas de telefonía. Control de dispositivos, créditos y clientes.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)]">{t('view_project')}</button>
                                        </div>
                                        {/* Mockup prominente */}
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(249,115,22,0.2)]" />
                                            </div>
                                        </div>
                                        {/* Stats strip */}
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-3 border-t border-white/5">
                                            {[{ v: '+700', l: 'Ventas' }, { v: '🔒', l: 'Bloqueo' }, { v: '💳', l: 'Créditos' }, { v: '🔄', l: 'Transferencias' }].map(s => (
                                                <div key={s.l} className="text-center flex-1 bg-orange-500/5 border border-orange-500/10 rounded-lg py-2">
                                                    <div className="text-sm font-black text-orange-300">{s.v}</div>
                                                    <div className="text-[10px] text-white/25">{s.l}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── SMARTPAY: Azul – Pagos digitales ──
                                if (project.id === 'smartpay') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-blue-500/25 hover:shadow-[0_0_60px_rgba(59,130,246,0.08)]" onClick={() => handleProjectClick(project)} style={{ background: 'radial-gradient(ellipse at 85% 10%, #080f1a 0%, #060609 55%)' }}>
                                        <div className="absolute top-0 right-0 w-80 h-56 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/16 transition-all duration-700 pointer-events-none"></div>
                                        {/* Header */}
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div><span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em]">Pagos · Live</span></div>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">SmartPay</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Plataforma oficial de cobros digitales. Simple, seguro y rápido para cualquier negocio.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">{t('view_project')}</button>
                                        </div>
                                        {/* Mockup */}
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.25)]" />
                                            </div>
                                        </div>
                                        {/* Stats strip */}
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '98%', l: 'Satisfacción' }, { v: '∞', l: 'Transacciones' }, { v: 'SSL', l: 'Seguridad' }, { v: '24/7', l: 'Disponible' }].map(s => (
                                                <div key={s.l} className="text-center flex-1">
                                                    <div className="text-sm font-black text-blue-300">{s.v}</div>
                                                    <div className="text-[10px] text-white/25">{s.l}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── FINANLOCK: Esmeralda – Control financiero ──
                                if (project.id === 'finanlock') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-emerald-500/25 hover:shadow-[0_0_60px_rgba(16,185,129,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #030f09 0%, #050d08 50%, #080808 100%)' }}>
                                        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                                        <div className="absolute top-4 right-6 text-[100px] font-black text-emerald-500/[0.05] leading-none select-none pointer-events-none">$</div>
                                        {/* Header */}
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] block mb-3">Finanzas · SaaS</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Finanlock</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Control de cartera, bloqueo de dispositivos y gestión financiera para distribuidores.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">{t('view_project')}</button>
                                        </div>
                                        {/* Mockup */}
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(16,185,129,0.2)]" />
                                            </div>
                                        </div>
                                        {/* Feature strip */}
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-3 border-t border-white/5">
                                            {[{ icon: '🔐', label: 'Bloqueo' }, { icon: '📊', label: 'Reportes' }, { icon: '💼', label: 'Cartera' }, { icon: '📱', label: 'Dispositivos' }].map(f => (
                                                <div key={f.label} className="text-center flex-1 bg-emerald-500/5 border border-emerald-500/10 rounded-lg py-2">
                                                    <div className="text-base">{f.icon}</div>
                                                    <div className="text-[10px] text-white/35 font-medium">{f.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── MEDUSA: Rojo/Rosa – eCommerce potente ──
                                if (project.id === 'medusa') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-rose-500/25 hover:shadow-[0_0_60px_rgba(244,63,94,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #110409 0%, #0c0306 50%, #080808 100%)' }}>
                                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-rose-500/12 rounded-full blur-3xl group-hover:bg-rose-500/18 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-[0.2em] block mb-3">eCommerce · Web</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Medusa</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs line-clamp-3">Menú digital de negocio, gestión de productos y panel administrativo. Control de inventario y generación de QR.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(244,63,94,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(244,63,94,0.2)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '📱', l: 'Menú QR' }, { v: '📦', l: 'Inventario' }, { v: '🍔', l: 'Productos' }, { v: '⚙️', l: 'Panel' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── FREEDOM: Amarillo/Gold – Tienda online ──
                                if (project.id === 'freedom') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-yellow-500/25 hover:shadow-[0_0_60px_rgba(234,179,8,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #0f0d00 0%, #0a0900 50%, #080808 100%)' }}>
                                        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/8 rounded-full blur-3xl group-hover:bg-yellow-500/14 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-[0.2em] block mb-3">eCommerce · Freedom</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Freedom</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs line-clamp-3">Tienda en línea, compras y rastreo de pedidos. Panel administrativo para productos y categorías.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(234,179,8,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(234,179,8,0.2)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '🛍️', l: 'Productos' }, { v: '📦', l: 'Pedidos' }, { v: '🏷️', l: 'Categorías' }, { v: '📱', l: 'Rastreo' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── GESTOR STUDIO: Tonos azules claros ──
                                if (project.id === 'gestor-studio') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-cyan-400/25 hover:shadow-[0_0_60px_rgba(34,211,238,0.08)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #020b12 0%, #031321 50%, #080808 100%)' }}>
                                        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] block mb-3">Estudio · Web App</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Gestor Studio</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs line-clamp-3">Software a medida: facturación, personal, servicios, liquidación, instaladores, inventario y bodegas.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(34,211,238,0.15)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '👥', l: 'Personal' }, { v: '📦', l: 'Bodegas' }, { v: '🛠️', l: 'Técnicos' }, { v: '💸', l: 'Ventas' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── IESTAP: Tonos verdes – Institución Educativa ──
                                if (project.id === 'iestap') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-green-500/25 hover:shadow-[0_0_60px_rgba(34,197,94,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #031206 0%, #061c0b 50%, #080808 100%)' }}>
                                        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/15 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-green-400 uppercase tracking-[0.2em] block mb-3">Educación · Web</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">I.E.S.T.A.P</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs line-clamp-3">Software administrativo para control de bases de datos de biodiversidad de flora y taxonomía de especies.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.2)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '🌱', l: 'Flora' }, { v: '🧬', l: 'Especies' }, { v: '🗂️', l: 'Familias' }, { v: '📊', l: 'Taxonomía' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── HOTEL: Dorado/Elegante – Hospitalidad ──
                                if (project.id === 'hotel') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-amber-500/25 hover:shadow-[0_0_60px_rgba(245,158,11,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #140d04 0%, #0d0802 50%, #080808 100%)' }}>
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/15 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.2em] block mb-3">Hospitalidad · Web</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Hotel Condado</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Sitio web elegante para reservas, habitaciones y experiencia de hospitalidad.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(245,158,11,0.15)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '🛎️', l: 'Recepción' }, { v: '🛏️', l: 'Cuartos' }, { v: '📅', l: 'Reservas' }, { v: '🌟', l: 'Premium' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── URBANO: Fucsia/Rosa – Frutas Exóticas ──
                                if (project.id === 'urbano') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-fuchsia-500/25 hover:shadow-[0_0_60px_rgba(217,70,239,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #12030d 0%, #0a0107 50%, #080808 100%)' }}>
                                        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl group-hover:bg-fuchsia-500/15 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-[0.2em] block mb-3">eCommerce · Exótico</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Urbano Frutas</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Landing page vibrante para la promoción y venta de productos exóticos.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(217,70,239,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(217,70,239,0.15)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '🥝', l: 'Catálogo' }, { v: '🛒', l: 'Ventas' }, { v: '🚚', l: 'Envíos' }, { v: '🌱', l: 'Fresco' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── AION: Índigo/Azul Oscuro – Ingeniería ──
                                if (project.id === 'aion') return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-indigo-500/25 hover:shadow-[0_0_60px_rgba(99,102,241,0.07)]" onClick={() => handleProjectClick(project)} style={{ background: 'linear-gradient(135deg, #050614 0%, #03040d 50%, #080808 100%)' }}>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.2em] block mb-3">Ingeniería · Corp</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">Aion Ing.</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs">Sitio web corporativo y profesional para firma de ingeniería y construcción.</p>
                                            </div>
                                            <button className="shrink-0 mt-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">{t('view_project')}</button>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.15)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 flex gap-4 border-t border-white/5">
                                            {[{ v: '🏗️', l: 'Proyectos' }, { v: '📐', l: 'Planos' }, { v: '👷', l: 'Equipo' }, { v: '🏢', l: 'Obras' }].map(s => (
                                                <div key={s.l} className="text-center flex-1"><div className="text-base">{s.v}</div><div className="text-[10px] text-white/30">{s.l}</div></div>
                                            ))}
                                        </div>
                                    </div>
                                );

                                // ── RESTO DE PROYECTOS ──  Diseño genérico elegante
                                return (
                                    <div key={project.id} className="group relative cursor-pointer overflow-hidden h-[450px] md:h-[560px] lg:h-[650px] rounded-2xl border border-white/5 flex flex-col transition-all duration-500 hover:border-[#a3e635]/20 hover:shadow-[0_0_50px_rgba(163,230,53,0.05)]" onClick={() => handleProjectClick(project)} style={{ background: 'radial-gradient(ellipse at top left, #111 0%, #070707 60%)' }}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] h-[120px] bg-[#a3e635] opacity-0 group-hover:opacity-[0.04] blur-3xl rounded-full transition-opacity duration-700 pointer-events-none"></div>
                                        <div className="relative z-10 p-8 md:p-10 pb-4 flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono text-[#a3e635] uppercase tracking-[0.2em] block mb-3">{project.category}</span>
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-1">{project.title}</h3>
                                                <p className="text-white/35 text-xs leading-relaxed max-w-xs line-clamp-2">{project.description}</p>
                                            </div>
                                            <div className="shrink-0 mt-1 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#a3e635] group-hover:border-[#a3e635] transition-all duration-300">
                                                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-black transition-colors" />
                                            </div>
                                        </div>
                                        <div className="relative flex-1 w-full scale-[1.15] mt-2">
                                            <div className="absolute inset-0 transform transition-transform duration-700 group-hover:scale-[1.20] group-hover:-translate-y-2 origin-bottom ease-out">
                                                <Image src={project.thumbnail} alt={project.title} fill className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
                                            </div>
                                        </div>
                                        <div className="relative z-10 px-8 md:px-10 py-4 border-t border-white/5 flex items-center justify-between">
                                            <p className="text-white/25 text-xs line-clamp-1 flex-1 mr-4">{project.description}</p>
                                            <button className="shrink-0 bg-[#a3e635] hover:bg-[#b0f242] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-colors">{t('view_project')}</button>
                                        </div>
                                    </div>
                                );
                            })}
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
                                "bg-[#0a0a0a] shadow-2xl flex flex-col relative rounded-[2rem] overflow-hidden w-full border border-white/10",
                                selectedProject.category === 'web' ? "max-w-[1400px] h-[85vh] md:h-[90vh]" : "max-w-7xl max-h-[85vh] md:max-h-[95vh]"
                            )}
                            initial={{ scale: 0.98, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.98, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="h-14 sm:h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-[#0a0a0a]">
                                <h4 className="text-white/50 font-mono text-xs tracking-widest uppercase">{selectedProject.category}</h4>
                                <button onClick={() => setSelectedProject(null)} className="p-2 text-white/50 hover:text-white hover:bg-white/5 transition-colors rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            {selectedProject.category === 'saas' || selectedProject.category === 'admin' ? (
                                <div className="flex flex-col lg:flex-row flex-grow overflow-y-auto custom-scrollbar min-h-0">
                                    {/* Left: Gallery */}
                                    <div className="w-full lg:w-3/5 bg-black/40 p-6 md:p-10 flex flex-col gap-6 border-r border-white/5">
                                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] touch-pan-y">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeGalleryImage}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.2 }}
                                                    drag="x"
                                                    dragConstraints={{ left: 0, right: 0 }}
                                                    dragElastic={0.2}
                                                    onDragEnd={(e, { offset }) => {
                                                        const swipe = offset.x;
                                                        if (swipe < -40 && activeGalleryImage < (selectedProject.gallery?.length || 1) - 1) {
                                                            setActiveGalleryImage(prev => prev + 1);
                                                        } else if (swipe > 40 && activeGalleryImage > 0) {
                                                            setActiveGalleryImage(prev => prev - 1);
                                                        }
                                                    }}
                                                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                                >
                                                    <Image
                                                        src={selectedProject.gallery?.[activeGalleryImage] || selectedProject.thumbnail}
                                                        alt="Gallery Main"
                                                        fill
                                                        className="object-cover md:object-contain pointer-events-none"
                                                    />
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                        {selectedProject.gallery?.length > 1 && (
                                            <div 
                                                ref={galleryThumbsRef}
                                                className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar-horizontal snap-x snap-mandatory"
                                            >
                                                {selectedProject.gallery.map((img: string, idx: number) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveGalleryImage(idx)}
                                                        className={cn(
                                                            "relative w-32 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 snap-center",
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
                                        <div className="flex items-center gap-3 mb-8 flex-wrap">
                                            <p className="text-[#a3e635] font-bold text-sm uppercase tracking-widest m-0">{selectedProject.tagline}</p>
                                            {selectedProject.flag && (
                                                <>
                                                    <span className="text-white/20">•</span>
                                                    <span className="flex items-center gap-1.5 text-white/50 text-xs font-mono uppercase tracking-widest">
                                                        <img src={`https://flagcdn.com/w20/${selectedProject.flag}.png`} alt={selectedProject.location} className="w-4 h-auto inline-block rounded-sm opacity-80" />
                                                        {selectedProject.location}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-lg text-white/50 font-medium leading-relaxed mb-10 whitespace-pre-wrap">
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

                                        <div className="mt-auto pt-4 sm:pt-8">
                                            <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#a3e635] hover:bg-[#b0f242] text-black font-bold rounded-full transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                                                {t('view_project')}
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex-1 bg-[#0a0a0a] flex flex-col">
                                    <div className="relative flex-1">
                                        {isLoadingIframe && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] text-white z-10">
                                                <div className="w-8 h-8 border-4 border-white/10 border-t-[#a3e635] rounded-full animate-spin mb-4" />
                                                <p className="text-sm font-bold tracking-widest uppercase text-white/50 animate-pulse">{t('loading')}</p>
                                            </div>
                                        )}
                                        <iframe
                                            src={selectedProject.url}
                                            className="w-full h-full border-0 absolute inset-0"
                                            onLoad={() => setIsLoadingIframe(false)}
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6 border-t border-white/5 flex justify-end shrink-0 bg-[#0a0a0a]">
                                        <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#a3e635] hover:bg-[#b0f242] text-black font-bold rounded-full transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                                            {t('view_project')}
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
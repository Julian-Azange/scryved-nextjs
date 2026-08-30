'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import { useRouter } from '@/src/i18n/routing';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

/* ─── Animation Variants ─── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

/* ─── CSS Keyframes ─── */
const contactStyles = `
@keyframes contact-orb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-30px, 50px) scale(1.1); }
    66% { transform: translate(40px, -20px) scale(0.9); }
}
@keyframes scryved-pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(163, 230, 53, 0.7); }
    70% { transform: scale(1.05); box-shadow: 0 0 0 14px rgba(163, 230, 53, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(163, 230, 53, 0); }
}
@keyframes scryved-ring {
    0% { opacity: 0.9; transform: scale(1); }
    100% { opacity: 0; transform: scale(2.5); }
}
.scryved-marker-ring {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    border: 2px solid #a3e635;
    animation: scryved-ring 1.8s ease-out infinite;
}
.scryved-marker-ring-delay {
    animation-delay: 0.9s;
}
.social-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 20px;
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    text-decoration: none;
}
.social-btn:hover {
    border-color: rgba(163,230,53,0.25);
    background: rgba(163,230,53,0.05);
    transform: translateX(6px);
}
.social-btn:hover .social-icon {
    background: rgba(163,230,53,0.15);
    border-color: rgba(163,230,53,0.3);
}
.social-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    transition: all 0.3s ease;
}
`;

/* ─── Social SVG Icons ─── */
const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="#a3e635"/>
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#a3e635" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="4" stroke="#a3e635" strokeWidth="2" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#a3e635"/>
    </svg>
);

const WhatsAppIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#a3e635"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.938-1.418A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.956 7.956 0 01-4.066-1.115l-.292-.173-3.036.872.853-3.099-.19-.317A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" fill="#a3e635"/>
    </svg>
);

export default function Contact() {
    const t = useTranslations('Contact');
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const router = useRouter();

    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current || mapInstance.current) return;

        const lngLat: [number, number] = [-76.035523, 1.850530];

        mapInstance.current = new maplibregl.Map({
            container: mapContainer.current,
            // Mapa colorido y vibrante — OpenFreeMap Bright (gratuito, sin API key)
            style: 'https://tiles.openfreemap.org/styles/bright',
            center: lngLat,
            zoom: 15.5,
            interactive: true,
            pitch: 40
        });

        // Wrapper externo con efecto destello/pulso
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '52px';
        wrapper.style.height = '52px';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.cursor = 'pointer';

        // Anillo pulsante 1
        const ring1 = document.createElement('div');
        ring1.className = 'scryved-marker-ring';
        wrapper.appendChild(ring1);

        // Anillo pulsante 2 (con delay)
        const ring2 = document.createElement('div');
        ring2.className = 'scryved-marker-ring scryved-marker-ring-delay';
        wrapper.appendChild(ring2);

        // Icono de Scryved (imagen)
        const iconEl = document.createElement('div');
        iconEl.style.width = '48px';
        iconEl.style.height = '48px';
        iconEl.style.borderRadius = '14px';
        iconEl.style.backgroundImage = 'url(/icon.png)';
        iconEl.style.backgroundSize = 'cover';
        iconEl.style.backgroundPosition = 'center';
        iconEl.style.boxShadow = '0 8px 20px rgba(0,0,0,0.35), 0 0 0 3px #a3e635';
        iconEl.style.animation = 'scryved-pulse 2.2s ease-out infinite';
        iconEl.style.flexShrink = '0';
        wrapper.appendChild(iconEl);

        // Add Marker
        const marker = new maplibregl.Marker({ element: wrapper, anchor: 'center' })
            .setLngLat(lngLat)
            .setPopup(
                new maplibregl.Popup({ offset: 35, closeButton: false })
                    .setHTML(`
                        <div style="text-align:center; font-weight:700; font-family:monospace; font-size:13px; color:#1a1a1a; padding: 4px 8px;">
                            📍 SCRYVED HQ
                        </div>
                    `)
            )
            .addTo(mapInstance.current);
            
        // Clean up on unmount
        return () => {
            mapInstance.current?.remove();
            mapInstance.current = null;
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí normalmente iría la lógica para enviar el formulario a un backend
        router.push('/gracias');
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: contactStyles }} />
            <section
                id="contact"
                ref={sectionRef}
                className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute" style={{
                        top: '30%', right: '-10%',
                        width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(163, 230, 53, 0.06) 0%, transparent 60%)',
                        filter: 'blur(80px)',
                        animation: 'contact-orb 20s ease-in-out infinite alternate',
                    }} />
                    <div className="absolute" style={{
                        bottom: '-10%', left: '10%',
                        width: '40vw', height: '40vw', maxWidth: '500px', maxHeight: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 60%)',
                        filter: 'blur(90px)',
                        animation: 'contact-orb 25s ease-in-out infinite alternate-reverse',
                    }} />
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                        opacity: 0.4,
                    }} />
                    <div className="absolute top-0 left-0 right-0 h-px" style={{
                        background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.15), transparent)',
                    }} />
                </div>

                {/* ═══ Content ═══ */}
                <div className="container relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 mx-auto max-w-[1920px] py-16 md:py-20 flex flex-col h-full justify-between">

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex flex-col h-full justify-between"
                    >
                        {/* ─── Header ─── */}
                        <div className="flex flex-col w-full mb-8 lg:mb-12">
                            <div className="flex justify-between items-start w-full mb-4 md:mb-8">
                                <motion.div variants={fadeUp}
                                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                                    style={{ border: '1px solid rgba(163, 230, 53, 0.2)', background: 'rgba(163, 230, 53, 0.05)', color: '#a3e635' }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }} />
                                    {t('tag')}
                                </motion.div>

                                <motion.div variants={fadeUp} className="hidden md:flex flex-col items-end gap-1">
                                    <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>[06]</span>
                                    <span className="text-[11px] font-mono tracking-widest" style={{ color: '#a3e635' }}>// CONTACTO</span>
                                </motion.div>
                            </div>

                            {/* Massive Title */}
                            <motion.div variants={fadeUp} className="w-full overflow-hidden">
                                <h2 className="text-[clamp(3.5rem,11vw,14rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white">
                                    {t('title').replace('.', '')}
                                    <span className="text-[#a3e635] italic">.</span>
                                </h2>
                            </motion.div>
                        </div>

                        {/* ─── Main Grid ─── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">

                            {/* Left: Description + Social Links */}
                            <motion.div variants={fadeUp} className="flex flex-col gap-8 md:gap-10">
                                <p
                                    className="text-[clamp(1rem,1.8vw,1.5rem)] font-medium max-w-lg tracking-tight leading-relaxed"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}
                                >
                                    {t('description')}
                                </p>

                                {/* ─── Social Links Block ─── */}
                                <div className="flex flex-col gap-3">
                                    <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-1" style={{ color: '#a3e635' }}>
                                        Síguenos
                                    </p>
                                    
                                    <div className="flex flex-row gap-2 w-full">
                                        <a href="https://facebook.com/scryved" target="_blank" rel="noopener noreferrer"
                                           className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#a3e635]/10 transition-all duration-300 text-white group">
                                            <FacebookIcon />
                                            <span className="text-xs font-medium text-white/50 group-hover:text-white transition-colors">Facebook</span>
                                        </a>
                                        
                                        <a href="https://instagram.com/scryved" target="_blank" rel="noopener noreferrer"
                                           className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#a3e635]/10 transition-all duration-300 text-white group">
                                            <InstagramIcon />
                                            <span className="text-xs font-medium text-white/50 group-hover:text-white transition-colors">Instagram</span>
                                        </a>
                                        
                                        <a href={`https://wa.me/${t('info.phone').replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer"
                                           className="flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-[#a3e635]/10 transition-all duration-300 text-white group">
                                            <WhatsAppIcon />
                                            <span className="text-xs font-medium text-white/50 group-hover:text-white transition-colors">WhatsApp</span>
                                        </a>
                                    </div>
                                </div>

                                {/* ─── Map Container ─── */}
                                <div className="w-full mt-2 rounded-3xl overflow-hidden border border-white/10 relative" style={{ height: '300px' }}>
                                    <div ref={mapContainer} className="w-full h-full" />
                                    <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_30px_rgba(5,5,5,0.15)]" />
                                    
                                    {/* Scryved-branded Open in Maps Button */}
                                    <a 
                                        href="https://maps.app.goo.gl/9M1MGjUNMUoxy2ab9" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="absolute top-3 right-3 z-10 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 group"
                                        style={{
                                            background: 'rgba(5,5,5,0.85)',
                                            backdropFilter: 'blur(12px)',
                                            border: '1px solid rgba(163,230,53,0.3)',
                                            borderRadius: '14px',
                                            padding: '8px 14px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 0 0 rgba(163,230,53,0)',
                                        }}
                                    >
                                        {/* Scryved mini logo */}
                                        <img src="/icon.png" alt="S" style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0 }} />
                                        <div className="flex flex-col leading-none">
                                            <span style={{ fontSize: 10, fontWeight: 800, color: '#a3e635', letterSpacing: '0.18em', fontFamily: 'monospace', textTransform: 'uppercase' }}>Scryved</span>
                                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>Ver en Maps →</span>
                                        </div>
                                    </a>
                                </div>
                            </motion.div>

                            {/* Right: Form + Contact Details */}
                            <motion.div variants={fadeUp} className="flex flex-col lg:pl-10">
                                {/* Form */}
                                <form
                                    className="space-y-6 md:space-y-8 w-full max-w-xl mb-10 md:mb-12"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="group">
                                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#a3e635]/80">{t('form.fields.name')}</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-transparent border-b border-white/10 pb-3 md:pb-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a3e635] transition-colors text-base md:text-xl"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#a3e635]/80">{t('form.fields.email')}</label>
                                        <input
                                            type="email"
                                            placeholder="john@empresa.com"
                                            className="w-full bg-transparent border-b border-white/10 pb-3 md:pb-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a3e635] transition-colors text-base md:text-xl"
                                        />
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#a3e635]/80">{t('form.fields.message')}</label>
                                        <textarea
                                            placeholder={t('subtitle')}
                                            rows={1}
                                            className="w-full bg-transparent border-b border-white/10 pb-3 md:pb-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a3e635] transition-colors text-base md:text-xl resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="group relative w-full overflow-hidden py-4 md:py-5 rounded-2xl font-bold tracking-wide text-sm md:text-base transition-all duration-300"
                                        style={{
                                            background: 'rgba(163,230,53,0.12)',
                                            backdropFilter: 'blur(16px)',
                                            WebkitBackdropFilter: 'blur(16px)',
                                            border: '1px solid rgba(163,230,53,0.25)',
                                            color: '#a3e635',
                                            boxShadow: '0 0 0 0 rgba(163,230,53,0)',
                                        }}
                                        onMouseEnter={e => {
                                            (e.currentTarget as HTMLElement).style.background = '#a3e635';
                                            (e.currentTarget as HTMLElement).style.color = '#050505';
                                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(163,230,53,0.3)';
                                            (e.currentTarget as HTMLElement).style.borderColor = '#a3e635';
                                        }}
                                        onMouseLeave={e => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(163,230,53,0.12)';
                                            (e.currentTarget as HTMLElement).style.color = '#a3e635';
                                            (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 rgba(163,230,53,0)';
                                            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(163,230,53,0.25)';
                                        }}
                                    >
                                        {t('form.button')}
                                    </button>
                                </form>

                                {/* Contact Details */}
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full max-w-xl">
                                    <div className="border-l-2 border-[#a3e635]/30 pl-4">
                                        <h3 className="text-white/50 text-xs font-mono tracking-widest uppercase mb-1">Email</h3>
                                        <a href={`mailto:${t('info.email')}`} className="text-white font-medium hover:text-[#a3e635] transition-colors text-sm md:text-base">
                                            {t('info.email')}
                                        </a>
                                    </div>
                                    <div className="border-l-2 border-[#a3e635]/30 pl-4">
                                        <h3 className="text-white/50 text-xs font-mono tracking-widest uppercase mb-1">Ubicación</h3>
                                        <p className="text-white font-medium text-sm md:text-base">{t('info.address')}</p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, Variants } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, Zap, Navigation, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { Button } from "@/src/components/ui/button";

// Importamos componentes de Mapa
import {
    Map,
    MapMarker,
    MarkerContent,
    MarkerLabel,
    MarkerPopup,
} from "@/src/components/ui/map";

export default function Contact() {
    const t = useTranslations('Contact');

    // Estados del formulario
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setFormStatus({
                submitted: true,
                success: true,
                message: t('form.success')
            });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Coordenadas de Scryved (Pitalito)
    const scryvedLocation = {
        lng: -76.03554485164081,
        lat: 1.8505444338360428
    };

    return (
        <section id="contact" ref={sectionRef} className="relative py-24 bg-black text-white overflow-hidden min-h-screen">

            {/* --- 1. FONDO ANIMADO --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [-50, 50, -50], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px]"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            </div>

            <div className="container relative z-10 px-4 md:px-6">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span className="text-primary text-sm font-bold uppercase tracking-wider">
                            {t('tag')}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 mt-4 tracking-tight">
                        {t('title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">{t('title_part2')}</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >

                    {/* --- IZQUIERDA: FORMULARIO --- */}
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                        <div className="h-full bg-zinc-900/30 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 border-2 border-white/0 rounded-3xl group-hover:border-primary/20 transition-all duration-500 pointer-events-none"></div>

                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                                {t('form.title')}
                            </h3>

                            {formStatus.submitted && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className={cn(
                                        "p-4 mb-6 rounded-xl border",
                                        formStatus.success ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"
                                    )}
                                >
                                    {formStatus.message}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup id="name" label={t('form.fields.name')} value={formData.name} onChange={handleChange} type="text" />
                                    <InputGroup id="email" label={t('form.fields.email')} value={formData.email} onChange={handleChange} type="email" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputGroup id="phone" label={t('form.fields.phone')} value={formData.phone} onChange={handleChange} type="tel" />
                                    <InputGroup id="subject" label={t('form.fields.subject')} value={formData.subject} onChange={handleChange} type="text" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 ml-1">{t('form.fields.message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "w-full py-4 rounded-xl font-bold text-black transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2",
                                        isSubmitting ? "bg-zinc-600 cursor-not-allowed" : "bg-primary hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                                    )}
                                >
                                    {isSubmitting ? 'Enviando...' : t('form.button')}
                                    {!isSubmitting && <Send size={18} />}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* --- DERECHA: INFO Y MAPA NUEVO --- */}
                    <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            <ContactInfoCard
                                icon={<Phone className="w-5 h-5" />}
                                title="Llámanos"
                                content={t('info.phone')}
                                link={`tel:${t('info.phone').replace(/\s+/g, '')}`}
                            />
                            <ContactInfoCard
                                icon={<Mail className="w-5 h-5" />}
                                title="Escríbenos"
                                content={t('info.email')}
                                link={`mailto:${t('info.email')}`}
                            />
                        </div>

                        {/* --- MAPA INTERACTIVO SHADCN --- */}
                        <div className="flex-grow min-h-[350px] bg-zinc-900/30 border border-white/10 backdrop-blur-xl rounded-3xl p-2 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-zinc-900 animate-pulse z-0"></div>

                            {/* Contenedor del Mapa */}
                            <div className="w-full h-full rounded-2xl relative z-10 overflow-hidden">
                                <div className="w-full h-full grayscale invert-[0.9] contrast-[0.85]">
                                    <Map
                                        center={[scryvedLocation.lng, scryvedLocation.lat]}
                                        zoom={16}
                                    >
                                        <MapMarker
                                            longitude={scryvedLocation.lng}
                                            latitude={scryvedLocation.lat}
                                        >
                                            <MarkerContent>
                                                <div className="relative flex items-center justify-center">
                                                    {/* 1. Efecto Radar (Ping) detrás del logo */}
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50 duration-1000" />

                                                    {/* 2. Contenedor del Logo (Círculo con borde verde) */}
                                                    <div className="relative h-14 w-14 rounded-full border-2 border-green-500 bg-black shadow-[0_0_20px_rgba(34,197,94,0.8)] cursor-pointer hover:scale-110 transition-transform z-20 overflow-hidden p-0.5">
                                                        <Image
                                                            src="/assets/logos/avatar-green.png"
                                                            alt="Scryved Logo"
                                                            fill
                                                            className="object-cover rounded-full"
                                                        />
                                                    </div>

                                                    {/* 3. Triangulito inferior (Punta del pin) */}
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-green-500"></div>
                                                </div>
                                            </MarkerContent>

                                            <MarkerPopup className="p-0 w-[280px] border-white/10 bg-zinc-950/95 text-white shadow-2xl backdrop-blur-xl">
                                                {/* ... (El resto del popup sigue igual) ... */}
                                                <div className="relative h-32 w-full overflow-hidden rounded-t-md bg-zinc-900">
                                                    <Image
                                                        src="/assets/team/julian.jpg"
                                                        alt="Scryved Office"
                                                        fill
                                                        className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                                                </div>
                                                <div className="p-4 space-y-3">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                            Scryved
                                                            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                                                        </h3>
                                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                                            <MapPin className="w-3 h-3 text-green-500" />
                                                            Pitalito, Huila
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 pt-1">
                                                        <Button size="sm" className="flex-1 h-8 bg-green-500 text-black hover:bg-green-400 font-bold">
                                                            <Navigation className="size-3.5 mr-1.5" />
                                                            Ir
                                                        </Button>
                                                    </div>
                                                </div>
                                            </MarkerPopup>
                                        </MapMarker>
                                    </Map>

                                </div>
                            </div>

                            {/* Overlay de ubicación (Mantenido por estética fuera del mapa interactivo) */}
                            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl z-20 flex items-center gap-3 pointer-events-none">
                                <div className="p-2 bg-primary/20 rounded-full text-primary">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Nuestra Oficina</p>
                                    <p className="text-gray-400 text-xs">{t('info.address')}</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// --- COMPONENTES AUXILIARES ---
const InputGroup = ({ id, label, value, onChange, type }: any) => (
    <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-400 ml-1">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full px-5 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            required
        />
    </div>
);

const ContactInfoCard = ({ icon, title, content, link }: any) => (
    <a href={link} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 rounded-2xl transition-all duration-300 group">
        <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all border border-white/5">
            {icon}
        </div>
        <div>
            <h4 className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{title}</h4>
            <p className="text-white font-medium text-lg group-hover:text-primary transition-colors">{content}</p>
        </div>
    </a>
);
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { Github, Linkedin, Users, Plus } from 'lucide-react'; // Usamos Lucide para consistencia

// 1. Mapa de imágenes para manejar las extensiones exactas de tus archivos
const imageMap: Record<string, string> = {
    julian: '/assets/team/julian.jpg',
    hector: '/assets/team/hector.jpeg',
    luis: '/assets/team/luis.jpeg',
    daniel: '/assets/team/daniel.jpg',
    alex: '/assets/team/alex.jpg',
    orlando: '/assets/team/orlandas.jpg',
    cristian: '/assets/team/cristian.jpg',
    felipe: '/assets/team/default.jpeg',
    fabian: '/assets/team/fabian.jpeg',
    nicolas: '/assets/team/nicolas.jpg',
    yamson: '/assets/team/default.jpeg',
    andres: '/assets/team/andres.jpeg',
    juan: '/assets/team/juan.jpg'
};

// Interfaz del miembro
interface TeamMember {
    id: string;
    name: string;
    role: string;
    profession: string;
}

export default function Team() {
    const t = useTranslations('Team');
    // Obtenemos los miembros del JSON
    const members = t.raw('members') as TeamMember[];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section id="team" className="relative py-24 bg-black overflow-hidden min-h-screen">

            {/* --- FONDOS AMBIENTALES (De tu diseño anterior) --- */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.05), transparent 70%)", // Verde sutil
                }}
            />
            {/* Ruido / Noise texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="container relative z-10 px-4 md:px-6">

                {/* --- HEADER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-primary text-sm font-bold uppercase tracking-wider">
                            {t('tag')}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
                        {t('title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">{t('title_part2')}</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* --- GRID --- */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {/* Renderizado de Miembros */}
                    {members.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={itemVariant}
                            className="group relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-900/20 backdrop-blur-sm"
                            style={{
                                backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 10px 10px'
                            }}
                        >
                            {/* Efecto Hover Glow en la tarjeta */}
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative flex flex-col items-center text-center p-8 h-full z-10">

                                {/* Imagen Circular */}
                                <div className="relative mb-6">
                                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary transition-colors duration-300 shadow-lg relative">
                                        <Image
                                            src={imageMap[member.id] || '/assets/team/default.jpeg'}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Redes Sociales Flotantes */}
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                        <a href="#" className="p-2 bg-black text-white rounded-full hover:text-primary border border-zinc-700 hover:border-primary transition-colors">
                                            <Linkedin size={14} />
                                        </a>
                                        <a href="#" className="p-2 bg-black text-white rounded-full hover:text-primary border border-zinc-700 hover:border-primary transition-colors">
                                            <Github size={14} />
                                        </a>
                                    </div>
                                </div>

                                {/* Datos del Miembro */}
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                                    {member.name}
                                </h3>

                                <p className="text-primary/80 text-sm font-medium mb-2 tracking-wide">
                                    {member.role}
                                </p>

                                {/* Separador */}
                                <div className="w-8 h-0.5 bg-white/10 my-3 rounded-full group-hover:bg-primary/50 transition-colors duration-300" />

                                <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                                    {member.profession}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {/* --- CARD "JOIN US" (Unirse al equipo) --- */}
                    <motion.div
                        variants={itemVariant}
                        className="group relative flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-zinc-800 p-8 transition-all duration-300 hover:border-primary/50 cursor-pointer overflow-hidden bg-zinc-900/10 backdrop-blur-sm"
                        style={{
                            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                                <Plus className="w-8 h-8 text-primary" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">
                                {t('join_title')}
                            </h3>

                            <p className="text-gray-400 text-sm mb-6 max-w-[200px] mx-auto opacity-80">
                                ¿Te apasiona la tecnología? Únete a nosotros.
                            </p>

                            <a href="#contact" className="inline-block bg-primary text-black font-bold text-sm py-2.5 px-6 rounded-full hover:bg-green-400 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                                {t('join_button')}
                            </a>
                        </div>
                    </motion.div>

                </motion.div>

            </div>
        </section>
    );
}
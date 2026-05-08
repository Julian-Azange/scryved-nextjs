'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import Image from 'next/image';
import { Users, Plus, Sparkles } from 'lucide-react';

// Mapa de imágenes
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

interface TeamMember {
    id: string;
    name: string;
    role: string;
    profession: string;
}

export default function Team() {
    const t = useTranslations('Team');
    const members = t.raw('members') as TeamMember[];

    // Animaciones
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariant: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
    };

    return (
        <section id="team" className="relative py-32 bg-black overflow-hidden min-h-screen">

            {/* --- FONDO UNIFICADO (Cuadrícula y Auroras) --- */}
            <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-green-600/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* --- HEADER DE LA SECCIÓN --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 flex flex-col items-center"
                >
                    {/* Badge unificado */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md shadow-xl">
                        <span className="relative flex h-2.5 w-2.5 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_#a3e635]"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-200 tracking-wide uppercase flex items-center gap-2">
                            <Users size={14} className="text-primary/70" /> {t('tag')}
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

                {/* --- GRID DEL EQUIPO --- */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8"
                >
                    {members.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={itemVariant}
                            whileHover={{ y: -8, scale: 1.01 }}
                            className="group relative"
                        >
                            <div className={cn(
                                'relative h-full flex flex-col items-center text-center p-8 rounded-[2rem]',
                                'bg-white/[0.02] border border-white/5',
                                'backdrop-blur-xl overflow-hidden',
                                'transition-all duration-500 ease-out',
                                'hover:bg-white/[0.04] hover:border-primary/30',
                                'hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]'
                            )}>
                                {/* Resplandor interior en hover (Spotlight effect) */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center w-full h-full">

                                    {/* --- AVATAR PREMIUM --- */}
                                    <div className="relative mb-6">
                                        {/* Anillo exterior decorativo que brilla en hover */}
                                        <div className="absolute inset-[-4px] rounded-full bg-gradient-to-b from-white/10 to-transparent group-hover:from-primary/50 group-hover:to-primary/10 transition-all duration-500 opacity-50 group-hover:opacity-100" />

                                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-[4px] border-[#0a0a0a] shadow-xl bg-zinc-900">
                                            {/* La magia está aquí: Grayscale por defecto, color al hacer hover */}
                                            <Image
                                                src={imageMap[member.id] || '/assets/team/default.jpeg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>

                                    {/* --- INFO DEL MIEMBRO --- */}
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300 tracking-tight">
                                        {member.name}
                                    </h3>

                                    <p className="text-primary/90 text-sm font-semibold mb-3 tracking-wide">
                                        {member.role}
                                    </p>

                                    {/* Separador elegante */}
                                    <div className="w-12 h-[1px] bg-white/10 my-2 rounded-full group-hover:bg-primary/50 transition-colors duration-500" />

                                    <p className="text-gray-500 text-[11px] uppercase tracking-[0.2em] font-semibold mt-2">
                                        {member.profession}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* --- CARD "JOIN US" INTEGRADA --- */}
                    <motion.div variants={itemVariant} className="group relative">
                        <div className={cn(
                            'relative h-full flex flex-col items-center justify-center text-center p-8 rounded-[2rem]',
                            'bg-white/[0.01] border-2 border-dashed border-white/10',
                            'backdrop-blur-xl overflow-hidden cursor-pointer',
                            'transition-all duration-500 ease-out',
                            'hover:bg-primary/5 hover:border-primary/50',
                            'hover:shadow-[0_0_40px_-15px_rgba(163,230,53,0.15)]'
                        )}>
                            <div className="relative z-10 flex flex-col items-center w-full">

                                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
                                    <Plus className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors duration-500" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                                    {t('join_title')}
                                </h3>

                                <p className="text-gray-400 text-sm font-light mb-8 max-w-[200px] leading-relaxed">
                                    ¿Te apasiona la tecnología y la innovación?
                                </p>

                                <a
                                    href="#contact"
                                    className="w-full rounded-full px-6 py-3 font-bold text-sm bg-white/5 border border-white/10 text-white group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all duration-300"
                                >
                                    {t('join_button')}
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
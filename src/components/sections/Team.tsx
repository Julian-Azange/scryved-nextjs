'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Plus } from 'lucide-react';

const teamStyles = `
@keyframes team-orb-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -40px) scale(1.08); }
}
`;

const imageMap: Record<string, string> = {
    julian: '/assets/team/julian.jpg',
    fabian: '/assets/team/fabian.jpeg',
    hector: '/assets/team/hector.jpeg',
    luis: '/assets/team/luis.jpeg',
    daniel: '/assets/team/daniel.jpg',
    alex: '/assets/team/alex.jpg',
    orlando: '/assets/team/orlandas.jpg',
    cristian: '/assets/team/cristian.jpg',
    felipe: '/assets/team/default.jpeg',
    tobias: '/assets/team/tobias.jpg',
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

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, y: 0, 
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    },
};

export default function Team() {
    const t = useTranslations('Team');
    const members = t.raw('members') as TeamMember[];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: teamStyles }} />
            <section
                id="team"
                className="relative overflow-hidden"
                style={{ background: '#050505' }}
            >
                {/* ═══ Animated Background ═══ */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div
                        className="absolute"
                        style={{
                            top: '10%',
                            right: '-5%',
                            width: '45vw',
                            height: '45vw',
                            maxWidth: '600px',
                            maxHeight: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(163, 230, 53, 0.06) 0%, transparent 60%)',
                            filter: 'blur(90px)',
                            animation: 'team-orb-float 22s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute"
                        style={{
                            bottom: '15%',
                            left: '-10%',
                            width: '40vw',
                            height: '40vw',
                            maxWidth: '500px',
                            maxHeight: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, transparent 60%)',
                            filter: 'blur(100px)',
                        }}
                    />
                    {/* Noise Texture */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                            opacity: 0.4,
                        }}
                    />
                    {/* Top accent */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(163, 230, 53, 0.1), transparent)' }}
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
                    <motion.div variants={fadeUp} className="flex flex-col w-full mb-16 md:mb-24">
                        {/* Top row: Tag and Counter */}
                        <div className="flex justify-between items-start w-full mb-8 md:mb-12">
                            <div
                                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
                                style={{
                                    border: '1px solid rgba(163, 230, 53, 0.2)',
                                    background: 'rgba(163, 230, 53, 0.05)',
                                    color: '#a3e635',
                                }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }} />
                                {t('tag')}
                            </div>
                            <div className="hidden md:flex flex-col items-end gap-1">
                                <span className="text-[11px] font-mono tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>[05]</span>
                                <span className="text-[11px] font-mono tracking-widest" style={{ color: '#a3e635' }}>// EQUIPO</span>
                            </div>
                        </div>

                        {/* Massive Title */}
                        <div className="w-full overflow-hidden mb-8">
                            <h2 className="text-[clamp(3.5rem,10vw,14rem)] font-bold tracking-tighter leading-[0.85] uppercase text-white">
                                {t('title_part1')}
                            </h2>
                            <span className="text-[clamp(3.5rem,10vw,14rem)] font-bold tracking-tighter leading-[0.85] italic uppercase" style={{ color: '#a3e635' }}>
                                {t('title_part2')}
                            </span>
                        </div>

                        {/* Subtitle */}
                        <p className="text-[clamp(0.95rem,1.5vw,1.25rem)] font-medium max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    {/* ─── Grid ─── */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                    >
                        {members.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={cardVariant}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative cursor-default"
                            >
                                <div
                                    className="relative flex flex-col items-center text-center p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 ease-out"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(163, 230, 53, 0.04)';
                                        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(163, 230, 53, 0.15)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(163, 230, 53, 0.05)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                                        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.06)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                    }}
                                >
                                    {/* Avatar */}
                                    <div className="relative mb-5">
                                        <div
                                            className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.2) 0%, transparent 70%)' }}
                                        />
                                        <div
                                            className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden"
                                            style={{ border: '2px solid rgba(255,255,255,0.08)' }}
                                        >
                                            <Image
                                                src={imageMap[member.id] || '/assets/team/default.jpeg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-[#a3e635] transition-colors duration-300 tracking-tight leading-tight">
                                        {member.name}
                                    </h3>

                                    {/* Role */}
                                    <p className="text-white/60 text-xs md:text-sm font-semibold mb-3 tracking-wide leading-snug">
                                        {member.role}
                                    </p>

                                    {/* Divider */}
                                    <div
                                        className="w-8 h-[2px] mb-3 rounded-full group-hover:w-12 transition-all duration-500"
                                        style={{ background: 'rgba(163, 230, 53, 0.3)' }}
                                    />

                                    {/* Profession */}
                                    <p className="text-[#a3e635]/60 text-[9px] md:text-[10px] uppercase tracking-widest font-bold">
                                        {member.profession}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* ─── Join Us ─── */}
                        <motion.div variants={cardVariant} className="group relative">
                            <div
                                className="relative flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer h-full transition-all duration-500 ease-out"
                                style={{
                                    background: 'rgba(163, 230, 53, 0.03)',
                                    border: '1.5px dashed rgba(163, 230, 53, 0.2)',
                                    minHeight: '200px',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(163, 230, 53, 0.07)';
                                    (e.currentTarget as HTMLElement).style.border = '1.5px dashed rgba(163, 230, 53, 0.4)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(163, 230, 53, 0.03)';
                                    (e.currentTarget as HTMLElement).style.border = '1.5px dashed rgba(163, 230, 53, 0.2)';
                                }}
                            >
                                <div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-500"
                                    style={{ background: 'rgba(163,230,53,0.08)', border: '1px solid rgba(163,230,53,0.2)' }}
                                >
                                    <Plus className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#a3e635' }} />
                                </div>

                                <h3 className="text-sm md:text-base font-bold text-white mb-2 tracking-tight leading-tight">
                                    {t('join_title')}
                                </h3>

                                <p className="text-white/40 text-xs font-medium mb-5 max-w-[160px] leading-relaxed">
                                    {t('join_subtitle')}
                                </p>

                                <a
                                    href="/#contact"
                                    className="rounded-full px-5 py-2 font-bold text-xs transition-all duration-300"
                                    style={{
                                        background: '#a3e635',
                                        color: '#050505',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = '#ffffff';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(163,230,53,0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = '#a3e635';
                                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                    }}
                                >
                                    {t('join_button')}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}
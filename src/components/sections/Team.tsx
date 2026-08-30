'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Plus, Linkedin, Quote, Compass } from 'lucide-react';
import { cn } from '@/src/lib/utils';

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
    linkedin?: string;
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
    const tFounder = useTranslations('Founder');
    const members = t.raw('members') as TeamMember[];
    const leadership = members.slice(0, 3);
    const restOfTeam = members.slice(3);

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
                            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 50%)',
                            filter: 'blur(80px)',
                            animation: 'team-orb-float 28s ease-in-out infinite reverse',
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
                <div className="container mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
                    
                    {/* ─── Header ─── */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between mb-24 md:mb-32 relative">
                        {/* Background Glow for Header */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] max-w-4xl bg-[#a3e635]/5 blur-[120px] rounded-full pointer-events-none z-[-1]" />
                        
                        {/* Left: Title & Subtitle */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex-1 flex flex-col"
                        >
                            {/* Eyebrow Tag (Pill Style) */}
                            <div className="flex items-center justify-center lg:justify-start mb-6">
                                <div className="border border-[#a3e635]/20 bg-[#a3e635]/5 rounded-full px-4 py-1.5 flex items-center gap-2">
                                    <Compass className="w-3.5 h-3.5 text-[#a3e635]" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a3e635]">
                                        {t('tag')}
                                    </span>
                                </div>
                            </div>

                            {/* Massive Title (Styled like NUESTRA FILOSOFIA) */}
                            <div className="w-full mb-8 text-center lg:text-left">
                                <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter leading-[1] uppercase flex flex-wrap justify-center lg:justify-start gap-x-4">
                                    <span className="text-white">{t('title_part1')}</span>
                                    <span className="text-[#a3e635] italic drop-shadow-[0_0_25px_rgba(163,230,53,0.35)]">
                                        {t('title_part2')}
                                    </span>
                                </h2>
                            </div>

                            {/* Subtitle */}
                            <p className="text-[clamp(1rem,1.5vw,1.15rem)] font-medium max-w-md mx-auto lg:mx-0 leading-relaxed text-white/70 text-center lg:text-left">
                                {t('subtitle')}
                            </p>
                        </motion.div>

                        {/* Right: Founder Highlight Card */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex-1 w-full max-w-2xl relative"
                        >
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#a3e635]/20 blur-3xl rounded-full" />
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#a3e635]/10 blur-3xl rounded-full" />
                            
                            <div className="relative p-8 md:p-12 rounded-[2rem] overflow-hidden group" style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(20px)', border: '1px solid rgba(163,230,53,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                                
                                {/* Glass reflection */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                <Quote className="w-10 h-10 md:w-12 md:h-12 mb-6 text-[#a3e635] opacity-50 drop-shadow-[0_0_15px_rgba(163,230,53,0.5)]" />
                                
                                <p className="text-[clamp(1.05rem,1.5vw,1.35rem)] font-medium leading-relaxed relative z-10" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                    {tFounder('quote_part1')}
                                    <span className="font-bold text-[#a3e635] drop-shadow-[0_0_8px_rgba(163,230,53,0.4)]"> {tFounder('quote_brand')} </span>
                                    {tFounder('quote_part2')}
                                </p>
                                
                                <div className="mt-8 pt-6 flex items-center gap-4 relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 relative shrink-0">
                                        <Image src="/assets/team/julian.jpg" alt="CEO" fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white tracking-tight">{tFounder('photo_name')}</span>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#a3e635]">{tFounder('tag')}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ─── Leadership Grid (Top 3) ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center"
                    >
                        {leadership.map((member, index) => (
                            <motion.div
                                key={member.id}
                                variants={cardVariant}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className={cn(
                                    "group relative cursor-default overflow-hidden rounded-2xl w-full border border-white/10 transition-all duration-500",
                                    index === 1 ? "h-[450px] md:h-[560px] lg:h-[640px] z-10 shadow-2xl shadow-[#a3e635]/5" : "h-[400px] md:h-[480px] lg:h-[540px] opacity-90 hover:opacity-100"
                                )}
                                style={{ background: '#111' }}
                            >
                                {/* Background Image */}
                                <Image
                                    src={imageMap[member.id] || '/assets/team/default.jpeg'}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                {/* Gradient Overlay for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none transition-opacity duration-500" />
                                

                                {/* Bottom Content */}
                                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-10">
                                    <div className="flex flex-col gap-1">
                                        <h3 className={cn(
                                            "text-2xl md:text-3xl font-bold tracking-tight leading-none transition-colors duration-300",
                                            index === 1 ? "text-[#a3e635]" : "text-white group-hover:text-[#a3e635]"
                                        )}>
                                            {member.name}
                                        </h3>
                                        <p className="text-white/60 text-xs md:text-sm font-medium tracking-wide mb-1.5">
                                            {member.role}
                                        </p>
                                        <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-semibold tracking-widest uppercase w-max">
                                            {member.profession}
                                        </div>
                                    </div>
                                    
                                    <a
                                        href={member.linkedin || `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.name + ' Scryved')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:scale-105 transition-all duration-300 shadow-lg z-20 shrink-0 group/link"
                                        title={`LinkedIn de ${member.name}`}
                                    >
                                        <Linkedin className="w-5 h-5 text-white group-hover/link:text-white" fill="currentColor" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ─── Grid (Rest of Team) ─── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                    >
                        {restOfTeam.map((member) => (
                            <motion.div
                                key={member.id}
                                variants={cardVariant}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative cursor-default h-full"
                            >
                                <div
                                    className="relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl md:rounded-2xl transition-all duration-500 ease-out overflow-hidden h-full"
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(163, 230, 53, 0.04)';
                                        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(163, 230, 53, 0.15)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 40px -10px rgba(163, 230, 53, 0.15)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                                        (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.05)';
                                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                    }}
                                >
                                    {/* LinkedIn Icon */}
                                    <a
                                        href={member.linkedin || `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.name + ' Scryved')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#0A66C2] hover:border-[#0A66C2] text-white transition-all duration-300 z-20 group/link"
                                        title={`LinkedIn de ${member.name}`}
                                    >
                                        <Linkedin className="w-3.5 h-3.5 text-white group-hover/link:text-white" fill="currentColor" />
                                    </a>

                                    {/* Glass reflection top */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    
                                    {/* Avatar */}
                                    <div className="relative mb-6 z-10">
                                        <div
                                            className="absolute inset-[-6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                                            style={{ background: 'rgba(163,230,53,0.3)' }}
                                        />
                                        <div
                                            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
                                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                        >
                                            <Image
                                                src={imageMap[member.id] || '/assets/team/default.jpeg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                            />
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="relative z-10 text-lg md:text-xl font-bold text-white mb-1 group-hover:text-[#a3e635] transition-colors duration-300 tracking-tight leading-tight">
                                        {member.name}
                                    </h3>

                                    {/* Role */}
                                    <p className="relative z-10 text-white/50 text-xs md:text-sm font-medium mb-5 tracking-wide leading-snug">
                                        {member.role}
                                    </p>

                                    {/* Profession badge */}
                                    <div className="relative z-10 mt-auto px-4 py-1.5 rounded-full bg-white/5 border border-white/5 group-hover:bg-[#a3e635]/10 group-hover:border-[#a3e635]/20 transition-colors duration-300">
                                        <p className="text-[#a3e635]/80 group-hover:text-[#a3e635] text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-colors duration-300">
                                            {member.profession}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* ─── Join Us ─── */}
                        <motion.div variants={cardVariant} className="group relative">
                            <div
                                className="relative flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-xl md:rounded-2xl cursor-pointer h-full transition-all duration-500 ease-out overflow-hidden"
                                style={{
                                    background: 'rgba(163, 230, 53, 0.02)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1.5px dashed rgba(163, 230, 53, 0.15)',
                                    minHeight: '200px',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(163, 230, 53, 0.05)';
                                    (e.currentTarget as HTMLElement).style.border = '1.5px dashed rgba(163, 230, 53, 0.3)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 40px -10px rgba(163, 230, 53, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(163, 230, 53, 0.02)';
                                    (e.currentTarget as HTMLElement).style.border = '1.5px dashed rgba(163, 230, 53, 0.15)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                                }}
                            >
                                {/* Glass reflection top */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a3e635]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
                </div>
            </section>
        </>
    );
}
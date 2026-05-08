'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Usamos logos reales de tecnologías comunes por ahora mediante un CDN público
const externalLogos = [
    { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Tailwind CSS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Prisma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' },
    { name: 'Vercel', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
    { name: 'Supabase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
];

export default function LogoMarquee() {
    return (
        <div className="flex w-full items-center justify-center py-8">
            <div
                className="relative flex w-full overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 15%, rgb(0, 0, 0) 85%, rgba(0, 0, 0, 0) 100%)'
                }}
            >
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 25,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex flex-none gap-24 pr-24 items-center"
                >
                    {/* Multiplicamos el array para asegurar el ancho suficiente para el loop */}
                    {[...externalLogos, ...externalLogos, ...externalLogos].map((logo, index) => (
                        <div
                            key={`${logo.name}-${index}`}
                            className="relative flex items-center justify-center group"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={120}
                                height={40}
                                // Filtros para hacerlos blancos/grises y que brillen al hover
                                className="h-10 w-auto object-contain grayscale opacity-40 brightness-200 contrast-200 transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
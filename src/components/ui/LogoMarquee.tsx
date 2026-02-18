'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Placeholder logos (Replace with your actual paths)
const logos = [
    '/assets/logos/logo-light-green-toxic.png',
    '/assets/logos/logo-light-green-toxic.png',
    '/assets/logos/logo-light-green-toxic.png',
    '/assets/logos/logo-light-green-toxic.png',
    '/assets/logos/logo-light-green-toxic.png',
];

export default function LogoMarquee() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">

            {/* This mask creates the fade effect on the edges, exactly like the reference code.
        It uses a linear gradient from transparent to black and back to transparent.
      */}
            <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)'
                }}
            >
                {/* This inner div is just to apply the background color if needed, but the mask applies to the content below */}
            </div>

            {/* We use Framer Motion for the infinite ticker animation.
        The 'x' values translate the container from 0% to -100% (or -50% if duplicated once).
        For a seamless loop, we render the logo list multiple times.
      */}
            <div className="flex w-full overflow-hidden mask-image-fade"> {/* Custom class or inline style for mask can go here too if the above absolute div approach interferes with clicks, but for a non-interactive slider, the overlay is fine. Actually, applying the mask directly to the container is cleaner. */}

                <motion.div
                    className="flex min-w-full shrink-0 items-center justify-around gap-24 pr-24" // gap-24 (~100px) matches the reference's gap: 100px
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
                    }}
                >
                    {/* Render logos multiple times to ensure seamless looping */}
                    {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
                        <div key={idx} className="relative h-10 w-32 flex-shrink-0 flex items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
                            <Image
                                src={logo}
                                alt={`Client ${idx}`}
                                width={150}
                                height={50}
                                className="object-contain h-full w-auto"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [hoverText, setHoverText] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactiveEl = target.closest('a, button, [data-cursor]');
            
            if (interactiveEl) {
                setIsHovered(true);
                const text = interactiveEl.getAttribute('data-cursor-text');
                setHoverText(text || "");
            } else {
                setIsHovered(false);
                setHoverText("");
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    if (isMobile) return null;

    const size = isHovered ? (hoverText ? 80 : 40) : 16;
    const offset = size / 2;

    const variants = {
        default: {
            x: mousePosition.x - offset,
            y: mousePosition.y - offset,
            width: size,
            height: size,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference" as any,
            border: "0px solid transparent",
        },
        hover: {
            x: mousePosition.x - offset,
            y: mousePosition.y - offset,
            width: size,
            height: size,
            backgroundColor: hoverText ? "rgba(163, 230, 53, 0.9)" : "rgba(163, 230, 53, 0.2)",
            mixBlendMode: hoverText ? "normal" as any : "screen" as any,
            border: hoverText ? "0px solid transparent" : "1px solid rgba(163, 230, 53, 0.8)",
        }
    };

    return (
        <>
            {/* Global style to hide the default cursor on non-mobile devices */}
            <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 768px) {
                    * { cursor: none !important; }
                }
            `}} />
            
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-black text-xs font-bold overflow-hidden"
                variants={variants}
                animate={isHovered ? "hover" : "default"}
                transition={{ type: "tween", ease: "circOut", duration: 0.15 }}
            >
                {hoverText && (
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="text-center tracking-tight leading-tight px-2"
                    >
                        {hoverText}
                    </motion.span>
                )}
            </motion.div>
        </>
    );
}

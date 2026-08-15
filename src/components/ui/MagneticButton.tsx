'use client';

import { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface MagneticButtonProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    magneticPull?: number; // How much it pulls towards cursor (e.g. 0.2)
}

export default function MagneticButton({
    children,
    className,
    magneticPull = 0.3,
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        setPosition({ x: middleX * magneticPull, y: middleY * magneticPull });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn("relative z-10", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}

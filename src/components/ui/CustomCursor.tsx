'use client';

import { useEffect, useRef } from 'react';

/**
 * CustomCursor — versión ultra-optimizada
 * 
 * Principios:
 * - CERO re-renders de React: todo se maneja con refs y mutación directa del DOM.
 * - requestAnimationFrame para mover el cursor (1 RAF, no N setState por frame).
 * - Event listeners pasivos cuando es posible.
 * - Se desactiva completamente en móviles y touch devices.
 * - Sin Framer Motion — transiciones CSS nativas son mucho más livianas.
 */
export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -100, y: -100 });
    const hoveredRef = useRef(false);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        // Verificar si es dispositivo táctil o móvil
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth < 768;
        if (isTouchDevice || isSmallScreen) return;

        const dot = dotRef.current;
        if (!dot) return;

        // Inyectar estilo para ocultar cursor por defecto (una sola vez)
        const style = document.createElement('style');
        style.textContent = `@media(min-width:768px){*{cursor:none!important}}`;
        document.head.appendChild(style);

        // Listener de movimiento — solo guarda coords, no toca el DOM
        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        // Listener de hover — event delegation
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [data-cursor], input, textarea, select, label');
            const wasHovered = hoveredRef.current;
            hoveredRef.current = !!isInteractive;

            // Solo tocar el DOM si cambió el estado
            if (wasHovered !== hoveredRef.current) {
                if (hoveredRef.current) {
                    dot.style.width = '40px';
                    dot.style.height = '40px';
                    dot.style.backgroundColor = 'rgba(163, 230, 53, 0.15)';
                    dot.style.border = '1.5px solid rgba(163, 230, 53, 0.6)';
                    dot.style.mixBlendMode = 'screen';
                } else {
                    dot.style.width = '14px';
                    dot.style.height = '14px';
                    dot.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                    dot.style.border = 'none';
                    dot.style.mixBlendMode = 'difference';
                }
            }
        };

        // RAF loop — actualiza posición con transform (GPU-accelerated, no layout reflow)
        const tick = () => {
            const { x, y } = mouseRef.current;
            dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            rafRef.current = requestAnimationFrame(tick);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            cancelAnimationFrame(rafRef.current);
            style.remove();
        };
    }, []);

    return (
        <div
            ref={dotRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                mixBlendMode: 'difference',
                pointerEvents: 'none',
                zIndex: 9999,
                willChange: 'transform',
                transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease',
                transform: 'translate3d(-100px, -100px, 0)',
            }}
        />
    );
}

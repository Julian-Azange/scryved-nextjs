'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/routing'; // Importante: usar el routing configurado
import { motion } from 'framer-motion';
import { useTransition } from 'react';

// Importamos tus banderas
import ColombiaFlag from '@/src/components/icons/ColombiaFlag'; // Ajusta la ruta si es necesario
import UsaFlag from '@/src/components/icons/UsaFlag';

export default function LanguageToggle() {
    const locale = useLocale(); // Obtiene 'es' o 'en'
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const isEnglish = locale === 'en';

    const toggleLanguage = () => {
        const nextLocale = isEnglish ? 'es' : 'en';

        startTransition(() => {
            // Cambia la ruta manteniendo la página actual pero cambiando el idioma
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Cambiar idioma"
        >
            {/* Renderizado condicional de la bandera */}
            <div className="relative w-6 h-4 overflow-hidden rounded-sm shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                {isEnglish ? (
                    <UsaFlag className="w-full h-full object-cover" />
                ) : (
                    <ColombiaFlag className="w-full h-full object-cover" />
                )}
            </div>

            {/* Texto del idioma */}
            <span className="font-bold uppercase text-xs text-gray-300 group-hover:text-white tracking-wider">
                {isEnglish ? 'EN' : 'ES'}
            </span>
        </motion.button>
    );
}
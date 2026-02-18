import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es'
});

// Usamos createNavigation en lugar de createSharedPathnamesNavigation
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
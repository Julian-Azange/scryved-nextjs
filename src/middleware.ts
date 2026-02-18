import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Coincidir con la raíz y rutas locales, ignorando archivos internos (_next, imágenes, etc.)
    matcher: ['/', '/(es|en)/:path*']
};
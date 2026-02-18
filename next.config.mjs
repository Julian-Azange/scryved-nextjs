import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**', // Permitir cualquier ruta en Unsplash
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me', // Agregamos este por si usas avatares de prueba luego
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default withNextIntl(nextConfig);
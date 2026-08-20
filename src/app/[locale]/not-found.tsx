import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: '#050505', color: 'white' }}>
            <h1 className="text-[clamp(6rem,15vw,12rem)] font-black leading-none tracking-tighter" style={{ color: '#a3e635' }}>404</h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 mt-4 uppercase">Página no encontrada</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-10">La ruta que intentas visitar no existe o fue movida.</p>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black transition-all hover:opacity-90" style={{ background: '#a3e635' }}>
                Volver al Inicio <ArrowRight className="w-5 h-5" />
            </Link>
        </main>
    );
}

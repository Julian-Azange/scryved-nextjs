import { ArrowRight } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 relative z-10" style={{ background: '#050505', color: 'white' }}>
            <h1 
                className="text-[clamp(6rem,15vw,12rem)] font-black leading-none tracking-tighter animate-pulse" 
                style={{ 
                    color: '#a3e635', 
                    textShadow: '0 0 30px rgba(163,230,53,0.6), 0 0 80px rgba(163,230,53,0.4), 0 0 120px rgba(163,230,53,0.2)' 
                }}
            >
                404
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 mt-4 uppercase">Página no encontrada</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-10">La ruta que intentas visitar no existe o fue movida.</p>
            
            {/* Usamos un <a> normal para asegurar la redirección forzada y que no haya conflictos de rutas de next-intl */}
            <a 
                href="/" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#050505] transition-all duration-300 hover:scale-105 hover:bg-[#b4f041] hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] cursor-pointer z-50 relative" 
                style={{ background: '#a3e635' }}
            >
                Volver al Inicio <ArrowRight className="w-5 h-5" />
            </a>
        </main>
    );
}

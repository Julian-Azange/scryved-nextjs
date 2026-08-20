import { Metadata } from 'next';
import { Wrench, ShieldCheck, Laptop, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = 'https://scryved.com';
    const canonicalUrl = `${baseUrl}/${locale}/servicios/mantenimiento-equipos`;

    return {
        title: locale === 'es' ? 'Formateo y Mantenimiento de Computadores en Pitalito | Scryved' : 'PC Maintenance & Tech Support in Pitalito | Scryved',
        description: locale === 'es' ? 'Servicio técnico especializado en Pitalito: Formateo de computadores, instalación de redes, cámaras de seguridad y limpieza de PCs.' : 'Specialized tech support in Pitalito: PC formatting, network installation, security cameras and PC cleaning.',
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            url: canonicalUrl,
        },
    };
}

export default async function MantenimientoPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isEs = locale === 'es';

    return (
        <main className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20 mx-auto max-w-[1920px] text-white" style={{ background: '#050505' }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(163,230,53,0.3)' }} />
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: '#a3e635' }}>
                    {isEs ? 'Soporte Técnico Especializado' : 'Specialized Tech Support'}
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
                {isEs ? 'Formateo & Soporte' : 'IT Support'} <br />
                <span style={{ color: '#a3e635' }}>{isEs ? 'en Pitalito' : 'in Pitalito'}</span>
            </h1>

            <p className="text-lg md:text-xl max-w-3xl mb-16" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isEs 
                    ? '¿Tu computador está lento o necesita mantenimiento? Ofrecemos formateo profesional, respaldo de información, mantenimiento preventivo y correctivo, y venta de licencias originales en Pitalito.'
                    : 'Is your computer slow? We offer professional formatting, data backup, preventive and corrective maintenance in Pitalito.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        icon: <Laptop className="w-8 h-8" style={{ color: '#a3e635' }} />,
                        title: isEs ? 'Formateo y Limpieza' : 'Formatting & Cleaning',
                        desc: isEs ? 'Instalación de Windows, Office, limpieza de virus y optimización del rendimiento para computadores portátiles y de escritorio.' : 'Windows installation, virus cleaning and performance optimization.'
                    },
                    {
                        icon: <Wrench className="w-8 h-8" style={{ color: '#a3e635' }} />,
                        title: isEs ? 'Mantenimiento Preventivo' : 'Preventive Maintenance',
                        desc: isEs ? 'Limpieza interna de hardware, cambio de pasta térmica y diagnóstico de componentes para alargar la vida útil de tu equipo.' : 'Hardware cleaning, thermal paste replacement and diagnostics.'
                    },
                    {
                        icon: <ShieldCheck className="w-8 h-8" style={{ color: '#a3e635' }} />,
                        title: isEs ? 'Redes y Cámaras' : 'Networks & Cameras',
                        desc: isEs ? 'Instalación de cableado estructurado, configuración de redes Wi-Fi empresariales y sistemas de cámaras de seguridad (CCTV).' : 'Structured cabling, business Wi-Fi setup and CCTV security systems.'
                    }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[2rem] border transition-all hover:scale-[1.02]" style={{ background: 'rgba(163,230,53,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                        <div className="mb-6">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 p-12 rounded-[2rem] border text-center" style={{ background: 'rgba(163,230,53,0.05)', borderColor: 'rgba(163,230,53,0.1)' }}>
                <h2 className="text-3xl font-bold mb-4">{isEs ? 'Agenda la revisión de tu equipo' : 'Schedule your equipment review'}</h2>
                <p className="mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {isEs ? 'Escríbenos por WhatsApp para cotizar el servicio técnico.' : 'Contact us via WhatsApp for a quote.'}
                </p>
                <a href="https://wa.me/573222455334" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black transition-all hover:opacity-90" style={{ background: '#a3e635' }}>
                    {isEs ? 'Cotizar Servicio' : 'Get Quote'} <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </main>
    );
}

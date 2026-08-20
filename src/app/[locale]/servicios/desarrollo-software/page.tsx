import { Metadata } from 'next';
import { Code, Smartphone, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = 'https://scryved.com';
    const canonicalUrl = `${baseUrl}/${locale}/servicios/desarrollo-software`;

    return {
        title: locale === 'es' ? 'Desarrollo de Software a Medida en Pitalito | Scryved' : 'Custom Software Development in Pitalito | Scryved',
        description: locale === 'es' ? 'Empresa de desarrollo de software, páginas web y aplicaciones móviles en Pitalito, Huila. Soluciones tecnológicas para impulsar tu negocio.' : 'Software development, web pages and mobile apps in Pitalito, Huila. Tech solutions to boost your business.',
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            url: canonicalUrl,
        },
    };
}

export default async function DesarrolloSoftwarePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const isEs = locale === 'es';

    return (
        <main className="min-h-screen pt-28 pb-20 px-6 md:px-12 lg:px-20 mx-auto max-w-[1920px] text-white" style={{ background: '#050505' }}>
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 max-w-16" style={{ background: 'rgba(163,230,53,0.3)' }} />
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: '#a3e635' }}>
                    {isEs ? 'Servicios de Ingeniería' : 'Engineering Services'}
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-6 leading-none">
                {isEs ? 'Desarrollo de' : 'Software'} <br />
                <span style={{ color: '#a3e635' }}>{isEs ? 'Software en Pitalito' : 'Development in Pitalito'}</span>
            </h1>

            <p className="text-lg md:text-xl max-w-3xl mb-16" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isEs 
                    ? 'Transformamos ideas en plataformas escalables. Desde aplicaciones móviles intuitivas hasta sistemas administrativos completos (ERP/CRM) diseñados para empresas en el sur del Huila y todo Colombia.'
                    : 'We transform ideas into scalable platforms. From intuitive mobile apps to complete administrative systems (ERP/CRM) designed for businesses.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        icon: <Code className="w-8 h-8" style={{ color: '#a3e635' }} />,
                        title: isEs ? 'Desarrollo Web & SaaS' : 'Web & SaaS Development',
                        desc: isEs ? 'Aplicaciones web modernas, rápidas y seguras. Creamos tiendas virtuales, landing pages y sistemas en la nube.' : 'Modern, fast and secure web applications.'
                    },
                    {
                        icon: <Smartphone className="w-8 h-8" style={{ color: '#a3e635' }} />,
                        title: isEs ? 'Apps Móviles (iOS/Android)' : 'Mobile Apps (iOS/Android)',
                        desc: isEs ? 'Desarrollo nativo e híbrido. Llevamos tu negocio al bolsillo de tus clientes con experiencias de usuario impecables.' : 'Native and hybrid development. Flawless user experiences.'
                    },
                    {
                        icon: <Database className="w-8 h-8" style={{ color: '#a3e635' }} />,
                        title: isEs ? 'Sistemas a Medida' : 'Custom Systems',
                        desc: isEs ? 'Digitalizamos tus procesos internos. Facturación, control de inventarios y bases de datos a tu medida.' : 'We digitize your internal processes.'
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
                <h2 className="text-3xl font-bold mb-4">{isEs ? '¿Listo para digitalizar tu empresa?' : 'Ready to digitize your company?'}</h2>
                <p className="mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {isEs ? 'Escríbenos y agendemos una consultoría técnica gratuita en Pitalito o por videollamada.' : 'Contact us for a free technical consultation.'}
                </p>
                <a href="https://wa.me/573222455334" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black transition-all hover:opacity-90" style={{ background: '#a3e635' }}>
                    {isEs ? 'Contactar a un Ingeniero' : 'Contact an Engineer'} <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </main>
    );
}

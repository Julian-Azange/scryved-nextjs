import dynamic from 'next/dynamic';
import Hero from "@/src/components/sections/Hero";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://scryved.com';
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

// Lazy load below-the-fold components
const Stats = dynamic(() => import("@/src/components/sections/Stats"), { ssr: true });
const Services = dynamic(() => import("@/src/components/sections/Services"), { ssr: true });
const Portfolio = dynamic(() => import("@/src/components/sections/Portfolio"), { ssr: true });
const Pricing = dynamic(() => import("@/src/components/sections/Pricing"), { ssr: true });
const Contact = dynamic(() => import("@/src/components/sections/Contact"), { ssr: true });

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Pricing />
      <Contact />
    </main>
  );
}
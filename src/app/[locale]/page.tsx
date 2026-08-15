import dynamic from 'next/dynamic';
import Hero from "@/src/components/sections/Hero";

// Lazy load below-the-fold components
const Stats = dynamic(() => import("@/src/components/sections/Stats"), { ssr: true });
const Services = dynamic(() => import("@/src/components/sections/Services"), { ssr: true });
const Portfolio = dynamic(() => import("@/src/components/sections/Portfolio"), { ssr: true });
const Founder = dynamic(() => import("@/src/components/sections/Founder"), { ssr: true });
const Pricing = dynamic(() => import("@/src/components/sections/Pricing"), { ssr: true });
const Contact = dynamic(() => import("@/src/components/sections/Contact"), { ssr: true });

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Founder />
      <Pricing />
      <Contact />
    </main>
  );
}
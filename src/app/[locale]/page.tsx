import Hero from "@/src/components/sections/Hero";
import Stats from "@/src/components/sections/Stats";
import Services from "@/src/components/sections/Services";
import Portfolio from "@/src/components/sections/Portfolio";
import Founder from "@/src/components/sections/Founder";
import Contact from "@/src/components/sections/Contact";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Founder />
      <Contact />
    </main>
  );
}
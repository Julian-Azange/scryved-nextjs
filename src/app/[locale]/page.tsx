import Hero from "@/src/components/sections/Hero";
import Services from "@/src/components/sections/Services";
import SecurityKits from "@/src/components/sections/Security";
import Portfolio from "@/src/components/sections/Portfolio";
import Contact from "@/src/components/sections/Contact";
import Footer from "@/src/components/sections/Footer";
import Team from "@/src/components/sections/Team";
import Gallery from "@/src/components/sections/Gallery";
import Navbar from "@/src/components/layout/Navbar";
import FinanLock from "@/src/components/sections/FinanLock";
import Showcase from "@/src/components/sections/Showcase";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Showcase/>
      <Portfolio />
      {/* <FinanLock /> */}
      <Team />
      <SecurityKits />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
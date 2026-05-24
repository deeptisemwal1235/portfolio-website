import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Analysis from "@/components/sections/Analysis";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Services />
      <Projects />
      <Analysis />
      <Contact />
      <Footer />
    </>
  );
}

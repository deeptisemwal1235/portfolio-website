import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Projects from "@/components/sections/Projects";
import Analysis from "@/components/sections/Analysis";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import { JsonLd, websiteJsonLd, personJsonLd } from "@/lib/jsonLd";
import { getSettings } from "@/lib/settings";

export default async function HomePage() {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={personJsonLd(settings)} />
      <Navbar />
      <main id="main">
      <Hero />
      <Skills />
      <Services />
      <Testimonials />
      <Projects />
      <Analysis />
      <Contact />
      </main>
      <Footer />
    </>
  );
}

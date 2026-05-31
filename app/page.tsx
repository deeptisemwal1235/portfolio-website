import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Projects from "@/components/sections/Projects";
import Analysis from "@/components/sections/Analysis";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import type { Metadata } from "next";
import { JsonLd, websiteJsonLd, personJsonLd, servicesJsonLd, SITE_URL } from "@/lib/jsonLd";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL, "x-default": SITE_URL },
  },
};

export default async function HomePage() {
  const settings = await getSettings();
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={personJsonLd(settings)} />
      <JsonLd data={servicesJsonLd(settings)} />
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

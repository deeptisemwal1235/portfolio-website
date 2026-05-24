import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavScroll from "@/components/ui/NavScroll";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--serif",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--mono",
  display: "swap",
});

const faviconSvg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%232a1f17'/%3E%3Ctext x='50' y='66' font-family='Georgia,serif' font-style='italic' font-size='54' text-anchor='middle' fill='%23f4ebe0'%3EDS%3C/text%3E%3C/svg%3E";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-xi-ivory.vercel.app";

// Pull the host out of the Supabase URL so we only preconnect to the actual
// storage origin in use (and not, say, a wildcard placeholder during PR builds).
const SUPABASE_ORIGIN = (() => {
  try { return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).origin; }
  catch { return null; }
})();
const TITLE = "Deepti Semwal — Energy Policy & Regulations Expert";
const DESCRIPTION =
  "Deepti Semwal — Energy Policy & Regulations Expert. Post-graduate M.Tech, Energy Policy & Regulations, IIT Gandhinagar. Consultation, market analysis, and strategy for the energy transition.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: faviconSvg },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Deepti Semwal",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {SUPABASE_ORIGIN && (
          <link rel="preconnect" href={SUPABASE_ORIGIN} crossOrigin="anonymous" />
        )}
      </head>
      <body>
        <NavScroll />
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

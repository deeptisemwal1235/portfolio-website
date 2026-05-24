import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
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

export const metadata: Metadata = {
  title: "Deepti Semwal — Energy Policy & Regulations Expert",
  description:
    "Deepti Semwal — Energy Policy & Regulations Expert. Post-graduate M.Tech, Energy Policy & Regulations, IIT Gandhinagar. Consultation, market analysis, and strategy for the energy transition.",
  icons: { icon: faviconSvg },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <NavScroll />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

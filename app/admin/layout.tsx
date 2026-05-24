import "../globals.css";
import "./admin.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--serif", display: "swap" });
const sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--mono", display: "swap" });

export const metadata: Metadata = {
  title: "Admin · Deepti Semwal",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`admin-shell ${serif.variable} ${sans.variable} ${mono.variable}`}>
      {children}
      <Toaster position="bottom-right" />
    </div>
  );
}

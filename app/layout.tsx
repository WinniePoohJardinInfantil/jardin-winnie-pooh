import type { Metadata } from "next";
import { Nunito, Fredoka, Geist } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Jardín Infantil Winnie Pooh | Medellín",
  description:
    "Somos el comienzo de una vida plena para sus hijos. 29 años formando niños felices en Medellín. Jardín Infantil, Babies y After Class.",
  keywords: [
    "jardín infantil Medellín",
    "guardería Medellín",
    "Winnie Pooh jardín",
    "after class Medellín",
    "estimulación temprana",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
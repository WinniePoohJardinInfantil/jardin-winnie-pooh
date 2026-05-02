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
  title: {
    default: "Jardín Infantil Winnie Pooh | Medellín - 30 Años de Experiencia",
    template: "%s | Jardín Infantil Winnie Pooh"
  },
  description:
    "Somos el comienzo de una vida plena para sus hijos. 30 años formando niños felices en Medellín. Jardín Infantil, Babies y After Class. Método Políglota, estimulación temprana y más.",
  keywords: [
    "jardín infantil Medellín",
    "guardería Medellín",
    "Winnie Pooh jardín",
    "after class Medellín",
    "estimulación temprana",
    "jardín infantil La América",
    "método políglota",
    "jardín infantil Calasanz",
    "baby's Medellín",
    "cuidado infantil Medellín"
  ],
  authors: [{ name: "SerStack", url: "https://serstack-es.vercel.app" }],
  creator: "SerStack",
  publisher: "Jardín Infantil Winnie Pooh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://winniepoohjardininfantil.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jardín Infantil Winnie Pooh | Medellín",
    description: "30 años formando niños felices en Medellín. Jardín Infantil, Babies y After Class.",
    url: "https://winniepoohjardininfantil.com",
    siteName: "Jardín Infantil Winnie Pooh",
    images: [
      {
        url: "/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "Jardín Infantil Winnie Pooh Medellín",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jardín Infantil Winnie Pooh | Medellín",
    description: "30 años formando niños felices en Medellín",
    images: ["/images/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp",
  },
  verification: {
    // Agregar después de configurar Google Search Console
    // google: "tu-codigo-de-verificacion",
  },
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
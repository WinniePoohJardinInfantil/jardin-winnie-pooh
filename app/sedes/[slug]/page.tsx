"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Necesario para la animación
import { Check, MessageCircle, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { BlurFade } from "@/components/ui/blur-fade";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Importamos tu Footer
import WhatsAppButton from "@/components/WhatsAppButton";

interface SedeDetalle {
  nombre: string;
  color: string;
  descripcion: string;
  direccion: string;
  mapaUrl: string;
  edades: string[];
  servicios: string[];
  fotos: string[];
}

const sedesData: Record<string, SedeDetalle> = {
  "babys": {
    nombre: "Winnie Pooh Baby's",
    color: "#FF7893",
    descripcion: "Atención especializada para los más pequeños con mucho amor. Nuestro enfoque se basa en la estimulación temprana y el cuidado integral en un ambiente seguro y diseñado especialmente para bebés y caminadores.",
    direccion: "Carrera 81 #52 - 58, Medellín",
    // Se extrajo únicamente el src del iframe proporcionado
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9836957953403!2d-75.59968552432062!3d6.265874126102123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442914b6d07a2f%3A0x95ae8ad74ec1103e!2sCra.%2081%20%2352-58%2C%20Calasanz%20Parte%20Alta%2C%20Medell%C3%ADn%2C%20La%20Am%C3%A9rica%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1776620538250!5m2!1ses-419!2sco", 
    edades: ["3 meses a 12 meses", "1 año (Maternal)", "2 años (Párvulos)"],
    servicios: ["Estimulación temprana", "Sala de lactancia", "Personal especializado", "Nutrición guiada"],
    fotos: ["/images/diadepayasos.jpg", "/images/papelitos.webp", "/images/clases.webp"],
  },
  "jardin": {
    nombre: "Winnie Pooh Jardín Infantil",
    color: "#FFFC01", // Amarillo característico
    descripcion: "Un espacio de crecimiento y aprendizaje para niños en etapa preescolar, fomentando la curiosidad y la socialización.",
    direccion: "Calle 51 #81a-25, Medellín", // Ajusta la dirección real
    mapaUrl: "URL_DEL_MAPA_SEDE_JARDIN", 
    edades: ["3 años (Pre-jardín)", "4 años (Jardín)", "5 años (Transición)"],
    servicios: ["Iniciación al inglés", "Huerta escolar", "Expresión corporal", "Psicomotricidad"],
    fotos: ["/images/winnie-baile.webp", "/images/winnie-feliz.webp"], // Usa las nuevas fotos que subiste
  },
  "after-class": {
    nombre: "Winnie Pooh After Class",
    color: "#4ADE80", // Un verde vibrante para actividades extra
    descripcion: "El complemento perfecto para la jornada escolar con refuerzo académico, talleres creativos y mucha diversión.",
    direccion: "Calle 51 #81a-25, Medellín", // Ajusta la dirección real
    mapaUrl: "URL_DEL_MAPA_AFTER_CLASS", 
    edades: ["6 a 10 años"],
    servicios: ["Tareas dirigidas", "Taller de artes", "Clases de música", "Recreación"],
    fotos: ["/images/salidadecampo.jpg", "/images/juegos-de-pelotas.webp"],
  },
};
export default function SedePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const sede = sedesData[slug];
  const [fotoActual, setFotoActual] = useState(0);
  const [direccion, setDireccion] = useState(1); // Para saber hacia dónde animar

  if (!sede) notFound();

  const proximaFoto = () => {
    setDireccion(1);
    setFotoActual((prev) => (prev + 1) % sede.fotos.length);
  };
  
  const fotoAnterior = () => {
    setDireccion(-1);
    setFotoActual((prev) => (prev - 1 + sede.fotos.length) % sede.fotos.length);
  };

  const sedeColorBrand = sede.color === "#FFFC01" ? "#D4C500" : sede.color;
  const whatsappLink = `https://wa.me/573116055332?text=Hola!%20Info%20de%20la%20sede%20${encodeURIComponent(sede.nombre)}`;

  // Variantes para la animación de desplazamiento
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <main className="min-h-screen bg-white font-nunito">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <BlurFade delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold font-fredoka mb-6" style={{ color: sedeColorBrand }}>
              {sede.nombre}
            </h1>
            <p className="text-xl text-slate-500 max-w-4xl mx-auto leading-relaxed italic">
              {sede.descripcion}
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Información */}
          <div className="lg:col-span-3 flex">
            <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 w-full flex flex-col justify-between shadow-sm">
              <div className="space-y-8">
                <h3 className="text-2xl font-fredoka text-slate-800">Información</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3">Edades</p>
                    <div className="flex flex-wrap gap-2">
                      {sede.edades.map(e => (
                        <span key={e} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-[11px] font-bold text-slate-600">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3">Servicios</p>
                    <ul className="space-y-4">
                      {sede.servicios.map(s => (
                        <li key={s} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                          <div className="bg-green-500 p-1 rounded-full">
                            <Check size={12} className="text-white" strokeWidth={4} />
                          </div>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-6 font-bold flex items-start gap-2">
                  <MapPin size={16} className="text-pink-500" /> {sede.direccion}
                </p>
                <RainbowButton className="w-full h-14 rounded-2xl text-white font-bold" onClick={() => window.open(whatsappLink)}>
                  <MessageCircle className="mr-2" size={20} /> Preguntar
                </RainbowButton>
              </div>
            </div>
          </div>

          {/* 2. Carrusel con Animación de Desplazamiento */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full aspect-square lg:aspect-auto rounded-[3.5rem] overflow-hidden shadow-2xl border-[10px] border-white group bg-slate-100">
              <AnimatePresence initial={false} custom={direccion} mode="popLayout">
                <motion.div
                  key={fotoActual}
                  custom={direccion}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image 
                    src={sede.fotos[fotoActual]} 
                    alt="Instalaciones" 
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Controles del Carrusel */}
              <button onClick={fotoAnterior} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl z-20 hover:scale-110 transition-transform active:scale-90">
                <ChevronLeft size={28} />
              </button>
              <button onClick={proximaFoto} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl z-20 hover:scale-110 transition-transform active:scale-90">
                <ChevronRight size={28} />
              </button>
            </div>
          </div>

          {/* 3. Neon Gradient Card con Mapa */}
          <div className="lg:col-span-3 flex flex-col">
             <NeonGradientCard 
                className="items-center justify-center text-center flex-1"
                neonColors={{ firstColor: sedeColorBrand, secondColor: "#ffffff" }}
             >
                <div className="w-full h-[450px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
                   <iframe
                      src={sede.mapaUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                   />
                </div>
             </NeonGradientCard>
          </div>
        </div>
      </div>

      {/* Componentes adicionales */}
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
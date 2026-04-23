"use client";

import React from "react";
import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";

// --- ETIQUETA SHIMMER REFINADA ---
const ShinyBadge = ({ children, color }: { children: React.ReactNode; color: string }) => {
  return (
    <div className="flex justify-center mb-10">
      <div 
        className="relative overflow-hidden px-5 py-1.5 rounded-full border shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.7)", // Más opaco para resaltar sobre el fondo nuevo
          backdropFilter: "blur(8px)",
          borderColor: `${color}40`,
        }}
      >
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
            width: "60%",
          }}
        />
        <span 
          className="relative z-10 font-nunito font-black text-[0.7rem] uppercase tracking-[0.15em]"
          style={{ color: color === "#FFFC01" ? "#857a00" : color }}
        >
          {children}
        </span>
      </div>
    </div>
  );
};

const HighLight = ({ children, color = "#FFB40033", type = "box" }: { children: React.ReactNode; color?: string; type?: "box" | "underline" }) => (
  <span style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
    <span style={{
      position: "absolute",
      left: "-2px", right: "-2px", bottom: type === "underline" ? "4px" : "0",
      height: type === "underline" ? "8px" : "100%",
      backgroundColor: color,
      zIndex: -1,
      borderRadius: type === "underline" ? "0" : "8px",
      transform: "rotate(-1deg)",
    }} />
    {children}
  </span>
);

const sedes = [
  {
    titulo: "Winnie Pooh",
    subtitulo: "Jardín Infantil",
    tag: "Sede Principal",
    imagen: "/logos/jardin-infantil.png", 
    color: "#FFFC01",
    slug: "jardin",
    niveles: ["Pre-Jardín (3 años)", "Jardín (4 años)"],
    direccion: "Calle 51 #81A - 25",
    descripcion: "Nuestra sede principal con más de 30 años formando niños felices.",
    btnClass: "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-200",
  },
  {
    titulo: "Winnie Pooh",
    subtitulo: "Babys",
    tag: "Bebés y Maternal",
    imagen: "/logos/babys.jpeg",
    color: "#FF7893",
    slug: "babies",
    niveles: ["Cunas (meses - 1 año)", "Maternal (1 año)", "Párvulos (2 años)"],
    direccion: "Carrera 81 #52 - 58",
    descripcion: "Atención especializada para los más pequeños con mucho amor.",
    btnClass: "bg-gradient-to-r from-pink-400 to-pink-500 shadow-pink-200",
  },
  {
    titulo: "Winnie Pooh",
    subtitulo: "After Class",
    tag: "Refuerzo Escolar",
    imagen: "/logos/after-class.png",
    color: "#7AC0FF",
    slug: "after-class",
    niveles: ["Cuidado y atención", "Acompañamiento de tareas", "Refuerzo y repasos", "Clases extracurriculares"],
    direccion: "Calle 51 #81A - 25",
    descripcion: "Apoyo académico con seguimiento personalizado.",
    btnClass: "bg-gradient-to-r from-blue-400 to-blue-500 shadow-blue-200",
  },
];

export default function Sedes() {
  return (
    <section 
      id="sedes" 
      className="relative bg-white pt-24 pb-32 overflow-hidden"
    >
      {/* --- FONDO CON DOBLE DESVANECIDO (ESTILO HERO) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full relative"
          style={{
            // Desvanecido arriba (0-20%) y abajo (80-100%)
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        >
          <Image
            src="/images/sedes-bg.png" // Asegúrate de subir esta imagen
            alt="Fondo decorativo infantil"
            fill
            className="object-cover object-center opacity-40" // Opacidad suave para no distraer del contenido
            priority
          />
        </div>
        {/* Overlay para suavizar el fondo y mejorar contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- CABECERA --- */}
        <div className="text-center mb-24">
          <BlurFade delay={0.1} inView>
            <h2 className="font-fredoka font-black leading-[1.1] mb-6 text-black" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
              <SparklesText sparklesCount={8} className="inline">
                <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                  Tres sedes para
                </AuroraText>
              </SparklesText>
              <br />
              <SparklesText sparklesCount={8} className="inline">
                <AuroraText colors={["#00D1FF", "#4ADE80", "#FACC15"]}>
                  cada etapa
                </AuroraText>
              </SparklesText>
            </h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="font-nunito font-extrabold text-[#334155] leading-relaxed mx-auto max-w-[800px]" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.45rem)" }}>
              Cada sede está diseñada para las{" "}
              <HighLight color="#00c3ff33">necesidades específicas</HighLight> de su hijo, brindando el{" "}
              <HighLight color="#ff1f6d22" type="underline">mejor cuidado</HighLight> en cada paso.
            </p>
          </BlurFade>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          {sedes.map((sede, i) => (
            <BlurFade key={sede.slug} delay={0.3 + i * 0.1} inView>
              <div className="flex h-full">
                <MagicCard
                  className="flex w-full flex-col overflow-visible rounded-[3.5rem] border-none shadow-2xl"
                  gradientColor={sede.color + "20"}
                >
                  <div
                    className="flex flex-col h-full p-12 pt-14 text-center relative"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.85)", // Fondo de tarjeta semi-transparente para ver el wallpaper
                      backdropFilter: "blur(12px)",
                      borderRadius: "3.5rem",
                      boxShadow: `0 30px 70px -20px ${sede.color}45`,
                    }}
                  >
                    <div className="mb-8">
                      <ShinyBadge color={sede.color}>
                        {sede.tag}
                      </ShinyBadge>

                      <div className="relative w-full h-32 mx-auto mb-12">
                        <Image src={sede.imagen} alt={sede.titulo} fill className="object-contain" />
                      </div>

                      <h3 className="font-fredoka text-[2rem] leading-none mb-6 flex flex-col justify-center min-h-[5rem]">
                        <span className="block opacity-60 text-[1.2rem] mb-1">Winnie Pooh</span>
                        <span style={{ color: sede.color === "#FFFC01" ? "#b5a700" : sede.color }}>
                          {sede.subtitulo}
                        </span>
                      </h3>

                      <p className="font-nunito text-[1.15rem] text-[#475569] font-bold leading-relaxed px-2 mb-10 min-h-[100px] flex items-center justify-center">
                        {sede.descripcion}
                      </p>
                    </div>

                    <ul className="flex flex-col gap-5 text-left w-full mb-12 min-h-[200px]">
                      {sede.niveles.map((nivel) => (
                        <li key={nivel} className="flex items-start gap-4">
                          <div
                            className="mt-1 flex-shrink-0 w-[26px] h-[26px] rounded-lg flex items-center justify-center shadow-sm"
                            style={{ background: sede.color + "30", color: sede.color === "#FFFC01" ? "#857a00" : sede.color }}
                          >
                            <Check size={16} strokeWidth={4} />
                          </div>
                          <span className="font-nunito text-[1.1rem] font-black text-[#1e293b]">
                            {nivel}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-10 border-t border-slate-100">
                      <p className="font-nunito text-[0.85rem] font-black text-slate-400 mb-8 tracking-[0.1em] uppercase flex items-center justify-center gap-2">
                        <span className="text-lg">📍</span> {sede.direccion}
                      </p>

                      <Link
                        href={`/sedes/${sede.slug}`}
                        className={`inline-flex w-full items-center justify-center rounded-2xl text-white font-black transition-all hover:scale-[1.05] active:scale-[0.95] shadow-xl py-5 text-[1.2rem] font-nunito ${sede.btnClass}`}
                      >
                        Ver más información →
                      </Link>
                    </div>
                  </div>
                </MagicCard>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";

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
    btnClass: "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-100",
  },
  {
    titulo: "Winnie Pooh",
    subtitulo: "Baby's",
    tag: "Bebés y Maternal",
    imagen: "/logos/babys.jpeg",
    color: "#FF7893",
    slug: "babys",
    niveles: ["Cunas (meses - 1 año)", "Maternal (1 año)", "Párvulos (2 años)"],
    direccion: "Carrera 81 #52 - 58",
    descripcion: "Atención especializada para los más pequeños con mucho amor.",
    btnClass: "bg-gradient-to-r from-pink-400 to-pink-500 shadow-pink-100",
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
    btnClass: "bg-gradient-to-r from-blue-400 to-blue-500 shadow-blue-100",
  },
];

export default function Sedes() {
  return (
    <section 
      id="sedes" 
      className="relative bg-white pb-16 overflow-visible" 
    >
      {/* --- DIVISOR ORGANICO REFINADO --- */}
<div className="absolute top-0 left-0 w-full z-20 pointer-events-none" style={{ height: "80px", background: "linear-gradient(to bottom, #f8fafc, transparent)" }} />

      {/* --- FONDO ATMOSFÉRICO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full relative"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <Image
            src="/images/sedes-bg.jpg" 
            alt="Fondo decorativo"
            fill
            className="object-cover object-center opacity-20" 
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-16">
        
        {/* --- CABECERA --- */}
        <div className="text-center mb-12">
          <BlurFade delay={0.1} inView>
            <h2 className="font-fredoka font-black leading-[1.1] mb-6 text-black" style={{ fontSize: "clamp(2.8rem, 5.5vw, 4rem)" }}>
              <SparklesText sparklesCount={6} className="inline">
                <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                  Tres sedes para
                </AuroraText>
              </SparklesText>
              <br />
              <SparklesText sparklesCount={6} className="inline">
                <AuroraText colors={["#00D1FF", "#4ADE80", "#FACC15"]}>
                  cada etapa
                </AuroraText>
              </SparklesText>
            </h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p className="font-nunito font-extrabold text-[#475569] leading-relaxed mx-auto max-w-[700px]" style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)" }}>
              Cada sede está diseñada para las{" "}
              <HighLight color="#00c3ff22">necesidades específicas</HighLight> de su hijo, brindando el{" "}
              <HighLight color="#ff1f6d15" type="underline">mejor cuidado</HighLight> en cada paso.
            </p>
          </BlurFade>
        </div>

        {/* --- GRID DE SEDES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {sedes.map((sede, i) => (
            <BlurFade key={sede.slug} delay={0.3 + i * 0.1} inView>
              <div className="flex h-full">
                <MagicCard
                  className="flex w-full flex-col overflow-visible rounded-[3rem] border-none shadow-none bg-transparent"
                  gradientColor={sede.color + "15"}
                >
                  <div
                    className="flex flex-col h-full p-8 pt-10 text-center relative"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.7)", 
                      backdropFilter: "blur(10px)",
                      borderRadius: "3rem",
                      border: "1px solid rgba(255,255,255,0.5)",
                      boxShadow: `0 20px 50px -15px ${sede.color}25`,
                    }}
                  >
                    <div className="mb-4">
                      
                      {/* Imagen con altura reducida */}
                      <div className="relative w-full h-24 mx-auto mb-6">
                        <Image src={sede.imagen} alt={sede.titulo} fill className="object-contain" />
                      </div>

                      <h3 className="font-fredoka text-[1.8rem] leading-tight mb-3 flex flex-col justify-center min-h-[4rem]">
                        <span className="block opacity-50 text-[1.1rem] font-black">Winnie Pooh</span>
                        <span style={{ color: sede.color === "#FFFC01" ? "#a39600" : sede.color }}>
                          {sede.subtitulo}
                        </span>
                      </h3>

                      <p className="font-nunito text-[1.05rem] text-[#64748b] font-bold leading-relaxed px-2 mb-4 min-h-[60px] flex items-center justify-center">
                        {sede.descripcion}
                      </p>
                    </div>

                    {/* Lista con menos gap */}
                    <ul className="flex flex-col gap-3 text-left w-full mb-6 min-h-[140px]">
                      {sede.niveles.map((nivel) => (
                        <li key={nivel} className="flex items-start gap-3">
                          <div
                            className="mt-1 flex-shrink-0 w-[22px] h-[22px] rounded-md flex items-center justify-center"
                            style={{ background: sede.color + "20", color: sede.color === "#FFFC01" ? "#857a00" : sede.color }}
                          >
                            <Check size={14} strokeWidth={4} />
                          </div>
                          <span className="font-nunito text-[1rem] font-black text-[#334155]">
                            {nivel}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer del card más pegado al contenido */}
                    <div className="mt-auto pt-6 border-t border-slate-100/50">
                      <p className="font-nunito text-[0.8rem] font-black text-slate-400 mb-4 tracking-wide uppercase flex items-center justify-center gap-2">
                        <span>📍</span> {sede.direccion}
                      </p>

                      <Link
                        href={`/sedes/${sede.slug}`}
                        className={`inline-flex w-full items-center justify-center rounded-2xl text-white font-black transition-all hover:scale-[1.03] active:scale-[0.97] py-3.5 text-[1.1rem] font-nunito ${sede.btnClass}`}
                      >
                        Conocer Sede
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
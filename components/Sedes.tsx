"use client";

import React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";

const sedes = [
  {
    titulo: "Winnie Pooh",
    subtitulo: "Jardín Infantil",
    imagen: "/logos/logo-nuevo.png", 
    color: "#FFB400",
    slug: "jardin",
    niveles: ["Pre-Jardín (3 años)", "Jardín (4 años)"],
    direccion: "Calle 51 #81A - 25",
    // Resaltamos palabras clave con el color de la sede
    descripcion: (
      <>Nuestra sede principal con más de 30 años formando <span className="inline-block" style={{ color: "#FFB400" }}>niños felices</span>.</>
    ),
    btnClass: "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-100",
  },
  {
    titulo: "Winnie Pooh",
    subtitulo: "Baby's",
    imagen: "/logos/babys.jpeg",
    color: "#FF7893",
    slug: "babys",
    niveles: ["Cunas (meses - 1 año)", "Maternal (1 año)", "Párvulos (2 años)"],
    direccion: "Carrera 81 #52 - 58",
    descripcion: (
      <>Atención especializada para los más pequeños con <span className="inline-block" style={{ color: "#FF7893" }}>mucho amor</span>.</>
    ),
    btnClass: "bg-gradient-to-r from-pink-400 to-pink-500 shadow-pink-100",
  },
  {
    titulo: "Winnie Pooh",
    subtitulo: "After Class",
    imagen: "/logos/after-class.png",
    color: "#00C2FF",
    slug: "after-class",
    niveles: ["Cuidado y atención", "Acompañamiento de tareas", "Refuerzo y repasos", "Clases extracurriculares"],
    direccion: "Calle 51 #81A - 25",
    descripcion: (
      <>Apoyo académico con <span className="inline-block" style={{ color: "#00C2FF" }}>seguimiento personalizado</span>.</>
    ),
    btnClass: "bg-gradient-to-r from-blue-400 to-blue-500 shadow-blue-100",
  },
];

export default function Sedes() {
  return (
    <section id="sedes" className="relative bg-white pb-16 overflow-visible">
      <div className="container mx-auto px-4 relative z-20 pt-16">
        
        {/* Cabecera con texto un poco más grande */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <h2 className="font-fredoka font-black leading-[1.1] mb-6 text-black" style={{ fontSize: "clamp(3.2rem, 6vw, 4.5rem)" }}>
              <SparklesText sparklesCount={6} className="inline">
                <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                  Tres sedes para
                </AuroraText>
              </SparklesText>
              <br />
              <AuroraText colors={["#00D1FF", "#4ADE80", "#FACC15"]}>cada etapa</AuroraText>
            </h2>
            <p className="font-nunito font-extrabold text-[#1e293b] max-w-[650px] mx-auto text-xl md:text-2xl leading-relaxed">
                Cada sede está diseñada para las necesidades específicas de su hijo.
            </p>
          </BlurFade>
        </div>

        {/* Grid de Sedes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sedes.map((sede, i) => (
            <BlurFade key={sede.slug} delay={0.3 + i * 0.1} inView>
              <MagicCard
                className="flex w-full flex-col overflow-visible rounded-[3.5rem] border-none shadow-none bg-transparent h-full"
                gradientColor={sede.color + "15"}
              >
                <div
                  className="flex flex-col h-full p-10 pt-12 text-center relative"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.9)", 
                    backdropFilter: "blur(12px)",
                    borderRadius: "3.5rem",
                    border: `3px solid ${sede.color}20`,
                    boxShadow: `0 25px 45px -15px ${sede.color}20`,
                  }}
                >
                  {/* Contenedor de Logo: Altura fija mayor (h-40) y logo más grande (w-48) */}
                  <div className="relative w-full h-40 flex items-center justify-center mb-8">
                    <div className="relative w-48 h-full">
                        <Image 
                            src={sede.imagen} 
                            alt={sede.titulo} 
                            fill 
                            className="object-contain" 
                        />
                    </div>
                  </div>

                  {/* Títulos con letras más grandes */}
                  <div className="mb-5 min-h-[120px] flex flex-col justify-center gap-1">
                    <span className="block text-[1.3rem] font-black font-fredoka uppercase tracking-wider">
                      <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                        Winnie Pooh
                      </AuroraText>
                    </span>
                    <h3 className="font-fredoka text-[2.4rem] leading-tight font-black" style={{ color: sede.color }}>
                      {sede.subtitulo}
                    </h3>
                  </div>

                  {/* Descripción con texto más grande (text-xl) */}
                  <p className="font-nunito text-[1.25rem] text-[#0f172a] font-bold leading-snug mb-10 min-h-[90px] text-center">
                    {sede.descripcion}
                  </p>

                  {/* Lista de Niveles con iconos y texto más grandes */}
                  <ul className="flex flex-col gap-4 text-left w-full mb-10 flex-grow min-h-[180px]">
                    {sede.niveles.map((nivel) => (
                      <li key={nivel} className="flex items-start gap-4">
                        <div
                          className="mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: sede.color + "20", color: sede.color }}
                        >
                          <Check size={14} strokeWidth={4} />
                        </div>
                        <span className="font-nunito text-[1.1rem] font-black text-[#1e293b]">
                          {nivel}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer de la Card */}
                  <div className="mt-auto pt-8 border-t-2 border-slate-100">
                    <p 
                      className="font-nunito text-[0.95rem] font-black mb-6 tracking-tight flex items-center justify-center gap-2 uppercase"
                      style={{ color: sede.color }}
                    >
                      <span className="text-xl">📍</span> {sede.direccion}
                    </p>

                    <Link
                      href={`/sedes/${sede.slug}`}
                      className={`inline-flex w-full items-center justify-center rounded-3xl text-white font-black transition-all hover:scale-[1.03] active:scale-[0.95] py-5 text-xl font-nunito ${sede.btnClass}`}
                    >
                      Conocer Sede
                    </Link>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { SparklesText } from "@/components/ui/sparkles-text";
import { AuroraText } from "@/components/ui/aurora-text";

interface HighLightProps {
  children: React.ReactNode;
  color?: string;
  type?: "box" | "underline";
}

const HighLight = ({ children, color = "#FFB40033", type = "box" }: HighLightProps) => (
  <span style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
    <span style={{
      position: "absolute",
      left: "-2px",
      right: "-2px",
      bottom: type === "underline" ? "4px" : "0",
      height: type === "underline" ? "8px" : "100%",
      backgroundColor: color,
      zIndex: -1,
      borderRadius: type === "underline" ? "0" : "10px",
      transform: "rotate(-1deg)",
    }} />
    {children}
  </span>
);

const misionPuntos = [
  { 
    emoji: "🤝", 
    texto: "Desarrollo Social", 
    descripcion: "Fomentamos la empatía y el compañerismo a través del juego dirigido.",
    color: "#4FF084" 
  },
  { 
    emoji: "❤️", 
    texto: "Desarrollo Afectivo", 
    descripcion: "Ambiente seguro para el manejo saludable de emociones.",
    color: "#FF7893" 
  },
  { 
    emoji: "🏃", 
    texto: "Desarrollo Motriz", 
    descripcion: "Coordinación y expresión corporal con actividades lúdicas.",
    color: "#FFD166" 
  },
  { 
    emoji: "🧠", 
    texto: "Desarrollo Intelectual", 
    descripcion: "Estimulamos curiosidad con exploración constante.",
    color: "#7AC0FF" 
  },
  { 
    emoji: "✨", 
    texto: "Desarrollo Espiritual y Ético", 
    descripcion: "Valores universales de respeto y amor.",
    color: "#EB8100" 
  },
  { 
    emoji: "⭐", 
    texto: "Autoestima y Personalidad", 
    descripcion: "Reconocimiento de identidad y valía.",
    color: "#FF7893" 
  },
];

export default function Nosotros() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <>
      <section id="nosotros" style={{ padding: "120px 20px 60px", backgroundColor: "#fff" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* --- HEADER --- */}
          <BlurFade delay={0.1} inView>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div style={{ 
                  marginBottom: "2rem",
                  fontFamily: "var(--font-fredoka)",
                  fontSize: "clamp(3rem, 7vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: "var(--foreground)",
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.9)",
              }}>
                <SparklesText sparklesCount={10} className="inline">
                  <AuroraText colors={["#FF7893", "#FFD166", "#4FF084", "#7AC0FF", "#EB8100"]}>
                    Nuestra Misión
                  </AuroraText>
                </SparklesText>
              </div>

              <p style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "clamp(1.3rem, 2.8vw, 1.6rem)", 
                color: "#334155", 
                fontWeight: 800,
                lineHeight: 1.5,
                maxWidth: "900px",
                margin: "0 auto",
                textShadow: "0 0 10px rgba(255,255,255,0.8)" 
              }}>
                Más de <HighLight color="#ff1f6d52" type="underline">30 años</HighLight> de experiencia formando niños y niñas 
                con <HighLight color="#00c3ff56" type="underline">amor</HighLight>, dedicación y una visión integral del ser humano 
                enfocados en la <HighLight color="#22c55e56" type="underline">felicidad</HighLight> en Medellín.
              </p>
            </div>
          </BlurFade>

          {/* --- GRID UNIFICADO --- */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", 
            gap: "3rem",
            alignItems: "stretch", // Obliga a ambas tarjetas a tener la misma altura
          }}>

            {/* Tarjeta 1: Misión */}
            <BlurFade delay={0.2} inView style={{ display: 'flex' }}>
              <NeonGradientCard
                className="w-full"
                borderSize={4}
                neonColors={{ firstColor: "#FF7893", secondColor: "#7AC0FF" }}
              >
                <div style={{ padding: "2.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", justifyContent: "center" }}>
                    <h3 style={{
                      fontFamily: "var(--font-fredoka)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#FF7893",
                    }}>
                      Propósito
                    </h3>
                  </div>

                  <p style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "1.15rem",
                    color: "var(--muted-foreground)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                    textAlign: "center",
                  }}>
                    Somos el comienzo de una vida plena para sus hijos. +30 años de amor y dedicación a nuestros pequeños
                  </p>

                  {/* Contenedor de ítems compactos */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {misionPuntos.map((punto, i) => {
                      const isOpen = expandedIndex === i;
                      return (
                        <motion.div
                          key={i}
                          layout
                          transition={{ layout: { duration: 0.3, type: "spring", bounce: 0.1 } }}
                          onClick={() => setExpandedIndex(isOpen ? null : i)}
                          style={{
                            background: punto.color + "18",
                            borderRadius: "1rem",
                            padding: "0.8rem 1.25rem",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{punto.emoji}</span>
                            <span style={{
                              fontFamily: "var(--font-nunito)",
                              fontSize: "1.1rem",
                              fontWeight: 700,
                              color: "var(--foreground)",
                            }}>
                              {punto.texto}
                            </span>
                            <motion.div 
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              style={{ marginLeft: "auto", fontSize: "0.8rem", color: punto.color }}
                            >
                              ▼
                            </motion.div>
                          </div>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                style={{ overflow: "hidden" }}
                              >
                                <p style={{
                                  fontFamily: "var(--font-nunito)",
                                  fontSize: "1rem",
                                  color: "#475569",
                                  lineHeight: 1.5,
                                }}>
                                  {punto.descripcion}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </NeonGradientCard>
            </BlurFade>

            {/* Tarjeta 2: Calendario */}
            <BlurFade delay={0.3} inView style={{ display: 'flex' }}>
              <NeonGradientCard
                className="w-full"
                borderSize={4}
                neonColors={{ firstColor: "#FFD166", secondColor: "#4FF084" }}
              >
                <div style={{ 
                  padding: "2.5rem", 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", justifyContent: "center" }}>
                    <h3 style={{
                      fontFamily: "var(--font-fredoka)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#EB8100",
                    }}>
                      Calendario
                    </h3>
                  </div>

                  {/* Ítems con saltos de línea para ocupar 2 renglones */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {[
                      { emoji: "📆", texto: <>Periodo anual de 11 meses:<br />15 Enero al 15 Diciembre</> },
                      { emoji: "🏖️", texto: <>Receso: Semana Santa y<br />2 semanas a mitad de año</> },
                      { emoji: "✅", texto: <>Octubre se labora normal —<br />No desescolarizamos</> },
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.2rem",
                        paddingBottom: "1rem",
                        borderBottom: "1px solid #f1f5f9",
                      }}>
                        <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{item.emoji}</span>
                        <span style={{
                          fontFamily: "var(--font-nunito)",
                          fontSize: "1.1rem",
                          color: "var(--foreground)",
                          fontWeight: 700,
                          lineHeight: "1.3",
                          textAlign: "center",
                        }}>
                          {item.texto}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Horarios (Empuja hacia abajo) */}
                  <div style={{
                    marginTop: "auto", 
                    paddingTop: "3rem" 
                  }}>
                    <div style={{
                      background: "linear-gradient(135deg, #FFD16615, #EB810015)",
                      borderRadius: "1.5rem",
                      padding: "1.5rem",
                      border: "2px solid #FFD16644",
                    }}>
                      <p style={{
                        fontFamily: "var(--font-fredoka)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#00C2FF",
                        marginBottom: "1.2rem",
                      }}>
                        🕐 Horarios disponibles
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                        {[
                          { j: "Mañana", h: "8am–12pm", c: "#7AC0FF" },
                          { j: "Tarde", h: "1pm–5pm", c: "#4FF084" },
                          { j: "Completo", h: "7am–5pm", c: "#FF7893" },
                        ].map((h, i) => (
                          <div key={i} style={{
                            display: "flex", justifyContent: "space-between",
                            background: "#fff", borderRadius: "1rem", padding: "0.8rem 1.2rem",
                          }}>
                            <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1rem" }}>{h.j}</span>
                            <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 900, fontSize: "1rem", color: h.c }}>{h.h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </NeonGradientCard>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* --- TRANSICIÓN HACIA SEDES --- */}
<div style={{
  position: "relative",
  height: "200px",
  width: "100%",
  overflow: "hidden",
  pointerEvents: "none",
  marginBottom: "-2px",
}}>
  <div style={{
    position: "absolute",
    inset: 0,
    maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
    opacity: 0.4,
  }}>
    <Image src="/images/sedes-bg.jpg" alt="" fill style={{ objectFit: "cover" }} />
  </div>
  <div style={{
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.0) 100%)",
  }} />
</div>
    </>
  );
}
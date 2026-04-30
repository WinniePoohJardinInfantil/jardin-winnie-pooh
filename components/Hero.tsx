"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";

// Asumiendo que tienes un componente similar al de Magic UI o usas uno custom
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
      borderRadius: type === "underline" ? "0" : "8px",
      transform: "rotate(-1deg)",
    }} />
    {children}
  </span>
);

const stats = [
  { value: 30, label: "Años de experiencia", src: "/images/winnie-estrellas.webp", color: "#FF1F6D" },
  { value: 3, label: "Sedes en Medellín", src: "/images/tigger-cafe.webp", color: "#FFB400" },
  { value: 7, label: "Idiomas", src: "/images/winnie-guino.webp", color: "#00C2FF" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 20px 150px",
        overflow: "hidden",
        backgroundColor: "#fff"
      }}
    >
      {/* --- FONDO CON MÁSCARA --- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
        }}>
          <Image
            src="/images/hero-bg.png" 
            alt="Winnie Pooh Jardin Infantil y Guarderia - Portada"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.0) 100%)", 
        }} />
      </div>

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "950px", 
        textAlign: "center",
      }}>
        
        {/* --- TÍTULO GIGANTE --- */}
        <BlurFade delay={0.2} inView>
          <div style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: "clamp(3.5rem, 8vw, 6rem)", 
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "2rem",
            textShadow: "0 0 20px rgba(255, 255, 255, 1)",
          }}>
            <SparklesText sparklesCount={10} className="inline">
              <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                Somos el Comienzo de
              </AuroraText>
            </SparklesText>
            <br />
            <SparklesText sparklesCount={12} className="inline">
              <AuroraText colors={["#00D1FF", "#FF2E63", "#4ADE80", "#60A5FA", "#FACC15"]}>
                una vida plena
              </AuroraText>
            </SparklesText>
            <br />
            <SparklesText sparklesCount={10} className="inline">
              <AuroraText colors={["#2563EB", "#059669", "#D97706", "#DB2777", "#4ADE80"]}>
                para tus hijos
              </AuroraText>
            </SparklesText>
          </div>
        </BlurFade>

        {/* --- DESCRIPCIÓN CON HIGHLIGHTS --- */}
        <BlurFade delay={0.3} inView>
          <p style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
            color: "#334155", 
            fontWeight: 800,
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto 3rem",
            textShadow: "0 0 10px rgba(255,255,255,0.8)" 
          }}>
            Guardería y Jardín infantil con atención integral, programas en{" "}
            <HighLight color="#00c3ff56">7 idiomas</HighLight>, enfocados en el{" "}
            <HighLight color="#22c55e56" type="underline">aprendizaje</HighLight> y la{" "}
            <HighLight color="#ff1f6d52" type="underline">felicidad de tu hijo</HighLight>!
          </p>
        </BlurFade>

        {/* --- BOTONES --- */}
        <BlurFade delay={0.4} inView>
  <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "4rem", flexWrap: "wrap" }}>
    
    {/* Botón de Matrícula (puedes apuntarlo a contacto o un formulario) */}
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <a href="#contacto" style={{ textDecoration: 'none' }}>
        <button style={{
          background: "#00C2FF",
          color: "white",
          fontFamily: "var(--font-nunito)",
          fontWeight: 900,
          fontSize: "1.2rem",
          padding: "0 2rem",
          height: "60px",
          borderRadius: "999px",
          border: "none",
          boxShadow: "0 10px 20px rgba(0, 194, 255, 0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          ¡Matricula a tu Hijo!
        </button>
      </a>
    </motion.div>

    {/* Botón que redirige a SEDES */}
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <a href="#sedes" style={{ textDecoration: 'none' }}>
        <button style={{
          background: "#FF1F6D",
          color: "white",
          fontFamily: "var(--font-nunito)",
          fontWeight: 900,
          fontSize: "1.2rem",
          padding: "0 2rem",
          height: "60px",
          borderRadius: "999px",
          border: "none",
          boxShadow: "0 10px 20px rgba(255, 31, 109, 0.3)",
          cursor: "pointer"
        }}>
          Ver Nuestras Sedes
        </button>
      </a>
    </motion.div>
  </div>
</BlurFade>
        {/* --- STATS --- */}
        <BlurFade delay={0.5} inView>
  <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        whileHover={{ y: -10, scale: 1.05 }}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          border: `3px solid ${stat.color}33`,
          borderRadius: "2.5rem", 
          // Aumentamos el tamaño del contenedor para dar aire a la letra más grande
          width: "220px", 
          height: "200px", 
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          boxShadow: `0 15px 35px ${stat.color}15`, 
          backdropFilter: "blur(10px)",
          padding: "1rem"
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          style={{ width: "70px", height: "70px", position: "relative", marginBottom: "10px" }}
        >
          <Image src={stat.src} alt={stat.label} fill style={{ objectFit: "contain" }} />
        </motion.div>

        {/* NÚMERO: Subimos de 2.3rem a 3.2rem */}
        <div style={{ 
          fontFamily: "var(--font-fredoka)", 
          fontSize: "3.2rem", 
          fontWeight: 900, 
          color: stat.color, 
          lineHeight: 1 
        }}>
          <NumberTicker value={stat.value} />
        </div>

        {/* ETIQUETA: Subimos de 0.85rem a 1.1rem */}
        <span style={{ 
          fontFamily: "var(--font-nunito)", 
          fontSize: "1.1rem", 
          color: stat.color, 
          fontWeight: 800, 
          marginTop: "8px",
          textAlign: "center"
        }}>
          {stat.label}
        </span>
      </motion.div>
    ))}
  </div>
</BlurFade>
      </div>
    </section>
  );
}
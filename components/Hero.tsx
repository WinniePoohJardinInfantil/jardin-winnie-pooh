"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Importamos el componente de optimización
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { CoolMode } from "@/components/ui/cool-mode";
import { Confetti } from "@/components/ui/confetti";

// Interfaces para TypeScript (Sin 'any')
interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
}

interface ConfettiRef {
  fire: (options?: ConfettiOptions) => void;
}

const stats = [
  { value: 29, label: "Años de experiencia", emoji: "🏆", color: "#FFFC01" },
  { value: 3, label: "Sedes en Medellín", emoji: "📍", color: "#FF7893" },
  { value: 7, label: "Idiomas", emoji: "🌍", color: "#7AC0FF" },
];

const leftPhotos = [
  { src: "/images/clases.webp", alt: "Niños en jardín infantil", rotate: "-6deg" },
  { src: "/images/diadepayasos.jpg", alt: "Día de payasos", rotate: "5deg" },
];

const rightPhotos = [
  { src: "/images/salidadecampo.jpg", alt: "Salida de campo", rotate: "6deg" },
  { src: "/images/navidad1.webp", alt: "Navidad jardín", rotate: "-5deg" },
];

export default function Hero() {
  const confettiRef = useRef<ConfettiRef>(null);

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 40px",
        overflow: "hidden", 
      }}
    >
      <span className="sr-only">Jardín Infantil Winnie Pooh Medellín</span>

      {/* --- FONDO (BLOBS) --- */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 700, height: 700, top: -250, left: -250, borderRadius: "50%", background: "#FF789312", filter: "blur(120px)" }} />
        <div style={{ position: "absolute", width: 600, height: 600, bottom: -200, right: -150, borderRadius: "50%", background: "#7AC0FF12", filter: "blur(120px)" }} />
      </div>

      {/* --- LADO IZQUIERDO (TAMAÑO XL) --- */}
      <div className="hidden xl:block" style={{ position: "absolute", left: "40px", top: 0, bottom: 0, width: "320px", zIndex: 5, pointerEvents: "none" }}>
        
        {/* Foto Superior Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
          transition={{ duration: 0.8, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          style={{ position: "absolute", top: "12%", left: "0", rotate: leftPhotos[0].rotate }}
        >
          <div style={{ width: "280px", height: "210px", borderRadius: "2rem", border: "5px solid white", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", overflow: "hidden", position: "relative" }}>
            <Image src={leftPhotos[0].src} alt={leftPhotos[0].alt} fill style={{ objectFit: "cover" }} priority />
          </div>
        </motion.div>

        {/* Sticker Winnie Superior */}
        <motion.div 
          animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{ position: "absolute", top: "5%", left: "180px", width: "150px", height: "150px", zIndex: 6 }}
        >
          <Image src="/images/winnie-baile.webp" alt="Winnie Sticker" fill style={{ objectFit: "contain" }} />
        </motion.div>

        {/* Foto Inferior Izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
          transition={{ duration: 0.8, delay: 0.2, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          style={{ position: "absolute", bottom: "12%", left: "10px", rotate: leftPhotos[1].rotate }}
        >
          <div style={{ width: "260px", height: "195px", borderRadius: "2rem", border: "5px solid white", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", overflow: "hidden", position: "relative" }}>
            <Image src={leftPhotos[1].src} alt={leftPhotos[1].alt} fill style={{ objectFit: "cover" }} />
          </div>
        </motion.div>

        {/* Sticker Winnie Guiño */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ position: "absolute", bottom: "5%", left: "200px", width: "130px", height: "130px", zIndex: 6 }}
        >
          <Image src="/images/winnie-guino.webp" alt="Winnie Sticker" fill style={{ objectFit: "contain" }} />
        </motion.div>
      </div>

      {/* --- LADO DERECHO (TAMAÑO XL) --- */}
      <div className="hidden xl:block" style={{ position: "absolute", right: "40px", top: 0, bottom: 0, width: "320px", zIndex: 5, pointerEvents: "none" }}>
        
        {/* Foto Superior Derecha */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0, y: [0, 18, 0] }}
          transition={{ duration: 0.8, delay: 0.1, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          style={{ position: "absolute", top: "12%", right: "0", rotate: rightPhotos[0].rotate }}
        >
          <div style={{ width: "280px", height: "210px", borderRadius: "2rem", border: "5px solid white", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", overflow: "hidden", position: "relative" }}>
            <Image src={rightPhotos[0].src} alt={rightPhotos[0].alt} fill style={{ objectFit: "cover" }} priority />
          </div>
        </motion.div>

        {/* Sticker Tigger */}
        <motion.div 
          animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
          style={{ position: "absolute", top: "4%", right: "200px", width: "140px", height: "140px", zIndex: 6 }}
        >
          <Image src="/images/tigger-cafe.webp" alt="Tigger Sticker" fill style={{ objectFit: "contain" }} />
        </motion.div>

        {/* Foto Inferior Derecha */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0, y: [0, -18, 0] }}
          transition={{ duration: 0.8, delay: 0.3, y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
          style={{ position: "absolute", bottom: "12%", right: "10px", rotate: rightPhotos[1].rotate }}
        >
          <div style={{ width: "270px", height: "200px", borderRadius: "2rem", border: "5px solid white", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", overflow: "hidden", position: "relative" }}>
            <Image src={rightPhotos[1].src} alt={rightPhotos[1].alt} fill style={{ objectFit: "cover" }} />
          </div>
        </motion.div>

        {/* Sticker Piggy */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ position: "absolute", bottom: "5%", right: "210px", width: "125px", height: "125px", zIndex: 6 }}
        >
          <Image src="/images/winnie-piggy.webp" alt="Piglet Sticker" fill style={{ objectFit: "contain" }} />
        </motion.div>
      </div>

      {/* --- BLOQUE CENTRAL --- */}
      <div style={{ flex: 1, maxWidth: "680px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <BlurFade delay={0.1} inView>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "linear-gradient(90deg, #FFFC0144, #4FF08433)",
            border: "1px solid #FFFC0188", color: "#7a6000",
            fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "0.9rem",
            padding: "0.6rem 1.5rem", borderRadius: "999px", marginBottom: "2rem",
          }}>
            🌟 Jardín infantil en Medellín · 29 años de experiencia
          </span>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 style={{
            fontFamily: "var(--font-fredoka)", fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 800, lineHeight: 0.95, color: "#1a1a1a", marginBottom: "1.5rem",
          }}>
            Somos el comienzo de{" "}
            <AuroraText colors={["#00f7ff", "#ff4167", "#3cff01", "#7AC0FF", "#4FF084"]}>
              una vida plena
            </AuroraText>{" "}
            para sus hijos
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p style={{
            fontFamily: "var(--font-nunito)", fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
            color: "#555", lineHeight: 1.6, maxWidth: "550px", margin: "0 auto 3rem",
          }}>
            Guardería y jardín infantil en Medellín con atención integral, estimulación temprana y programas en 7 idiomas.
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center", marginBottom: "4rem" }}>
            <Confetti
              ref={confettiRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              options={{ particleCount: 150, spread: 130, origin: { y: 0.5 } }}
            />
            <CoolMode>
              <div onClick={() => confettiRef.current?.fire()}>
                <RainbowButton
                  style={{
                    fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.2rem",
                    height: "64px", padding: "0 3rem", color: "#ffffff", borderRadius: "999px"
                  }}
                  onClick={() => setTimeout(() => (window.location.href = "#contacto"), 500)}
                >
                  🎉 ¡Matricule a su hijo!
                </RainbowButton>
              </div>
            </CoolMode>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -8, scale: 1.05 }}
                style={{
                  background: "#fff", border: "2px solid #f3f4f6",
                  borderRadius: "1.5rem", width: "160px", height: "140px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", 
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <span style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{stat.emoji}</span>
                <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "2.2rem", fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                  <NumberTicker value={stat.value} />
                </div>
                <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "#6b7280", fontWeight: 800, marginTop: "6px" }}>
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
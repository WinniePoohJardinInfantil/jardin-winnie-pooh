"use client";

import { motion } from "framer-motion";
import LottieAnimation from "@/components/LottieAnimation";
import winnieHoney from "@/public/animations/winnie-honey.json";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraText } from "@/components/ui/aurora-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Confetti } from "@/components/ui/confetti";
import { useRef } from "react";
import Image from "next/image"; // 1. Importación necesaria

const animationData = winnieHoney as unknown as Record<string, unknown>;

const stats = [
  { value: 29, label: "Años de experiencia", emoji: "🏆", color: "var(--color-yellow)" },
  { value: 3, label: "Sedes en Medellín", emoji: "📍", color: "var(--color-pink)" },
  { value: 7, label: "Idiomas", emoji: "🌍", color: "var(--color-blue)" },
];

const leftImages = [
  { src: "/images/navidad1.webp", alt: "Navidad" },
  { src: "/images/juegos-de-pelotas.webp", alt: "Juegos" },
];
const rightImages = [
  { src: "/images/papelitos.webp", alt: "Juego de Recortes" },
  { src: "/images/diadepayasos.jpg", alt: "Dia de Payasos" },
];

export default function Hero() {
  const confettiRef = useRef<{ fire: (opts?: object) => void }>(null);

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "5rem",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
        border: "none",        // <--- Forzamos que no haya bordes
        boxShadow: "none",
      }}
    >
      {/* Fondo decorativo */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { size: 500, top: "-150px", left: "-150px", color: "#FF789322" },
          { size: 350, bottom: "-100px", right: "-100px", color: "#7AC0FF22" },
          { size: 250, top: "40%", right: "8%", color: "#4FF08422" },
          { size: 180, top: "15%", left: "8%", color: "#FFFC0133" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            width: b.size, height: b.size,
            borderRadius: "50%",
            background: b.color,
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            filter: "blur(60px)",
          }} />
        ))}
      </div>

      {/* Imágenes laterales izquierda */}
      <div
        className="hidden lg:flex"
        style={{
          position: "absolute",
          left: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 1,
        }}
      >
        {leftImages.map((img, i) => (
          <BlurFade key={i} delay={0.4 + i * 0.15} inView>
            <div style={{
              width: "160px",
              height: "120px",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "3px solid #fff",
              transform: i % 2 === 0 ? "rotate(-3deg)" : "rotate(2deg)",
              background: i === 0 ? "#FF789333" : "#7AC0FF33",
              position: "relative" // Necesario para next/image con fill
            }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.display = "none";
                  const parent = target.parentElement!;
                  parent.style.display = "flex";
                  parent.style.alignItems = "center";
                  parent.style.justifyContent = "center";
                  parent.style.fontSize = "3rem";
                  parent.innerHTML = i === 0 ? "🎨" : "🌟";
                }}
              />
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Imágenes laterales derecha */}
      <div
        className="hidden lg:flex"
        style={{
          position: "absolute",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 1,
        }}
      >
        {rightImages.map((img, i) => (
          <BlurFade key={i} delay={0.5 + i * 0.15} inView>
            <div style={{
              width: "160px",
              height: "120px",
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "3px solid #fff",
              transform: i % 2 === 0 ? "rotate(3deg)" : "rotate(-2deg)",
              background: i === 0 ? "#4FF08433" : "#FFFC0133",
              position: "relative" // Necesario para next/image con fill
            }}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
                onError={(e) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.display = "none";
                  const parent = target.parentElement!;
                  parent.style.display = "flex";
                  parent.style.alignItems = "center";
                  parent.style.justifyContent = "center";
                  parent.style.fontSize = "3rem";
                  parent.innerHTML = i === 0 ? "🤸" : "📚";
                }}
              />
            </div>
          </BlurFade>
        ))}
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}
        >
          <LottieAnimation
            animationData={animationData}
            className="w-full max-w-[220px] md:max-w-[300px]"
            style={{ backgroundColor: "transparent" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: "1.25rem" }}
        >
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "linear-gradient(90deg, #FFFC0144, #4FF08433)",
            border: "1px solid #FFFC0188",
            color: "#7a6000",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.82rem",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
          }}>
            🌟 29 años formando niños felices en Medellín
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            color: "var(--foreground)",
          }}>
            Somos el comienzo de{" "}
            <AuroraText colors={["#FF7893", "#EB8100", "#FFFC01", "#4FF084", "#7AC0FF"]}>
              una vida plena
            </AuroraText>
            <br />
            para sus hijos 🐝
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "var(--muted-foreground)",
            maxWidth: "520px",
            margin: "0 auto 2rem",
            lineHeight: 1.75,
          }}
        >
          Atención integral con amor, dedicación y experiencia. Tres sedes en Medellín para acompañar cada etapa de su pequeño.
        </motion.p>

        {/* CTAs */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  style={{ 
    display: "flex", 
    gap: "1.5rem", // Aumenté un poco el espacio entre ellos
    justifyContent: "center", 
    flexWrap: "wrap", 
    marginBottom: "3.5rem", 
    position: "relative",
    alignItems: "stretch" // Fuerza a que ambos tengan la misma altura
  }}
>
  <Confetti
    ref={confettiRef}
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    options={{ particleCount: 120, spread: 100, origin: { y: 0.5 } }}
  />
  
  <div onClick={() => confettiRef.current?.fire()} style={{ display: "flex" }}>
    <RainbowButton
      style={{
        fontFamily: "var(--font-nunito)",
        fontWeight: 800,
        fontSize: "1rem",
        height: "56px",       // Altura fija para igualar
        width: "240px",        // Ancho fijo igualado
        color: "#ffffff",
        border: "#ffffff",        // Elimina el borde negro
        padding: "0",          // Limpia el padding interno
        display: "flex",
        alignItems: "center",
        justifyContent: "center",    // Elimina sombras que parecen líneas
      }}
      onClick={() => setTimeout(() => window.location.href = "#contacto", 400)}
    >
      🎉 ¡Matricula a tu niño!
    </RainbowButton>
  </div>

  <a
    href="#sedes"
    style={{
      background: "transparent",
      color: "var(--foreground)",
      fontFamily: "var(--font-nunito)",
      fontWeight: 700,
      fontSize: "1rem",
      height: "56px",          // Mismísima altura que el otro
      width: "240px",          // Mismísimo ancho que el otro
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "999px",   // Redondeado perfecto
      textDecoration: "none",
      border: "2px solid var(--border)",
      transition: "all 0.2s ease",
      boxSizing: "border-box"  // Asegura que el borde no sume tamaño extra
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--color-blue)";
      e.currentTarget.style.background = "#ffffff";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.background = "transparent";
    }}
  >
    Ver nuestras sedes
  </a>
</motion.div>
        {/* Stats (Tamaño unificado) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{
              background: "#fff",
              border: "2px solid var(--border)",
              borderRadius: "1.25rem",
              padding: "1.5rem 1rem",  // Aumentado el padding vertical
              textAlign: "center",
              width: "180px",          // Ancho fijo para que los 3 sean iguales
              height: "160px",         // Altura fija para alineación perfecta
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
              <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "2.25rem", fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                <NumberTicker value={stat.value} />
              </div>
              <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "var(--muted-foreground)", fontWeight: 600, marginTop: "0.5rem" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
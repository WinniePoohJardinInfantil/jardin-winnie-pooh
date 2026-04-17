"use client";

import { motion } from "framer-motion";
import LottieAnimation from "@/components/LottieAnimation";
import winnieHoney from "@/public/animations/winnie-honey.json";

// Tipado seguro para evitar el error 'any' de ESLint
const animationData = winnieHoney as unknown as Record<string, unknown>;

export default function Hero() {
  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: "6rem",
        background: "linear-gradient(160deg, #fffdf7 0%, #fff8e7 50%, #ffeedd 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Burbujas decorativas */}
      {[
        { size: 300, top: "-80px", left: "-80px", color: "#ffd97d33" },
        { size: 200, bottom: "-60px", right: "-40px", color: "#ff6b6b22" },
        { size: 150, top: "30%", right: "5%", color: "#4ecdc422" },
        { size: 100, top: "20%", left: "5%", color: "#c084fc22" },
      ].map((bubble, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            background: bubble.color,
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            bottom: bubble.bottom,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        
        {/* Animación de Winnie Pooh con efecto de entrada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "-2.5rem" }}
        >
          <LottieAnimation 
  animationData={animationData} 
  className="w-full max-w-[280px] md:max-w-[380px]" 
  style={{ 
    filter: "drop-shadow(0px 0px 0px transparent)", // Limpia residuos
    backgroundColor: "transparent" 
  }} 
/>
        </motion.div>

        {/* Badge Informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span
            style={{
              display: "inline-block",
              background: "var(--color-honey-light)",
              color: "#7a4f00",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
            }}
          >
            🌟 29 años formando niños felices
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "1.5rem",
            lineHeight: 1.15,
          }}
        >
          Somos el comienzo de <span style={{ color: "var(--color-honey)" }}>una vida plena</span>
          <br />
          para sus hijos 🐝
        </motion.h1>

        {/* Subtítulo Descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--color-text-muted)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Atención integral con amor, dedicación y 29 años de experiencia en Medellín.
          Acompañamos cada etapa de su pequeño con calidez humana.
        </motion.p>

        {/* Botones de Acción (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#contacto"
            style={{
              background: "var(--color-honey)",
              color: "#fff",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.85rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 20px #f5a62344",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px #f5a62366";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px #f5a62344";
            }}
          >
            Contáctenos
          </a>
          
          <a
            href="#sedes"
            style={{
              background: "transparent",
              color: "var(--color-text)",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.85rem 2rem",
              borderRadius: "999px",
              textDecoration: "none",
              border: "2px solid var(--color-border)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-honey)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
          >
            Ver nuestras sedes
          </a>
        </motion.div>

        {/* Sección de Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "4rem",
          }}
        >
          {[
            { value: "29", label: "Años de experiencia", emoji: "🏆" },
            { value: "3", label: "Sedes en Medellín", emoji: "📍" },
            { value: "7", label: "Idiomas", emoji: "🌍" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "1.2rem 2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                textAlign: "center",
                minWidth: "160px",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.2rem" }}>{stat.emoji}</div>
              <div
                style={{
                  fontFamily: "var(--font-fredoka)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--color-honey)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
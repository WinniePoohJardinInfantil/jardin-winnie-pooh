"use client";

import { Marquee } from "@/components/ui/marquee";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Star as StarIcon } from "lucide-react";

const resenas = [
  {
    nombre: "María López",
    rol: "Mamá de Valentina · Medellín",
    resena: "Mi hija lleva 3 años en el jardín y cada día llega feliz a casa. El nivel de atención y cariño que le dan es incomparable.",
    color: "#FF7893", // Rosado
  },
  {
    nombre: "Juan Pérez",
    rol: "Papá de Matías · Medellín",
    resena: "Desde el primer día nos sentimos en familia. El equipo es muy profesional y los niños aprenden jugando.",
    color: "#7AC0FF", // Azul
  },
  {
    nombre: "Andrea Gómez",
    rol: "Mamá de Luciana · Medellín",
    resena: "Lo del programa políglota es increíble. Mi hija de 4 años ya cuenta en inglés y en mandarín. ¡No lo podía creer!",
    color: "#7E3AF2", // Morado (Añadido)
  },
  {
    nombre: "Carlos Restrepo",
    rol: "Papá de Emilio · Medellín",
    resena: "El After Class es una maravilla. Mis hijos llegan, hacen las tareas y además tienen actividades. No podría pedir más.",
    color: "#FFFC01", // Amarillo
  },
  {
    nombre: "Paola Martínez",
    rol: "Mamá de Isabella · Medellín",
    resena: "30 años de experiencia se notan en cada detalle. Los profes son pacientes, amorosos y muy comprometidos.",
    color: "#4FF084", // Verde
  },
  {
    nombre: "Ricardo Sánchez",
    rol: "Papá de Tomás · Medellín",
    resena: "La sede Baby's es perfecta para los más pequeños. Mi hijo empezó desde los 6 meses y el desarrollo ha sido notable.",
    color: "#7AC0FF",
  },
  {
    nombre: "Catalina Torres",
    rol: "Mamá de Sofía · Medellín",
    resena: "Siempre están informando sobre el progreso de los niños. La comunicación con los papás es constante y transparente.",
    color: "#7E3AF2", // Morado (Añadido)
  },
  {
    nombre: "Felipe Herrera",
    rol: "Papá de Samuel · Medellín",
    resena: "Las actividades y salidas pedagógicas son fabulosas. Mi hijo aprende muchísimo y siempre llega emocionado.",
    color: "#EB8100", // Naranja
  },
];

const withAlpha = (hex: string, alpha: string) => `${hex}${alpha}`;

const ResenaCard = ({ nombre, rol, resena, color }: typeof resenas[0]) => (
  <div className="relative mx-3 flex-shrink-0 group" style={{ width: "300px" }}>
    <div
      className="absolute -inset-[1px] rounded-2xl opacity-100 transition-all duration-500 group-hover:opacity-100"
      style={{
        background: `linear-gradient(135deg, ${withAlpha(color, "F2")}, ${withAlpha(color, "8A")})`,
        filter: "blur(6px)",
        borderRadius: "1rem",
      }}
    />

    <div
      className="transition-all duration-300 group-hover:-translate-y-1"
      style={{
        position: "relative",
        borderRadius: "1rem",
        background: "#fff",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        minHeight: "242px",
        border: `1.5px solid ${withAlpha(color, "55")}`,
        boxShadow: `0 12px 28px ${withAlpha(color, "20")}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "1.5rem",
          right: "1.5rem",
          height: "3px",
          borderRadius: "999px",
          background: `linear-gradient(90deg, ${color}, ${withAlpha(color, "88")})`,
        }}
      />

      <div style={{ display: "flex", gap: "0.2rem", marginTop: "0.5rem" }}>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={14} style={{ color, fill: color }} />
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-nunito)",
          fontSize: "0.875rem",
          color: "#555",
          lineHeight: 1.65,
          fontStyle: "italic",
          minHeight: "112px",
        }}
      >
        &ldquo;{resena}&rdquo;
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: `1px solid ${withAlpha(color, "24")}`,
        }}
      >
        <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.875rem", color: "#1a1a1a" }}>
          {nombre}
        </p>
        <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.75rem", color: "#999", marginTop: "0.1rem" }}>
          {rol}
        </p>
      </div>
    </div>
  </div>
);

export default function Resenas() {
  return (
    <section
      id="resenas"
      style={{ background: "#fff", padding: "100px 0", overflow: "hidden" }}
    >
      <div className="container" style={{ marginBottom: "4rem", position: "relative", zIndex: 10 }}>
        {/* --- ENCABEZADO ESTILO HERO --- */}
        <BlurFade delay={0.2} inView>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              <SparklesText sparklesCount={8} className="inline">
                <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                  Lo que dicen
                </AuroraText>
              </SparklesText>
              <br />
              <SparklesText sparklesCount={10} className="inline">
                <AuroraText colors={["#00D1FF", "#FF2E63", "#4ADE80", "#60A5FA", "#FACC15"]}>
                  nuestras familias
                </AuroraText>
              </SparklesText>
            </div>

            <p style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "#334155", 
              fontWeight: 800,
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto",
              textShadow: "0 0 10px rgba(255,255,255,0.8)" 
            }}>
              Más de 30 años construyendo confianza con cientos de familias que han hecho parte de nuestra historia en Medellín.
            </p>
          </div>
        </BlurFade>
      </div>

      {/* --- MARQUEE --- */}
      <div style={{ position: "relative" }}>
        <Marquee pauseOnHover className="[--duration:40s]">
          {resenas.map((r, i) => (
            <ResenaCard key={`${r.nombre}-${i}`} {...r} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:35s] mt-8">
          {resenas.slice().reverse().map((r, i) => (
            <ResenaCard key={`rev-${r.nombre}-${i}`} {...r} />
          ))}
        </Marquee>
      </div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  style={{ 
    textAlign: "center", 
    marginTop: "5rem", // Un poco más de aire
    padding: "10px" 
  }}
>
  <a 
    href="https://www.google.com/search?q=Guarder%C3%ADa+Winnie+Pooh+Opiniones"
    target="_blank"
    rel="noopener noreferrer"
    className="group"
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2px", // Grosor del borde animado
      borderRadius: "999px",
      textDecoration: "none",
      background: "linear-gradient(90deg, #FF1F6D, #FFB400, #7E3AF2, #00C2FF, #FF1F6D)",
      backgroundSize: "300% 100%",
      animation: "borderRotate 4s linear infinite", // Animación de rotación de color
    }}
  >
    {/* El botón real encima del borde */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      background: "#fff",
      borderRadius: "999px",
      padding: "1rem 2.8rem",
      fontFamily: "var(--font-nunito)",
      fontWeight: 900,
      fontSize: "1.1rem",
      color: "#1a1a1a",
      transition: "all 0.3s ease",
      position: "relative",
      zIndex: 2
    }}>
      <span style={{ fontSize: "1.3rem" }}>⭐</span>
      Compártenos tu reseña en Google
      
      {/* Reflejo de brillo interno al pasar el mouse */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite"
        }} 
      />
    </div>

    {/* Efecto de resplandor (Glow) detrás del botón */}
    <div style={{
      position: "absolute",
      inset: "-5px",
      background: "inherit",
      borderRadius: "999px",
      filter: "blur(15px)",
      opacity: 0.4,
      zIndex: 1
    }} />
  </a>

  {/* Estilos CSS necesarios para las animaciones del botón */}
  <style jsx>{`
    @keyframes borderRotate {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
</motion.div>
    </section>
  );
}
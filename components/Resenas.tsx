"use client";

import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const resenas = [
  {
    nombre: "María López",
    rol: "Mamá de Valentina · Medellín",
    resena: "Mi hija lleva 3 años en el jardín y cada día llega feliz a casa. El nivel de atención y cariño que le dan es incomparable.",
    color: "#FF7893",
  },
  {
    nombre: "Juan Pérez",
    rol: "Papá de Matías · Medellín",
    resena: "Desde el primer día nos sentimos en familia. El equipo es muy profesional y los niños aprenden jugando.",
    color: "#7AC0FF",
  },
  {
    nombre: "Andrea Gómez",
    rol: "Mamá de Luciana · Medellín",
    resena: "Lo del programa políglota es increíble. Mi hija de 4 años ya cuenta en inglés y en mandarín. ¡No lo podía creer!",
    color: "#4FF084",
  },
  {
    nombre: "Carlos Restrepo",
    rol: "Papá de Emilio · Medellín",
    resena: "El After Class es una maravilla. Mis hijos llegan, hacen las tareas y además tienen actividades. No podría pedir más.",
    color: "#FFFC01",
  },
  {
    nombre: "Paola Martínez",
    rol: "Mamá de Isabella · Medellín",
    resena: "29 años de experiencia se notan en cada detalle. Los profes son pacientes, amorosos y muy comprometidos.",
    color: "#FF7893",
  },
  {
    nombre: "Ricardo Sánchez",
    rol: "Papá de Tomás · Medellín",
    resena: "La sede Babies es perfecta para los más pequeños. Mi hijo empezó desde los 6 meses y el desarrollo ha sido notable.",
    color: "#7AC0FF",
  },
  {
    nombre: "Catalina Torres",
    rol: "Mamá de Sofía · Medellín",
    resena: "Siempre están informando sobre el progreso de los niños. La comunicación con los papás es constante y transparente.",
    color: "#4FF084",
  },
  {
    nombre: "Felipe Herrera",
    rol: "Papá de Samuel · Medellín",
    resena: "Las actividades y salidas pedagógicas son fabulosas. Mi hijo aprende muchísimo y siempre llega emocionado.",
    color: "#EB8100",
  },
];

const ResenaCard = ({ nombre, rol, resena, color }: typeof resenas[0]) => (
  <div
    className="relative mx-3 flex-shrink-0 group"
    style={{ width: "300px" }}
  >
    {/* Borde animado al hover */}
    <div
      className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, ${color}, #FF7893, #7AC0FF)`,
        filter: "blur(2px)",
        borderRadius: "1rem",
      }}
    />

    <div
      style={{
        position: "relative",
        borderRadius: "1rem",
        background: "#fff",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        border: "1.5px solid #f0f0f0",
        overflow: "hidden",
      }}
    >
      {/* Línea top de color */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "1.5rem",
          right: "1.5rem",
          height: "3px",
          borderRadius: "999px",
          background: `linear-gradient(90deg, ${color}, #FF789388)`,
        }}
      />

      {/* Estrellas */}
      <div style={{ display: "flex", gap: "0.2rem", marginTop: "0.5rem" }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} style={{ color, fill: color }} />
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-nunito)",
          fontSize: "0.875rem",
          color: "#555",
          lineHeight: 1.65,
          fontStyle: "italic",
        }}
      >
        &ldquo;{resena}&rdquo;
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: "1px solid #f0f0f0",
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
      style={{ background: "#fafafa", padding: "4rem 0", overflow: "hidden" }}
    >
      <div className="container" style={{ marginBottom: "3rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <span style={{
            display: "inline-block",
            background: "#FFFC0133",
            color: "#7a6000",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.82rem",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            marginBottom: "1rem",
          }}>
            ⭐ Reseñas
          </span>
          <h2 style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)" }}>
            Lo que dicen las familias
          </h2>
          <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", fontSize: "1rem", maxWidth: "480px", margin: "0.75rem auto 0", lineHeight: 1.7 }}>
            Más de 29 años construyendo confianza con cientos de familias en Medellín
          </p>
        </motion.div>
      </div>

      <Marquee pauseOnHover className="[--duration:35s]">
        {resenas.map((r) => (
          <ResenaCard key={r.nombre} {...r} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:28s] mt-4">
        {resenas.map((r) => (
          <ResenaCard key={r.nombre + "-r"} {...r} />
        ))}
      </Marquee>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginTop: "3rem" }}
      >
        <a 
          href="https://www.google.com/search?q=Guarder%C3%ADa+Winnie+Pooh+Opiniones"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#fff",
            border: "2px solid #f0f0f0",
            borderRadius: "999px",
            padding: "0.75rem 2rem",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#1a1a1a",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FFFC01";
            e.currentTarget.style.boxShadow = "0 4px 20px #FFFC0144";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#f0f0f0";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ⭐ Compártenos tu reseña en Google
        </a>
      </motion.div>
    </section>
  );
}
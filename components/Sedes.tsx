"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";

const sedes = [
  {
    nombre: "Jardín Infantil",
    tag: "Sede Principal",
    emoji: "🏫",
    color: "#FFFC01",
    slug: "jardin",
    niveles: ["Pre-Jardín (3 años)", "Jardín (4 años)"],
    direccion: "Cll51 #81a-25",
    descripcion: "Nuestra sede principal con más de 29 años formando niños felices y con amor al estudio.",
  },
  {
    nombre: "Winnie Pooh Babies",
    tag: "Bebés y Maternal",
    emoji: "🍼",
    color: "#FF7893",
    slug: "babies",
    niveles: ["Cunas (meses - 1 año)", "Maternal (1 año)", "Párvulos (2 años)"],
    direccion: "Cra81 #52-58",
    descripcion: "Atención especializada para los más pequeños con estimulación temprana y mucho amor.",
  },
  {
    nombre: "After Class",
    tag: "Refuerzo Escolar",
    emoji: "📚",
    color: "#7AC0FF",
    slug: "after-class",
    niveles: ["Cuidado y atención", "Acompañamiento de tareas", "Refuerzo y repasos", "Clases extracurriculares"],
    direccion: "Cll51 #81a-25",
    descripcion: "Apoyo académico para alumnos de colegio con seguimiento personalizado y actividades.",
  },
];

export default function Sedes() {
  return (
    <section id="sedes" style={{ background: "#fafafa" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{
            display: "inline-block",
            background: "#FF789322",
            color: "#c0004e",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.82rem",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            marginBottom: "1rem",
          }}>
            📍 Nuestras Sedes
          </span>
          <h2 style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)" }}>
            Tres sedes para cada etapa
          </h2>
          <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", fontSize: "1rem", maxWidth: "480px", margin: "0.75rem auto 0", lineHeight: 1.7 }}>
            Cada sede está diseñada para las necesidades específicas de su hijo
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {sedes.map((sede, i) => (
            <motion.div
              key={sede.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <MagicCard className="h-full cursor-default" gradientColor={sede.color + "44"}>
                <div style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column" }}>
                  
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                    <div style={{
                      width: "52px", height: "52px",
                      borderRadius: "1rem",
                      background: sede.color + "33",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.75rem", flexShrink: 0,
                    }}>
                      {sede.emoji}
                    </div>
                    <span style={{
                      background: sede.color + "33",
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                      color: "var(--foreground)",
                      letterSpacing: "0.04em",
                    }}>
                      {sede.tag}
                    </span>
                  </div>

                  {/* Nombre */}
                  <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
                    {sede.nombre}
                  </h3>

                  {/* Descripción */}
                  <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
                    {sede.descripcion}
                  </p>

                  {/* Niveles */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem", flex: 1 }}>
                    {sede.niveles.map((nivel) => (
                      <li key={nivel} style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", fontWeight: 600, color: "var(--foreground)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: sede.color, width: "18px", height: "18px", borderRadius: "50%", background: sede.color + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", flexShrink: 0 }}>●</span>
                        {nivel}
                      </li>
                    ))}
                  </ul>

                  {/* Dirección */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "var(--muted-foreground)", borderTop: "1px solid var(--border)", paddingTop: "1rem", marginBottom: "1rem" }}>
                    <span>📍</span> {sede.direccion}
                  </div>

                  {/* Botón */}
                  <Link
                    href={`/sedes/${sede.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      background: sede.color,
                      color: "#1a1a1a",
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "999px",
                      textDecoration: "none",
                      transition: "opacity 0.2s, transform 0.2s",
                      boxShadow: `0 4px 14px ${sede.color}55`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Ver más información →
                  </Link>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
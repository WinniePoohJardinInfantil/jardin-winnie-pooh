"use client";

import { motion } from "framer-motion";

const sedes = [
  {
    nombre: "Jardín Infantil",
    tag: "Sede Principal",
    emoji: "🏫",
    color: "#ffd97d",
    niveles: ["Pre-Jardín (3 años)", "Jardín (4 años)"],
    direccion: "Cll51 #81a-25",
    descripcion: "Nuestra sede principal con más de 29 años formando niños felices y con amor al estudio.",
  },
  {
    nombre: "Winnie Pooh Babies",
    tag: "Bebés y Maternal",
    emoji: "🍼",
    color: "#ff6b6b",
    niveles: ["Cunas (meses - 1 año)", "Maternal (1 año)", "Párvulos (2 años)"],
    direccion: "Cra81 #52-58",
    descripcion: "Atención especializada para los más pequeños con estimulación temprana y mucho amor.",
  },
  {
    nombre: "After Class",
    tag: "Refuerzo Escolar",
    emoji: "📚",
    color: "#4ecdc4",
    niveles: ["Cuidadosisisisimos y atención", "Acompañamiento de tareas", "Refuerzo y repasos", "Clases extracurriculares"],
    direccion: "Cll51 #81a-25",
    descripcion: "Apoyo académico para alumnos de colegio con seguimiento personalizado y actividades.",
  },
];

export default function Sedes() {
  return (
    <section id="sedes" style={{ background: "var(--color-white)" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#ffd97d33",
              color: "#7a4f00",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              marginBottom: "1rem",
            }}
          >
            📍 Nuestras Sedes
          </span>
          <h2
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-text)",
            }}
          >
            Tres sedes para cada etapa
          </h2>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              color: "var(--color-text-muted)",
              fontSize: "1rem",
              marginTop: "0.75rem",
              maxWidth: "500px",
              margin: "0.75rem auto 0",
            }}
          >
            Cada sede está diseñada para las necesidades específicas de su hijo
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {sedes.map((sede, i) => (
            <motion.div
              key={sede.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: "var(--color-cream)",
                borderRadius: "var(--radius)",
                padding: "2rem",
                border: "2px solid transparent",
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = sede.color;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${sede.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Emoji + tag */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span
                  style={{
                    fontSize: "2.5rem",
                    background: sede.color + "33",
                    borderRadius: "1rem",
                    padding: "0.5rem",
                    display: "flex",
                  }}
                >
                  {sede.emoji}
                </span>
                <span
                  style={{
                    background: sede.color + "44",
                    color: "var(--color-text)",
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "999px",
                  }}
                >
                  {sede.tag}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-fredoka)",
                  fontSize: "1.5rem",
                  color: "var(--color-text)",
                  marginBottom: "0.5rem",
                }}
              >
                {sede.nombre}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontSize: "0.9rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                }}
              >
                {sede.descripcion}
              </p>

              {/* Niveles */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                {sede.niveles.map((nivel) => (
                  <li
                    key={nivel}
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.875rem",
                      color: "var(--color-text)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: sede.color, fontSize: "1rem" }}>✦</span>
                    {nivel}
                  </li>
                ))}
              </ul>

              {/* Dirección */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-nunito)",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: "1rem",
                }}
              >
                <span>📍</span>
                {sede.direccion}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";

const servicios = [
  { emoji: "🎵", titulo: "Música", desc: "Desarrollo auditivo y expresión artística desde temprana edad." },
  { emoji: "🌍", titulo: "Inglés", desc: "Aprendizaje del idioma de manera lúdica y natural." },
  { emoji: "🤸", titulo: "Gimnasia", desc: "Desarrollo motor y coordinación con actividades recreativas." },
  { emoji: "🗣️", titulo: "Bebé Políglota", desc: "Programación neurolingüística en 7 idiomas: Español, Inglés, Francés, Alemán, Italiano, Mandarín y Portugués." },
  { emoji: "🏊", titulo: "Natación", desc: "Clases acuáticas para fortalecer el cuerpo y ganar confianza." },
  { emoji: "🎒", titulo: "Salidas Pedagógicas", desc: "Experiencias fuera del aula para vivenciar los proyectos del mes." },
  { emoji: "🗨️", titulo: "Fonoaudiología", desc: "Apoyo en el desarrollo del lenguaje y la comunicación." },
  { emoji: "⭐", titulo: "Ahorro Escolar", desc: "Proyecto que enseña a los niños el valor del trabajo y la autoestima productiva." },
];

const colores = [
  "var(--color-honey)",
  "var(--color-red)",
  "var(--color-teal)",
  "var(--color-purple)",
  "var(--color-blue)",
  "var(--color-green)",
  "var(--color-honey)",
  "var(--color-red)",
];

export default function Servicios() {
  return (
    <section id="servicios" style={{ background: "var(--color-cream)" }}>
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
              background: "#4ecdc422",
              color: "#0e7a73",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              marginBottom: "1rem",
            }}
          >
            🎨 Programas y Servicios
          </span>
          <h2
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-text)",
            }}
          >
            Todo para el desarrollo integral
          </h2>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              color: "var(--color-text-muted)",
              fontSize: "1rem",
              marginTop: "0.75rem",
              maxWidth: "520px",
              margin: "0.75rem auto 0",
            }}
          >
            Programas diseñados para estimular cada aspecto del crecimiento de su hijo
          </p>
        </motion.div>

        {/* Horarios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: "var(--color-honey-light)",
            borderRadius: "var(--radius)",
            padding: "1.5rem 2rem",
            marginBottom: "3rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.1rem", color: "#7a4f00" }}>
            🕐 Horarios disponibles:
          </span>
          {[
            { label: "Mañana", hora: "8:00am - 12:00pm" },
            { label: "Tarde", hora: "1:00pm - 5:00pm" },
            { label: "Tiempo Completo", hora: "7:00am - 5:00pm" },
          ].map((h) => (
            <div
              key={h.label}
              style={{
                background: "white",
                borderRadius: "999px",
                padding: "0.4rem 1.2rem",
                fontFamily: "var(--font-nunito)",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {h.label}: {h.hora}
            </div>
          ))}
        </motion.div>

        {/* Grid servicios */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {servicios.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: "var(--color-white)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                borderLeft: `4px solid ${colores[i]}`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.emoji}</div>
              <h3
                style={{
                  fontFamily: "var(--font-fredoka)",
                  fontSize: "1.2rem",
                  color: "var(--color-text)",
                  marginBottom: "0.4rem",
                }}
              >
                {s.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
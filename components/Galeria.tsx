"use client";

import { motion } from "framer-motion";

const placeholders = [
  { id: 1, color: "#ffd97d44", emoji: "🎨" },
  { id: 2, color: "#ff6b6b33", emoji: "🌟" },
  { id: 3, color: "#4ecdc433", emoji: "🎵" },
  { id: 4, color: "#c084fc33", emoji: "🤸" },
  { id: 5, color: "#86efac33", emoji: "📚" },
  { id: 6, color: "#60a5fa33", emoji: "🏊" },
];

export default function Galeria() {
  return (
    <section id="galeria" style={{ background: "var(--color-white)" }}>
      <div className="container">
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
              background: "#c084fc22",
              color: "#7c3aed",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              marginBottom: "1rem",
            }}
          >
            📸 Galería
          </span>
          <h2
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-text)",
            }}
          >
            Momentos que nos llenan de alegría
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
            Cada día está lleno de aprendizaje, risas y momentos especiales
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {placeholders.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: item.color,
                borderRadius: "var(--radius)",
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3.5rem",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {item.emoji}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
            textAlign: "center",
            marginTop: "2rem",
          }}
        >
          📷 Las fotos reales se cargarán próximamente desde el panel de administración
        </motion.p>
      </div>
    </section>
  );
}
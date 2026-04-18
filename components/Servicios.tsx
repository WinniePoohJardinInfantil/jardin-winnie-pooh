"use client";

import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

const servicios = [
  { emoji: "🎵", titulo: "Música", desc: "Desarrollo auditivo y expresión artística desde temprana edad.", color: "#FF7893" },
  { emoji: "🌍", titulo: "Inglés", desc: "Aprendizaje del idioma de manera lúdica y natural.", color: "#7AC0FF" },
  { emoji: "🤸", titulo: "Gimnasia", desc: "Desarrollo motor y coordinación con actividades recreativas.", color: "#4FF084" },
  { emoji: "🗣️", titulo: "Bebé Políglota", desc: "Programación neurolingüística en 7 idiomas: Español, Inglés, Francés, Alemán, Italiano, Mandarín y Portugués.", color: "#FFFC01" },
  { emoji: "🏊", titulo: "Natación", desc: "Clases acuáticas para fortalecer el cuerpo y ganar confianza.", color: "#7AC0FF" },
  { emoji: "🎒", titulo: "Salidas Pedagógicas", desc: "Experiencias fuera del aula para vivenciar los proyectos del mes. Cada salida tiene su costo y debe autorizarse por escrito.", color: "#EB8100" },
  { emoji: "🗨️", titulo: "Fonoaudiología", desc: "Apoyo especializado en el desarrollo del lenguaje y la comunicación.", color: "#FF7893" },
  { emoji: "⭐", titulo: "Ahorro Escolar", desc: "Los niños aprenden el valor del trabajo y la autoestima productiva con la frase: Yo soy próspero, feliz y productivo.", color: "#4FF084" },
  { emoji: "📚", titulo: "Proyectos Mensuales", desc: "Adaptación escolar, Vocales, Cuerpo Humano, Colores, Figuras geométricas, Alimentos, Números, Oficios, Animales, Medios de Transporte.", color: "#7AC0FF" },
  { emoji: "🏫", titulo: "Programa M.E.N", desc: "Educación según el Ministerio de Educación Nacional con énfasis en estimulación y métodos lúdicos y recreativos.", color: "#FFFC01" },
];

export default function Servicios() {
  return (
    <section id="servicios" style={{ background: "#ffffff", overflow: "hidden" }}>
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
            background: "#4FF08422",
            color: "#1a7a40",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.82rem",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            marginBottom: "1rem",
          }}>
            🎨 Programas y Servicios
          </span>
          <h2 style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)" }}>
            Todo para el desarrollo integral
          </h2>
          <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", fontSize: "1rem", maxWidth: "500px", margin: "0.75rem auto 0", lineHeight: 1.7 }}>
            Programas diseñados para estimular cada aspecto del crecimiento de su hijo con métodos lúdicos y recreativos
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {servicios.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <NeonGradientCard
                className="h-full"
                neonColors={{ firstColor: s.color, secondColor: s.color === "#FFFC01" ? "#EB8100" : "#FF7893" }}
              >
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>{s.emoji}</div>
                  <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.15rem", color: "var(--foreground)", marginBottom: "0.4rem" }}>
                    {s.titulo}
                  </h3>
                  <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              </NeonGradientCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
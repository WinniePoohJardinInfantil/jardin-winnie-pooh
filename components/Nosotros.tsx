"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { SparklesText } from "@/components/ui/sparkles-text";

const filosofia = [
  { emoji: "😊", texto: "Hacer niños felices", color: "#FF7893" },
  { emoji: "📖", texto: "Gusto y amor a estudiar", color: "#FFFC01" },
  { emoji: "🌍", texto: "Gusto y amor a otros idiomas", color: "#7AC0FF" },
];

const misionPuntos = [
  { emoji: "🤝", texto: "Desarrollo Social", color: "#4FF084" },
  { emoji: "❤️", texto: "Desarrollo Afectivo", color: "#FF7893" },
  { emoji: "🏃", texto: "Desarrollo Motriz", color: "#FFFC01" },
  { emoji: "🧠", texto: "Desarrollo Intelectual", color: "#7AC0FF" },
  { emoji: "✨", texto: "Desarrollo Espiritual y Ético", color: "#EB8100" },
  { emoji: "⭐", texto: "Autoestima y Personalidad", color: "#FF7893" },
];

export default function Nosotros() {
  return (
    <section
        id="nosotros"
        style={{ paddingBottom: "6rem" }}
    >
      <div className="container">

        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{
              display: "inline-block",
              background: "#FF789322",
              color: "#c0004e",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.82rem",
              padding: "0.35rem 1rem",
              borderRadius: "999px",
              marginBottom: "1.25rem",
            }}>
              🐻 Quiénes Somos
            </span>

            <div style={{ 
                marginBottom: "1rem",
                fontFamily: "var(--font-fredoka)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--foreground)",
                textAlign: "center" 
                }}>
                <SparklesText
                    colors={{ first: "#FF7893", second: "#7AC0FF" }}
                >
                    Nuestra Misión y Filosofía
                </SparklesText>
            </div>

            <p style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "1.1rem",
              color: "var(--muted-foreground)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}>
              Más de <strong style={{ color: "#EB8100" }}>29 años</strong> formando niños y niñas
              con amor, dedicación y una visión integral del ser humano en Medellín.
            </p>
          </div>
        </BlurFade>

        {/* Grid principal */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          alignItems: "stretch",
        }}>

          {/* Misión */}
          <BlurFade delay={0.2} inView>
            <NeonGradientCard
              className="h-full"
              neonColors={{ firstColor: "#FF7893", secondColor: "#FFFC01" }}
            >
              <div style={{ padding: "2rem", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: "52px", height: "52px",
                    borderRadius: "1rem",
                    background: "#FF789322",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.75rem",
                  }}>
                    🎯
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-fredoka)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#FF7893",
                  }}>
                    Misión
                  </h3>
                </div>

                <p style={{
                  fontFamily: "var(--font-nunito)",
                  fontSize: "1rem",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.8,
                  marginBottom: "1.75rem",
                }}>
                  Atención y cuidado a niños y niñas, velando por su{" "}
                  <strong style={{ color: "var(--foreground)" }}>formación integral</strong>{" "}
                  en todos los aspectos del desarrollo humano.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {misionPuntos.map((punto, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background: punto.color + "18",
                        borderRadius: "0.875rem",
                        padding: "0.6rem 1rem",
                      }}
                    >
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{punto.emoji}</span>
                      <span style={{
                        fontFamily: "var(--font-nunito)",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: "var(--foreground)",
                      }}>
                        {punto.texto}
                      </span>
                      <div style={{
                        marginLeft: "auto",
                        width: "8px", height: "8px",
                        borderRadius: "50%",
                        background: punto.color,
                        flexShrink: 0,
                      }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </NeonGradientCard>
          </BlurFade>

          {/* Filosofía + Calendario */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Filosofía */}
            <BlurFade delay={0.3} inView>
              <NeonGradientCard
                neonColors={{ firstColor: "#7AC0FF", secondColor: "#4FF084" }}
              >
                <div style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <div style={{
                      width: "52px", height: "52px",
                      borderRadius: "1rem",
                      background: "#7AC0FF22",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.75rem",
                    }}>
                      💡
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-fredoka)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#7AC0FF",
                    }}>
                      Filosofía
                    </h3>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filosofia.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          background: item.color + "18",
                          borderRadius: "1rem",
                          padding: "0.875rem 1.25rem",
                          border: `2px solid ${item.color}33`,
                          cursor: "default",
                        }}
                      >
                        <span style={{ fontSize: "1.75rem" }}>{item.emoji}</span>
                        <span style={{
                          fontFamily: "var(--font-nunito)",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "var(--foreground)",
                        }}>
                          {item.texto}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </NeonGradientCard>
            </BlurFade>

            {/* Calendario escolar */}
            <BlurFade delay={0.4} inView>
              <NeonGradientCard
                neonColors={{ firstColor: "#FFFC01", secondColor: "#EB8100" }}
              >
                <div style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <div style={{
                      width: "52px", height: "52px",
                      borderRadius: "1rem",
                      background: "#FFFC0122",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.75rem",
                    }}>
                      📅
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-fredoka)",
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#EB8100",
                    }}>
                      Calendario Escolar
                    </h3>
                  </div>

                  {/* Info general */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                    {[
                      { emoji: "📆", texto: "Periodo anual de 11 meses: 15 Enero al 15 Diciembre", color: "#FFFC01" },
                      { emoji: "🏖️", texto: "Receso: Semana Santa y 2 semanas a mitad de año", color: "#4FF084" },
                      { emoji: "✅", texto: "Octubre se labora normal — No desescolarizamos", color: "#FF7893" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.75rem",
                          padding: "0.5rem 0",
                          borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                        }}
                      >
                        <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "2px" }}>{item.emoji}</span>
                        <span style={{
                          fontFamily: "var(--font-nunito)",
                          fontSize: "0.95rem",
                          color: "var(--foreground)",
                          lineHeight: 1.5,
                          fontWeight: 600,
                        }}>
                          {item.texto}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Horarios */}
                  <div style={{
                    background: "linear-gradient(135deg, #FFFC0115, #EB810015)",
                    borderRadius: "1rem",
                    padding: "1.25rem",
                    border: "1.5px solid #FFFC0144",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-fredoka)",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#EB8100",
                      marginBottom: "0.875rem",
                    }}>
                      🕐 Horarios disponibles
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {[
                        { jornada: "Mañana", hora: "8:00 am – 12:00 pm", color: "#7AC0FF" },
                        { jornada: "Tarde", hora: "1:00 pm – 5:00 pm", color: "#4FF084" },
                        { jornada: "Tiempo Completo", hora: "7:00 am – 5:00 pm", color: "#FF7893" },
                      ].map((h, i) => (
                        <div key={i} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "#fff",
                          borderRadius: "0.75rem",
                          padding: "0.6rem 1rem",
                        }}>
                          <span style={{
                            fontFamily: "var(--font-nunito)",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            color: "var(--foreground)",
                          }}>
                            {h.jornada}
                          </span>
                          <span style={{
                            fontFamily: "var(--font-nunito)",
                            fontWeight: 800,
                            fontSize: "0.9rem",
                            color: h.color,
                          }}>
                            {h.hora}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nota puntualidad */}
                  <p style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.85rem",
                    color: "var(--muted-foreground)",
                    marginTop: "1rem",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}>
                    🔔 Los niños son entregados únicamente a padres o personas conocidas en el jardín
                  </p>
                </div>
              </NeonGradientCard>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
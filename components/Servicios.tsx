"use client";

import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

const servicios = [
  { emoji: "🎵", titulo: "Música", desc: "Desarrollo auditivo y expresión artística desde temprana edad.", color1: "#FF86A8", color2: "#FFD0DB" },
  { emoji: "🌍", titulo: "Inglés", desc: "Aprendizaje del idioma de manera lúdica y natural.", color1: "#79B6FF", color2: "#D9EBFF" },
  { emoji: "🤸", titulo: "Gimnasia", desc: "Desarrollo motor y coordinación con actividades recreativas.", color1: "#79DDA3", color2: "#D9F6E4" },
  { emoji: "🗣️", titulo: "Bebé Políglota", desc: "Programación neurolingüística en 7 idiomas.", color1: "#E8D36E", color2: "#FFF4BE" },
  { emoji: "🏊", titulo: "Natación", desc: "Clases acuáticas para fortalecer el cuerpo y ganar confianza.", color1: "#FFBE7E", color2: "#FFE6CC" },
  { emoji: "🎒", titulo: "Salidas Pedagógicas", desc: "Experiencias fuera del aula para vivenciar los proyectos del mes.", color1: "#F29BC7", color2: "#FFDDF0" },
  { emoji: "🗨️", titulo: "Fonoaudiología", desc: "Apoyo especializado en el desarrollo del lenguaje y la comunicación.", color1: "#8CCEFF", color2: "#E0F1FF" },
  { emoji: "⭐", titulo: "Ahorro Escolar", desc: "Los niños aprenden el valor del trabajo y la autoestima productiva.", color1: "#8AE0A8", color2: "#DDF7E7" },
  { emoji: "📚", titulo: "Proyectos Mensuales", desc: "Adaptación escolar, Vocales, Cuerpo Humano y mucho más.", color1: "#FFD97A", color2: "#FFF2C4" },
  { emoji: "🏫", titulo: "Programa M.E.N", desc: "Educación según el Ministerio de Educación Nacional.", color1: "#FFC28F", color2: "#FFE6D2" },
];

export default function Servicios() {
  return (
    <section id="servicios" className="relative -mt-8 overflow-hidden bg-white pt-18 pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.995) 0%, rgba(255,255,255,0.94) 42%, rgba(255,255,255,0.72) 68%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[24%] top-12 h-20 w-56 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,252,1,0.05) 0%, rgba(255,252,1,0.02) 48%, rgba(255,252,1,0) 76%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 h-20 w-56 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,120,147,0.05) 0%, rgba(255,120,147,0.02) 48%, rgba(255,120,147,0) 76%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[76%] top-12 h-20 w-56 -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(122,192,255,0.05) 0%, rgba(122,192,255,0.02) 48%, rgba(122,192,255,0) 76%)",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-[#fff6d8] px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[#a88516]">
            Nuestros Servicios
          </span>
          <h2
            className="mt-5 font-heading text-4xl text-slate-900 md:text-5xl"
            style={{ lineHeight: 1.08 }}
          >
            Experiencias que acompañan el crecimiento de cada niño
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-8 text-slate-500 md:text-lg">
            En nuestro jardín infantil combinamos cuidado, aprendizaje y actividades
            complementarias para fortalecer el desarrollo físico, emocional, creativo y
            académico dentro de un entorno amoroso y estimulante.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
          {servicios.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex"
            >
              <NeonGradientCard
                className="h-full w-full"
                borderSize={1}
                borderRadius={22}
                neonColors={{ firstColor: s.color1, secondColor: s.color2 }}
              >
                <div className="flex h-full flex-col items-center rounded-[20px] bg-white/95 p-6 text-center">
                  <div className="mb-4 text-4xl">{s.emoji}</div>
                  <div className="mb-2 flex h-[2.5rem] items-center justify-center">
                    <h3
                      style={{
                        fontFamily: "var(--font-fredoka)",
                        fontSize: "1.15rem",
                        color: "#1e293b",
                        lineHeight: "1.2",
                        ...(s.titulo === "Fonoaudiología" && {
                          letterSpacing: "-0.015em",
                          transform: "scaleX(0.97)",
                          display: "inline-block",
                        }),
                      }}
                    >
                      {s.titulo}
                    </h3>
                  </div>
                  <p className="font-sans text-[0.75rem] font-medium leading-relaxed text-slate-500">
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

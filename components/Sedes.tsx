"use client";

import { motion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import Link from "next/link";
import { Check } from "lucide-react";

const sedes = [
  {
    nombre: "Jardín Infantil",
    tag: "Sede Principal",
    emoji: "🏫",
    color: "#FFFC01",
    slug: "jardin",
    niveles: ["Pre-Jardín (3 años)", "Jardín (4 años)"],
    direccion: "Calle 51 #81A - 25",
    descripcion: "Nuestra sede principal con más de 29 años formando niños felices.",
    btnClass: "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-yellow-200",
    stickers: [
      { src: "/images/winnie-baile.webp", top: "-36px", left: "-24px", size: 88, animate: { x: [0, 6, 0], y: [0, -6, 0] }, duration: 5 },
      { src: "/images/elefante-corriendo.webp", bottom: "-36px", right: "-24px", size: 88, animate: { rotate: [0, 8, 0], scale: [1, 1.06, 1] }, duration: 4.2 },
    ],
  },
  {
    nombre: "Winnie Pooh Babies",
    tag: "Bebés y Maternal",
    emoji: "🍼",
    color: "#FF7893",
    slug: "babies",
    niveles: ["Cunas (meses - 1 año)", "Maternal (1 año)", "Párvulos (2 años)"],
    direccion: "Carrera 81 #52 - 58",
    descripcion: "Atención especializada para los más pequeños con mucho amor.",
    btnClass: "bg-gradient-to-r from-pink-400 to-pink-500 shadow-pink-200",
    stickers: [
      { src: "/images/winnie-piggy.webp", top: "-38px", left: "-28px", size: 95, animate: { scale: [1, 1.08, 1], rotate: [0, -5, 0] }, duration: 4.5 },
      { src: "/images/tigger-cafe.webp", bottom: "-38px", right: "-22px", size: 90, animate: { y: [0, -8, 0], rotate: [0, 6, 0] }, duration: 3.8 },
    ],
  },
  {
    nombre: "After Class",
    tag: "Refuerzo Escolar",
    emoji: "📚",
    color: "#7AC0FF",
    slug: "after-class",
    niveles: ["Cuidado y atención", "Acompañamiento de tareas", "Refuerzo y repasos", "Clases extracurriculares"],
    direccion: "Calle 51 #81A - 25",
    descripcion: "Apoyo académico con seguimiento personalizado.",
    btnClass: "bg-gradient-to-r from-blue-400 to-blue-500 shadow-blue-200",
    stickers: [
      { src: "/images/winnie-asomado.webp", top: "-36px", left: "-24px", size: 88, animate: { x: [0, 6, 0], y: [0, -6, 0] }, duration: 5 },
      { src: "/images/winnie-guino.webp", bottom: "-36px", right: "-24px", size: 88, animate: { rotate: [0, 8, 0], scale: [1, 1.06, 1] }, duration: 4.2 },
    ],
  },
];

export default function Sedes() {
  return (
    <section id="sedes" className="relative bg-transparent pt-8 pb-32 overflow-x-clip">
      {/* Blobs de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.82) 35%, #ffffff 100%)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-[22%] bottom-[-6.6rem] h-36 w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,252,1,0.18) 0%, rgba(255,252,1,0.08) 40%, rgba(255,252,1,0) 72%)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 bottom-[-6.4rem] h-36 w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,120,147,0.17) 0%, rgba(255,120,147,0.08) 40%, rgba(255,120,147,0) 72%)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-[78%] bottom-[-6.6rem] h-36 w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(122,192,255,0.17) 0%, rgba(122,192,255,0.08) 40%, rgba(122,192,255,0) 72%)" }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span style={{
            display: "inline-block",
            background: "#FF789322", color: "#c0004e",
            fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.85rem",
            padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1.25rem",
          }}>
            📍 Nuestras Sedes
          </span>
          <h2 style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            color: "var(--foreground)",
            marginBottom: "0.75rem",
          }}>
            Tres sedes para cada etapa
          </h2>
          <p style={{
            fontFamily: "var(--font-nunito)",
            fontSize: "1.15rem",
            color: "var(--muted-foreground)",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Cada sede está diseñada para las necesidades específicas de su hijo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {sedes.map((sede, i) => (
            <motion.div
              key={sede.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex"
              style={{ position: "relative" }}
            >
              {/* Stickers animados en esquinas */}
              {sede.stickers.map((sticker, si) => (
                <motion.div
                  key={si}
                  animate={sticker.animate}
                  transition={{ duration: sticker.duration, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: sticker.top,
                    bottom: sticker.bottom,
                    left: sticker.left,
                    right: sticker.right,
                    width: sticker.size,
                    height: sticker.size,
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sticker.src}
                    alt="sticker"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </motion.div>
              ))}

              <MagicCard
                className="flex w-full flex-col overflow-visible rounded-[3rem] border-none shadow-2xl shadow-slate-100/50"
                gradientColor={sede.color + "15"}
              >
                <div
                  className="flex flex-col h-full p-10 pt-12 text-center"
                  style={{ background: `linear-gradient(180deg, ${sede.color}08 0%, #ffffff 100%)`, borderRadius: "3rem" }}
                >
                  <div className="mb-6">
                    <span
                      className="inline-block uppercase tracking-widest px-4 py-1.5 rounded-full mb-8"
                      style={{
                        background: sede.color + "25",
                        color: sede.color === "#FFFC01" ? "#857a00" : sede.color,
                        fontFamily: "var(--font-nunito)",
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {sede.tag}
                    </span>

                    <div className="w-16 h-16 bg-white shadow-sm border border-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                      {sede.emoji}
                    </div>

                    <h3 style={{
                      fontFamily: "var(--font-fredoka)",
                      fontSize: "1.9rem",
                      color: "var(--foreground)",
                      marginBottom: "0.75rem",
                    }}>
                      {sede.nombre}
                    </h3>

                    <p style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "1rem",
                      color: "var(--muted-foreground)",
                      lineHeight: 1.65,
                      padding: "0 0.5rem",
                      marginBottom: "2rem",
                      minHeight: "60px",
                    }}>
                      {sede.descripcion}
                    </p>
                  </div>

                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left", width: "fit-content", margin: "0 auto", minHeight: "160px" }}>
                    {sede.niveles.map((nivel) => (
                      <li key={nivel} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <div
                          style={{
                            marginTop: "2px", flexShrink: 0,
                            width: "22px", height: "22px",
                            borderRadius: "6px",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            background: sede.color + "25",
                            color: sede.color === "#FFFC01" ? "#857a00" : sede.color,
                          }}
                        >
                          <Check size={13} strokeWidth={4} />
                        </div>
                        <span style={{
                          fontFamily: "var(--font-nunito)",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--foreground)",
                          lineHeight: 1.4,
                        }}>
                          {nivel}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ flex: 1 }} />

                  <div style={{ paddingTop: "2rem" }}>
                    <p style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "var(--muted-foreground)",
                      marginBottom: "1.25rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}>
                      📍 {sede.direccion}
                    </p>

                    <Link
                      href={`/sedes/${sede.slug}`}
                      className={`inline-flex w-full items-center justify-center rounded-2xl text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl ${sede.btnClass}`}
                      style={{
                        fontFamily: "var(--font-nunito)",
                        fontWeight: 800,
                        fontSize: "1.05rem",
                        padding: "1rem 1.5rem",
                      }}
                    >
                      Ver más información →
                    </Link>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
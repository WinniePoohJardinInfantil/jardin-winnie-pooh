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
  },
  {
    nombre: "After Class",
    tag: "Refuerzo Escolar",
    emoji: "📚",
    color: "#7AC0FF",
    slug: "after-class",
    niveles: [
      "Cuidado y atención",
      "Acompañamiento de tareas",
      "Refuerzo y repasos",
      "Clases extracurriculares",
    ],
    direccion: "Calle 51 #81A - 25",
    descripcion: "Apoyo académico con seguimiento personalizado.",
    btnClass: "bg-gradient-to-r from-blue-400 to-blue-500 shadow-blue-200",
  },
];

export default function Sedes() {
  return (
    <section id="sedes" className="relative overflow-hidden bg-white pt-24 pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.82) 35%, #ffffff 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[22%] bottom-[-6.6rem] h-36 w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,252,1,0.18) 0%, rgba(255,252,1,0.08) 40%, rgba(255,252,1,0) 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-[-6.4rem] h-36 w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,120,147,0.17) 0%, rgba(255,120,147,0.08) 40%, rgba(255,120,147,0) 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[78%] bottom-[-6.6rem] h-36 w-[20rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(122,192,255,0.17) 0%, rgba(122,192,255,0.08) 40%, rgba(122,192,255,0) 72%)",
        }}
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-slate-900 mb-4">
            Tres sedes para cada etapa
          </h2>
          <p className="font-sans text-slate-500 text-lg">
            Cada sede está diseñada para las necesidades específicas de su hijo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {sedes.map((sede, i) => (
            <motion.div
              key={sede.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex"
            >
              <MagicCard
                className="flex w-full flex-col overflow-hidden rounded-[3rem] border-none shadow-2xl shadow-slate-100/50"
                gradientColor={sede.color + "15"}
              >
                <div
                  className="flex flex-col h-full p-10 pt-12 text-center"
                  style={{ background: `linear-gradient(180deg, ${sede.color}08 0%, #ffffff 100%)` }}
                >
                  <div className="mb-6">
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8"
                      style={{
                        background: sede.color + "25",
                        color: sede.color === "#FFFC01" ? "#857a00" : sede.color,
                      }}
                    >
                      {sede.tag}
                    </span>

                    <div className="w-16 h-16 bg-white shadow-sm border border-slate-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                      {sede.emoji}
                    </div>

                    <h3 className="font-heading text-2xl text-slate-800 mb-3">
                      {sede.nombre}
                    </h3>

                    <p className="font-sans text-sm text-slate-500 leading-relaxed px-2 mb-8 h-[60px]">
                      {sede.descripcion}
                    </p>
                  </div>

                  <ul className="space-y-4 text-left mx-auto w-fit min-h-[160px]">
                    {sede.niveles.map((nivel) => (
                      <li key={nivel} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                        <div
                          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                          style={{
                            background: sede.color + "20",
                            color: sede.color === "#FFFC01" ? "#857a00" : sede.color,
                          }}
                        >
                          <Check size={12} strokeWidth={4} />
                        </div>
                        {nivel}
                      </li>
                    ))}
                  </ul>

                  <div className="flex-1" />

                  <div className="pt-8">
                    <p className="text-[11px] font-bold text-slate-400 mb-6 tracking-wide uppercase">
                      {sede.direccion}
                    </p>

                    <Link
                      href={`/sedes/${sede.slug}`}
                      className={`inline-flex w-full items-center justify-center py-4 rounded-2xl text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl ${sede.btnClass}`}
                    >
                      Solicitar este plan
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

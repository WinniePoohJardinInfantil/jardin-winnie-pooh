"use client";

import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import Image from "next/image";

const servicios = [
  { img: "/icons/bebe-poliglota.png", titulo: "Bebé Políglota", desc: "Programación neurolingüística en 7 idiomas.", color1: "#E8D36E", color2: "#FFF4BE" },
  { img: "/icons/proyectos.png", titulo: "Proyectos Mensuales", desc: "Adaptación escolar, Vocales, Cuerpo Humano y mucho más.", color1: "#FFD97A", color2: "#FFF2C4" },
  { img: "/icons/ingles.png", titulo: "Inglés", desc: "Aprendizaje del idioma de manera lúdica y natural.", color1: "#79B6FF", color2: "#D9EBFF" },
  { img: "/icons/salidas.png", titulo: "Salidas Pedagógicas", desc: "Experiencias fuera del aula para vivenciar los proyectos del mes.", color1: "#F29BC7", color2: "#FFDDF0" },
  { img: "/icons/musica.png", titulo: "Sensibilización Musical", desc: "Desarrollo auditivo y expresión artística desde temprana edad.", color1: "#FF86A8", color2: "#FFD0DB" },
  { img: "/icons/gimnasia.png", titulo: "Gimnasia", desc: "Desarrollo motor y coordinación con actividades recreativas.", color1: "#79DDA3", color2: "#D9F6E4" },
  { img: "/icons/natacion.png", titulo: "Natación", desc: "Clases acuáticas para fortalecer el cuerpo y ganar confianza.", color1: "#FFBE7E", color2: "#FFE6CC" },
  { img: "/icons/fonoaudiologia.png", titulo: "Fonoaudiología", desc: "Apoyo especializado en el desarrollo del lenguaje y la comunicación.", color1: "#8CCEFF", color2: "#E0F1FF" },
  { img: "/icons/pintura.png", titulo: "Pintura", desc: "Aprendizaje del idioma de manera lúdica y natural.", color1: "#79B6FF", color2: "#D9EBFF" },
  { img: "/icons/baile.png", titulo: "Baile", desc: "Aprendizaje del idioma de manera lúdica y natural.", color1: "#79B6FF", color2: "#D9EBFF" },
  { img: "/icons/ahorro.png", titulo: "Ahorro Escolar", desc: "Los niños aprenden el valor del trabajo y la autoestima productiva.", color1: "#8AE0A8", color2: "#DDF7E7" },
  { img: "/icons/programa.png", titulo: "Programa M.E.N", desc: "Educación según el Ministerio de Educación Nacional.", color1: "#FFC28F", color2: "#FFE6D2" },
  
];

export default function Servicios() {
  return (
    <section id="servicios" className="relative -mt-8 overflow-hidden bg-white pt-18 pb-20">
      {/* Capas de fondo decorativas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.995) 0%, rgba(255,255,255,0.94) 42%, rgba(255,255,255,0.72) 68%, rgba(255,255,255,0) 100%)",
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          
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

        {/* CAMBIO PRINCIPAL AQUÍ: Usamos flex-wrap y justify-center para centrar las sobrantes */}
        <div className="flex flex-wrap justify-center gap-6">
          {servicios.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              /* Calculamos el ancho exacto para mantener columnas pero permitiendo el centrado */
              className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <NeonGradientCard
                className="h-full w-full"
                borderSize={1}
                borderRadius={22}
                neonColors={{ firstColor: s.color1, secondColor: s.color2 }}
              >
                <div className="flex h-full flex-col items-center justify-start rounded-[20px] bg-white/95 p-6 text-center">
                  
                  {/* IMAGEN DE ANCHO COMPLETO CON BACKLIGHT */}
                  <div className="relative mb-6 h-48 w-full">
                    {/* El resplandor (Backlight) expandido por detrás */}
                    <div 
                      className="absolute inset-0 scale-105 rounded-2xl opacity-40 blur-xl"
                      style={{ backgroundColor: s.color1 }}
                    />
                    {/* La imagen optimizada ocupando todo el contenedor con bordes redondeados */}
                    <Image
                      src={s.img}
                      alt={s.titulo}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="relative z-10 rounded-2xl object-cover drop-shadow-md"
                    />
                  </div>

                  <div className="mb-3 flex min-h-[3rem] items-center justify-center">
                    <h3
                      style={{
                        fontFamily: "var(--font-fredoka)",
                        fontSize: "1.35rem",
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
                  
                  <p className="font-sans text-sm font-medium leading-relaxed text-slate-500">
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
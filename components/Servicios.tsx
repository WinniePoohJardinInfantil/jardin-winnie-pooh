"use client";

import { motion } from "framer-motion";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Lens } from "@/components/ui/lens";

const Site_Palette = ["#FF7893", "#7AC0FF", "#7E3AF2", "#27b9f3ff", "#4FF084", "#EB8100"];
const BASE_PALETTE = Site_Palette;
const AURORA_PALETTES = Array.from({ length: 12 }, (_, i) => {
  const shift = i % BASE_PALETTE.length;
  return [...BASE_PALETTE.slice(shift), ...BASE_PALETTE.slice(0, shift)];
});

const servicios = [
  { 
    img: "/icons/programa.png", 
    titulo: "Programa M.E.N", 
    desc: "Educación de alta calidad siguiendo los estándares del Ministerio de Educación Nacional.", 
    highlight: "Ministerio de Educación Nacional" 
  },
  { 
    img: "/icons/proyectos.png", 
    titulo: "Proyectos Mensuales", 
    desc: "Exploramos temas fascinantes como el Cuerpo Humano, la Naturaleza y las Vocales.", 
    highlight: "Cuerpo Humano" 
  },
  { 
    img: "/icons/bebe-poliglota.png", 
    titulo: "Bebé Políglota", 
    desc: "Estimulación temprana con programación neurolingüística en 7 idiomas simultáneos.", 
    highlight: "7 idiomas" 
  },
  { 
    img: "/icons/musica.png", 
    titulo: "Sensibilización Musical", 
    desc: "Despertamos la sensibilidad auditiva y la expresión artística a través del ritmo.", 
    highlight: "expresión artística" 
  },
  { 
    img: "/icons/ingles.png", 
    titulo: "Iniciación al Inglés", 
    desc: "Primer acercamiento al idioma extranjero de forma divertida, lúdica y natural.", 
    highlight: "lúdica y natural" 
  },
  { 
    img: "/icons/gimnasia.png", 
    titulo: "Gimnasia Infantil", 
    desc: "Fomentamos el desarrollo motor y la coordinación mediante actividades recreativas.", 
    highlight: "actividades recreativas" 
  },
  { 
    img: "/icons/fonoaudiologia.png", 
    titulo: "Fonoaudiología", 
    desc: "Acompañamiento experto para potenciar las habilidades del lenguaje y la comunicación.", 
    highlight: "lenguaje y la comunicación" 
  },
  { 
    img: "/icons/salidas.png", 
    titulo: "Salidas Pedagógicas", 
    desc: "Aventuras fuera del aula para vivir de cerca los proyectos pedagógicos del mes.", 
    highlight: "proyectos del mes" 
  },
  { 
    img: "/icons/natacion.png", 
    titulo: "Natación", 
    desc: "Ejercicios acuáticos diseñados para fortalecer el cuerpo y ganar confianza en el agua.", 
    highlight: "ganar confianza" 
  },
  { 
    img: "/icons/pintura.png", 
    titulo: "Pintura", 
    desc: "Un espacio para la libre expresión donde los niños exploran texturas, colores y creatividad.", 
    highlight: "exploran texturas" 
  },
  { 
    img: "/icons/baile.png", 
    titulo: "Baile", 
    desc: "Ritmo y movimiento para mejorar la expresión corporal y liberar energía con alegría.", 
    highlight: "expresión corporal" 
  },
  { 
    img: "/icons/ahorro.png", 
    titulo: "Ahorro Escolar", 
    desc: "Aprenden el valor del esfuerzo, el orden y fortalecen su autoestima productiva.", 
    highlight: "autoestima productiva" 
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="relative -mt-8 overflow-hidden bg-white pt-18 pb-20">
      
      {/* --- ELEMENTOS DECORATIVOS LATERALES --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Top-left: winnie-globo */}
        <div className="absolute top-[5%] left-[1%] hidden xl:block" style={{ width: "220px" }}>
          <Image src="/images/winnie-globo.png" alt="Winnie Pooh" width={220} height={946} style={{ objectFit: "contain" }} />
        </div>

        {/* Bottom-left: elefante-globo */}
        <div className="absolute bottom-[5%] left-[1%] hidden xl:block" style={{ width: "230px" }}>
          <Image src="/images/elefante-globo.png" alt="Elefante" width={230} height={305} style={{ objectFit: "contain" }} />
        </div>

        {/* Top-right: tigger-globo */}
        <div className="absolute top-[5%] right-[1%] hidden xl:block" style={{ width: "230px" }}>
          <Image src="/images/tigger-globo.png" alt="Tigger" width={230} height={336} style={{ objectFit: "contain" }} />
        </div>

        {/* Bottom-right: piggy-globo */}
        <div className="absolute bottom-[5%] right-[1%] hidden xl:block" style={{ width: "230px" }}>
          <Image src="/images/piggy-globo.png" alt="Piggy" width={230} height={335} style={{ objectFit: "contain" }} />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* --- ENCABEZADO --- */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <BlurFade delay={0.1} inView>
            <h2
              className="mb-6 font-bold"
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                color: "#1e293b"
              }}
            >
              <SparklesText sparklesCount={8} className="inline">
                <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                  Experiencias que acompañan
                </AuroraText>
              </SparklesText>
              <br />
              <AuroraText colors={["#22c55e", "#00c2ff", "#7E3AF2", "#FFB400", "#FF1F6D"]}>
                  El crecimiento de cada niño
                </AuroraText>
            </h2>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <p 
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "clamp(1.2rem, 2.2vw, 1.4rem)", // Agrandamos un poco la descripción del header
                color: "#64748b",
                fontWeight: 700,
                lineHeight: 1.6,
                maxWidth: "850px",
                margin: "0 auto"
              }}
            >
              Cuidado, aprendizaje y actividades para fortalecer el desarrollo emocional, creativo y académico.
            </p>
          </BlurFade>
        </div>

        {/* --- GRID DE 4 COLUMNAS --- */}
        <div className="flex flex-wrap justify-center gap-5 lg:gap-8">
          {servicios.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)]"
            >
              <NeonGradientCard
                className="h-full w-full"
                borderSize={4}
                borderRadius={22}
                neonColors={{
                  firstColor: Site_Palette[i % 6],
                  secondColor: Site_Palette[(i + 1) % 6],
                }}
              >
                <div className="flex h-full flex-col items-center justify-start rounded-[20px] p-6 text-center" style={{ background: "rgba(255,255,255,0.85)" }}>
                  
                  <div className="relative mb-6 w-full overflow-hidden rounded-xl" style={{ borderRadius: "8px", overflow: "hidden" }}>
                    <div 
                      className="absolute inset-0 scale-110 opacity-30 blur-2xl"
                      style={{ backgroundColor: Site_Palette[i % 6] }}
                    />
                    <Lens>
                      <div className="relative h-48 w-full"> {/* Subimos un poco la altura para que luzca el Lens */}
                        <Image
                          src={s.img}
                          alt={s.titulo}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-contain p-2" 
                        />
                      </div>
                    </Lens>
                  </div>

                  <div className="mb-3 flex min-h-[3rem] items-center justify-center">
                    <h3
                      style={{
                        fontFamily: "var(--font-fredoka)",
                        fontSize: "1.4rem", // Un poco más grande el título
                        fontWeight: 700,
                        color: "inherit",
                        lineHeight: "1.2",
                      }}
                    >
                      <AuroraText colors={AURORA_PALETTES[i]}>{s.titulo}</AuroraText>
                    </h3>
                  </div>
                  
                  <p 
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      lineHeight: "1.5",
                      color: "#1e293b",
                    }}
                  >
                    {(() => {
                      const parts = s.desc.split(s.highlight);
                      if (parts.length < 2) return s.desc;
                      return (
                        <>
                          {parts[0]}
                          <span style={{ color: Site_Palette[i % 6], fontWeight: 700 }}>{s.highlight}</span>
                          {parts[1]}
                        </>
                      );
                    })()}
                  </p>
                </div>
              </NeonGradientCard>
            </motion.div>
          ))}
        </div>
      </div>
      <div 
    className="absolute inset-x-0 bottom-0 h-40 z-20 pointer-events-none"
    style={{
      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"
    }}
  />
    </section>
    
  );
}
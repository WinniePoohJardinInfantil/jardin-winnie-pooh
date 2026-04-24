"use client";

import { Marquee } from "@/components/ui/marquee";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";
import { Star as StarIcon } from "lucide-react";

const resenasArriba = [
  {
    nombre: "Gloria Sepulveda ",
    rol: "Madre de Familia",
    resena: "Un jardín infantil con ambiente familiar, excelente integración y enfoque en el desarrollo integral de los niños mediante trato amoroso y buena comunicación con los padres.",
    color: "#FF7893",
  },
  {
    nombre: "Angelo Higuita ",
    rol: "Padre de Familia",
    resena: "Toda mi confianza con el lugar que me ha apoyado en la formación de mi hijo y en mi formación como papá",
    color: "#7AC0FF",
  },
  {
    nombre: "Consultores Asociados AV ",
    rol: "Padre de Familia",
    resena: "Tiene una excelente educación para nuestros hijos es un lugar muy seguro",
    color: "#7E3AF2",
  },
  {
    nombre: "Cindy Lopez ",
    rol: "Madre de Familia",
    resena: "Un lugar seguro y limpio, donde destaca la dedicación y calidez de la profesora Ana, logrando que los niños aprendan felices y con entusiasmo cada día.",
    color: "#FFFC01",
  },
  {
    nombre: "Estefania Gallego ",
    rol: "Madre de Familia",
    resena: "La verdad que para nosotros como papás y para nuestros hijos es el mejor regalo y tranquilidad. Las mejores gracias por tanto ☺️☺️☺️☺️",
    color: "#4FF084",
  },
  {
    nombre: "Ruben Morales ",
    rol: "Padre de Familia",
    resena: "El jardín Winnie Pooh ha sido el lugar escogido para que mi hijo se desarrolle en sus tan importantes de 0 a 5 años, realmente estamos felices de los avances, se nota el amor y dedicación de todo el personal, recomendado para quienes estén buscando un lugar seguro.",
    color: "#7AC0FF",
  },
  {
    nombre: "Lliana Ramírez ",
    rol: "Madre de Familia",
    resena: "Una excelente elección de jardín, donde brindan amor, aprendizaje y alegría a los niños cada día.",
    color: "#7E3AF2",
  },
  {
    nombre: "Natalia Valencia",
    rol: "Madre de Familia",
    resena: "Excelente guarderia, a recomiendo, cuidan muy bien los niños, los profes son espectaculares y muy dinamicos.",
    color: "#EB8100",
  },
];

const resenasAbajo = [
  {
    nombre: "Sebastian Arboleda",
    rol: "Padre de Familia",
    resena: "Personal profesional y capacito para el cuidado de los niños",
    color: "#FF7893",
  },
  {
    nombre: "Eliana Usma",
    rol: "Madre de Familia",
    resena: "Cuentan con una formación académica y desarrollo personal muy completa con personal profesional",
    color: "#7AC0FF",
  },
  {
    nombre: "Monica Espinoza",
    rol: "Madre de Familia",
    resena: "Me gusta el ambiente de los Niños",
    color: "#7E3AF2",
  },
  {
    nombre: "Cindy Lopez ",
    rol: "Madre de Familia",
    resena: "Un lugar seguro y limpio, donde destaca la dedicación y calidez de la profesora Ana, logrando que los niños aprendan felices y con entusiasmo cada día.",
    color: "#FFFC01",
  },
  {
    nombre: "Alexandra Rueda",
    rol: "Madre de Familia",
    resena: "Complementan muy bien el currículo académico y los niños terminan jornada muy contentos",
    color: "#4FF084",
  },
  {
    nombre: "Angela Kardona",
    rol: "Madre de Familia",
    resena: "Excelente... un lugar soñado para los nenes",
    color: "#7AC0FF",
  },
  {
    nombre: "Luis Patiño ",
    rol: "Padre de Familia",
    resena: "Excelente lugar tanto a nivel de personal como locativo para la educación de nuestros hijos.",
    color: "#7E3AF2",
  },
  {
    nombre: "Nora Montoya ",
    rol: "Madre de Familia",
    resena: "Las maestras de Winnie Pooh son muy bellas personas, instruyen a nuestros hijos en el respeto, educación y disciplina. Winni Pooh es un lugar único, brindan el espacio recreativo a nuestros hijos, me parece un lugar ideal.",
    color: "#EB8100",
  },
];

const withAlpha = (hex: string, alpha: string) => `${hex}${alpha}`;

const ResenaCard = ({ nombre, rol, resena, color }: typeof resenasArriba[0]) => (
  <div className="relative mx-3 flex-shrink-0 group h-full" style={{ width: "300px" }}>
    <div
      className="absolute -inset-[1px] rounded-2xl opacity-100 transition-all duration-500 group-hover:opacity-100"
      style={{
        background: `linear-gradient(135deg, ${withAlpha(color, "F2")}, ${withAlpha(color, "8A")})`,
        filter: "blur(6px)",
        borderRadius: "1rem",
      }}
    />

    <div
      className="transition-all duration-300 group-hover:-translate-y-1"
      style={{
        position: "relative",
        borderRadius: "1rem",
        background: "#fff",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        height: "100%",
        border: `1.5px solid ${withAlpha(color, "55")}`,
        boxShadow: `0 12px 28px ${withAlpha(color, "20")}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "1.5rem",
          right: "1.5rem",
          height: "3px",
          borderRadius: "999px",
          background: `linear-gradient(90deg, ${color}, ${withAlpha(color, "88")})`,
        }}
      />

      <div style={{ display: "flex", gap: "0.2rem", marginTop: "0.5rem" }}>
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} size={14} style={{ color, fill: color }} />
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-nunito)",
          fontSize: "0.875rem",
          color: "#555",
          lineHeight: 1.65,
          fontStyle: "italic",
          minHeight: "112px",
        }}
      >
        &ldquo;{resena}&rdquo;
      </p>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: `1px solid ${withAlpha(color, "24")}`,
        }}
      >
        <p style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.875rem", color: "#1a1a1a" }}>
          {nombre}
        </p>
        <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.75rem", color: "#999", marginTop: "0.1rem" }}>
          {rol}
        </p>
      </div>
    </div>
  </div>
);

export default function Resenas() {
  return (
    <section
      id="resenas"
      style={{ background: "#fff", padding: "100px 0", overflow: "hidden" }}
    >
      <div className="container" style={{ marginBottom: "4rem", position: "relative", zIndex: 10 }}>
        <BlurFade delay={0.2} inView>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)", 
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              <SparklesText sparklesCount={8} className="inline">
                <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                  Lo que dicen
                </AuroraText>
              </SparklesText>
              <br />
              <SparklesText sparklesCount={10} className="inline">
                <AuroraText colors={["#00D1FF", "#FF2E63", "#4ADE80", "#60A5FA", "#FACC15"]}>
                  nuestras familias
                </AuroraText>
              </SparklesText>
            </div>

            <p style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "#334155", 
              fontWeight: 800,
              lineHeight: 1.6,
              maxWidth: "700px",
              margin: "0 auto",
              textShadow: "0 0 10px rgba(255,255,255,0.8)" 
            }}>
              Más de 30 años construyendo confianza con cientos de familias que han hecho parte de nuestra historia en Medellín.
            </p>
          </div>
        </BlurFade>
      </div>

      <div style={{ position: "relative" }}>
        <Marquee pauseOnHover className="[--duration:40s] items-stretch">
          {resenasArriba.map((r, i) => (
            <ResenaCard key={`rev-${r.nombre}-${i}`} {...r} />
          ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:35s] mt-8 items-stretch">
          {resenasAbajo.map((r, i) => (
            <ResenaCard key={`rev-${r.nombre}-${i}`} {...r} />
          ))}
        </Marquee>
      </div>

      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  style={{ 
    textAlign: "center", 
    marginTop: "5rem", // Un poco más de aire
    padding: "10px" 
  }}
>
  <a 
    href="https://www.google.com/search?q=guarder%C3%ADa+Winnie+Pooh&oq=guar&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRg5MggIAhBFGCcYOzIGCAMQRRg7MhIIBBAAGEMYgwEYsQMYgAQYigUyBggFEEUYPTIGCAYQRRg9MgYIBxBFGDzSAQc5MTFqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&sei=nZPrady4NICMwbkPuaHtwAI#lrd=0x8e44296d603c323f:0x9631e4010bb6c0a1,1,,,,"
    target="_blank"
    rel="noopener noreferrer"
    className="group"
    style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2px", // Grosor del borde animado
      borderRadius: "999px",
      textDecoration: "none",
      background: "linear-gradient(90deg, #FF1F6D, #FFB400, #7E3AF2, #00C2FF, #FF1F6D)",
      backgroundSize: "300% 100%",
      animation: "borderRotate 4s linear infinite", // Animación de rotación de color
    }}
  >
    {/* El botón real encima del borde */}
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      background: "#fff",
      borderRadius: "999px",
      padding: "1rem 2.8rem",
      fontFamily: "var(--font-nunito)",
      fontWeight: 900,
      fontSize: "1.1rem",
      color: "#1a1a1a",
      transition: "all 0.3s ease",
      position: "relative",
      zIndex: 2
    }}>
      <span style={{ fontSize: "1.3rem" }}>⭐</span>
      Compártenos tu reseña en Google
      
      {/* Reflejo de brillo interno al pasar el mouse */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite"
        }} 
      />
    </div>

    {/* Efecto de resplandor (Glow) detrás del botón */}
    <div style={{
      position: "absolute",
      inset: "-5px",
      background: "inherit",
      borderRadius: "999px",
      filter: "blur(15px)",
      opacity: 0.4,
      zIndex: 1
    }} />
  </a>

  {/* Estilos CSS necesarios para las animaciones del botón */}
  <style jsx>{`
    @keyframes borderRotate {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
</motion.div>
    </section>
  );
}
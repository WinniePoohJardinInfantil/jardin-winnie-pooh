"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MessageCircle, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { AuroraText } from "@/components/ui/aurora-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

// --- COMPONENTE HIGHLIGHT ---
const HighLight = ({ children, color = "#FFB40033", type = "box" }: { 
  children: React.ReactNode; 
  color?: string; 
  type?: "box" | "underline" 
}) => (
  <span className="relative inline-block z-10 mx-1">
    <span 
      className="absolute inset-x-[-4px] z-[-1] transition-transform"
      style={{
        bottom: type === "underline" ? "4px" : "0",
        height: type === "underline" ? "8px" : "100%",
        backgroundColor: color,
        borderRadius: type === "underline" ? "0" : "12px",
        transform: "rotate(-1.5deg)",
      }} 
    />
    {children}
  </span>
);

interface SedeDetalle {
  nombre: string;
  subtitulo: string;
  color: string;
  descripcion: string;
  resaltado: string;
  direccion: string;
  mapaUrl: string;
  edades: string[];
  servicios: string[];
  fotos: string[];
}

const sedesData: Record<string, SedeDetalle> = {
  "babys": {
    nombre: "Winnie Pooh",
    subtitulo: "Babys",
    color: "#FF7893",
    descripcion: "Servicio especializado para el cuidado y la estimulación a bebes, en un ambiente confiable y feliz para su ",
    resaltado: "adecuado desarrollo",
    direccion: "Carrera 81 #52 - 58, Medellín",
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.023243171329!2d-75.601!3d6.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMzYuMCJOIDc1wrAzNicwMy42Ilc!5e0!3m2!1ses!2sco!4v1640000000000", 
    edades: ["3 meses a 12 meses", "1 año (Maternal)", "2 años (Párvulos)"],
    servicios: ["Estimulación temprana", "Personal Especializado", "Metodo Bebe Poliglotas", "Horarios Flexibles"],
    fotos: ["/sedes/babys/sede_babys.mp4"],
  },
  "jardin": {
    nombre: "Winnie Pooh",
    subtitulo: "Jardín Infantil",
    color: "#FFFC01", 
    descripcion: "Somos el comienzo de una vida plena para sus hijos, con ",
    resaltado: "+30 años de amor y dedicación a nuestros pequeños",
    direccion: "Calle 51 #81a-25, Medellín",  
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.995347919616!2d-75.5985903!3d6.264340799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44296ca4709197%3A0xc6ecd1171e549337!2sCl.%2051%20%23%2081A-25%2C%20Calasanz%20Parte%20Alta%2C%20Medell%C3%ADn%2C%20La%20Am%C3%A9rica%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1777045128704!5m2!1ses-419!2sco",    
    edades: ["3 años (Pre-jardín)", "4 años (Jardín)"],
    servicios: ["Iniciación al inglés", "Estimulación Musical", "Gimnasia Infantil", "Metodo de Políglotas (7 idiomas)"],
    fotos: Array.from({ length: 34 }, (_, i) => `/sedes/jardininfantil/fotojardininfantil${i + 1}.jpeg`),
  },
  "after-class": {
    nombre: "Winnie Pooh",
    subtitulo: "After Class",
    color: "#4ADE80", 
    descripcion: "Servicio de acompañamiento de tareas y aprovechamiento del tiempo libre en actividades extracurriculares: ",
    resaltado: "Pintura, Musica, Baile, Ingles y manualidades",
    direccion: "Calle 51 #81a-25, Medellín",  
    mapaUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.995347919616!2d-75.5985903!3d6.264340799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44296ca4709197%3A0xc6ecd1171e549337!2sCl.%2051%20%23%2081A-25%2C%20Calasanz%20Parte%20Alta%2C%20Medell%C3%ADn%2C%20La%20Am%C3%A9rica%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1777045128704!5m2!1ses-419!2sco",    
    edades: ["6 a 10 años"],
    servicios: ["Tareas dirigidas", "Taller de artes", "Clases de música", "Recreación", "Almuerzo"],
    fotos: Array.from({ length: 42 }, (_, i) => `/sedes/afterclass/fotoafterclass${i + 1}.jpeg`),
  },
};

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src);

export default function SedePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const sede = sedesData[slug];
  const [fotoActual, setFotoActual] = useState(0);
  const [direccion, setDireccion] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!sede) notFound();

  const proximaFoto = () => {
    setDireccion(1);
    setFotoActual((prev) => (prev + 1) % sede.fotos.length);
  };
  
  const fotoAnterior = () => {
    setDireccion(-1);
    setFotoActual((prev) => (prev - 1 + sede.fotos.length) % sede.fotos.length);
  };

  const sedeColorBrand = sede.color === "#FFFC01" ? "#D4C500" : sede.color;
  const whatsappLink = `https://wa.me/573116055332?text=Hola!%20Info%20de%20la%20sede%20${encodeURIComponent(sede.subtitulo)}`;

  const slides = sede.fotos.map((src) =>
    isVideo(src)
      ? { type: "video" as const, sources: [{ src, type: "video/mp4" as const }] }
      : { src }
  );

  return (
    <main className="min-h-screen bg-white font-nunito overflow-x-hidden relative">
      <Navbar />

      {/* --- FONDO CON MÁSCARA (Estilo Hero) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-full opacity-60" style={{
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        }}>
          <Image
            src="/images/sedes-slug-bg.jpg" 
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        
        {/* --- CABECERA — título unificado, sin texto gris separado --- */}
        <BlurFade delay={0.1}>
          <div className="text-center mb-16">
            {/* Una sola línea: "Winnie Pooh · Baby's" todo en AuroraText + Sparkles */}
            <h1 className="font-fredoka tracking-tighter leading-tight mb-6">
              <SparklesText
                sparklesCount={12}
                colors={{ first: sede.color, second: "#FFB400" }}
                className="inline-block"
              >
                <AuroraText
                  colors={[sede.color, "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}
                  className="text-5xl md:text-7xl font-black"
                >
                  {sede.nombre} · {sede.subtitulo}
                </AuroraText>
              </SparklesText>
            </h1>

            {/* Descripción: negrita negra con highlight sólido del color de la sede */}
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-bold leading-relaxed" style={{ color: "#1e293b" }}>
              {sede.descripcion}
              <HighLight color={`${sede.color}CC`} type="underline">
                {sede.resaltado}
              </HighLight>
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Tarjeta de Información */}
          <div className="lg:col-span-3 flex">
            <div 
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[3.5rem] border-4 border-white w-full flex flex-col justify-between shadow-2xl relative overflow-hidden"
              style={{ boxShadow: `0 30px 60px -15px ${sede.color}25` }}
            >
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full opacity-50"
                style={{ backgroundColor: sede.color }}
              />

              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-3">
                  {/* Espacio reservado para sticker — mismas dimensiones que el ícono anterior (46×46px) */}
                  <div style={{ width: 46, height: 46, flexShrink: 0 }} />
                  <h3 className="text-2xl font-black font-fredoka text-slate-800 tracking-tight">Detalles</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3">Edades</p>
                    <div className="flex flex-wrap gap-2">
                      {sede.edades.map(e => (
                        <span key={e} className="bg-white border-2 border-slate-50 px-4 py-2 rounded-2xl text-[12px] font-black text-slate-600 shadow-sm">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-3">Servicios Incluidos</p>
                    <ul className="space-y-4">
                      {sede.servicios.map(s => (
                        <li key={s} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                          <div className="p-1 rounded-lg" style={{ backgroundColor: `${sede.color}20`, color: sedeColorBrand }}>
                            <Check size={14} strokeWidth={4} />
                          </div>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                <div className="flex items-start gap-2 mb-6">
                  <MapPin size={20} className="mt-1" style={{ color: sedeColorBrand }} />
                  <p className="text-sm text-slate-500 font-bold leading-tight">{sede.direccion}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(whatsappLink)}
                  style={{
                    position: "relative",
                    width: "100%",
                    padding: "18px 24px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #FF1F6D, #FFB400, #00C2FF, #22C55E)",
                    backgroundSize: "300% 300%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <div style={{
                    position: "absolute", inset: "2px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "999px", backdropFilter: "blur(4px)", zIndex: 1
                  }} />
                  <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: "10px" }}>
                    <MessageCircle size={24} fill="currentColor" color="#ffffff" />
                    <span style={{ fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "1.1rem", color: "#ffffff", letterSpacing: "0.5px", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                      ¡Preguntar Ahora!
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>

          {/* 2. Carrusel unificado — cuadrado, lightbox al click, video nativo */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full flex flex-col gap-4">
              {/* Contenedor cuadrado del carrusel */}
              <motion.div
                initial={{ rotate: 1 }}
                whileHover={{ rotate: 0 }}
                className="relative w-full rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white bg-slate-100 transition-transform duration-500"
                style={{ aspectRatio: "1 / 1" }}
              >
                <AnimatePresence initial={false} custom={direccion} mode="popLayout">
                  <motion.div
                    key={fotoActual}
                    custom={direccion}
                    variants={{
                      enter: (d: number) => ({ x: d > 0 ? 800 : -800, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: (d: number) => ({ x: d < 0 ? 800 : -800, opacity: 0 })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute inset-0 w-full h-full"
                    onClick={() => {
                      // Solo abrir lightbox en imágenes; el video usa sus propios controles
                      if (!isVideo(sede.fotos[fotoActual])) setLightboxOpen(true);
                    }}
                    style={{ cursor: isVideo(sede.fotos[fotoActual]) ? "default" : "zoom-in" }}
                  >
                    {isVideo(sede.fotos[fotoActual]) ? (
                      /* Video nativo — borderRadius heredado del overflow-hidden del contenedor */
                      <video
                        src={sede.fotos[fotoActual]}
                        controls
                        playsInline
                        className="w-full h-full object-contain bg-black rounded-[2.5rem]"
                        style={{ display: "block" }}
                      />
                    ) : (
                      <Image 
                        src={sede.fotos[fotoActual]} 
                        alt="Instalaciones" 
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Flechas */}
                <button
                  onClick={(e) => { e.stopPropagation(); fotoAnterior(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl z-20 hover:scale-110 transition-all text-slate-800"
                >
                  <ChevronLeft size={28} strokeWidth={3} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); proximaFoto(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl z-20 hover:scale-110 transition-all text-slate-800"
                >
                  <ChevronRight size={28} strokeWidth={3} />
                </button>

                {/* Hint de click para ampliar (solo en imágenes) */}
                {!isVideo(sede.fotos[fotoActual]) && (
                  <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-20 pointer-events-none">
                    🔍 Click para ampliar
                  </div>
                )}
              </motion.div>

              {/* Dots de navegación — fuera del carrusel para no tapar */}
              {sede.fotos.length > 1 && (
                <div className="flex justify-center gap-2">
                  {sede.fotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDireccion(i > fotoActual ? 1 : -1); setFotoActual(i); }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        fotoActual === i
                          ? "w-8 bg-slate-700"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Mapa */}
          <div className="lg:col-span-3 flex flex-col">
            <motion.div
              initial={{ rotate: -1 }}
              whileHover={{ rotate: 0 }}
              className="flex-1 transition-transform duration-500"
            >
              <NeonGradientCard
                className="h-full"
                neonColors={{ firstColor: sede.color, secondColor: "#ffffff" }}
                borderRadius={56}
              >
                <div className="w-full h-full min-h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-white bg-slate-50">
                  <iframe
                    src={sede.mapaUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "contrast(1.1) brightness(1.05)" }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </NeonGradientCard>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-white shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.05)]">
        <Footer />
      </div>

      <WhatsAppButton />

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={fotoActual}
        plugins={[Video]}
      />
    </main>
  );
}
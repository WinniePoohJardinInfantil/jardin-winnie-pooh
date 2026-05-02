"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { BlurFade } from "@/components/ui/blur-fade";
import { Backlight } from "@/components/ui/backlight"; 
import { AuroraText } from "@/components/ui/aurora-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import dynamic from "next/dynamic";

// Lazy load del Lightbox para mejorar performance
const LightboxDynamic = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
  loading: () => null
});

// Reutilizamos el HighLight del Hero para consistencia visual
const HighLight = ({ children, color = "#FFB40033", type = "box" }: { children: React.ReactNode, color?: string, type?: "box" | "underline" }) => (
  <span style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
    <span style={{
      position: "absolute",
      left: "-2px",
      right: "-2px",
      bottom: type === "underline" ? "4px" : "0",
      height: type === "underline" ? "8px" : "100%",
      backgroundColor: color,
      zIndex: -1,
      borderRadius: type === "underline" ? "0" : "8px",
      transform: "rotate(-1deg)",
    }} />
    {children}
  </span>
);

interface MediaItem {
  name: string;
  url: string;
  position: number;
  type: "image" | "video";
}

export default function Galeria() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const isVideo = (name: string) => /\.(mp4|mov|webm|avi|mkv)$/i.test(name);

  useEffect(() => {
    const fetchImages = async () => {
      const { data: storageData } = await supabase.storage.from("galeria").list();
      const { data: orderData } = await supabase
        .from("gallery_order")
        .select("*")
        .order("position", { ascending: true });

      if (!storageData) { setLoading(false); return; }

      const orderMap = new Map<string, number>();
      orderData?.forEach((row) => orderMap.set(row.file_name, row.position));

      const mediaItems: MediaItem[] = storageData.map((file) => ({
        name: file.name,
        url: supabase.storage.from("galeria").getPublicUrl(file.name).data.publicUrl,
        position: orderMap.has(file.name) ? orderMap.get(file.name)! : 999,
        type: isVideo(file.name) ? "video" : "image",
      }));

      mediaItems.sort((a, b) => a.position - b.position);
      setItems(mediaItems);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const displayedItems = items.slice(0, 6);
  const slides = displayedItems.map((item) =>
    item.type === "video"
      ? { type: "video" as const, sources: [{ src: item.url, type: "video/mp4" }] }
      : { src: item.url }
  );

  const placeholders = [
    { color: "#FF789333", emoji: "🎨" },
    { color: "#FFFC0133", emoji: "🌟" },
    { color: "#4FF08433", emoji: "🎵" },
    { color: "#7AC0FF33", emoji: "🤸" },
    { color: "#EB810033", emoji: "📚" },
    { color: "#FF789333", emoji: "🏊" },
  ];

  return (
    <section id="galeria" style={{ 
      minHeight: "100vh", 
      position: "relative", 
      padding: "100px 20px", 
      overflow: "hidden", 
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      
      {/* --- FONDO CON MÁSCARA (Sincronizado con Hero) --- */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}>
          <Image
            src="/images/galeria-bg.jpeg" 
            alt="Fondo Decorativo"
            fill
            style={{ objectFit: "cover", objectPosition: "center", opacity: 0.6 }}
            quality={75}
            loading="lazy"
          />
        </div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%)", 
        }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 10, maxWidth: "1100px" }}>
        
        {/* --- CABECERA DE SECCIÓN --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", 
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            textShadow: "0 0 20px rgba(255, 255, 255, 1)",
          }}>
            <SparklesText sparklesCount={8} className="inline">
              <AuroraText colors={["#FF1F6D", "#FFB400", "#7E3AF2", "#00C2FF", "#22C55E"]}>
                Momentos que nos
              </AuroraText>
            </SparklesText>
            <br />
            <AuroraText colors={["#00D1FF", "#FF2E63", "#4ADE80"]}>
              llenan de alegría
            </AuroraText>
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
            Cada día está lleno de <HighLight color="#fffc0155">aprendizaje</HighLight>, 
            risas y <HighLight color="#4ade8055" type="underline">momentos especiales</HighLight>
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: "center", fontFamily: "var(--font-fredoka)", fontSize: "1.5rem", color: "#FF1F6D", padding: "4rem 0" }}>
            Cargando momentos felices... 🐻
          </div>
        ) : (
          <>
            {/* --- CONTENEDOR DE GALERÍA CON EFECTO --- */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Backlight se mantiene simple para evitar errores de tipos */}
              <Backlight className="rounded-[var(--radius)]" />
              
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: "1.5rem", 
                position: "relative", 
                zIndex: 1 
              }}>
                {(displayedItems.length > 0
                  ? displayedItems
                  : placeholders.map((_, i) => ({ name: `placeholder-${i}`, url: "", position: i, type: "image" as const }))
                ).map((item, i) => (
                  <BlurFade key={item.name} delay={i * 0.1} inView>
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                      style={{
                        aspectRatio: "1/1",
                        borderRadius: "2rem",
                        overflow: "hidden",
                        cursor: displayedItems.length > 0 ? "pointer" : "default",
                        background: placeholders[i]?.color || "#f0f0f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "3rem",
                        position: "relative",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        border: "8px solid white" 
                      }}
                      onClick={() => { if (displayedItems.length > 0) { setPhotoIndex(i); setOpenLightbox(true); } }}
                    >
                      {item.url ? (
                        item.type === "video" ? (
                          <>
                            <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted playsInline />
                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                               <span style={{ fontSize: "3rem", filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.3))" }}>▶️</span>
                            </div>
                          </>
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={item.url} alt="Actividad Winnie Pooh" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                        )
                      ) : (
                        placeholders[i]?.emoji
                      )}
                    </motion.div>
                  </BlurFade>
                ))}
              </div>
            </div>

            <LightboxDynamic 
              open={openLightbox} 
              close={() => setOpenLightbox(false)} 
              slides={slides} 
              index={photoIndex} 
              plugins={[Video]} 
              animation={{ fade: 300 }} 
            />

            {/* --- CTA FINAL: BOTÓN AURORA ANIMADO --- */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
>
  <Link href="/galeria" style={{ textDecoration: "none" }}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "relative",
        padding: "16px 40px",
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
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Capa de brillo interna para suavizar el color */}
      <div style={{
        position: "absolute",
        inset: "2px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "999px",
        backdropFilter: "blur(4px)",
        zIndex: 1
      }} />

      <span style={{ 
        fontFamily: "var(--font-fredoka)", 
        fontWeight: 700, 
        fontSize: "1.3rem", 
        color: "#ffffff",
        letterSpacing: "0.5px",
        position: "relative",
        zIndex: 2,
        textShadow: "0 2px 4px rgba(0,0,0,0.2)"
      }}>
        Ver todas nuestras aventuras 📸
      </span>
    </motion.button>
  </Link>
</motion.div>
          </>
        )}
      </div>
    </section>
  );
}
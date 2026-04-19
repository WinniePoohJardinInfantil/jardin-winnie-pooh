"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { BlurFade } from "@/components/ui/blur-fade";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Backlight } from "@/components/ui/backlight"; 
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

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
    <section id="galeria" style={{ background: "#fafafa", position: "relative", padding: "5rem 0" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{ display: "inline-block", background: "#7AC0FF22", color: "#1a4a8a", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.82rem", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "1rem" }}>
            📸 Galería
          </span>
          <h2 style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)" }}>
            Momentos que nos llenan de alegría
          </h2>
          <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", fontSize: "1rem", maxWidth: "460px", margin: "0.75rem auto 0", lineHeight: 1.7 }}>
            Cada día está lleno de aprendizaje, risas y momentos especiales
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: "center", fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", padding: "4rem 0" }}>
            Cargando momentos felices... 🐻
          </div>
        ) : (
          <>
            <Backlight className="rounded-[var(--radius)]">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", position: "relative", zIndex: 1 }}>
                {(displayedItems.length > 0
                  ? displayedItems
                  : placeholders.map((_, i) => ({ name: `placeholder-${i}`, url: "", position: i, type: "image" as const }))
                ).map((item, i) => (
                  <BlurFade key={item.name} delay={i * 0.07} inView>
                    <div
                      style={{
                        aspectRatio: "1/1",
                        borderRadius: "var(--radius)",
                        overflow: "hidden",
                        cursor: displayedItems.length > 0 ? "pointer" : "default",
                        transition: "transform 0.3s",
                        background: placeholders[i]?.color || "#f0f0f0",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "3rem",
                        position: "relative",
                      }}
                      onClick={() => { if (displayedItems.length > 0) { setPhotoIndex(i); setOpenLightbox(true); } }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                      {item.url ? (
                        item.type === "video" ? (
                          <>
                            <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted playsInline />
                            <div style={{ position: "absolute", bottom: "0.4rem", right: "0.4rem", background: "rgba(0,0,0,0.6)", borderRadius: "999px", padding: "0.2rem 0.5rem", fontFamily: "var(--font-nunito)", fontSize: "0.68rem", color: "#fff", fontWeight: 700 }}>🎥</div>
                          </>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.url} alt="Actividad" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )
                      ) : (
                        placeholders[i]?.emoji
                      )}
                    </div>
                  </BlurFade>
                ))}
              </div>
            </Backlight>

            <Lightbox open={openLightbox} close={() => setOpenLightbox(false)} slides={slides} index={photoIndex} plugins={[Video]} animation={{ fade: 300 }} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
            >
              <Link href="/galeria" style={{ textDecoration: "none" }}>
                <RainbowButton className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}

                    <span style={{ 
                      fontFamily: "var(--font-nunito)", 
                      fontWeight: 800, 
                      fontSize: "1.1rem", 
                      color: "#ffffff"
                    }}>
                      Mira todas nuestras aventuras →
                    </span>
                  </div>
                </RainbowButton>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
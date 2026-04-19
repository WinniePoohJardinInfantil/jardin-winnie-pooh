"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { Backlight } from "@/components/ui/backlight";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface MediaItem {
  name: string;
  url: string;
  position: number;
  type: "image" | "video";
}

export default function PaginaGaleriaCompleta() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const isVideo = (name: string) => /\.(mp4|mov|webm|avi|mkv)$/i.test(name);

  useEffect(() => {
    const fetchAll = async () => {
      const { data: storageData } = await supabase.storage.from("galeria").list();
      const { data: orderData } = await supabase
        .from("gallery_order")
        .select("*")
        .order("position", { ascending: true });

      if (!storageData) return;

      const orderMap = new Map<string, number>();
      orderData?.forEach((row) => orderMap.set(row.file_name, row.position));

      const mediaItems: MediaItem[] = storageData.map((file) => ({
        name: file.name,
        url: supabase.storage.from("galeria").getPublicUrl(file.name).data.publicUrl,
        position: orderMap.get(file.name) ?? 999,
        type: isVideo(file.name) ? "video" : "image",
      }));

      mediaItems.sort((a, b) => a.position - b.position);
      setItems(mediaItems);
      setLoading(false);
    };
    fetchAll();
  }, []);

  const slides = items.map((item) =>
    item.type === "video"
      ? { type: "video" as const, sources: [{ src: item.url, type: "video/mp4" }] }
      : { src: item.url }
  );

  return (
    <>
      <Navbar />
      <main style={{ background: "#fafafa", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
        <div className="container">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "3rem" }}
          >
            <Link
              href="/#galeria"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.875rem",
                color: "var(--muted-foreground)", textDecoration: "none",
                marginBottom: "1.5rem", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
            >
              ← Volver al inicio
            </Link>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{
                  display: "inline-block",
                  background: "#7AC0FF22", color: "#1a4a8a",
                  fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.82rem",
                  padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "0.75rem",
                }}>
                  📸 Galería completa
                </span>
                <h1 style={{
                  fontFamily: "var(--font-fredoka)",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "var(--foreground)", lineHeight: 1.1,
                }}>
                  Toda nuestra aventura 🐻
                </h1>
              </div>
              <div style={{
                background: "#fff", border: "1.5px solid var(--border)",
                borderRadius: "1rem", padding: "0.75rem 1.25rem",
                fontFamily: "var(--font-nunito)", fontSize: "0.875rem",
                color: "var(--muted-foreground)",
              }}>
                {items.length} momentos especiales
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "6rem", fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐻</div>
              Buscando todos nuestros recuerdos...
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "6rem", fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)" }}>
              Aún no hemos subido fotos aquí.
            </div>
          ) : (
            <div style={{
              columnCount: items.length > 10 ? 4 : 3,
              columnGap: "1rem",
            }}>
              {items.map((item, i) => (
                <BlurFade key={item.name} delay={i * 0.03} inView>
                  <div style={{ breakInside: "avoid", marginBottom: "1rem" }}>
                    <Backlight className="rounded-2xl">
                      <motion.div
                        style={{
                          borderRadius: "1rem",
                          overflow: "hidden",
                          background: "#fff",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => { setPhotoIndex(i); setOpenLightbox(true); }}
                      >
                        {item.type === "video" ? (
                          <>
                            <video
                              src={item.url}
                              style={{ width: "100%", height: "auto", display: "block" }}
                              muted playsInline
                            />
                            <div style={{
                              position: "absolute", bottom: "0.5rem", right: "0.5rem",
                              background: "rgba(0,0,0,0.6)", borderRadius: "999px",
                              padding: "0.25rem 0.6rem",
                              fontFamily: "var(--font-nunito)", fontSize: "0.72rem",
                              color: "#fff", fontWeight: 700,
                            }}>
                              🎥 Video
                            </div>
                          </>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt="Galería"
                            style={{ width: "100%", height: "auto", display: "block" }}
                          />
                        )}
                      </motion.div>
                    </Backlight>
                  </div>
                </BlurFade>
              ))}
            </div>
          )}
        </div>

        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={slides}
          index={photoIndex}
          plugins={[Video]}
          animation={{ fade: 300 }}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
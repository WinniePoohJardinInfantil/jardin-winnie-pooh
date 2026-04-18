"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Galeria() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from("galeria").list();
      if (!error && data) {
        setImages(data.map((file) => ({
          name: file.name,
          url: supabase.storage.from("galeria").getPublicUrl(file.name).data.publicUrl,
        })));
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  const displayedImages = images.slice(0, 6);
  const slides = displayedImages.map((img) => ({ src: img.url }));

  const placeholders = [
    { color: "#FF789333", emoji: "🎨" },
    { color: "#FFFC0133", emoji: "🌟" },
    { color: "#4FF08433", emoji: "🎵" },
    { color: "#7AC0FF33", emoji: "🤸" },
    { color: "#EB810033", emoji: "📚" },
    { color: "#FF789333", emoji: "🏊" },
  ];

  return (
    <section id="galeria" style={{ background: "#fafafa" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{
            display: "inline-block",
            background: "#7AC0FF22",
            color: "#1a4a8a",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.82rem",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            marginBottom: "1rem",
          }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              {(displayedImages.length > 0 ? displayedImages : placeholders.map((p, i) => ({ name: `placeholder-${i}`, url: "" }))).map((img, i) => (
                <BlurFade key={img.name} delay={i * 0.07} inView>
                  <div
                    style={{
                      aspectRatio: "1/1",
                      borderRadius: "var(--radius)",
                      overflow: "hidden",
                      cursor: displayedImages.length > 0 ? "pointer" : "default",
                      transition: "transform 0.3s",
                      background: placeholders[i]?.color || "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                    }}
                    onClick={() => { if (displayedImages.length > 0) { setPhotoIndex(i); setOpenLightbox(true); } }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    {img.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.url} alt="Actividad" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      placeholders[i]?.emoji
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>

            <Lightbox
              open={openLightbox}
              close={() => setOpenLightbox(false)}
              slides={slides}
              index={photoIndex}
              animation={{ fade: 300 }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
            >
              <Link href="/galeria" style={{ textDecoration: "none" }}>
                <ShimmerButton
                  shimmerColor="#ffffff"
                  shimmerSize="0.1em"
                  background="var(--foreground)" // Usa el color principal del sitio
                  className="shadow-2xl"
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    padding: "0.85rem 2.5rem",
                    borderRadius: "999px",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.2s"
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    🐻 Mira todas nuestras aventuras →
                  </span>
                </ShimmerButton>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
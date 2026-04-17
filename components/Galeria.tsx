"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
// IMPORTAMOS EL LIGHTBOX Y SUS ESTILOS
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Galeria() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ESTADO PARA EL LIGHTBOX
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage.from("galeria").list();
      
      if (error) {
        console.error("Error cargando galería:", error);
      } else if (data) {
        const imageUrls = data.map((file) => ({
          name: file.name,
          url: supabase.storage.from("galeria").getPublicUrl(file.name).data.publicUrl,
        }));
        setImages(imageUrls);
      }
      setLoading(false);
    };

    fetchImages();
  }, []);

  // Lógica de limitación
  const limit = 9;
  const displayedImages = images.slice(0, limit);
  const hasMore = images.length > limit;

  // Preparamos las fotos para el Lightbox (solo necesitamos la URL)
  const slides = displayedImages.map((img) => ({ src: img.url }));

  const handlePhotoClick = (index: number) => {
    setPhotoIndex(index);
    setOpenLightbox(true);
  };

  return (
    <section id="galeria" style={{ background: "var(--color-white)", padding: "4rem 0" }}>
      <div className="container">
        {/* Cabecera */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span style={{
              display: "inline-block",
              background: "#c084fc22",
              color: "#7c3aed",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              marginBottom: "1rem",
            }}>
            📸 Galería
          </span>
          <h2 style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "var(--color-text)" }}>
            Momentos que nos llenan de alegría
          </h2>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: "center", fontFamily: "var(--font-nunito)", color: "var(--color-text-muted)" }}>
            Cargando momentos felices... 🐻
          </div>
        ) : (
          <>
            {/* GRILLA FORZADA 3x3 */}
            <div style={{
                display: "grid",
                // FORZAMOS 3 COLUMNAS SIEMPRE
                gridTemplateColumns: "repeat(3, 1fr)", 
                gap: "1.25rem",
              }}>
              {displayedImages.map((img, i) => (
                <motion.div
                  key={img.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  // Quitamos el delay escalonado para que no se rompa la grilla al cargar
                  transition={{ duration: 0.4 }} 
                  style={{
                    borderRadius: "var(--radius)",
                    // Mantenemos la proporción cuadrada para la grilla
                    aspectRatio: "1/1", 
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                    background: "var(--color-cream)",
                    cursor: "pointer", // Indicamos que es clicable
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handlePhotoClick(i)} // Abrimos Lightbox al hacer clic
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.url} 
                    alt="Actividad" 
                    style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", // Forzamos que llene el cuadrado
                    }} 
                  />
                </motion.div>
              ))}
            </div>

            {/* COMPONENTE LIGHTBOX */}
            <Lightbox
                open={openLightbox}
                close={() => setOpenLightbox(false)}
                slides={slides}
                index={photoIndex}
                // Opciones para navegación
                carousel={{ finite: slides.length <= 1 }} 
                // Animación de entrada suave
                animation={{ fade: 300 }} 
            />

            {/* Botón Ver Más */}
            {hasMore && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ textAlign: "center", marginTop: "3rem" }}
              >
                <Link href="/galeria" className="btn-primary" style={{ 
                  textDecoration: "none",
                  display: "inline-block",
                  padding: "1rem 2.5rem",
                  fontSize: "1.1rem"
                }}>
                  Ver galería completa ({images.length} fotos) 🐻
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
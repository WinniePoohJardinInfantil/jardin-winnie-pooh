"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
// IMPORTAMOS EL LIGHTBOX Y SUS ESTILOS
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PaginaGaleriaCompleta() {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ESTADO PARA EL LIGHTBOX
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await supabase.storage.from("galeria").list();
      if (data) {
        const urls = data.map(file => ({
          name: file.name,
          url: supabase.storage.from("galeria").getPublicUrl(file.name).data.publicUrl
        }));
        setImages(urls);
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Preparamos las fotos para el Lightbox
  const slides = images.map((img) => ({ src: img.url }));

  const handlePhotoClick = (index: number) => {
    setPhotoIndex(index);
    setOpenLightbox(true);
  };

  return (
    <main style={{ background: "var(--color-cream)", minHeight: "100vh", padding: "4rem 1rem" }}>
      <div className="container">
        <Link href="/" style={{ color: "var(--color-text)", textDecoration: "none", fontWeight: 700, marginBottom: "2rem", display: "inline-block" }}>
          ← Volver al inicio
        </Link>

        <h1 style={{ fontFamily: "var(--font-fredoka)", color: "var(--color-text)", fontSize: "3rem", marginBottom: "3rem" }}>
          Toda nuestra aventura 📸
        </h1>

        {loading ? (
          <div style={{ textAlign: "center", fontFamily: "var(--font-nunito)", padding: "3rem" }}>
            Buscando todos nuestros recuerdos... 🐻
          </div>
        ) : (
          <>
            {/* DISEÑO TIPO COLLAGE (CSS COLUMNS) */}
            <div style={{ 
                // Definimos el número de columnas
                columnCount: images.length > 10 ? 4 : 3, // Ajusta según la cantidad de fotos
                // Espacio entre columnas
                columnGap: "1rem", 
            }}>
              {images.map((img, i) => (
                <motion.div
                  key={img.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // Mantenemos el delay escalonado para el efecto de carga
                  transition={{ delay: i * 0.03 }} 
                  style={{ 
                    // Importante para CSS Columns
                    breakInside: "avoid", 
                    marginBottom: "1rem", // Espacio inferior entre fotos
                    borderRadius: "1rem", 
                    overflow: "hidden", 
                    background: "white",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.03)",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handlePhotoClick(i)} // Abrimos Lightbox
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.url} 
                    alt="Galería" 
                    style={{ 
                        width: "100%", 
                        // Mantenemos la proporción original de la foto
                        height: "auto", 
                        display: "block",
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
                carousel={{ finite: slides.length <= 1 }}
                animation={{ fade: 300 }}
            />
          </>
        )}

        {/* Mensaje extra si no hay ninguna foto todavía */}
        {!loading && images.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", fontFamily: "var(--font-nunito)" }}>
            Aún no hemos subido fotos aquí.
          </p>
        )}
      </div>
    </main>
  );
}
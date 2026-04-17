"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, Upload, Trash2, AlertCircle } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function AdminPanel() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // NUEVOS ESTADOS PARA EL MODAL PERSONALIZADO
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    const { data, error: fetchError } = await supabase.storage.from("galeria").list();
    
    if (fetchError) {
      console.error("Error cargando imágenes:", fetchError);
    } else if (data) {
      const imageUrls = data.map((file) => ({
        name: file.name,
        url: supabase.storage.from("galeria").getPublicUrl(file.name).data.publicUrl,
      }));
      setImages(imageUrls);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      await fetchImages();
    };

    if (isMounted) {
      loadData();
    }

    return () => { isMounted = false; };
  }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from("galeria").upload(filePath, file);

      if (uploadError) throw uploadError;
      await fetchImages(); 
    } catch (err) {
      console.error("Error detallado:", err);
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  };

  // 1. AHORA ESTA FUNCIÓN SOLO ABRE EL MODAL
  const openDeleteConfirmation = (name: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir el Lightbox al hacer clic en borrar
    setImageToDelete(name);
    setShowDeleteModal(true);
  };

  // 2. ESTA FUNCIÓN ES LA QUE REALMENTE BORRA DESDE EL MODAL
  const confirmDelete = async () => {
    if (!imageToDelete) return;

    const { error: deleteError } = await supabase.storage.from("galeria").remove([imageToDelete]);
    
    if (deleteError) {
      alert("Error al borrar");
    } else {
      await fetchImages();
    }

    setShowDeleteModal(false);
    setImageToDelete(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const slides = images.map((img) => ({ src: img.url }));

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)", padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-fredoka)", color: "var(--color-text)", fontSize: "2rem" }}>
              Panel de Control 🐻
            </h1>
            <p style={{ fontFamily: "var(--font-nunito)", color: "var(--color-text-muted)" }}>
                Tienes {images.length} fotos publicadas
            </p>
          </div>
          <button 
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", borderRadius: "99px", border: "none", background: "var(--color-text)", color: "white", cursor: "pointer" }}
          >
            <LogOut size={18} /> Salir
          </button>
        </div>

        {/* Upload Card */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "1.5rem", textAlign: "center", border: "2px dashed var(--color-border)", marginBottom: "3rem" }}>
          <input type="file" id="file-upload" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
          <label htmlFor="file-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--color-cream)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-honey)" }}>
              <Upload size={30} />
            </div>
            <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700 }}>
              {uploading ? "Subiendo..." : "Haz clic para subir una foto nueva"}
            </span>
          </label>
        </div>

        {/* Gallery */}
        <div style={{ 
            columnCount: images.length > 0 ? (images.length < 5 ? 2 : 4) : 1, 
            columnGap: "1.5rem" 
        }}>
          {images.map((img, i) => (
            <motion.div 
              key={img.name} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                breakInside: "avoid", 
                marginBottom: "1.5rem", 
                background: "white", 
                borderRadius: "1rem", 
                overflow: "hidden", 
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
                position: "relative",
                cursor: "pointer"
              }}
              onClick={() => {
                setPhotoIndex(i);
                setOpenLightbox(true);
              }}
              whileHover={{ y: -5 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.url} 
                alt="Galería" 
                style={{ width: "100%", height: "auto", display: "block" }} 
              />
              
              <div style={{ 
                position: "absolute", 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)",
              }}>
                <button 
                  onClick={(e) => openDeleteConfirmation(img.name, e)}
                  style={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "10px", 
                    background: "#ff4757", 
                    border: "none", 
                    padding: "8px", 
                    borderRadius: "50%", 
                    color: "white", 
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL DE CONFIRMACIÓN PERSONALIZADO */}
        <AnimatePresence>
          {showDeleteModal && (
            <div style={{ 
              position: "fixed", 
              inset: 0, 
              zIndex: 9999, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              padding: "1rem" 
            }}>
              {/* Overlay oscuro con desenfoque */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setShowDeleteModal(false)}
                style={{ 
                  position: "absolute", 
                  inset: 0, 
                  background: "rgba(0,0,0,0.4)", 
                  backdropFilter: "blur(4px)" 
                }}
              />
              
              {/* Contenido del Modal */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                style={{ 
                  background: "white", 
                  width: "100%", 
                  maxWidth: "400px", 
                  borderRadius: "2rem", 
                  padding: "2.5rem", 
                  position: "relative", 
                  textAlign: "center", 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)" 
                }}
              >
                <div style={{ color: "#ff4757", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                  <AlertCircle size={48} />
                </div>
                <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.5rem", color: "var(--color-text)", marginBottom: "0.5rem" }}>
                  ¿Eliminar foto?
                </h3>
                <p style={{ fontFamily: "var(--font-nunito)", color: "var(--color-text-muted)", marginBottom: "2rem" }}>
                  Esta acción no se puede deshacer. La foto desaparecerá de la galería pública.
                </p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button 
                    onClick={() => setShowDeleteModal(false)}
                    style={{ 
                      flex: 1, 
                      padding: "0.8rem", 
                      borderRadius: "99px", 
                      border: "1px solid var(--color-border)", 
                      background: "white", 
                      cursor: "pointer", 
                      fontFamily: "var(--font-nunito)", 
                      fontWeight: 700 
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmDelete}
                    style={{ 
                      flex: 1, 
                      padding: "0.8rem", 
                      borderRadius: "99px", 
                      border: "none", 
                      background: "#ff4757", 
                      color: "white", 
                      cursor: "pointer", 
                      fontFamily: "var(--font-nunito)", 
                      fontWeight: 700 
                    }}
                  >
                    Sí, eliminar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={slides}
          index={photoIndex}
        />

      </div>
    </div>
  );
}
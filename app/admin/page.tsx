"use client";

import { useEffect, useState, useCallback } from "react"; // Añadimos useCallback
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, Upload, Trash2 } from "lucide-react"; // Quitamos ImageIcon

export default function AdminPanel() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);

  // 1. Definimos la función ANTES del useEffect para evitar el error de declaración
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
    const load = async () => {
      await fetchImages();
    };
    load();
  }, [fetchImages]);

  // 2. Lógica para subir fotos
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
      fetchImages(); 
    } catch (err) {
      console.error("Error detallado:", err);
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (name: string) => {
    const { error: deleteError } = await supabase.storage.from("galeria").remove([name]);
    if (deleteError) alert("Error al borrar");
    else fetchImages();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-cream)", padding: "2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-fredoka)", color: "var(--color-text)", fontSize: "2rem" }}>
              Panel de Control 🐻
            </h1>
            <p style={{ fontFamily: "var(--font-nunito)", color: "var(--color-text-muted)" }}>Gestiona la galería de fotos</p>
          </div>
          <button 
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", borderRadius: "99px", border: "none", background: "var(--color-text)", color: "white", cursor: "pointer" }}
          >
            <LogOut size={18} /> Salir
          </button>
        </div>

        {/* Upload Card */}
        <div style={{ background: "white", padding: "2rem", borderRadius: "1.5rem", textAlign: "center", border: "2px dashed var(--color-border)", marginBottom: "2rem" }}>
          <input type="file" id="file-upload" hidden onChange={handleUpload} disabled={uploading} accept="image/*" />
          <label htmlFor="file-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--color-cream)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-honey)" }}>
              <Upload size={30} />
            </div>
            <span style={{ fontFamily: "var(--font-nunito)", fontWeight: 700 }}>
              {uploading ? "Subiendo..." : "Haz clic para subir una foto"}
            </span>
          </label>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {images.map((img) => (
            <div key={img.name} style={{ background: "white", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="Galería" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <button 
                onClick={() => deleteImage(img.name)}
                style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(255,255,255,0.9)", border: "none", padding: "6px", borderRadius: "8px", color: "var(--color-red)", cursor: "pointer" }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
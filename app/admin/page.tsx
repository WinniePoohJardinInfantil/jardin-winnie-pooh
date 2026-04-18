"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut,  Trash2, AlertCircle, ExternalLink, GripVertical } from "lucide-react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";

interface MediaItem {
  name: string;
  url: string;
  position: number;
  type: "image" | "video";
}

export default function AdminPanel() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isVideo = (name: string) =>
    /\.(mp4|mov|webm|avi|mkv)$/i.test(name);

  const fetchItems = useCallback(async () => {
    const { data: storageData, error } = await supabase.storage.from("galeria").list();
    if (error || !storageData) return;

    const { data: orderData } = await supabase
      .from("gallery_order")
      .select("*")
      .order("position", { ascending: true });

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
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchItems();
    };
    loadData();
  }, [fetchItems]);

  const saveOrder = async (newItems: MediaItem[]) => {
    setSaving(true);
    const upserts = newItems.map((item, i) => ({
      file_name: item.name,
      position: i,
    }));
    await supabase.from("gallery_order").upsert(upserts, { onConflict: "file_name" });
    setSaving(false);
  };

  const handleReorder = (newItems: MediaItem[]) => {
    setItems(newItems);
    saveOrder(newItems);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage.from("galeria").upload(fileName, file);
      if (!error) {
        const maxPos = items.length + i;
        await supabase.from("gallery_order").upsert(
          { file_name: fileName, position: maxPos },
          { onConflict: "file_name" }
        );
      }
      setUploadProgress(Math.round(((i + 1) / files.length) * 100));
    }

    await fetchItems();
    setUploading(false);
    setUploadProgress(0);
    e.target.value = "";
  };

  const openDeleteConfirmation = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItemToDelete(name);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await supabase.storage.from("galeria").remove([itemToDelete]);
    await supabase.from("gallery_order").delete().eq("file_name", itemToDelete);
    await fetchItems();
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const slides = items.map((item) =>
    item.type === "video"
      ? {
          type: "video" as const,
          sources: [{ src: item.url, type: "video/mp4" }],
        }
      : { src: item.url }
  );

  const imageCount = items.filter((i) => i.type === "image").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f8" }}>

      {/* Navbar Admin */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "0.875rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #FFFC01, #EB8100)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem",
          }}>🐻</div>
          <div>
            <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.1rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1 }}>
              Panel de Control
            </div>
            <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.65rem", color: "var(--muted-foreground)", letterSpacing: "0.06em" }}>
              JARDÍN WINNIE POOH
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {saving && (
            <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
              Guardando orden...
            </span>
          )}
          
          <a
            href="https://winniepoohjardininfantil.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: "#4FF084", color: "#1a1a1a",
              fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.85rem",
              padding: "0.5rem 1.1rem", borderRadius: "999px",
              textDecoration: "none", boxShadow: "0 4px 12px #4FF08444",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <ExternalLink size={14} /> Ver página en vivo
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              background: "#111", color: "#fff",
              fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.85rem",
              padding: "0.5rem 1.1rem", borderRadius: "999px",
              border: "none", cursor: "pointer",
            }}
          >
            <LogOut size={14} /> Salir
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total archivos", value: items.length, emoji: "📁", color: "#7AC0FF" },
            { label: "Fotos", value: imageCount, emoji: "📸", color: "#FF7893" },
            { label: "Videos", value: videoCount, emoji: "🎥", color: "#4FF084" },
          ].map((stat) => (
            <div key={stat.label} style={{
              position: "relative",
              background: "#fff",
              borderRadius: "1.25rem",
              padding: "1.25rem 1.5rem",
              border: "1.5px solid var(--border)",
              overflow: "hidden",
            }}>
              <BorderBeam size={80} duration={6} colorFrom={stat.color} colorTo={stat.color + "88"} />
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{stat.emoji}</div>
              <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "2rem", fontWeight: 700, color: stat.color }}>
                <NumberTicker value={stat.value} />
              </div>
              <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.8rem", color: "var(--muted-foreground)", fontWeight: 600 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        <div style={{
          position: "relative",
          background: "#fff",
          borderRadius: "1.5rem",
          border: "2px dashed var(--border)",
          padding: "2.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "#7AC0FF";
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
          onDrop={async (e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "var(--border)";
            const files = Array.from(e.dataTransfer.files);
            const dt = new DataTransfer();
            files.forEach((f) => dt.items.add(f));
            const fakeEvent = { target: { files: dt.files, value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
            await handleUpload(fakeEvent);
          }}
        >
          <input
            type="file"
            id="file-upload"
            hidden
            onChange={handleUpload}
            disabled={uploading}
            accept="image/*,video/*"
            multiple
          />
          <label htmlFor="file-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "64px", height: "64px",
              background: "linear-gradient(135deg, #7AC0FF22, #4FF08422)",
              borderRadius: "1rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.75rem",
            }}>
              {uploading ? "⏳" : "📤"}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.2rem", color: "var(--foreground)", marginBottom: "0.25rem" }}>
                {uploading ? `Subiendo... ${uploadProgress}%` : "Sube fotos y videos"}
              </div>
              <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "var(--muted-foreground)" }}>
                Arrastra archivos aquí o haz clic · Selección múltiple permitida
              </div>
            </div>
          </label>

          {uploading && (
            <div style={{ marginTop: "1rem", background: "var(--border)", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                style={{ height: "100%", background: "linear-gradient(90deg, #7AC0FF, #4FF084)", borderRadius: "999px" }}
              />
            </div>
          )}
        </div>

        {/* Instrucción drag */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <GripVertical size={16} color="var(--muted-foreground)" />
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "var(--muted-foreground)" }}>
            Arrastra las tarjetas para reordenar · Las primeras 6 aparecen en la página principal
          </p>
        </div>

        {/* Grid reordenable */}
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={handleReorder}
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {items.map((item, i) => (
              <Reorder.Item key={item.name} value={item} style={{ listStyle: "none" }}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: "#fff",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                    border: i < 6 ? "2px solid #7AC0FF" : "2px solid var(--border)",
                    position: "relative",
                    cursor: "grab",
                    boxShadow: i < 6 ? "0 4px 16px #7AC0FF22" : "none",
                  }}
                  whileDrag={{ scale: 1.03, boxShadow: "0 16px 40px rgba(0,0,0,0.15)", cursor: "grabbing" }}
                >
                  {/* Badge posición */}
                  <div style={{
                    position: "absolute", top: "0.6rem", left: "0.6rem", zIndex: 2,
                    background: i < 6 ? "#7AC0FF" : "#11111188",
                    color: "#fff",
                    fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.7rem",
                    padding: "0.2rem 0.6rem", borderRadius: "999px",
                  }}>
                    {i < 6 ? `🏠 Portada #${i + 1}` : `#${i + 1}`}
                  </div>

                  {/* Preview */}
                  <div
                    style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f0f0f0", cursor: "pointer" }}
                    onClick={() => { setPhotoIndex(i); setOpenLightbox(true); }}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        muted
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt="Media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>

                  {/* Footer card */}
                  <div style={{ padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <GripVertical size={16} color="var(--muted-foreground)" />
                      <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
                        {item.type === "video" ? "🎥 Video" : "📸 Foto"}
                      </span>
                    </div>
                    <button
                      onClick={(e) => openDeleteConfirmation(item.name, e)}
                      style={{
                        background: "#ff475711",
                        border: "none",
                        padding: "0.4rem",
                        borderRadius: "0.5rem",
                        color: "#ff4757",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </div>
        </Reorder.Group>

        {items.length === 0 && !uploading && (
          <div style={{ textAlign: "center", padding: "4rem", fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            No hay fotos ni videos aún. ¡Sube el primero!
          </div>
        )}
      </div>

      {/* Modal eliminar */}
      <AnimatePresence>
        {showDeleteModal && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              style={{ background: "#fff", width: "100%", maxWidth: "400px", borderRadius: "2rem", padding: "2.5rem", position: "relative", textAlign: "center" }}
            >
              <div style={{ color: "#ff4757", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                <AlertCircle size={48} />
              </div>
              <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>
                ¿Eliminar archivo?
              </h3>
              <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", marginBottom: "2rem" }}>
                Esta acción no se puede deshacer. El archivo desaparecerá de la galería pública.
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "0.8rem", borderRadius: "999px", border: "1px solid var(--border)", background: "#fff", cursor: "pointer", fontFamily: "var(--font-nunito)", fontWeight: 700 }}>
                  Cancelar
                </button>
                <button onClick={confirmDelete} style={{ flex: 1, padding: "0.8rem", borderRadius: "999px", border: "none", background: "#ff4757", color: "#fff", cursor: "pointer", fontFamily: "var(--font-nunito)", fontWeight: 700 }}>
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
        plugins={[Video]}
        animation={{ fade: 300 }}
      />
    </div>
  );
}
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, Trash2, AlertCircle, ExternalLink, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import Link from "next/link";

interface MediaItem {
  name: string;
  url: string;
  position: number;
  type: "image" | "video";
}

// Tarjeta individual sortable
function SortableCard({
  item,
  index,
  onDelete,
  onPreview,
}: {
  item: MediaItem;
  index: number;
  onDelete: (name: string, e: React.MouseEvent) => void;
  onPreview: (index: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          background: "#fff",
          borderRadius: "1.25rem",
          overflow: "hidden",
          border: index < 6 ? "2px solid #7AC0FF" : "2px solid var(--border)",
          position: "relative",
          boxShadow: index < 6 ? "0 4px 16px #7AC0FF22" : "none",
          userSelect: "none",
        }}
      >
        {/* Badge */}
        <div style={{
          position: "absolute", top: "0.6rem", left: "0.6rem", zIndex: 3,
          background: index < 6 ? "#7AC0FF" : "#11111188",
          color: "#fff",
          fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.7rem",
          padding: "0.2rem 0.6rem", borderRadius: "999px",
          pointerEvents: "none",
        }}>
          {index < 6 ? `🏠 Portada #${index + 1}` : `#${index + 1}`}
        </div>

        {/* Handle drag — solo esta área arrastra */}
        <div
          {...attributes}
          {...listeners}
          style={{
            position: "absolute", top: "0.6rem", right: "0.6rem", zIndex: 3,
            background: "rgba(0,0,0,0.5)",
            borderRadius: "0.5rem",
            padding: "0.3rem",
            cursor: "grab",
            display: "flex", alignItems: "center",
            color: "#fff",
            touchAction: "none",
          }}
        >
          <GripVertical size={16} />
        </div>

        {/* Preview — click abre lightbox */}
        <div
          style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f0f0f0", cursor: "pointer" }}
          onClick={() => onPreview(index)}
        >
          {item.type === "video" ? (
            <video
              src={item.url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted playsInline
              onMouseEnter={(e) => {
                const video = e.currentTarget;
                video.play().catch(() => {
                  // Silently handle play interruption
                });
              }}
              onMouseLeave={(e) => {
                const video = e.currentTarget;
                video.pause();
                video.currentTime = 0;
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.url} alt="Media" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "0.65rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
            {item.type === "video" ? "🎥 Video" : "📸 Foto"}
          </span>
          <button
            onClick={(e) => onDelete(item.name, e)}
            style={{
              background: "#ff475711", border: "none", padding: "0.4rem",
              borderRadius: "0.5rem", color: "#ff4757", cursor: "pointer",
              display: "flex", alignItems: "center",
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
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
  const [activeId, setActiveId] = useState<string | null>(null);

  const isVideo = (name: string) => /\.(mp4|mov|webm|avi|mkv)$/i.test(name);

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
      position: orderMap.has(file.name) ? orderMap.get(file.name)! : 999,
      type: isVideo(file.name) ? "video" : "image",
    }));

    mediaItems.sort((a, b) => a.position - b.position);
    setItems(mediaItems);
  }, []);

  // --- SOLUCIÓN AL ERROR DE RENDERIZADO EN CASCADA ---
  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        await fetchItems();
      } catch (err) {
        console.error("Error al cargar items:", err);
      }
    };

    if (isMounted) {
      loadInitialData();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchItems]);
  // --------------------------------------------------

  const saveOrder = async (newItems: MediaItem[]) => {
    setSaving(true);
    const upserts = newItems.map((item, i) => ({ file_name: item.name, position: i }));
    await supabase.from("gallery_order").upsert(upserts, { onConflict: "file_name" });
    setSaving(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.name === active.id);
    const newIndex = items.findIndex((i) => i.name === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
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
        await supabase.from("gallery_order").upsert(
          { file_name: fileName, position: items.length + i },
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
      ? { type: "video" as const, sources: [{ src: item.url, type: "video/mp4" }] }
      : { src: item.url }
  );

  const activeItem = items.find((i) => i.name === activeId);
  const imageCount = items.filter((i) => i.type === "image").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f8" }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        padding: "0.85rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ 
            width: "42px", 
            height: "42px", 
            borderRadius: "50%", 
            background: "#ffffff", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            overflow: "hidden",
            position: "relative",
            border: "1px solid #f0f0f0"
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/jardin-infantil.png"
              alt="Logo Winnie Pooh"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "2px",
              }}
            />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.25rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1 }}>Panel de Control</div>
            <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.7rem", color: "#FF1F6D", fontWeight: 700, letterSpacing: "0.08em", marginTop: "2px" }}>JARDÍN INFANTIL</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {saving && <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.8rem", color: "var(--muted-foreground)" }}>Guardando...</span>}
          <a href="/#galeria" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#4FF084", color: "#1a1a1a", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.875rem", padding: "0.6rem 1rem", borderRadius: "999px", textDecoration: "none", boxShadow: "0 4px 14px #4FF08444", transition: "all 0.2s" }}>
            <ExternalLink size={14} /> Ver página en vivo
          </a>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#1e293b", color: "#fff", fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.875rem", padding: "0.6rem 1rem", borderRadius: "999px", border: "none", cursor: "pointer", transition: "all 0.2s" }}>
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
            <div key={stat.label} style={{ position: "relative", background: "#fff", borderRadius: "1.25rem", padding: "1.25rem 1.5rem", border: "1.5px solid var(--border)", overflow: "hidden" }}>
              <BorderBeam size={80} duration={6} colorFrom={stat.color} colorTo={stat.color + "88"} />
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{stat.emoji}</div>
              <div style={{ fontFamily: "var(--font-fredoka)", fontSize: "2rem", fontWeight: 700, color: stat.color }}>
                <NumberTicker value={stat.value} />
              </div>
              <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.8rem", color: "var(--muted-foreground)", fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upload Zone */}
        <div
          style={{ position: "relative", background: "#fff", borderRadius: "1.5rem", border: "2px dashed var(--border)", padding: "2.5rem", textAlign: "center", marginBottom: "2rem", transition: "border-color 0.2s" }}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = "#7AC0FF"; }}
          onDragLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
          onDrop={async (e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = "var(--border)";
            const dt = new DataTransfer();
            Array.from(e.dataTransfer.files).forEach((f) => dt.items.add(f));
            const fakeEvent = { target: { files: dt.files, value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
            await handleUpload(fakeEvent);
          }}
        >
          <input type="file" id="file-upload" hidden onChange={handleUpload} disabled={uploading} accept="image/*,video/*" multiple />
          <label htmlFor="file-upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "64px", height: "64px", background: "linear-gradient(135deg, #7AC0FF22, #4FF08422)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>
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
              <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} style={{ height: "100%", background: "linear-gradient(90deg, #7AC0FF, #4FF084)", borderRadius: "999px" }} />
            </div>
          )}
        </div>
        {/* Instrucción */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <GripVertical size={16} color="var(--muted-foreground)" />
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "var(--muted-foreground)" }}>
            Usa el ícono <strong>⠿</strong> de cada tarjeta para arrastrar y reordenar · Las primeras 6 aparecen en la página principal
          </p>
        </div>
        {/* Grid drag & drop */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map((i) => i.name)} strategy={rectSortingStrategy}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {items.map((item, i) => (
                <SortableCard
                  key={item.name}
                  item={item}
                  index={i}
                  onDelete={openDeleteConfirmation}
                  onPreview={(idx) => { setPhotoIndex(idx); setOpenLightbox(true); }}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeItem && (
              <div style={{ background: "#fff", borderRadius: "1.25rem", overflow: "hidden", border: "2px solid #7AC0FF", boxShadow: "0 20px 50px rgba(0,0,0,0.2)", opacity: 0.95, rotate: "2deg" }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f0f0f0" }}>
                  {activeItem.type === "video" ? (
                    <video src={activeItem.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={activeItem.url} alt="drag" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <div style={{ padding: "0.65rem 1rem", fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "var(--muted-foreground)" }}>
                  {activeItem.type === "video" ? "🎥 Video" : "📸 Foto"}
                </div>
              </div>
            )}
          </DragOverlay>
        </DndContext>

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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDeleteModal(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} style={{ background: "#fff", width: "100%", maxWidth: "400px", borderRadius: "2rem", padding: "2.5rem", position: "relative", textAlign: "center" }}>
              <div style={{ color: "#ff4757", marginBottom: "1rem", display: "flex", justifyContent: "center" }}><AlertCircle size={48} /></div>
              <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.5rem", color: "var(--foreground)", marginBottom: "0.5rem" }}>¿Eliminar archivo?</h3>
              <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", marginBottom: "2rem" }}>Esta acción no se puede deshacer.</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "0.8rem", borderRadius: "999px", border: "1px solid var(--border)", background: "#fff", cursor: "pointer", fontFamily: "var(--font-nunito)", fontWeight: 700 }}>Cancelar</button>
                <button onClick={confirmDelete} style={{ flex: 1, padding: "0.8rem", borderRadius: "999px", border: "none", background: "#ff4757", color: "#fff", cursor: "pointer", fontFamily: "var(--font-nunito)", fontWeight: 700 }}>Sí, eliminar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Lightbox open={openLightbox} close={() => setOpenLightbox(false)} slides={slides} index={photoIndex} plugins={[Video]} animation={{ fade: 300 }} />

      {/* Footer */}
      <footer style={{ 
        background: "#fff", 
        color: "#334155", 
        borderTop: "1px solid #f1f5f9",
        padding: "2rem 2rem 1.5rem",
        marginTop: "4rem"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.9rem", color: "#94a3b8", fontWeight: 600 }}>
            © 2026 Winnie Pooh Medellín.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "var(--font-nunito)", fontSize: "0.9rem", color: "#94a3b8", fontWeight: 600 }}>
            Hecho con <span style={{ color: "#FF7893" }}>❤️</span> por 
            <a href="https://serstack-es.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#1e293b", textDecoration: "none", fontWeight: 800 }}>
              SerStack
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
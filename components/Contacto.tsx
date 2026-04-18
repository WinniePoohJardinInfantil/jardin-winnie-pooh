"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { BorderBeam } from "@/components/ui/border-beam";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const contactos = [
  { icon: Phone, label: "WhatsApp", valor: "311 605 53 32", href: "https://wa.me/573116055332", color: "#4FF084", bg: "#4FF08422" },
  { icon: Mail, label: "Correo", valor: "wpjardininfantil@hotmail.com", href: "mailto:wpjardininfantil@hotmail.com", color: "#7AC0FF", bg: "#7AC0FF22" },
  { icon: InstagramIcon, label: "Instagram", valor: "@wpjardininfantil", href: "https://instagram.com/wpjardininfantil", color: "#FF7893", bg: "#FF789322" },
  { icon: Star, label: "Reseñas Google", valor: "Déjanos tu opinión ⭐", href: "https://maps.google.com", color: "#FFFC01", bg: "#FFFC0122" },
];

const sedes = [
  { nombre: "Jardín Infantil & After Class", direccion: "Cll51 #81a-25" },
  { nombre: "Winnie Pooh Babies", direccion: "Cra81 #52-58" },
];

export default function Contacto() {
  return (
    <section id="contacto" style={{ background: "#ffffff" }}>
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
            background: "#4FF08422",
            color: "#1a7a40",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.82rem",
            padding: "0.35rem 1rem",
            borderRadius: "999px",
            marginBottom: "1rem",
          }}>
            💬 Contáctenos
          </span>
          <h2 style={{ fontFamily: "var(--font-fredoka)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--foreground)" }}>
            Estamos para atenderle
          </h2>
          <p style={{ fontFamily: "var(--font-nunito)", color: "var(--muted-foreground)", fontSize: "1rem", maxWidth: "460px", margin: "0.75rem auto 0", lineHeight: 1.7 }}>
            Comuníquese con nosotros, con gusto le contamos todo sobre nuestros programas
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }}>
          
          {/* Tarjetas contacto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {contactos.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "#fff",
                  border: "1.5px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "1.1rem 1.4rem",
                  textDecoration: "none",
                  color: "var(--foreground)",
                  transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.transform = "translateX(5px)";
                  e.currentTarget.style.boxShadow = `0 4px 20px ${c.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ background: c.bg, borderRadius: "0.75rem", padding: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: c.color }}>
                  <c.icon size={20} color={c.color} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.72rem", color: "var(--muted-foreground)", fontWeight: 600, marginBottom: "0.1rem" }}>
                    {c.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.92rem", fontWeight: 700, color: "var(--foreground)" }}>
                    {c.valor}
                  </div>
                </div>
              </motion.a>
            ))}

            <div style={{ marginTop: "0.5rem" }}>
              <PulsatingButton
                pulseColor="#4FF084"
                className="w-full"
                onClick={() => window.open("https://wa.me/573116055332", "_blank")}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "0.85rem",
                  borderRadius: "999px",
                  background: "#4FF084",
                  color: "#1a1a1a",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                💬 Escribir por WhatsApp ahora
              </PulsatingButton>
            </div>
          </div>

          {/* Sedes y horarios con BorderBeam */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", background: "#fff", border: "1.5px solid var(--border)", borderRadius: "1.25rem", padding: "2rem", overflow: "hidden" }}
          >
            <BorderBeam size={200} duration={8} colorFrom="#FF7893" colorTo="#7AC0FF" />

            <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.4rem", color: "var(--foreground)", marginBottom: "1.25rem" }}>
              📍 Nuestras Ubicaciones
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
              {sedes.map((sede) => (
                <div key={sede.nombre} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <MapPin size={18} color="var(--color-orange)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 700, fontSize: "0.92rem", color: "var(--foreground)" }}>
                      {sede.nombre}
                    </div>
                    <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.82rem", color: "var(--muted-foreground)" }}>
                      {sede.direccion}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fafafa", borderRadius: "0.875rem", padding: "1.25rem" }}>
              <h4 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.05rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                🕐 Horarios de Atención
              </h4>
              {[
                { label: "Tiempo Completo", hora: "7:00am - 5:00pm" },
                { label: "Mañana", hora: "8:00am - 12:00pm" },
                { label: "Tarde", hora: "1:00pm - 5:00pm" },
                { label: "Periodo Escolar", hora: "15 Enero - 15 Diciembre" },
              ].map((h) => (
                <div key={h.label} style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-nunito)", fontSize: "0.85rem", padding: "0.4rem 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{h.label}</span>
                  <span style={{ color: "var(--muted-foreground)" }}>{h.hora}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
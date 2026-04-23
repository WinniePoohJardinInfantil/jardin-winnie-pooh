"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { AuroraText } from "@/components/ui/aurora-text";

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  // Los mismos colores que usaste en el Hero para mantener la identidad visual
  const auroraColors = ["#00f7ff", "#ff4167", "#3cff01", "#7AC0FF", "#4FF084"];

  return (
    <section id="contacto" style={{ background: "#ffffff", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      
      {/* BLOBS DE FONDO (Para que combine con el Hero) */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 400, height: 400, top: "10%", right: "-100px", borderRadius: "50%", background: "#FF789308", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 400, height: 400, bottom: "10%", left: "-100px", borderRadius: "50%", background: "#4FF08408", filter: "blur(80px)" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4.5rem" }}
        >
          {/* TÍTULO: Usando Fraiche y AuroraText con los colores del Hero */}
          <h2 style={{ 
            fontFamily: "var(--font-fredoka), sans-serif", 
            fontSize: "clamp(2.8rem, 6vw, 4.2rem)", 
            color: "#334155",
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
          }}>
            <AuroraText colors={auroraColors}>
              Estamos para atenderle
            </AuroraText>
          </h2>
          
          <p style={{ 
            fontFamily: "var(--font-nunito)", 
            color: "#64748b", 
            fontSize: "1.25rem", 
            maxWidth: "550px", 
            margin: "1.5rem auto 0", 
            lineHeight: 1.6 
          }}>
            Comuníquese con nosotros, con gusto le contamos todo sobre nuestros programas
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          
          {/* Tarjetas de contacto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {contactos.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  background: "#fff",
                  border: "2px solid #f3f4f6",
                  borderRadius: "1.5rem",
                  padding: "1.4rem 1.8rem",
                  textDecoration: "none",
                  color: "var(--foreground)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.transform = "scale(1.02) translateX(8px)";
                  e.currentTarget.style.boxShadow = `0 10px 25px ${c.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#f3f4f6";
                  e.currentTarget.style.transform = "scale(1) translateX(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.02)";
                }}
              >
                <div style={{ background: c.bg, borderRadius: "1rem", padding: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", color: c.color }}>
                  <c.icon size={26} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "#94a3b8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {c.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-nunito)", fontSize: "1.2rem", fontWeight: 800, color: "#1e293b" }}>
                    {c.valor}
                  </div>
                </div>
              </motion.a>
            ))}

            <div style={{ marginTop: "0.8rem" }}>
              <PulsatingButton
                pulseColor="#4FF084"
                className="w-full"
                style={{
                  width: "100%",
                  fontFamily: "var(--font-fredoka)", 
                  fontSize: "1.3rem",
                  padding: "1.1rem",
                  borderRadius: "999px",
                  background: "#4FF084",
                  color: "#1a1a1a",
                }}
              >
                💬 WhatsApp ahora
              </PulsatingButton>
            </div>
          </div>

          {/* Sedes y Horarios */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ 
              position: "relative", 
              background: "#fff", 
              border: "2px solid #f3f4f6", 
              borderRadius: "2.5rem", 
              padding: "2.8rem", 
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)"
            }}
          >
            <BorderBeam size={400} duration={12} colorFrom="#FF7893" colorTo="#7AC0FF" />

            <h3 style={{ 
              fontFamily: "var(--font-fredoka)", 
              fontSize: "1.9rem", 
              color: "#334155", 
              marginBottom: "1.8rem" 
            }}>
              📍 Nuestras Ubicaciones
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
              {sedes.map((sede) => (
                <div key={sede.nombre} style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
                  <div style={{ background: "#FFF9F0", padding: "0.6rem", borderRadius: "0.8rem" }}>
                    <MapPin size={22} color="#FF9900" />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-nunito)", fontWeight: 800, fontSize: "1.15rem", color: "#1e293b" }}>
                      {sede.nombre}
                    </div>
                    <div style={{ fontFamily: "var(--font-nunito)", fontSize: "1rem", color: "#64748b" }}>
                      {sede.direccion}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fafafa", borderRadius: "1.8rem", padding: "1.8rem", border: "1px dashed #e2e8f0" }}>
              <h4 style={{ 
                fontFamily: "var(--font-fredoka)", 
                fontSize: "1.4rem", 
                color: "#334155", 
                marginBottom: "1.2rem" 
              }}>
                🕐 Horarios de Atención
              </h4>
              {[
                { label: "Tiempo Completo", hora: "7:00am - 5:00pm" },
                { label: "Mañana", hora: "8:00am - 12:00pm" },
                { label: "Tarde", hora: "1:00pm - 5:00pm" },
                { label: "Periodo Escolar", hora: "15 Ene - 15 Dic" },
              ].map((h, i) => (
                <div key={h.label} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  fontFamily: "var(--font-nunito)", 
                  fontSize: "1.05rem", 
                  padding: "0.7rem 0", 
                  borderBottom: i === 3 ? "none" : "1px solid rgba(0,0,0,0.05)" 
                }}>
                  <span style={{ fontWeight: 800, color: "#475569" }}>{h.label}</span>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>{h.hora}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
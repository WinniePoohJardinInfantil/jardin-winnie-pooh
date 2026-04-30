"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { SparklesText } from "@/components/ui/sparkles-text";

// Componente HighLight para la descripción
interface HighLightProps {
  children: React.ReactNode;
  color?: string;
  type?: "box" | "underline";
}

const HighLight = ({ children, color = "#FFB40033", type = "box" }: HighLightProps) => (
  <span style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
    <span style={{
      position: "absolute",
      left: "-2px",
      right: "-2px",
      bottom: type === "underline" ? "4px" : "0",
      height: type === "underline" ? "8px" : "100%",
      backgroundColor: color,
      zIndex: -1,
      borderRadius: type === "underline" ? "0" : "8px",
      transform: "rotate(-1deg)",
    }} />
    {children}
  </span>
);

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

// Nombres de calles y carreras corregidos
const sedes = [
  { nombre: "Jardín Infantil & After Class", direccion: "Calle 51 #81a-25" },
  { nombre: "Winnie Pooh Baby's", direccion: "Carrera 81 #52-58" },
];

export default function Contacto() {
  const auroraColors = ["#00f7ff", "#ff4167", "#3cff01", "#7AC0FF", "#4FF084"];

  return (
    <section id="contacto" style={{ 
      minHeight: "100vh", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative", 
      overflow: "hidden",
      padding: "100px 20px 150px",
      backgroundColor: "#fff"
    }}>
      
      {/* FONDO CON MÁSCARA */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)", 
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}>
          <Image
            src="/logos/contact-bg.jpg" 
            alt="Winnie Pooh Contacto Fondo"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 100%)", 
        }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 10, maxWidth: "1200px" }}>
        
        {/* TÍTULO Y DESCRIPCIÓN */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem", maxWidth: "950px", margin: "0 auto 4.5rem" }}>
          <BlurFade delay={0.2} inView>
            <h2 style={{ 
              fontFamily: "var(--font-fredoka), sans-serif", 
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              fontWeight: 900,
              color: "#334155",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textShadow: "0 0 20px rgba(255, 255, 255, 1)", 
              marginBottom: "1.5rem"
            }}>
              <SparklesText sparklesCount={8} className="inline">
                <AuroraText colors={auroraColors}>
                  Estamos para atenderle
                </AuroraText>
              </SparklesText>
            </h2>
          </BlurFade>
          
          <BlurFade delay={0.3} inView>
            <p style={{ 
              fontFamily: "var(--font-nunito)", 
              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", 
              color: "#334155", 
              fontWeight: 800,
              maxWidth: "800px", 
              margin: "0 auto", 
              lineHeight: 1.6,
              textShadow: "0 0 10px rgba(255,255,255,0.8)" 
            }}>
              Comuníquese con nosotros, con gusto le contamos todo sobre nuestros <HighLight color="#00c3ff56" type="underline">programas</HighLight> y le ayudamos a iniciar esta <HighLight color="#ff1f6d52" type="underline">hermosa etapa</HighLight>.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.4} inView>
          {/* ALINEACIÓN VERTICAL: alignItems a stretch para que ambas columnas tengan la misma altura */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem", alignItems: "stretch" }}>
            
            {/* COLUMNA IZQUIERDA: Tarjetas de contacto */}
            {/* height 100% y space-between distribuye los botones para que el primero y el último toquen los bordes superior e inferior */}
            <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", gap: "1rem" }}>
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
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: `2px solid ${c.color}22`,
                    borderRadius: "1.5rem",
                    padding: "1.4rem 1.8rem",
                    textDecoration: "none",
                    color: "var(--foreground)",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c.color;
                    e.currentTarget.style.transform = "scale(1.03) translateX(8px)";
                    e.currentTarget.style.boxShadow = `0 15px 35px ${c.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${c.color}22`;
                    e.currentTarget.style.transform = "scale(1) translateX(0)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.03)";
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

              <div style={{ marginTop: "0.5rem" }}>
                <PulsatingButton
                  pulseColor="#4FF084"
                  className="w-full"
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-fredoka)", 
                    fontSize: "1.3rem",
                    fontWeight: "bold",
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

            {/* COLUMNA DERECHA: Sedes y Horarios */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ 
                position: "relative", 
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)", 
                border: "2px solid rgba(243, 244, 246, 0.8)", 
                borderRadius: "2.5rem", 
                padding: "2.8rem", 
                overflow: "hidden",
                boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
                display: "flex",           // Flex para controlar el contenido interno
                flexDirection: "column",
                height: "100%"             // Ocupa el 100% del grid
              }}
            >
              <BorderBeam size={400} duration={12} colorFrom="#FF7893" colorTo="#7AC0FF" />

              <h3 style={{ 
                fontFamily: "var(--font-fredoka)", 
                fontSize: "1.9rem", 
                fontWeight: 800,
                color: "#334155", 
                marginBottom: "1.8rem" 
              }}>
                📍 Nuestras Ubicaciones
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
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

              {/* marginTop: 'auto' empuja esta caja hacia abajo asegurando que quede a ras con el botón de WhatsApp */}
              <div style={{ background: "rgba(250, 250, 250, 0.8)", borderRadius: "1.8rem", padding: "1.8rem", border: "1px dashed #e2e8f0", marginTop: "auto" }}>
                <h4 style={{ 
                  fontFamily: "var(--font-fredoka)", 
                  fontSize: "1.4rem", 
                  fontWeight: 800,
                  color: "#334155", 
                  marginBottom: "1.2rem" 
                }}>
                  🕐 Horarios Disponibles
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
        </BlurFade>
      </div>
    </section>
  );
}
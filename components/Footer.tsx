"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { RainbowButton } from "@/components/ui/rainbow-button";

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialLinks = [
  { icon: WhatsAppIcon, href: "https://wa.me/573116055332", label: "WhatsApp", color: "#4FF084" },
  { icon: Mail, href: "mailto:wpjardininfantil@hotmail.com", label: "Email", color: "#7AC0FF" },
  { icon: InstagramIcon, href: "https://instagram.com/wpjardininfantil", label: "Instagram", color: "#FF7893" },
];

const navLinks = [
  { label: "Inicio", href: "#inicio", color: "#FFFC01" },
  { label: "Nosotros", href: "#nosotros", color: "#FF7893" },
  { label: "Sedes", href: "#sedes", color: "#7AC0FF" },
  { label: "Servicios", href: "#servicios", color: "#4FF084" },
  { label: "Galería", href: "#galeria", color: "#EB8100" },
  { label: "Contacto", href: "#contacto", color: "#FFFC01" },
];

const marqueeItems = [
  { text: "🐻 29 Años de Experiencia", color: "#FFFC01" },
  { text: "🍼 Winnie Pooh Babies", color: "#FF7893" },
  { text: "📚 After Class", color: "#7AC0FF" },
  { text: "🌍 7 Idiomas", color: "#4FF084" },
  { text: "🎵 Música y Baile", color: "#EB8100" },
  { text: "🏊 Natación", color: "#7AC0FF" },
  { text: "🤸 Gimnasia", color: "#FF7893" },
  { text: "⭐ Bebé Políglota", color: "#FFFC01" },
  { text: "🎒 Salidas Pedagógicas", color: "#4FF084" },
  { text: "❤️ Formación Integral", color: "#FF7893" },
];

const stats = [
  { value: 29, label: "Años", color: "#FFFC01", emoji: "🏆" },
  { value: 3, label: "Sedes", color: "#FF7893", emoji: "📍" },
  { value: 7, label: "Idiomas", color: "#7AC0FF", emoji: "🌍" },
];

const sedes = [
  { nombre: "Jardín Infantil", dir: "Cll51 #81a-25", color: "#FFFC01", emoji: "🏫" },
  { nombre: "Winnie Pooh Babies", dir: "Cra81 #52-58", color: "#FF7893", emoji: "🍼" },
  { nombre: "After Class", dir: "Cll51 #81a-25", color: "#7AC0FF", emoji: "📚" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0a0a0a", color: "#ffffff", overflow: "hidden" }}>
      {/* ===== MARQUEE SUPERIOR ===== */}
      <div style={{ borderBottom: "1px solid #ffffff11", padding: "1.25rem 0" }}>
        <Marquee pauseOnHover className="[--duration:28s]">
          {marqueeItems.concat(marqueeItems).map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-fredoka), sans-serif",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: item.color,
                marginRight: "3rem",
                whiteSpace: "nowrap",
                opacity: 0.85,
              }}
            >
              {item.text}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container" style={{ padding: "4rem 1.5rem 2.5rem" }}>
        {/* ===== BRAND + STATS ===== */}
        <div
          className="footer-top"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            marginBottom: "3.5rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid #ffffff0d",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFFC01, #EB8100)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "2rem", flexShrink: 0,
                  boxShadow: "0 0 40px #FFFC0155",
                }}
              >
                🐻
              </motion.div>
              <div>
                <div style={{
                  fontFamily: "var(--font-fredoka), sans-serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#FFFC01",
                  lineHeight: 1,
                  textShadow: "0 0 20px #FFFC0144",
                }}>
                  Winnie Pooh
                </div>
                <div style={{
                  fontFamily: "var(--font-fredoka), sans-serif",
                  fontSize: "0.85rem",
                  color: "#ffffff55",
                  letterSpacing: "0.12em",
                  marginTop: "0.2rem",
                }}>
                  JARDÍN INFANTIL · MEDELLÍN
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: "var(--font-fredoka), sans-serif",
              fontSize: "1.15rem",
              color: "#ffffff88",
              lineHeight: 1.75,
              maxWidth: "380px",
              marginBottom: "1.75rem",
            }}>
              Somos el comienzo de una vida plena para sus hijos. Más de{" "}
              <span style={{ color: "#FFFC01", fontWeight: 700 }}>29 años</span>{" "}
              formando niños felices con amor y dedicación en Medellín.
            </p>
          </div>

          {/* Stats grandes */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -6, scale: 1.04 }}
                style={{
                  background: "#1a1a1a",
                  borderRadius: "1.75rem",
                  padding: "1.75rem 1.5rem",
                  textAlign: "center",
                  border: `2px solid ${stat.color}33`,
                  minWidth: "110px",
                  flex: 1,
                  boxShadow: `0 0 30px ${stat.color}22`,
                  transition: "box-shadow 0.3s",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.emoji}</div>
                <div style={{
                  fontFamily: "var(--font-fredoka), sans-serif",
                  fontSize: "3rem",
                  fontWeight: 900,
                  color: stat.color,
                  lineHeight: 1,
                  textShadow: `0 0 20px ${stat.color}66`,
                }}>
                  <NumberTicker value={stat.value} className="text-inherit" />
                </div>
                <div style={{
                  fontFamily: "var(--font-fredoka), sans-serif",
                  fontSize: "1rem",
                  color: "#ffffff66",
                  fontWeight: 600,
                  marginTop: "0.4rem",
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== GRID PRINCIPAL ===== */}
        <div className="footer-grid" style={{ display: "grid", gap: "2.5rem", marginBottom: "3rem" }}>
          {/* Navegación */}
          <div>
            <h4 style={{ fontFamily: "var(--font-fredoka), sans-serif", fontSize: "1.5rem", color: "#ffffff", marginBottom: "1.5rem" }}>Navegación</h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} style={{ fontFamily: "var(--font-fredoka), sans-serif", fontSize: "1.1rem", color: "#ffffff66", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: link.color }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sedes */}
          <div>
            <h4 style={{ fontFamily: "var(--font-fredoka), sans-serif", fontSize: "1.5rem", color: "#ffffff", marginBottom: "1.5rem" }}>Nuestras Sedes</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {sedes.map((sede) => (
                <div key={sede.nombre} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem", background: "#1a1a1a", borderRadius: "1rem", border: `1px solid ${sede.color}22` }}>
                  <div style={{ fontSize: "1.2rem" }}>{sede.emoji}</div>
                  <div>
                    <div style={{ fontFamily: "var(--font-fredoka), sans-serif", fontSize: "1.1rem", fontWeight: 700, color: sede.color }}>{sede.nombre}</div>
                    <div style={{ fontSize: "0.9rem", color: "#ffffff44" }}>{sede.dir}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ fontFamily: "var(--font-fredoka), sans-serif", fontSize: "1.5rem", color: "#ffffff", marginBottom: "1.5rem" }}>Contáctenos</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {socialLinks.map((c) => (
                <a key={c.label} href={c.href} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "#1a1a1a", borderRadius: "1rem", border: `1px solid ${c.color}22`, textDecoration: "none" }}>
                  <div style={{ color: c.color }}><c.icon size={18} /></div>
                  <span style={{ color: c.color, fontWeight: 700 }}>{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CTA NEON ===== */}
        <div style={{ marginBottom: "2.5rem" }}>
          <NeonGradientCard neonColors={{ firstColor: "#FF7893", secondColor: "#7AC0FF" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", padding: "2rem 2.5rem", background: "#111", borderRadius: "inherit" }}>
              <div>
                <p style={{ fontFamily: "var(--font-fredoka), sans-serif", fontSize: "1.75rem", color: "#fff", marginBottom: "0.4rem" }}>🎉 ¿Listo para matricular a su hijo?</p>
                <p style={{ color: "#ffffff77" }}>Escríbenos hoy y te contamos todo sobre nuestros programas</p>
              </div>
              <RainbowButton onClick={() => window.open("https://wa.me/573116055332", "_blank")}>
                <WhatsAppIcon /> &nbsp; Escribir por WhatsApp
              </RainbowButton>
            </div>
          </NeonGradientCard>
        </div>

        {/* ===== BOTTOM ===== */}
        <div style={{ borderTop: "1px solid #ffffff0d", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.95rem", color: "#ffffff22" }}>© 2026 Jardín Infantil Winnie Pooh. Todos los derechos reservados.</p>
          <p style={{ fontSize: "0.95rem", color: "#ffffff22" }}>Desarrollado con ❤️ por <a href="https://serstack-es.vercel.app" style={{ color: "#FFFC01", textDecoration: "none", fontWeight: 700 }}>SerStack</a></p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .footer-grid { grid-template-columns: 1fr 1.2fr 1.2fr !important; } .footer-top { grid-template-columns: 1.2fr 1fr !important; } }
        @media (max-width: 767px) { .footer-grid, .footer-top { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
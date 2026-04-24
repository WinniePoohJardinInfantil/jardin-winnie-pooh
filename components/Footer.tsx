"use client";

import React from "react";
import { Mail, MapPin, Heart } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Dock, DockIcon } from "@/components/ui/dock";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#inicio", color: "#FFFC01" },
  { label: "Nosotros", href: "#nosotros", color: "#FF7893" },
  { label: "Sedes", href: "#sedes", color: "#7AC0FF" },
  { label: "Servicios", href: "#servicios", color: "#4FF084" },
  { label: "Contacto", href: "#contacto", color: "#EB8100" },
];

const sedes = [
  { nombre: "Jardín Infantil & After Class", dir: "Calle 51 #81a-25", color: "#FF7893" },
  { nombre: "Winnie Pooh Baby's", dir: "Carrera 81 #52-58", color: "#7AC0FF" },
];

const marqueeItems = [
  "🐻 Winnie Pooh", "🍼 Baby's", "📚 After Class", "🌍 7 Idiomas", "🎵 Música", "🏊 Natación", "🤸 Gimnasia", "❤️ Amor"
];

// SVGs personalizados para evitar fallos de Lucide
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialLinks = [
  { icon: WhatsAppIcon, href: "https://wa.me/573116055332", label: "WhatsApp", color: "#4FF084" },
  { icon: InstagramIcon, href: "https://instagram.com/wpjardininfantil", label: "Instagram", color: "#FF7893" },
  { icon: Mail, href: "mailto:wpjardininfantil@hotmail.com", label: "Email", color: "#7AC0FF" },
];

export default function Footer() {
  return (
    <footer style={{ 
      background: "#fff", 
      color: "#334155", 
      borderTop: "1px solid #f1f5f9",
      overflow: "hidden" 
    }}>
      
      {/* MARQUEE SUTIL */}
      <div style={{ background: "#f8fafc", padding: "1rem 0", borderBottom: "1px solid #f1f5f9" }}>
        <Marquee pauseOnHover className="[--duration:30s]">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#94a3b8",
                marginRight: "4rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container" style={{ padding: "4rem 1.5rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "4rem",
          marginBottom: "3rem"
        }}>
          
          {/* BRAND SECTION + DOCK */}
<div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    {/* Contenedor del Logo */}
    <div style={{ 
      position: "relative",
      width: "55px", // Ajusté un poco el tamaño para que luzca mejor el logo
      height: "55px",
      flexShrink: 0 
    }}>
      <Image
        src="/images/logo.webp"
        alt="Logo Winnie Pooh"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
    
    <span style={{ 
      fontFamily: "var(--font-fredoka)", 
      fontSize: "1.6rem", 
      fontWeight: 900, 
      color: "#1e293b",
      lineHeight: 1
    }}>
      Winnie Pooh
    </span>
  </div>
  
  <p style={{ 
    fontFamily: "var(--font-nunito)", 
    fontSize: "1rem", 
    lineHeight: 1.6, 
    color: "#64748b",
    maxWidth: "320px" 
  }}>
    Más de 30 años formando niños felices con amor y dedicación en Medellín.
  </p>
            
            {/* DOCK INTEGRADO - Versión Minimalista Light */}
            <div style={{ marginTop: "0.5rem" }}>
              <Dock
                direction="middle"
                iconMagnification={52}
                iconDistance={80}
                className="!bg-slate-50 !border-slate-100 !justify-start !w-fit !p-2"
              >
                {socialLinks.map((link) => (
                  <DockIcon key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", width: "100%", height: "100%",
                        alignItems: "center", justifyContent: "center",
                        borderRadius: "12px",
                        background: `${link.color}15`,
                        color: link.color,
                        transition: "all 0.2s",
                      }}
                    >
                      <link.icon />
                    </a>
                  </DockIcon>
                ))}
              </Dock>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ 
              fontFamily: "var(--font-fredoka)", fontSize: "1.1rem", 
              fontWeight: 800, color: "#1e293b", marginBottom: "1.5rem" 
            }}>
              Explorar
            </h4>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} style={{ 
                    fontFamily: "var(--font-nunito)", fontSize: "1rem", 
                    color: "#64748b", textDecoration: "none", fontWeight: 700,
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = link.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#64748b"}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SEDES */}
          <div>
            <h4 style={{ 
              fontFamily: "var(--font-fredoka)", fontSize: "1.1rem", 
              fontWeight: 800, color: "#1e293b", marginBottom: "1.5rem" 
            }}>
              Ubicaciones
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {sedes.map((sede) => (
                <div key={sede.nombre} style={{ display: "flex", gap: "0.8rem" }}>
                  <div style={{ 
                    width: "36px", height: "36px", borderRadius: "10px", 
                    background: `${sede.color}10`, display: "flex", 
                    alignItems: "center", justifyContent: "center", flexShrink: 0 
                  }}>
                    <MapPin size={18} color={sede.color} />
                  </div>
                  <div>
                    <div style={{ 
                      fontFamily: "var(--font-nunito)", fontWeight: 800, 
                      fontSize: "0.95rem", color: "#334155" 
                    }}>
                      {sede.nombre}
                    </div>
                    <div style={{ 
                      fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "#94a3b8" 
                    }}>
                      {sede.dir}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* COPYRIGHT AREA */}
        <div style={{ 
          paddingTop: "2rem", 
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <p style={{ 
            fontFamily: "var(--font-nunito)", fontSize: "0.9rem", color: "#94a3b8", fontWeight: 600 
          }}>
            © 2026 Winnie Pooh Medellín.
          </p>
          <div style={{ 
            display: "flex", alignItems: "center", gap: "0.4rem",
            fontFamily: "var(--font-nunito)", fontSize: "0.9rem", color: "#94a3b8", fontWeight: 600
          }}>
            Hecho con <Heart size={14} fill="#FF7893" stroke="#FF7893" /> por 
            <a href="https://serstack-es.vercel.app" target="_blank" style={{ color: "#1e293b", textDecoration: "none", fontWeight: 800 }}>
              SerStack
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
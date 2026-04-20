"use client";

import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Mail, MapPin } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socialLinks = [
  { icon: WhatsAppIcon, href: "https://wa.me/573116055332", label: "WhatsApp", color: "#4FF084" },
  { icon: Mail, href: "mailto:wpjardininfantil@hotmail.com", label: "Email", color: "#7AC0FF" },
  { icon: InstagramIcon, href: "https://instagram.com/wpjardininfantil", label: "Instagram", color: "#FF7893" },
];

const marqueeItems = [
  "🐻 29 Años de Experiencia",
  "🍼 Winnie Pooh Babies",
  "📚 After Class",
  "🌍 7 Idiomas",
  "🎵 Música",
  "🏊 Natación",
  "🤸 Gimnasia",
  "⭐ Bebé Políglota",
  "🎒 Salidas Pedagógicas",
  "❤️ Formación Integral",
];

const stats = [
  { value: 29, label: "Años", color: "#FFFC01", emoji: "🏆" },
  { value: 3, label: "Sedes", color: "#FF7893", emoji: "📍" },
  { value: 7, label: "Idiomas", color: "#7AC0FF", emoji: "🌍" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#080808", color: "#ffffff", overflow: "hidden" }}>
      
      {/* Marquee superior (más sutil) */}
      <div style={{ borderBottom: "1px solid #ffffff08", padding: "1rem 0" }}>
        <Marquee pauseOnHover className="[--duration:30s]">
          {marqueeItems.concat(marqueeItems).map((item, i) => (
            <span key={i} style={{ fontFamily: "var(--font-fredoka)", fontSize: "0.85rem", color: "#ffffff22", marginRight: "3rem" }}>
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        
        {/* Sección Superior: Logo + Stats Mejorados */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexWrap: "wrap",
          gap: "2rem",
          marginBottom: "3rem" 
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ width: "50px", height: "50px", borderRadius: "50%", overflow: "hidden", background: "#FFFC01" }}
              >
                <img src="/images/logo.webp" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
              <div>
                <h3 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.4rem", color: "#FFFC01", margin: 0 }}>Winnie Pooh</h3>
                <p style={{ fontSize: "0.6rem", color: "#ffffff44", letterSpacing: "1px" }}>JARDÍN INFANTIL · MEDELLÍN</p>
              </div>
            </div>
          </div>

          {/* Stats con Texto Blanco/Color para legibilidad */}
          <div style={{ display: "flex", gap: "2rem" }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ 
                  fontFamily: "var(--font-fredoka)", 
                  fontSize: "2rem", 
                  fontWeight: 800,  
                  color: "#ffffff",  // <-- Pon "#ffffff" si los quieres blancos, o deja "stat.color" si los quieres de colores
                  lineHeight: 1 
                }}>
                  {/* AQUÍ ESTÁ LA MAGIA: className="text-inherit" */}
                  <NumberTicker value={stat.value} className="text-inherit" />
                </div>
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: stat.color, 
                  fontWeight: 700, 
                  textTransform: "uppercase",
                  marginTop: "0.4rem"
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
</div>

        {/* Grid Principal Alineado Verticalmente */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "3rem",
          borderTop: "1px solid #ffffff08",
          paddingTop: "2rem"
        }}>
          
          {/* Columna 1: Sedes */}
          <div>
            <h4 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1rem", color: "#ffffff", marginBottom: "1.5rem" }}>Nuestras Sedes</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                { nombre: "Jardín Infantil", dir: "Cll51 #81a-25", color: "#FFFC01" },
                { nombre: "Winnie Pooh Babies", dir: "Cra81 #52-58", color: "#FF7893" },
                { nombre: "After Class", dir: "Cll51 #81a-25", color: "#7AC0FF" },
              ].map((sede) => (
                <div key={sede.nombre} style={{ display: "flex", gap: "0.8rem" }}>
                  <MapPin size={16} color={sede.color} style={{ flexShrink: 0, marginTop: "3px" }} />
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{sede.nombre}</div>
                    <div style={{ fontSize: "0.8rem", color: "#ffffff55" }}>{sede.dir}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna 2: Contacto Directo */}
          <div>
            <h4 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1rem", color: "#ffffff", marginBottom: "1.5rem" }}>Contáctenos</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a href="https://wa.me/573116055332" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ padding: "8px", borderRadius: "8px", background: "#4FF08415", color: "#4FF084" }}>
                  <WhatsAppIcon />
                </div>
                <span style={{ color: "#ffffff99", fontSize: "0.9rem" }}>311 605 53 32</span>
              </a>
              <a href="mailto:wpjardininfantil@hotmail.com" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div style={{ padding: "8px", borderRadius: "8px", background: "#7AC0FF15", color: "#7AC0FF" }}>
                  <Mail size={18} />
                </div>
                <span style={{ color: "#ffffff99", fontSize: "0.85rem" }}>wpjardininfantil@hotmail.com</span>
              </a>
            </div>
          </div>

          {/* Columna 3: Síguenos (Dock) */}
          <div>
            <h4 style={{ fontFamily: "var(--font-fredoka)", fontSize: "1rem", color: "#ffffff", marginBottom: "1.5rem" }}>Síguenos</h4>
            <Dock direction="middle" className="!bg-white/5 !border-white/10 !justify-start !w-fit !px-2">
              {socialLinks.map((link) => (
                <DockIcon key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: link.color }}>
                    <link.icon size={20} />
                  </a>
                </DockIcon>
              ))}
            </Dock>
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={{ 
          marginTop: "4rem", 
          paddingTop: "1.5rem", 
          borderTop: "1px solid #ffffff08",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <p style={{ fontSize: "0.75rem", color: "#ffffff22" }}>© 2026 Winnie Pooh. Medellín, CO.</p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Inicio", "Nosotros", "Servicios", "Contacto"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: "0.75rem", color: "#ffffff44", textDecoration: "none" }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
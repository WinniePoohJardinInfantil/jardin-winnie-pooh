"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import { Mail } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";

const shineColors: string[] = ["#4FF084", "#7AC0FF"];

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
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

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sedes", href: "#sedes" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Reseñas", href: "#resenas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#111111", color: "#ffffff", padding: "4rem 1.5rem 2rem" }}>
      <div className="container">
        <div
          className="footer-grid"
          style={{ display: "grid", gap: "3rem", marginBottom: "3rem" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFFC01, #EB8100)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                🐻
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-fredoka)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#FFFC01",
                    lineHeight: 1,
                  }}
                >
                  Winnie Pooh
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.62rem",
                    color: "#ffffff55",
                    letterSpacing: "0.1em",
                  }}
                >
                  JARDÍN INFANTIL · MEDELLÍN
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.85rem",
                color: "#ffffff77",
                lineHeight: 1.8,
                maxWidth: "260px",
                marginBottom: "1.5rem",
              }}
            >
              Somos el comienzo de una vida plena para sus hijos. 29 años formando niños felices en Medellín.
            </p>

            <Dock
              direction="middle"
              iconMagnification={52}
              iconDistance={85}
              className="!bg-white/5 !border-white/10 !justify-start !w-fit !px-3 !py-2"
            >
              {socialLinks.map((link) => (
                <DockIcon key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: link.color + "22",
                      color: link.color,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = link.color + "44")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = link.color + "22")}
                  >
                    <link.icon size={18} />
                  </a>
                </DockIcon>
              ))}
            </Dock>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1rem",
                color: "#ffffff",
                marginBottom: "1.25rem",
                letterSpacing: "0.05em",
              }}
            >
              Navegación
            </h4>

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.875rem",
                      color: "#ffffff66",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff66")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1rem",
                color: "#ffffff",
                marginBottom: "1.25rem",
                letterSpacing: "0.05em",
              }}
            >
              Contáctenos
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <div style={{ position: "relative", borderRadius: "0.75rem" }}>
                <ShineBorder className="rounded-xl" shineColor={shineColors} />
                <a
                  href="https://wa.me/573116055332"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "block",
                    padding: "0.75rem 1.1rem",
                    background: "#1a1a1a",
                    borderRadius: "0.75rem",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.72rem",
                      color: "#ffffff55",
                      marginBottom: "0.1rem",
                    }}
                  >
                    WhatsApp
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      color: "#4FF084",
                    }}
                  >
                    311 605 53 32
                  </div>
                </a>
              </div>

              <div
                style={{
                  padding: "0.75rem 1.1rem",
                  background: "#1a1a1a",
                  borderRadius: "0.875rem",
                  border: "1px solid #ffffff11",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.72rem",
                    color: "#ffffff55",
                    marginBottom: "0.1rem",
                  }}
                >
                  Correo
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#7AC0FF",
                  }}
                >
                  wpjardininfantil@hotmail.com
                </div>
              </div>

              <div
                style={{
                  padding: "0.75rem 1.1rem",
                  background: "#1a1a1a",
                  borderRadius: "0.875rem",
                  border: "1px solid #ffffff11",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.72rem",
                    color: "#ffffff55",
                    marginBottom: "0.25rem",
                  }}
                >
                  Sedes
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.8rem",
                    color: "#ffffff88",
                    lineHeight: 1.7,
                  }}
                >
                  Jardín & After Class: Cll51 #81a-25
                  <br />
                  Babies: Cra81 #52-58
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid #ffffff11",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "#ffffff33" }}>
            © 2026 Jardín Infantil Winnie Pooh. Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.78rem", color: "#ffffff33" }}>
            Desarrollado por{" "}
            <a
              href="https://serstack.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#FFFC01", textDecoration: "none", fontWeight: 700 }}
            >
              SerStack
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
          }
        }
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}

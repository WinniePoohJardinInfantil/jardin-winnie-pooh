"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Sedes", href: "/#sedes" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Galería", href: "/#galeria" },
  { label: "Reseñas", href: "/#resenas"},
  { label: "Contacto", href: "/#contacto" },
]; 

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // Eliminamos el padding horizontal de aquí para que no sume al ancho total
        padding: "0.85rem 0", 
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        transition: "all 0.35s ease",
        maxWidth: "100vw", // Evita desbordamiento horizontal
      }}
    >
      <div
        className="container navbar-shell"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
          paddingLeft: "1rem", // Padding controlado dentro del contenedor
          paddingRight: "1rem",
        }}
      >
        <Link
          href="/#inicio" // Esto te llevará siempre a la landing
          className="navbar-brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            cursor: "pointer",
            minWidth: 0,
            flexShrink: 1,
          }}
>
          <div
            style={{
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
              border: "1px solid #f0f0f0",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.webp"
              alt="Logo Winnie Pooh"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "2px",
              }}
            />
          </div>

          <div className="brand-copy" style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--foreground)",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              Winnie Pooh
            </div>
            <div
              className="brand-subtitle"
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.65rem",
                color: "var(--muted-foreground)",
                letterSpacing: "0.08em",
                marginTop: "2px",
                whiteSpace: "nowrap",
              }}
            >
              JARDÍN INFANTIL
            </div>
          </div>
        </Link>

        <ul
          className="nav-links-desktop"
          style={{
            gap: "0.25rem",
            listStyle: "none",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((link, i) => {
            const accents = [
              "var(--color-pink)",
              "var(--color-orange)",
              "var(--color-yellow)",
              "var(--color-green)",
              "var(--color-blue)",
              "var(--color-pink)",
              "var(--color-green",
            ];

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "var(--foreground)",
                    textDecoration: "none",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "999px",
                    transition: "all 0.2s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accents[i] + "22";
                    e.currentTarget.style.color = accents[i];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div
          className="navbar-actions"
          style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexShrink: 0 }}
        >
          <a
            href="https://wa.me/573116055332"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-whatsapp"
            style={{
              background: "var(--color-green)",
              color: "#1a1a1a",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.875rem",
              padding: "0.6rem 1rem",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 14px #4FF08444",
              transition: "all 0.2s",
              alignItems: "center",
              display: "flex",
              gap: "0.4rem",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px #4FF08466";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px #4FF08444";
            }}
          >
            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>💬</span>
            <span className="whatsapp-label">WhatsApp</span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="nav-toggle md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            style={{
              background: "#ffffff",
              border: "1px solid #ececec",
              borderRadius: "0.85rem",
              cursor: "pointer",
              color: "var(--foreground)",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
              flexShrink: 0,
            }}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mobile-menu"
          style={{
            background: "rgba(255,255,255,0.98)",
            padding: "0.75rem",
            position: "absolute",
            width: "calc(100% - 1.5rem)",
            top: "calc(100% + 0.5rem)",
            left: "0.75rem",
            right: "0.75rem",
            borderRadius: "1.25rem",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
            zIndex: 99,
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              margin: 0,
              padding: 0,
            }}
          >
            {links.map((link, i) => {
              const accents = [
                "#FF789322",
                "#EB810022",
                "#FFFC0122",
                "#4FF08422",
                "#7AC0FF22",
                "#FF789322",
                "#4FF08422",
              ];

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "var(--foreground)",
                      textDecoration: "none",
                      display: "block",
                      padding: "0.95rem 1rem",
                      borderRadius: "1rem",
                      background: accents[i],
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex !important; }
          .md\\:hidden { display: none !important; }
        }

        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
        }

        @media (max-width: 640px) {
          .navbar-shell {
            gap: 0.35rem !important;
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }

          .brand-copy > div:first-child {
            font-size: 1rem !important;
          }

          .brand-subtitle {
            font-size: 0.55rem !important;
            letter-spacing: 0.06em !important;
          }

          .navbar-whatsapp {
            padding: 0.5rem 0.7rem !important;
            font-size: 0.8rem !important;
          }

          .whatsapp-label {
            display: none !important;
          }
        }

        @media (max-width: 430px) {
          .brand-subtitle {
            display: none !important;
          }

          .brand-copy > div:first-child {
            font-size: 0.95rem !important;
          }

          .navbar-whatsapp {
            width: 40px !important;
            height: 40px !important;
            padding: 0 !important;
            justify-content: center !important;
            gap: 0 !important;
          }
          
          .nav-toggle {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </nav>
  );
}
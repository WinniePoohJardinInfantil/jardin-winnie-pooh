"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#nosotros" },
  { label: "Sedes", href: "#sedes" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1rem 1.5rem",
        background: scrolled ? "rgba(255,253,247,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 auto", // Agregado para centrar el contenedor
          maxWidth: "1200px" // Opcional, según tu diseño
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-fredoka)",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "var(--color-honey)", // CORRECCIÓN: Faltaban las comillas
            lineHeight: 1,
          }}
        >
          🐻 Winnie Pooh
          <span
            style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: 400,
              color: "var(--color-text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            Jardín Infantil
          </span>
        </div>

        {/* Links desktop */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            alignItems: "center",
            margin: 0,
            padding: 0
          }}
          className="hidden md:flex"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a // CORRECCIÓN: Faltaba la etiqueta de apertura <a>
                href={link.href}
                style={{
                  fontFamily: "var(--font-nunito)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--color-text)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-honey)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón menú móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text)",
            padding: 0
          }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div
          style={{
            background: "var(--color-white)",
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.5rem",
            position: "absolute", // Opcional: para que no empuje el contenido
            width: "100%",
            left: 0
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", margin: 0, padding: 0 }}>
            {links.map((link) => (
              <li key={link.href}>
                <a // CORRECCIÓN: Faltaba la etiqueta de apertura <a>
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "var(--color-text)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
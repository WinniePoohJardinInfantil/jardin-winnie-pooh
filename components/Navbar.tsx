"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
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
        padding: "0.85rem 1.5rem",
        background: scrolled ? "rgba(255,255,255,0.90)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.35s ease",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo con Link y Redirección */}
        <a 
          href="https://winniepoohjardininfantil.com/#inicio" 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.75rem", 
            textDecoration: "none",
            cursor: "pointer"
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
              border: "1px solid #f0f0f0"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="images/logo.webp" 
              alt="Logo Winnie Pooh"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "2px"
              }}
            />
          </div>
          <div>
            <div style={{ 
              fontFamily: "var(--font-fredoka)", 
              fontSize: "1.25rem", 
              fontWeight: 700, 
              color: "var(--foreground)", 
              lineHeight: 1 
            }}>
              Winnie Pooh
            </div>
            <div style={{ 
              fontFamily: "var(--font-nunito)", 
              fontSize: "0.65rem", 
              color: "var(--muted-foreground)", 
              letterSpacing: "0.08em",
              marginTop: "2px"
            }}>
              JARDÍN INFANTIL
            </div>
          </div>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex" style={{ gap: "0.25rem", listStyle: "none", alignItems: "center", margin: 0, padding: 0, display: "flex" }}>
          {links.map((link, i) => {
            const accents = ["var(--color-pink)", "var(--color-orange)", "var(--color-yellow)", "var(--color-green)", "var(--color-blue)", "var(--color-pink)"];
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

        {/* CTA desktop */}
        <a
          href="https://wa.me/573116055332"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex"
          style={{
            background: "var(--color-green)",
            color: "#1a1a1a",
            fontFamily: "var(--font-nunito)",
            fontWeight: 700,
            fontSize: "0.875rem",
            padding: "0.6rem 1.4rem",
            borderRadius: "999px",
            textDecoration: "none",
            boxShadow: "0 4px 14px #4FF08444",
            transition: "all 0.2s",
            alignItems: "center",
            display: "flex",
            gap: "0.4rem",
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
          <span style={{ fontSize: "1.1rem" }}>💬</span> WhatsApp
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--foreground)", padding: 0 }}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid var(--border)",
            padding: "1.5rem",
            position: "absolute",
            width: "100%",
            left: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", margin: 0, padding: 0 }}>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-nunito)",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    color: "var(--foreground)",
                    textDecoration: "none",
                    display: "block",
                    padding: "0.8rem 1rem",
                    borderRadius: "0.75rem",
                    background: "#f8f8f8"
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
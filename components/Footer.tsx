"use client";
import { Camera, Mail, Phone } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";

export default function Footer() {
  const socialLinks = [
    { icon: Phone, href: "https://wa.me/573116055332", label: "WhatsApp" },
    { icon: Mail, href: "mailto:wpjardininfantil@hotmail.com", label: "Email" },
    { icon: Camera, href: "https://instagram.com/wpjardininfantil", label: "Instagram" },
  ];

  return (
    <footer
      style={{
        background: "var(--color-text)",
        color: "var(--color-white)",
        padding: "3rem 1.5rem 1.5rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--color-honey)",
                marginBottom: "0.5rem",
              }}
            >
              🐻 Winnie Pooh
            </div>
            <p
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.875rem",
                color: "#ffffff99",
                lineHeight: 1.7,
                maxWidth: "260px",
              }}
            >
              Somos el comienzo de una vida plena para sus hijos. 29 años formando niños felices en Medellín.
            </p>
          </div>

          {/* Sedes */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1.1rem",
                color: "var(--color-white)",
                marginBottom: "1rem",
              }}
            >
              Nuestras Sedes
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", padding: 0 }}>
              {[
                { nombre: "Jardín Infantil", dir: "Cll51 #81a-25" },
                { nombre: "Winnie Pooh Babies", dir: "Cra81 #52-58" },
                { nombre: "After Class", dir: "Cll51 #81a-25" },
              ].map((s) => (
                <li key={s.nombre}>
                  <span
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: "var(--color-white)",
                    }}
                  >
                    {s.nombre}
                  </span>
                  <br />
                  <span style={{ fontFamily: "var(--font-nunito)", fontSize: "0.8rem", color: "#ffffff77" }}>
                    {s.dir}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto con MAGIC UI DOCK */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1.1rem",
                color: "var(--color-white)",
              }}
            >
              Encuéntranos
            </h4>
            
            {/* Contenedor del Dock */}
<div className="flex items-center justify-start py-2">
  <Dock 
    direction="middle" 
    iconMagnification={60} // Antes era magnification
    iconDistance={100}      // Antes era distance
    className="bg-white/5 border border-white/10 rounded-2xl p-2"
  >
    {socialLinks.map((link) => (
      <DockIcon key={link.label}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full w-full items-center justify-center rounded-full bg-white/10 text-white hover:text-honey hover:bg-white/20 transition-all"
          aria-label={link.label}
        >
          <link.icon size={20} />
        </a>
      </DockIcon>
    ))}
  </Dock>
</div>

            <div style={{ marginTop: "0.5rem" }}>
                <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.875rem", color: "#ffffff99" }}>
                    Tel: 311 605 53 32
                </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid #ffffff22",
            paddingTop: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "0.8rem",
              color: "#ffffff55",
            }}
          >
            © 2026 Jardín Infantil Winnie Pooh. Todos los derechos reservados.
          </p>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "0.8rem",
              color: "#ffffff55",
            }}
          >
            Desarrollado por{" "}
            <a
              href="https://serstack.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-honey)", textDecoration: "none" }}
            >
              SerStack
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
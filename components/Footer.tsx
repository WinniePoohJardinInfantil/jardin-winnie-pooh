"use client";
import { Camera, Mail, Phone } from "lucide-react";

export default function Footer() {
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

          {/* Contacto */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1.1rem",
                color: "var(--color-white)",
                marginBottom: "1rem",
              }}
            >
              Contacto
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: Phone, text: "311 605 53 32", href: "https://wa.me/573116055332" },
                { icon: Mail, text: "wpjardininfantil@hotmail.com", href: "mailto:wpjardininfantil@hotmail.com" },
                { icon: Camera, text: "@wpjardininfantil", href: "https://instagram.com/wpjardininfantil" },
              ].map((c) => (
                <a
                  key={c.text}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.875rem",
                    color: "#ffffff99",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-honey)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff99")}
                >
                  <c.icon size={15} />
                  {c.text}
                </a>
              ))}
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
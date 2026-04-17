"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Camera, MapPin, Star } from "lucide-react";

const contactos = [
  {
    icon: Phone,
    label: "Teléfono",
    valor: "311 605 53 32",
    href: "https://wa.me/573116055332",
    color: "var(--color-green)",
    bg: "#86efac22",
  },
  {
    icon: Mail,
    label: "Correo",
    valor: "wpjardininfantil@hotmail.com",
    href: "mailto:wpjardininfantil@hotmail.com",
    color: "var(--color-blue)",
    bg: "#60a5fa22",
  },
  {
    icon: Camera,
    label: "Instagram",
    valor: "@wpjardininfantil",
    href: "https://instagram.com/wpjardininfantil",
    color: "var(--color-purple)",
    bg: "#c084fc22",
  },
  {
    icon: Star,
    label: "Reseñas Google",
    valor: "Dejanos tu opinión",
    href: "https://maps.google.com",
    color: "var(--color-honey)",
    bg: "#ffd97d33",
  },
];

const sedes = [
  { nombre: "Jardín Infantil & After Class", direccion: "Cll51 #81a-25" },
  { nombre: "Winnie Pooh Babies", direccion: "Cra81 #52-58" },
];

export default function Contacto() {
  return (
    <section id="contacto" style={{ background: "var(--color-cream)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#86efac33",
              color: "#166534",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              marginBottom: "1rem",
            }}
          >
            💬 Contáctenos
          </span>
          <h2
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--color-text)",
            }}
          >
            Estamos para atenderle
          </h2>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              color: "var(--color-text-muted)",
              fontSize: "1rem",
              marginTop: "0.75rem",
              maxWidth: "480px",
              margin: "0.75rem auto 0",
            }}
          >
            Comuníquese con nosotros y con gusto le contamos todo sobre nuestros programas
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Tarjetas de contacto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {contactos.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "var(--color-white)",
                  borderRadius: "var(--radius)",
                  padding: "1.25rem 1.5rem",
                  textDecoration: "none",
                  color: "var(--color-text)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.borderColor = c.color;
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    background: c.bg,
                    borderRadius: "0.75rem",
                    padding: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <c.icon size={20} color={c.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.75rem",
                      color: "var(--color-text-muted)",
                      fontWeight: 600,
                      marginBottom: "0.1rem",
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-nunito)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "var(--color-text)",
                    }}
                  >
                    {c.valor}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Sedes y horario */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: "var(--color-white)",
              borderRadius: "var(--radius)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-fredoka)",
                fontSize: "1.4rem",
                color: "var(--color-text)",
                marginBottom: "1.25rem",
              }}
            >
              📍 Nuestras Ubicaciones
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {sedes.map((sede) => (
                <div
                  key={sede.nombre}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                  }}
                >
                  <MapPin size={18} color="var(--color-honey)" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-nunito)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--color-text)",
                      }}
                    >
                      {sede.nombre}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-nunito)",
                        fontSize: "0.85rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {sede.direccion}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "var(--color-cream)",
                borderRadius: "1rem",
                padding: "1.25rem",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-fredoka)",
                  fontSize: "1.1rem",
                  color: "var(--color-text)",
                  marginBottom: "0.75rem",
                }}
              >
                🕐 Horarios de Atención
              </h4>
              {[
                { label: "Tiempo Completo", hora: "7:00am - 5:00pm" },
                { label: "Mañana", hora: "8:00am - 12:00pm" },
                { label: "Tarde", hora: "1:00pm - 5:00pm" },
                { label: "Periodo Escolar", hora: "15 Enero - 15 Diciembre" },
              ].map((h) => (
                <div
                  key={h.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-nunito)",
                    fontSize: "0.875rem",
                    padding: "0.3rem 0",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{h.label}</span>
                  <span style={{ color: "var(--color-text-muted)" }}>{h.hora}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Correo o contraseña incorrectos");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-cream)",
        padding: "1.5rem",
      }}
    >
      
      <div
        style={{
          background: "var(--color-white)",
          borderRadius: "var(--radius)",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🐻</div>
          <h1
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "1.8rem",
              color: "var(--color-text)",
              marginBottom: "0.25rem",
            }}
          >
            Panel Admin
          </h1>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
            }}
          >
            Jardín Infantil Winnie Pooh
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color-text)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                border: "2px solid var(--color-border)",
                fontFamily: "var(--font-nunito)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
                background: "var(--color-cream)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-honey)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            />
          </div>

          <div>
            <label
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color-text)",
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                border: "2px solid var(--color-border)",
                fontFamily: "var(--font-nunito)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
                background: "var(--color-cream)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-honey)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            />
          </div>

          {error && (
            <p
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.85rem",
                color: "var(--color-red)",
                fontWeight: 600,
              }}
            >
              ⚠️ {error}
            </p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: loading ? "var(--color-border)" : "var(--color-honey)",
              color: "white",
              fontFamily: "var(--font-nunito)",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.85rem",
              borderRadius: "999px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </div>
  );
}
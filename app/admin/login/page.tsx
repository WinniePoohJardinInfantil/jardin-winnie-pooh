"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import { AuroraText } from "@/components/ui/aurora-text";

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

  const auroraColors = ["#FF7893", "#7AC0FF", "#4FF084", "#FFFC01", "#EB8100"];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #fce7f3 100%)",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative elements */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(122, 192, 255, 0.1)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255, 120, 147, 0.1)", filter: "blur(40px)" }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "2rem",
          padding: "3rem 2.5rem",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.8)",
          overflow: "hidden"
        }}
      >
        <BorderBeam size={300} duration={10} colorFrom="#7AC0FF" colorTo="#FF7893" />

        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ 
            width: "80px", 
            height: "80px", 
            margin: "0 auto 1rem",
            position: "relative",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            border: "2px solid #f0f0f0"
          }}>
            <Image src="/logos/jardin-infantil.png" alt="Logo Winnie Pooh" width={70} height={70} style={{ objectFit: "contain" }} priority />
          </div>
          
          <h1
            style={{
              fontFamily: "var(--font-fredoka)",
              fontSize: "2rem",
              fontWeight: 900,
              marginBottom: "0.5rem",
              lineHeight: 1.2
            }}
          >
            <AuroraText colors={auroraColors}>Panel Admin</AuroraText>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-nunito)",
              fontSize: "0.95rem",
              color: "#64748b",
              fontWeight: 600
            }}
          >
            Jardín Infantil Winnie Pooh
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#334155",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Mail size={16} color="#7AC0FF" />
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              style={{
                width: "100%",
                padding: "0.85rem 1.1rem",
                borderRadius: "1rem",
                border: "2px solid #e2e8f0",
                fontFamily: "var(--font-nunito)",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s",
                background: "#f8fafc",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#7AC0FF";
                e.currentTarget.style.background = "#ffffff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = "#f8fafc";
              }}
            />
          </div>

          <div>
            <label
              style={{
                fontFamily: "var(--font-nunito)",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#334155",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Lock size={16} color="#FF7893" />
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
                padding: "0.85rem 1.1rem",
                borderRadius: "1rem",
                border: "2px solid #e2e8f0",
                fontFamily: "var(--font-nunito)",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.2s",
                background: "#f8fafc",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#FF7893";
                e.currentTarget.style.background = "#ffffff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = "#f8fafc";
              }}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1rem",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "1rem",
                fontFamily: "var(--font-nunito)",
                fontSize: "0.9rem",
                color: "#dc2626",
                fontWeight: 600,
              }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: loading ? "#cbd5e1" : "linear-gradient(135deg, #4FF084 0%, #22c55e 100%)",
              color: loading ? "#64748b" : "#1a1a1a",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 700,
              fontSize: "1.1rem",
              padding: "0.95rem",
              borderRadius: "1rem",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              marginTop: "0.5rem",
              boxShadow: loading ? "none" : "0 4px 14px rgba(79, 240, 132, 0.3)",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 240, 132, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(79, 240, 132, 0.3)";
              }
            }}
          >
            {loading ? "Ingresando..." : "Ingresar al Panel"}
          </button>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-nunito)", fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600 }}>
            © 2026 Winnie Pooh Medellín
          </p>
        </div>
      </motion.div>
    </div>
  );
}
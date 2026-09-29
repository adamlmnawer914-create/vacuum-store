"use client";

import { useEffect } from "react";

export default function StopOverlay() {
  useEffect(() => {
    try {
      alert("مرحبا");
    } catch (e) {
      // Ignore if alert blocked
    }
  }, []);

  return (
    <div
      id="stop-screen-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        zIndex: 99999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          backgroundColor: "#0a0a0a",
          border: "1px solid #262626",
          borderRadius: "1rem",
          padding: "2rem 2.5rem",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>⚠️</div>
        <div
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#f87171",
            letterSpacing: "0.025em",
          }}
        >
          تحذير
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#ffffff",
            padding: "0.5rem 1.5rem",
            backgroundColor: "#171717",
            borderRadius: "0.75rem",
            border: "1px solid #333333",
            width: "100%",
          }}
        >
          مرحبا
        </div>
      </div>
    </div>
  );
}

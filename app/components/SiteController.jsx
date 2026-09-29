"use client";

import { useState, useEffect } from "react";

const REALTIME_TOPIC = "vacuum_store_ctrl_914_x7a9";

export default function SiteController({ initialStatus }) {
  const [siteState, setSiteState] = useState({
    active: initialStatus ? initialStatus.active : false,
    message: initialStatus?.message || "مرحبا",
    loaded: true,
  });

  useEffect(() => {
    let isMounted = true;

    // 1. Instant Polling Function
    async function fetchInstantStatus() {
      try {
        const res = await fetch(`https://ntfy.sh/${REALTIME_TOPIC}/raw?poll=1`, {
          cache: "no-store",
        });
        if (res.ok) {
          const raw = await res.text();
          if (raw && raw.trim()) {
            const lines = raw.trim().split("\n");
            const lastLine = lines[lines.length - 1];
            try {
              const parsed = JSON.parse(lastLine);
              if (isMounted && typeof parsed.active === "boolean") {
                setSiteState({
                  active: parsed.active,
                  message: parsed.message || "مرحبا",
                  loaded: true,
                });
                return;
              }
            } catch (err) {}
          }
        }
      } catch (err) {}

      // Fallback API route
      try {
        const fallbackRes = await fetch("/api/site-status?t=" + Date.now(), {
          cache: "no-store",
        });
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          if (isMounted && typeof data.active === "boolean") {
            setSiteState({
              active: data.active,
              message: data.message || "مرحبا",
              loaded: true,
            });
          }
        }
      } catch (e) {}
    }

    // 2. Real-Time SSE (Instant Event Delivery without reload)
    let eventSource = null;
    try {
      eventSource = new EventSource(`https://ntfy.sh/${REALTIME_TOPIC}/sse`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === "message" && data.message) {
            const parsed = JSON.parse(data.message);
            if (isMounted && typeof parsed.active === "boolean") {
              if (initialStatus?.active === false && parsed.active === true) {
                window.location.reload();
                return;
              }
              setSiteState({
                active: parsed.active,
                message: parsed.message || "مرحبا",
                loaded: true,
              });
            }
          }
        } catch (e) {
          console.error("SSE parse error:", e);
        }
      };
    } catch (e) {
      console.error("EventSource initialization failed:", e);
    }

    // 3. Fast Backup Polling every 2.5 seconds
    const interval = setInterval(fetchInstantStatus, 2500);

    return () => {
      isMounted = false;
      if (eventSource) eventSource.close();
      clearInterval(interval);
    };
  }, []);

  if (siteState.active) {
    return null;
  }

  return (
    <div
      id="site-stop-overlay"
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
      <style>{`
        @keyframes pulseAlert {
          0%, 100% { box-shadow: 0 0 35px rgba(239, 68, 68, 0.45); border-color: #ef4444; }
          50% { box-shadow: 0 0 65px rgba(239, 68, 68, 0.85); border-color: #f87171; }
        }
      `}</style>

      <div
        style={{
          backgroundColor: "#0a0a0a",
          border: "2px solid #ef4444",
          borderRadius: "1.25rem",
          padding: "2.5rem 2rem",
          maxWidth: "440px",
          width: "92%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          animation: "pulseAlert 2s infinite ease-in-out",
        }}
      >
        <div style={{ fontSize: "3.75rem", lineHeight: 1 }}>⚠️</div>
        <div
          style={{
            fontSize: "1.85rem",
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
            padding: "0.75rem 2rem",
            backgroundColor: "#171717",
            borderRadius: "0.85rem",
            border: "1px solid #333333",
            width: "100%",
          }}
        >
          {siteState.message}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

const REALTIME_TOPIC = "vacuum_store_status_x914_fast";

export default function SiteController({ initialStatus }) {
  const [siteState, setSiteState] = useState({
    active: initialStatus ? initialStatus.active : true,
    message: initialStatus?.message || "مرحبا",
    loaded: true,
  });

  const initialWasStopped = initialStatus ? initialStatus.active === false : false;
  const isReloadingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let ws = null;
    let eventSource = null;

    function applyUpdate(data) {
      if (!isMounted || !data || typeof data.active !== "boolean") return;

      if (initialWasStopped && data.active === true && !isReloadingRef.current) {
        isReloadingRef.current = true;
        window.location.href = window.location.pathname + "?_ts=" + Date.now();
        return;
      }

      setSiteState({
        active: data.active,
        message: data.message || "مرحبا",
        loaded: true,
      });
    }

    // 1. Instant WebSocket connection (Delivers updates in ~20ms)
    try {
      ws = new WebSocket(`wss://ntfy.sh/${REALTIME_TOPIC}/ws`);
      ws.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw.event === "message" && raw.message) {
            const parsed = JSON.parse(raw.message);
            applyUpdate(parsed);
          }
        } catch (e) {}
      };
    } catch (e) {}

    // 2. Secondary SSE stream
    try {
      eventSource = new EventSource(`https://ntfy.sh/${REALTIME_TOPIC}/sse`);
      eventSource.onmessage = (event) => {
        try {
          const raw = JSON.parse(event.data);
          if (raw.event === "message" && raw.message) {
            const parsed = JSON.parse(raw.message);
            applyUpdate(parsed);
          }
        } catch (e) {}
      };
    } catch (e) {}

    // 3. Fallback polling every 2 seconds
    async function checkStatus() {
      try {
        const res = await fetch("/api/site-status?t=" + Date.now(), {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (res.ok) {
          const data = await res.json();
          applyUpdate(data);
        }
      } catch (err) {}
    }

    checkStatus();
    const interval = setInterval(checkStatus, 2000);

    return () => {
      isMounted = false;
      if (ws) {
        try {
          ws.close();
        } catch (e) {}
      }
      if (eventSource) {
        try {
          eventSource.close();
        } catch (e) {}
      }
      clearInterval(interval);
    };
  }, [initialWasStopped]);

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
          boxShadow: "0 0 50px rgba(239, 68, 68, 0.6)",
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

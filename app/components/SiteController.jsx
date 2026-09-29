"use client";

import { useState, useEffect } from "react";

export default function SiteController({ initialStatus }) {
  const [siteState, setSiteState] = useState({
    active: initialStatus ? initialStatus.active : true,
    message: initialStatus?.message || "مرحبا",
    loaded: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function checkStatus() {
      try {
        const res = await fetch("/api/site-status?t=" + Date.now(), {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted && typeof data.active === "boolean") {
            setSiteState((prevState) => {
              // If it was stopped and now turned active, reload immediately to fetch full HTML
              if (prevState.active === false && data.active === true) {
                window.location.reload();
                return prevState;
              }

              return {
                active: data.active,
                message: data.message || "مرحبا",
                loaded: true,
              };
            });
          }
        }
      } catch (err) {
        // Network glitch, keep current state
      }
    }

    // Check status immediately
    checkStatus();

    // Check status every 2 seconds
    const interval = setInterval(checkStatus, 2000);

    return () => {
      isMounted = false;
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

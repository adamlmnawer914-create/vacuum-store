"use client";

import { useState, useEffect } from "react";

export default function SiteController() {
  const [siteState, setSiteState] = useState({
    active: true,
    message: "مرحبا",
    loaded: false,
  });

  useEffect(() => {
    let isMounted = true;
    let hasAlerted = false;

    async function checkStatus() {
      try {
        const res = await fetch("/api/site-status?t=" + Date.now(), {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            const isSiteActive = data.active !== false;
            setSiteState({
              active: isSiteActive,
              message: data.message || "مرحبا",
              loaded: true,
            });

            if (!isSiteActive && !hasAlerted) {
              hasAlerted = true;
              try {
                alert(data.message || "مرحبا");
              } catch (e) {
                // Ignore alert block
              }
            } else if (isSiteActive) {
              hasAlerted = false;
            }
          }
        }
      } catch (err) {
        // Silently keep current state if network glitch
      }
    }

    // Initial check
    checkStatus();

    // Recheck periodically every 5 seconds
    const interval = setInterval(checkStatus, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!siteState.loaded || siteState.active) {
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
          {siteState.message}
        </div>
      </div>
    </div>
  );
}

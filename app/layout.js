import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteController from "./components/SiteController";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1B34",
};

export const metadata = {
  title: "VacuumStore — More Space. Better Living. | Smart Storage Solutions",
  description:
    "Vacuum Storage Bags Set. Up to 80% space saving, airtight & waterproof, reusable protection. Free shipping over $50.",
  keywords:
    "vacuum storage bags, sacs de compression, storage solutions, space saving bags",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getSiteStatus() {
  try {
    const timestamp = Date.now();
    const url = `https://gist.githubusercontent.com/adamlmnawer914-create/1f3b21eaaf65b90e0e21c7be4799ec76/raw/vacuum_store_status.json?t=${timestamp}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "VacuumStoreStatusCheck/1.0",
      },
    });

    if (res.ok) {
      const raw = await res.text();
      const clean = raw.replace(/^\uFEFF/, "").trim();
      const parsed = JSON.parse(clean);
      if (typeof parsed.active === "boolean") {
        return parsed;
      }
    }
  } catch (err) {}

  return { active: true, message: "مرحبا" };
}

export default async function RootLayout({ children }) {
  const initialStatus = await getSiteStatus();
  const isStopped = initialStatus?.active === false;

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`min-h-full flex flex-col ${
          isStopped ? "bg-black" : "bg-white"
        }`}
      >
        <SiteController initialStatus={initialStatus} />
        {isStopped ? (
          <div
            id="initial-stop-screen"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#000000",
              zIndex: 99999990,
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
                {initialStatus?.message || "مرحبا"}
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}

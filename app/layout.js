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
    const res = await fetch("https://ntfy.sh/vacuum_store_ctrl_914_x7a9/raw?poll=1", {
      cache: "no-store",
    });
    if (res.ok) {
      const raw = await res.text();
      if (raw && raw.trim()) {
        const lines = raw.trim().split("\n");
        const parsed = JSON.parse(lines[lines.length - 1]);
        if (typeof parsed.active === "boolean") {
          return parsed;
        }
      }
    }
  } catch (err) {}

  // Fallback to Gist
  try {
    const gistRes = await fetch("https://api.github.com/gists/1f3b21eaaf65b90e0e21c7be4799ec76", {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "VacuumStore" },
      cache: "no-store",
    });
    if (gistRes.ok) {
      const data = await gistRes.json();
      const raw = data.files?.["vacuum_store_status.json"]?.content;
      if (raw) {
        return JSON.parse(raw.replace(/^\uFEFF/, "").trim());
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
      <body className={`min-h-full flex flex-col ${isStopped ? "bg-black" : "bg-white"}`}>
        <SiteController initialStatus={initialStatus} />
        {children}
      </body>
    </html>
  );
}

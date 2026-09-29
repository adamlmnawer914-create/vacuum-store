import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StopOverlay from "./components/StopOverlay";

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

export default function RootLayout({ children }) {
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
      <body className="min-h-full flex flex-col bg-black">
        <StopOverlay />
        {children}
      </body>
    </html>
  );
}

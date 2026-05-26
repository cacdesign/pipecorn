import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Announcement from "./components/Announcement";

export const metadata: Metadata = {
  title: "Pipecorn — Enrich your leads at scale.",
  description:
    "Aggregate 100+ data sources to find emails, phones and qualified contacts. One subscription, unlimited leads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Announcement />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

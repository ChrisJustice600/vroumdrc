import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoConnect - Acheter et vendre des voitures",
  description:
    "La plateforme de confiance pour vendre et acheter des véhicules d'occasion entre particuliers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-helvetica">{children}</body>
    </html>
  );
}

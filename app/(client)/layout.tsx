import "@/app/globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default:
      " VroumDRC - Vente de voitures neuves et d'occasion au Congo Kinshasa",
    template: "%s |  VroumDRC",
  },
  description:
    " VroumDRC est la plateforme de référence pour l'achat et la vente de voitures neuves et d'occasion au Congo Kinshasa. Trouvez votre véhicule idéal parmi des milliers d'annonces vérifiées.",
  keywords: [
    "voitures Congo Kinshasa",
    "voitures RDC",
    "vente voiture Kinshasa",
    "achat voiture Kinshasa",
    "voitures neuves RDC",
    "voitures occasion RDC",
    "automobile Congo Kinshasa",
    "véhicules Kinshasa",
    "auto RDC",
    "car Congo",
    "Kinshasa",
    "Lubumbashi",
    "Mbuji-Mayi",
    "Kananga",
    "Kisangani",
    "Bukavu",
    " VroumDRC",
  ],
  authors: [{ name: " VroumDRC Team" }],
  creator: " VroumDRC",
  publisher: " VroumDRC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https:// Vroumdrc.com"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-CD": "/fr",
      "en-CD": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CD",
    url: "https:// Vroumdrc.com",
    siteName: " VroumDRC",
    title:
      " VroumDRC - Vente de voitures neuves et d'occasion au Congo Kinshasa",
    description:
      "Trouvez votre véhicule idéal parmi des milliers d'annonces vérifiées de voitures neuves et d'occasion au Congo Kinshasa.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: " VroumDRC - Plateforme de vente de voitures au Congo Kinshasa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      " VroumDRC - Vente de voitures neuves et d'occasion au Congo Kinshasa",
    description:
      "Trouvez votre véhicule idéal parmi des milliers d'annonces vérifiées de voitures neuves et d'occasion au Congo Kinshasa.",
    images: ["/banner.png"],
    creator: "@ Vroumdrc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon_ Vroum/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_ Vroum/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_ Vroum/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/favicon_ Vroum/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon_ Vroum/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

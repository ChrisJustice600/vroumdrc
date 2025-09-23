import "@/app/globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VroomKin",
  description: "Vente de voitures neuves et d'occasion",
  icons: {
    icon: [
      {
        url: "/favicon_vroom/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_vroom/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      { url: "/favicon_vroom/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: [
      {
        url: "/favicon_vroom/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon_vroom/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen font-sans-helvetica">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

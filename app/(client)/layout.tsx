import "@/app/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/navbar";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata = {
  title: "Auto-connect",
  description: "Vente de voitures neuves et d'occasion",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={lato.variable}>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

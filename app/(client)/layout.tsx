import "@/app/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/navbar";

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
    <html lang="fr">
      <body className="flex flex-col min-h-screen font-sans-helvetica">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

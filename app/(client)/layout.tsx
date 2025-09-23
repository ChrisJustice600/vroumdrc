import "@/app/globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar/navbar";

export const metadata = {
  title: "VroomKin",
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
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

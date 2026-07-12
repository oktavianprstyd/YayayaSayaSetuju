import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMKM Legal - Bantu UMKM Urus Legalitas & Pajak",
  description: "Platform bantu UMKM mengurus legalitas, perizinan, dan perpajakan dengan mudah. Cek status legalitas, panduan perizinan, kalkulator pajak, dan template surat.",
  keywords: ["UMKM", "legalitas", "NIB", "NPWP", "pajak UMKM", "perizinan", "sertifikat halal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <UserProvider>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main id="main-content" className="flex-1">{children}</main>
              <Footer />
            </div>
          </ErrorBoundary>
        </UserProvider>
      </body>
    </html>
  );
}

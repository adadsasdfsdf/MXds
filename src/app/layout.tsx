import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/CarritoContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TiendaMexicana · Productos auténticos de México",
  description:
    "Tienda en línea de productos mexicanos: artesanías, ropa, alimentos y más. Envíos a toda la República. Pago con tarjeta, OXXO y SPEI.",
  keywords: [
    "tienda mexicana",
    "artesanías",
    "productos mexicanos",
    "OXXO",
    "MXN",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <AuthProvider>
          <CarritoProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CarritoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

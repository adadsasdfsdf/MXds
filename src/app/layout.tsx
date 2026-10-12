import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/CarritoContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatSoporte from "@/components/ChatSoporte";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Mexlindo · Lo lindo de México, en tu puerta",
    template: "%s · Mexlindo",
  },
  description:
    "Mexlindo: tienda en línea de productos mexicanos auténticos — artesanías, ropa, alimentos y más. Envíos a toda la República. Pago con tarjeta, SPEI y Mercado Pago.",
  keywords: [
    "Mexlindo",
    "tienda mexicana",
    "artesanías",
    "productos mexicanos",
    "SPEI",
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
            <ChatSoporte />
          </CarritoProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

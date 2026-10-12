"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import { CATEGORIAS } from "@/lib/data";

export default function Header() {
  const { totalItems } = useCarrito();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      {/* Barra superior con mensaje de envío */}
      <div className="bg-mexico-green text-center text-sm text-white">
        <p className="py-1.5">
          🚚 Envío gratis en compras mayores a $999 MXN · Pago en OXXO
          disponible
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌵</span>
          <span className="text-xl font-bold text-mexico-green">
            Tienda<span className="text-mexico-red">Mexicana</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.id}`}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-mexico-green"
            >
              {c.nombre}
            </Link>
          ))}
        </nav>

        <Link
          href="/carrito"
          className="relative flex items-center gap-2 rounded-lg bg-mexico-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-mexico-green/90"
        >
          <span>🛒</span>
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-mexico-red text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

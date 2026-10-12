"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIAS } from "@/lib/data";
import { Logo } from "@/components/Logo";

export default function Header() {
  const { totalItems } = useCarrito();
  const { usuario, logout } = useAuth();
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuAbierto(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      {/* Barra superior con mensaje de envío */}
      <div className="bg-mexico-green text-center text-sm text-white">
        <p className="py-1.5">
          🌵 Lo lindo de México, en tu puerta · Envío gratis desde $999 MXN ·
          Pago en OXXO
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/">
          <Logo />
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

        <div className="flex items-center gap-3">
          {/* Cuenta de usuario */}
          <div className="relative">
            <button
              onClick={() => setMenuAbierto((v) => !v)}
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:text-mexico-green"
            >
              <span>👤</span>
              <span className="hidden sm:inline">
                {usuario ? usuario.nombre.split(" ")[0] : "Cuenta"}
              </span>
            </button>

            {menuAbierto && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuAbierto(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-52 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  {usuario ? (
                    <>
                      <div className="border-b border-gray-100 px-4 py-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {usuario.nombre}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {usuario.email}
                        </p>
                      </div>
                      <Link
                        href="/mi-cuenta"
                        onClick={() => setMenuAbierto(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-mexico-sand"
                      >
                        Mi cuenta y pedidos
                      </Link>
                      {usuario.rol === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setMenuAbierto(false)}
                          className="block px-4 py-2 text-sm font-medium text-mexico-green hover:bg-mexico-sand"
                        >
                          ⚙️ Panel de administración
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-mexico-red hover:bg-mexico-sand"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMenuAbierto(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-mexico-sand"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        href="/registro"
                        onClick={() => setMenuAbierto(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-mexico-sand"
                      >
                        Crear cuenta
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

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
      </div>
    </header>
  );
}

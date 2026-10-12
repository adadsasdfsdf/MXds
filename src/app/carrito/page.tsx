"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import { formatMXN, FREE_SHIPPING_THRESHOLD } from "@/lib/mexico";

export default function CarritoPage() {
  const {
    items,
    subtotal,
    iva,
    envio,
    total,
    actualizarCantidad,
    quitar,
    vaciar,
  } = useCarrito();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-gray-600">
          ¡Descubre lo mejor de México y llena tu carrito!
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white transition-colors hover:bg-mexico-green/90"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  const faltaParaEnvioGratis = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Tu carrito</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(({ producto, cantidad }) => (
              <div
                key={producto.id}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/producto/${producto.slug}`}
                        className="font-semibold text-gray-900 hover:text-mexico-green"
                      >
                        {producto.nombre}
                      </Link>
                      {producto.origen && (
                        <p className="text-xs text-mexico-green">
                          📍 {producto.origen}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => quitar(producto.id)}
                      className="text-sm text-gray-400 hover:text-mexico-red"
                      aria-label="Quitar producto"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-300">
                      <button
                        onClick={() =>
                          actualizarCantidad(producto.id, cantidad - 1)
                        }
                        className="px-3 py-1 text-gray-600 hover:text-mexico-green"
                        aria-label="Disminuir"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {cantidad}
                      </span>
                      <button
                        onClick={() =>
                          actualizarCantidad(
                            producto.id,
                            Math.min(producto.stock, cantidad + 1),
                          )
                        }
                        className="px-3 py-1 text-gray-600 hover:text-mexico-green"
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatMXN(producto.precio * cantidad)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={vaciar}
            className="mt-4 text-sm text-gray-500 hover:text-mexico-red"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Resumen del pedido
          </h2>

          {faltaParaEnvioGratis > 0 && (
            <p className="mb-4 rounded-lg bg-mexico-sand p-3 text-sm text-gray-700">
              Te faltan{" "}
              <span className="font-semibold text-mexico-green">
                {formatMXN(faltaParaEnvioGratis)}
              </span>{" "}
              para obtener envío gratis 🚚
            </p>
          )}

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium">{formatMXN(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-gray-500">
              <dt>IVA (16%) incluido</dt>
              <dd>{formatMXN(iva)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Envío</dt>
              <dd className="font-medium">
                {envio === 0 ? (
                  <span className="text-mexico-green">Gratis</span>
                ) : (
                  formatMXN(envio)
                )}
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <dt>Total</dt>
                <dd>{formatMXN(total)}</dd>
              </div>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-6 block rounded-lg bg-mexico-green py-3 text-center font-semibold text-white transition-colors hover:bg-mexico-green/90"
          >
            Proceder al pago
          </Link>
          <Link
            href="/"
            className="mt-2 block text-center text-sm text-gray-500 hover:text-mexico-green"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/lib/types";
import { formatMXN, ivaIncluido } from "@/lib/mexico";
import { useCarrito } from "@/context/CarritoContext";

export default function DetalleProducto({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-mexico-green">
          Inicio
        </Link>{" "}
        /{" "}
        <Link
          href={`/categoria/${producto.categoria}`}
          className="capitalize hover:text-mexico-green"
        >
          {producto.categoria}
        </Link>{" "}
        / <span className="text-gray-900">{producto.nombre}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          {producto.origen && (
            <span className="text-sm font-medium text-mexico-green">
              📍 Hecho en {producto.origen}
            </span>
          )}
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {producto.nombre}
          </h1>

          <div className="mt-4 flex items-end gap-3">
            {producto.precioAnterior && (
              <span className="text-lg text-gray-400 line-through">
                {formatMXN(producto.precioAnterior)}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900">
              {formatMXN(producto.precio)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            IVA incluido ({formatMXN(ivaIncluido(producto.precio))})
          </p>

          <p className="mt-6 text-gray-700">{producto.descripcion}</p>

          <div className="mt-6">
            {producto.stock > 0 ? (
              <p className="text-sm font-medium text-mexico-green">
                ✓ {producto.stock} disponibles
              </p>
            ) : (
              <p className="text-sm font-medium text-mexico-red">Agotado</p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="px-4 py-2 text-lg text-gray-600 hover:text-mexico-green"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold">{cantidad}</span>
              <button
                onClick={() =>
                  setCantidad((c) => Math.min(producto.stock, c + 1))
                }
                className="px-4 py-2 text-lg text-gray-600 hover:text-mexico-green"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAgregar}
              disabled={producto.stock === 0}
              className="flex-1 rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white transition-colors hover:bg-mexico-green/90 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {agregado ? "✓ Agregado al carrito" : "Agregar al carrito"}
            </button>
          </div>

          <div className="mt-8 space-y-2 rounded-lg bg-mexico-sand p-4 text-sm text-gray-700">
            <p>🚚 Envío gratis en compras mayores a $999 MXN</p>
            <p>🏪 Paga con tarjeta, OXXO, SPEI o Mercado Pago</p>
            <p>🧾 Facturación CFDI disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
}

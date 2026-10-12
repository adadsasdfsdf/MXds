"use client";

import Image from "next/image";
import Link from "next/link";
import type { Producto } from "@/lib/types";
import { formatMXN } from "@/lib/mexico";
import { useCarrito } from "@/context/CarritoContext";

export default function ProductoCard({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();

  const tieneDescuento =
    producto.precioAnterior && producto.precioAnterior > producto.precio;
  const porcentajeDescuento = tieneDescuento
    ? Math.round(
        ((producto.precioAnterior! - producto.precio) /
          producto.precioAnterior!) *
          100,
      )
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/producto/${producto.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {tieneDescuento && (
            <span className="absolute left-2 top-2 rounded-full bg-mexico-red px-2 py-1 text-xs font-bold text-white">
              -{porcentajeDescuento}%
            </span>
          )}
          {producto.stock <= 10 && producto.stock > 0 && (
            <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white">
              ¡Últimas piezas!
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {producto.origen && (
          <span className="mb-1 text-xs font-medium text-mexico-green">
            📍 {producto.origen}
          </span>
        )}
        <Link href={`/producto/${producto.slug}`}>
          <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-mexico-green">
            {producto.nombre}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
          {producto.descripcion}
        </p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            {tieneDescuento && (
              <span className="block text-xs text-gray-400 line-through">
                {formatMXN(producto.precioAnterior!)}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {formatMXN(producto.precio)}
            </span>
          </div>
          <button
            onClick={() => agregar(producto)}
            disabled={producto.stock === 0}
            className="rounded-lg bg-mexico-green px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-mexico-green/90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {producto.stock === 0 ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}

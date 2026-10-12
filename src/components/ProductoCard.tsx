"use client";

import Link from "next/link";
import { useState } from "react";
import type { Producto } from "@/lib/types";
import { formatMXN } from "@/lib/mexico";
import { useCarrito } from "@/context/CarritoContext";

// Imagen de respaldo si la URL del producto falla al cargar.
const IMG_FALLBACK =
  "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80";

export default function ProductoCard({ producto }: { producto: Producto }) {
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);
  const [imgSrc, setImgSrc] = useState(producto.imagen);

  const tieneDescuento =
    producto.precioAnterior && producto.precioAnterior > producto.precio;
  const porcentajeDescuento = tieneDescuento
    ? Math.round(
        ((producto.precioAnterior! - producto.precio) /
          producto.precioAnterior!) *
          100,
      )
    : 0;

  const handleAgregar = () => {
    agregar(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/producto/${producto.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={producto.nombre}
            loading="lazy"
            onError={() => setImgSrc(IMG_FALLBACK)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {tieneDescuento && (
            <span className="absolute left-2 top-2 rounded-full bg-mexico-red px-2.5 py-1 text-xs font-bold text-white shadow">
              -{porcentajeDescuento}%
            </span>
          )}
          {producto.stock <= 10 && producto.stock > 0 && (
            <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-semibold text-white shadow">
              ¡Últimas piezas!
            </span>
          )}
          {producto.stock === 0 && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-bold text-white">
              Agotado
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
          <h3 className="line-clamp-1 font-semibold text-gray-900 transition-colors group-hover:text-mexico-green">
            {producto.nombre}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
          {producto.descripcion}
        </p>

        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-gray-900">
              {formatMXN(producto.precio)}
            </span>
            {tieneDescuento && (
              <span className="text-sm text-gray-400 line-through">
                {formatMXN(producto.precioAnterior!)}
              </span>
            )}
          </div>
          {tieneDescuento && (
            <span className="text-xs font-medium text-mexico-red">
              Ahorras {formatMXN(producto.precioAnterior! - producto.precio)}
            </span>
          )}
        </div>

        <button
          onClick={handleAgregar}
          disabled={producto.stock === 0}
          className={`mt-3 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300 ${
            agregado
              ? "bg-emerald-600"
              : "bg-mexico-green hover:bg-mexico-green/90"
          }`}
        >
          {producto.stock === 0
            ? "Agotado"
            : agregado
              ? "✓ Agregado"
              : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

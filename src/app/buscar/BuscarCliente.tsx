"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductoCard from "@/components/ProductoCard";
import type { Producto } from "@/lib/types";

function Resultados({ productos }: { productos: Producto[] }) {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();

  const resultados = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        (p.origen ?? "").toLowerCase().includes(q),
    );
  }, [productos, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">
        {query ? (
          <>
            Resultados para{" "}
            <span className="text-mexico-green">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Buscar productos"
        )}
      </h1>

      {query && (
        <p className="mt-1 text-sm text-gray-500">
          {resultados.length} producto(s) encontrado(s)
        </p>
      )}

      {query && resultados.length === 0 ? (
        <div className="mt-10 rounded-xl bg-mexico-sand p-10 text-center">
          <div className="text-5xl">🔍</div>
          <p className="mt-4 text-gray-600">
            No encontramos productos para &ldquo;{query}&rdquo;.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white"
          >
            Explorar la tienda
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {resultados.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BuscarCliente({ productos }: { productos: Producto[] }) {
  // useSearchParams() debe envolverse en <Suspense> para el prerender.
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10" />}>
      <Resultados productos={productos} />
    </Suspense>
  );
}

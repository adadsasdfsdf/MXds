import Link from "next/link";
import ProductoCard from "@/components/ProductoCard";
import { CATEGORIAS, getProductosDestacados } from "@/lib/data";

export default async function HomePage() {
  const destacados = await getProductosDestacados();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-mexico-green to-emerald-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Lo mejor de México,{" "}
              <span className="text-amber-300">directo a tu puerta</span>
            </h1>
            <p className="mt-4 text-lg text-emerald-50">
              Artesanías, textiles, alimentos y más. Productos auténticos hechos
              por manos mexicanas. Envíos a toda la República.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/categoria/artesanias"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-mexico-green transition-transform hover:scale-105"
              >
                Explorar productos
              </Link>
              <Link
                href="#destacados"
                className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Ver destacados
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Explora por categoría
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.id}`}
              className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center transition-shadow hover:shadow-md"
            >
              <span className="text-4xl">{c.emoji}</span>
              <span className="mt-2 font-semibold text-gray-900">
                {c.nombre}
              </span>
              <span className="mt-1 text-xs text-gray-500">
                {c.descripcion}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section id="destacados" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Productos destacados ⭐
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {destacados.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="bg-mexico-sand">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 text-center md:grid-cols-3">
          <div>
            <div className="text-3xl">🚚</div>
            <h3 className="mt-2 font-semibold text-gray-900">
              Envío a todo México
            </h3>
            <p className="text-sm text-gray-600">
              Gratis en compras mayores a $999 MXN
            </p>
          </div>
          <div>
            <div className="text-3xl">🏪</div>
            <h3 className="mt-2 font-semibold text-gray-900">Paga en OXXO</h3>
            <p className="text-sm text-gray-600">
              O con tarjeta, SPEI y Mercado Pago
            </p>
          </div>
          <div>
            <div className="text-3xl">🤝</div>
            <h3 className="mt-2 font-semibold text-gray-900">Comercio justo</h3>
            <p className="text-sm text-gray-600">
              Apoyamos directamente a los artesanos
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

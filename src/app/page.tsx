import Link from "next/link";
import ProductoCard from "@/components/ProductoCard";
import CategoriaIcono from "@/components/CategoriaIcono";
import HeroCarrusel from "@/components/HeroCarrusel";
import { CATEGORIAS, getProductosDestacados } from "@/lib/data";

export default async function HomePage() {
  const destacados = await getProductosDestacados();

  return (
    <>
      {/* Banner de promoción de lanzamiento */}
      <section className="relative overflow-hidden bg-gradient-to-r from-mexico-red via-rose-600 to-mexico-red">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-5 text-center text-white sm:flex-row sm:justify-center sm:gap-4">
          <span className="text-2xl">🎉</span>
          <p className="text-base font-bold sm:text-lg">
            ¡NUEVA TIENDA! Celebramos nuestro lanzamiento con{" "}
            <span className="rounded-md bg-white px-2 py-0.5 text-mexico-red">
              15% DE DESCUENTO
            </span>{" "}
            en TODA la tienda · ¡Paga solo el 85%!
          </p>
          <Link
            href="/ofertas"
            className="rounded-full bg-amber-300 px-5 py-1.5 text-sm font-bold text-mexico-red transition-transform hover:scale-105"
          >
            ¡Comprar ahora!
          </Link>
        </div>
      </section>

      {/* Hero carrusel (diapositivas con imagen de fondo y autoplay) */}
      <HeroCarrusel />

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Explora por categoría
          </h2>
          <p className="mt-2 text-gray-500">
            12 categorías llenas de lo mejor de México
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.id}`}
              className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-mexico-green hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mexico-green/10 text-mexico-green transition-colors group-hover:bg-mexico-green group-hover:text-white">
                <CategoriaIcono categoria={c.id} className="h-7 w-7" />
              </span>
              <span className="mt-2 text-sm font-semibold text-gray-900">
                {c.nombre}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner descuento secundario */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 p-8 text-center shadow-md sm:flex-row sm:text-left">
          <div>
            <h3 className="text-2xl font-extrabold text-mexico-green">
              🔥 Oferta de lanzamiento: ¡todo al 85%!
            </h3>
            <p className="mt-1 text-amber-900">
              Precios rebajados en todo el catálogo. Por tiempo limitado.
            </p>
          </div>
          <Link
            href="/ofertas"
            className="whitespace-nowrap rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white shadow transition-transform hover:scale-105"
          >
            Ver ofertas
          </Link>
        </div>
      </section>

      {/* Productos destacados */}
      <section id="destacados" className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Ofertas destacadas 🔥
            </h2>
            <p className="mt-1 text-gray-500">
              Los favoritos, ahora con descuento
            </p>
          </div>
          <Link
            href="/categoria/artesanias"
            className="hidden text-sm font-medium text-mexico-green hover:underline sm:block"
          >
            Ver todo →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {destacados.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="bg-mexico-sand">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 text-center md:grid-cols-4">
          <div>
            <div className="text-4xl">🚚</div>
            <h3 className="mt-3 font-semibold text-gray-900">
              Envío a todo México
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Gratis en compras mayores a $999 MXN
            </p>
          </div>
          <div>
            <div className="text-4xl">💳</div>
            <h3 className="mt-3 font-semibold text-gray-900">Pago seguro</h3>
            <p className="mt-1 text-sm text-gray-600">
              Tarjeta, SPEI y Mercado Pago
            </p>
          </div>
          <div>
            <div className="text-4xl">🧾</div>
            <h3 className="mt-3 font-semibold text-gray-900">Factura CFDI</h3>
            <p className="mt-1 text-sm text-gray-600">
              Facturación disponible en todos tus pedidos
            </p>
          </div>
          <div>
            <div className="text-4xl">🤝</div>
            <h3 className="mt-3 font-semibold text-gray-900">Comercio justo</h3>
            <p className="mt-1 text-sm text-gray-600">
              Apoyamos directamente a los artesanos
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

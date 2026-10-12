import Link from "next/link";
import ProductoCard from "@/components/ProductoCard";
import { getProductos } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ofertas de lanzamiento · 15% en toda la tienda",
  description:
    "Aprovecha nuestras ofertas de lanzamiento: 15% de descuento en todos los productos mexicanos de Mexlindo.",
};

// Frases promocionales que se desplazan en la cinta.
const FRASES = [
  "🔥 15% DE DESCUENTO EN TODA LA TIENDA",
  "🎁 ¡PAGA SOLO EL 85% POR TIEMPO LIMITADO!",
  "🚚 ENVÍO GRATIS DESDE $999 MXN",
  "✨ MÁS DE 100 PRODUCTOS AUTÉNTICOS MEXICANOS",
  "💳 MESES SIN INTERESES CON MERCADO PAGO",
];

export default async function OfertasPage() {
  const productos = await getProductos();
  const enOferta = productos.filter((p) => p.precioAnterior);
  const frases = [...FRASES, ...FRASES];

  return (
    <>
      {/* Hero con imagen de fondo de compras */}
      <section className="relative isolate overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/mexlindo-ofertas-shopping/1600/700')",
          }}
        />
        {/* Capa de color encima para legibilidad */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-mexico-green/95 via-mexico-green/85 to-mexico-red/70" />

        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-white md:py-28">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur">
            🎉 Oferta de lanzamiento
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight drop-shadow md:text-6xl">
            ¡Todo con <span className="text-amber-300">15% de descuento</span>!
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
            Celebramos la apertura de Mexlindo rebajando TODO el catálogo. Lo
            mejor de México, ahora a mejor precio. ¡Paga solo el 85%!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#productos"
              className="rounded-lg bg-white px-7 py-3 font-bold text-mexico-green shadow-lg transition-transform hover:scale-105"
            >
              Ver ofertas 🔥
            </a>
            <Link
              href="/"
              className="rounded-lg border-2 border-white px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </section>

      {/* Cinta de frases promocionales en movimiento */}
      <section className="marquee-pausa overflow-hidden bg-mexico-red py-3 text-white">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {frases.map((f, i) => (
            <span key={i} className="mx-8 text-sm font-bold tracking-wide">
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 text-center md:grid-cols-4">
        {[
          { emoji: "💸", t: "15% en todo", d: "Sin mínimo de compra" },
          { emoji: "🚚", t: "Envío gratis", d: "En compras +$999 MXN" },
          { emoji: "🔒", t: "Compra segura", d: "Pago protegido" },
          { emoji: "🧾", t: "Factura CFDI", d: "En todos tus pedidos" },
        ].map((b) => (
          <div
            key={b.t}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="text-3xl">{b.emoji}</div>
            <h3 className="mt-2 font-bold text-gray-900">{b.t}</h3>
            <p className="text-sm text-gray-500">{b.d}</p>
          </div>
        ))}
      </section>

      {/* Productos en oferta */}
      <section id="productos" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Productos en oferta
          </h2>
          <p className="mt-2 text-gray-500">
            {enOferta.length} productos con descuento especial de lanzamiento
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {enOferta.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
    </>
  );
}

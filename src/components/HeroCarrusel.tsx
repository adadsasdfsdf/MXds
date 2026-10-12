"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface Diapositiva {
  etiqueta: string;
  titulo: string;
  destacado: string;
  descripcion: string;
  ctaTexto: string;
  ctaHref: string;
  cta2Texto: string;
  cta2Href: string;
  imagen: string;
}

// Cada diapositiva usa una foto real de fondo (Picsum, carga estable).
const DIAPOSITIVAS: Diapositiva[] = [
  {
    etiqueta: "🌵 Hecho en México, con orgullo",
    titulo: "Lo lindo de México,",
    destacado: "en tu puerta",
    descripcion:
      "Más de 100 productos auténticos: artesanías, textiles, alimentos, joyería y más. Hechos por manos mexicanas. Envíos a toda la República.",
    ctaTexto: "Explorar productos",
    ctaHref: "/categoria/artesanias",
    cta2Texto: "Ver ofertas 🔥",
    cta2Href: "/ofertas",
    imagen: "https://picsum.photos/seed/mexlindo-hero-artesanias/1600/700",
  },
  {
    etiqueta: "🔥 Oferta de lanzamiento",
    titulo: "15% de descuento",
    destacado: "en TODA la tienda",
    descripcion:
      "Celebramos nuestra apertura rebajando todo el catálogo. ¡Paga solo el 85%! Por tiempo limitado.",
    ctaTexto: "Comprar ahora",
    ctaHref: "/ofertas",
    cta2Texto: "Ver categorías",
    cta2Href: "/categoria/artesanias",
    imagen: "https://picsum.photos/seed/mexlindo-hero-ofertas/1600/700",
  },
  {
    etiqueta: "🚚 Envío a todo México",
    titulo: "Envío gratis",
    destacado: "desde $999 MXN",
    descripcion:
      "Recibe lo mejor de México en la puerta de tu casa. Pago seguro con tarjeta, SPEI y Mercado Pago a meses sin intereses.",
    ctaTexto: "Empezar a comprar",
    ctaHref: "/",
    cta2Texto: "Ver ofertas 🔥",
    cta2Href: "/ofertas",
    imagen: "https://picsum.photos/seed/mexlindo-hero-envio/1600/700",
  },
  {
    etiqueta: "🎨 Artesanía auténtica",
    titulo: "Apoya a los",
    destacado: "artesanos mexicanos",
    descripcion:
      "Cada pieza cuenta una historia. Compra directo de los artesanos de Oaxaca, Chiapas, Puebla, Jalisco y más estados de México.",
    ctaTexto: "Descubrir artesanías",
    ctaHref: "/categoria/artesanias",
    cta2Texto: "Conocer más",
    cta2Href: "/ofertas",
    imagen: "https://picsum.photos/seed/mexlindo-hero-cultura/1600/700",
  },
];

export default function HeroCarrusel() {
  const [actual, setActual] = useState(0);
  const total = DIAPOSITIVAS.length;

  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % total),
    [total],
  );
  const anterior = () => setActual((i) => (i - 1 + total) % total);

  // Autoplay cada 5 segundos.
  useEffect(() => {
    const t = setInterval(siguiente, 5000);
    return () => clearInterval(t);
  }, [siguiente]);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Diapositivas */}
      <div className="relative h-[460px] md:h-[520px]">
        {DIAPOSITIVAS.map((d, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === actual ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* Fondo con imagen real */}
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: `url('${d.imagen}')` }}
            />
            {/* Overlay con los colores de México para legibilidad */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-mexico-green/95 via-mexico-green/80 to-mexico-green/40" />

            <div className="mx-auto flex h-full max-w-7xl items-center px-4">
              <div className="max-w-2xl text-white">
                <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                  {d.etiqueta}
                </span>
                <h1 className="mt-4 text-4xl font-black leading-tight drop-shadow md:text-6xl">
                  {d.titulo}{" "}
                  <span className="text-amber-300">{d.destacado}</span>
                </h1>
                <p className="mt-4 max-w-xl text-lg text-emerald-50">
                  {d.descripcion}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={d.ctaHref}
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-mexico-green shadow-lg transition-transform hover:scale-105"
                  >
                    {d.ctaTexto}
                  </Link>
                  <Link
                    href={d.cta2Href}
                    className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {d.cta2Texto}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas */}
      <button
        onClick={anterior}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition-colors hover:bg-white/50"
      >
        ‹
      </button>
      <button
        onClick={siguiente}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition-colors hover:bg-white/50"
      >
        ›
      </button>

      {/* Indicadores (puntos) */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {DIAPOSITIVAS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === actual
                ? "w-7 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

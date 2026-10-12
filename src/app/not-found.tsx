import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="text-6xl">🌵</div>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        Página no encontrada
      </h1>
      <p className="mt-2 text-gray-600">
        Parece que esta página se perdió en el desierto.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white transition-colors hover:bg-mexico-green/90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

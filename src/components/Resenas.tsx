import Estrellas from "@/components/Estrellas";
import { formatFecha } from "@/lib/mexico";
import type { ResumenResenas } from "@/lib/data";

export default function Resenas({ data }: { data: ResumenResenas }) {
  const { promedio, total, resenas } = data;

  if (total === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Opiniones</h2>
        <p className="mt-2 text-gray-500">
          Este producto aún no tiene reseñas.
        </p>
      </section>
    );
  }

  // Distribución de calificaciones (5★ a 1★)
  const distribucion = [5, 4, 3, 2, 1].map((estrellas) => {
    const count = resenas.filter((r) => r.calificacion === estrellas).length;
    return { estrellas, count, pct: Math.round((count / total) * 100) };
  });

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Opiniones de clientes
      </h2>

      {/* Resumen */}
      <div className="mt-4 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center border-gray-100 sm:border-r sm:pr-8">
          <span className="text-5xl font-extrabold text-gray-900">
            {promedio.toFixed(1)}
          </span>
          <Estrellas valor={promedio} size="text-xl" />
          <span className="mt-1 text-sm text-gray-500">{total} opiniones</span>
        </div>

        <div className="space-y-1.5">
          {distribucion.map((d) => (
            <div key={d.estrellas} className="flex items-center gap-2 text-sm">
              <span className="w-10 text-gray-600">{d.estrellas} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-gray-400">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de reseñas */}
      <div className="mt-6 space-y-4">
        {resenas.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{r.autor}</span>
                  {r.verificada && (
                    <span className="rounded-full bg-mexico-green/10 px-2 py-0.5 text-xs font-medium text-mexico-green">
                      ✓ Compra verificada
                    </span>
                  )}
                </div>
                <Estrellas valor={r.calificacion} size="text-sm" />
              </div>
              <span className="whitespace-nowrap text-xs text-gray-400">
                {formatFecha(r.creadoEn)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{r.comentario}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

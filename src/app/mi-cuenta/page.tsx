import Link from "next/link";
import { redirect } from "next/navigation";
import { getSesion } from "@/lib/auth";
import { getPedidosDeUsuario } from "@/lib/pedidos-consulta";
import { formatMXN, formatFecha } from "@/lib/mexico";
import CerrarSesionBoton from "./CerrarSesionBoton";

export const dynamic = "force-dynamic";

const ETIQUETA_ENVIO: Record<string, { texto: string; color: string }> = {
  procesando: { texto: "Procesando", color: "bg-amber-100 text-amber-800" },
  enviado: { texto: "Enviado", color: "bg-blue-100 text-blue-800" },
  entregado: { texto: "Entregado", color: "bg-green-100 text-green-800" },
  cancelado: { texto: "Cancelado", color: "bg-red-100 text-red-800" },
};

export default async function MiCuentaPage() {
  const sesion = await getSesion();
  if (!sesion) {
    redirect("/login?redirect=/mi-cuenta");
  }

  const pedidos = await getPedidosDeUsuario(sesion!.userId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mi cuenta</h1>
          <p className="mt-1 text-gray-600">
            Hola, {sesion!.nombre} · {sesion!.email}
          </p>
        </div>
        <CerrarSesionBoton />
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-gray-900">
        Mis pedidos
      </h2>

      {pedidos.length === 0 ? (
        <div className="rounded-xl bg-mexico-sand p-8 text-center">
          <p className="text-gray-600">Todavía no tienes pedidos.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((p) => {
            const envio =
              ETIQUETA_ENVIO[p.estado_envio] ?? ETIQUETA_ENVIO.procesando;
            return (
              <Link
                key={p.id}
                href={`/pedido/${p.numero}`}
                className="block rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900">{p.numero}</p>
                    <p className="text-sm text-gray-500">
                      {formatFecha(p.creadoEn)} · {p.items.length} artículo(s)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${envio.color}`}
                    >
                      {envio.texto}
                    </span>
                    <span className="font-bold text-gray-900">
                      {formatMXN(p.totalCentavos / 100)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

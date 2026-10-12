"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatMXN, formatFecha } from "@/lib/mexico";

interface PedidoAdmin {
  id: string;
  numero: string;
  nombreCliente: string;
  email: string;
  totalCentavos: number;
  metodoPago: string;
  estadoPago: string;
  estadoEnvio: string;
  creadoEn: string;
  items: { nombre: string; cantidad: number }[];
}

const METODO: Record<string, string> = {
  tarjeta: "Tarjeta",
  spei: "SPEI",
  mercadopago: "Mercado Pago",
};

export default function AdminPedidos({ pedidos }: { pedidos: PedidoAdmin[] }) {
  const router = useRouter();
  const [expandido, setExpandido] = useState<string | null>(null);

  const actualizar = async (
    id: string,
    campo: "estadoPago" | "estado_envio",
    valor: string,
  ) => {
    await fetch(`/api/admin/pedidos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [campo]: valor }),
    });
    router.refresh();
  };

  if (pedidos.length === 0) {
    return (
      <div className="rounded-xl bg-mexico-sand p-8 text-center text-gray-600">
        Todavía no hay pedidos.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Pedidos ({pedidos.length})
      </h2>
      <div className="space-y-3">
        {pedidos.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <button
                  onClick={() => setExpandido(expandido === p.id ? null : p.id)}
                  className="font-semibold text-gray-900 hover:text-mexico-green"
                >
                  {p.numero}
                </button>
                <p className="text-sm text-gray-500">
                  {p.nombreCliente} · {formatFecha(p.creadoEn)} ·{" "}
                  {METODO[p.metodoPago]}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-gray-900">
                  {formatMXN(p.totalCentavos / 100)}
                </span>

                {/* Estado de pago */}
                <select
                  value={p.estadoPago}
                  onChange={(e) =>
                    actualizar(p.id, "estadoPago", e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-mexico-green focus:outline-none"
                >
                  <option value="pendiente">Pago pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="fallido">Fallido</option>
                </select>

                {/* Estado de envío */}
                <select
                  value={p.estadoEnvio}
                  onChange={(e) =>
                    actualizar(p.id, "estado_envio", e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-mexico-green focus:outline-none"
                >
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            {expandido === p.id && (
              <div className="mt-4 border-t border-gray-100 pt-4 text-sm">
                <p className="mb-2 text-gray-500">{p.email}</p>
                <ul className="space-y-1">
                  {p.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      {item.nombre} × {item.cantidad}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

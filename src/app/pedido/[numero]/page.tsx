import Link from "next/link";
import { notFound } from "next/navigation";
import { getPedidoPorNumero } from "@/lib/pedidos-consulta";
import { formatMXN, formatFecha } from "@/lib/mexico";

export const dynamic = "force-dynamic";

const ETIQUETA_PAGO: Record<string, string> = {
  pendiente: "Pendiente de pago",
  pagado: "Pagado",
  fallido: "Pago fallido",
};

const ETIQUETA_METODO: Record<string, string> = {
  tarjeta: "Tarjeta de crédito/débito",
  oxxo: "Pago en efectivo (OXXO)",
  spei: "Transferencia SPEI",
  mercadopago: "Mercado Pago",
};

export default async function PedidoPage({
  params,
}: {
  params: { numero: string };
}) {
  const pedido = await getPedidoPorNumero(params.numero);
  if (!pedido) {
    notFound();
  }
  const p = pedido!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          ¡Gracias por tu compra!
        </h1>
        <p className="mt-1 text-gray-600">
          Pedido <span className="font-semibold">{p.numero}</span> ·{" "}
          {formatFecha(p.creadoEn)}
        </p>
      </div>

      {/* Instrucciones de pago según método */}
      {p.estadoPago === "pendiente" && p.metodoPago === "oxxo" && (
        <div className="mt-8 rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
          <h2 className="font-bold text-gray-900">🏪 Paga en OXXO</h2>
          <p className="mt-1 text-sm text-gray-600">
            Acude a cualquier tienda OXXO y proporciona esta referencia. Tu
            pedido se procesará al confirmarse el pago.
          </p>
          <div className="mt-4 rounded-lg bg-white p-4 text-center">
            <p className="text-xs text-gray-500">Referencia de pago</p>
            <p className="font-mono text-xl font-bold tracking-wider text-gray-900">
              {p.referenciaPago}
            </p>
          </div>
          <p className="mt-3 text-center text-lg font-bold text-mexico-green">
            Total a pagar: {formatMXN(p.totalCentavos / 100)}
          </p>
        </div>
      )}

      {p.estadoPago === "pendiente" && p.metodoPago === "spei" && (
        <div className="mt-8 rounded-xl border-2 border-blue-300 bg-blue-50 p-6">
          <h2 className="font-bold text-gray-900">🏦 Transferencia SPEI</h2>
          <p className="mt-1 text-sm text-gray-600">
            Realiza una transferencia por {formatMXN(p.totalCentavos / 100)} con
            la siguiente referencia:
          </p>
          <div className="mt-4 rounded-lg bg-white p-4 text-center">
            <p className="font-mono text-xl font-bold text-gray-900">
              {p.referenciaPago}
            </p>
          </div>
        </div>
      )}

      {p.estadoPago === "pagado" && (
        <div className="mt-8 rounded-xl border border-mexico-green bg-mexico-green/5 p-4 text-center text-mexico-green">
          ✓ Pago confirmado · {ETIQUETA_METODO[p.metodoPago]}
        </div>
      )}

      {/* Resumen del pedido */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 font-bold text-gray-900">Resumen del pedido</h2>
        <ul className="divide-y divide-gray-100">
          {p.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 text-sm">
              <span className="text-gray-700">
                {item.nombre} × {item.cantidad}
              </span>
              <span className="font-medium">
                {formatMXN((item.precioCentavos * item.cantidad) / 100)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>{formatMXN(p.subtotalCentavos / 100)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Envío</dt>
            <dd>
              {p.envioCentavos === 0
                ? "Gratis"
                : formatMXN(p.envioCentavos / 100)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-1 font-bold text-gray-900">
            <dt>Total</dt>
            <dd>{formatMXN(p.totalCentavos / 100)}</dd>
          </div>
        </dl>
      </div>

      {/* Datos de envío */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-2 font-semibold text-gray-900">Envío a</h3>
          <p className="text-sm text-gray-600">
            {p.nombreCliente}
            <br />
            {p.calle}
            {p.colonia ? `, ${p.colonia}` : ""}
            <br />
            {p.ciudad}, {p.estado}, CP {p.codigoPostal}
            <br />
            Tel: {p.telefono}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-2 font-semibold text-gray-900">Pago</h3>
          <p className="text-sm text-gray-600">
            Método: {ETIQUETA_METODO[p.metodoPago]}
            <br />
            Estado: {ETIQUETA_PAGO[p.estadoPago]}
            {p.requiereFactura && (
              <>
                <br />
                🧾 Factura CFDI solicitada ({p.rfc})
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white transition-colors hover:bg-mexico-green/90"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}

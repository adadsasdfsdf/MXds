import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMXN } from "@/lib/mexico";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [totalProductos, totalPedidos, pedidosPagados, sumaVentas, stockBajo] =
    await Promise.all([
      prisma.producto.count({ where: { activo: true } }),
      prisma.pedido.count(),
      prisma.pedido.count({ where: { estadoPago: "pagado" } }),
      prisma.pedido.aggregate({
        where: { estadoPago: "pagado" },
        _sum: { totalCentavos: true },
      }),
      prisma.producto.count({ where: { activo: true, stock: { lte: 10 } } }),
    ]);

  const ventas = (sumaVentas._sum.totalCentavos ?? 0) / 100;

  const tarjetas = [
    { label: "Productos activos", valor: totalProductos, emoji: "📦" },
    { label: "Pedidos totales", valor: totalPedidos, emoji: "🧾" },
    { label: "Pedidos pagados", valor: pedidosPagados, emoji: "✅" },
    { label: "Ventas (pagadas)", valor: formatMXN(ventas), emoji: "💰" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tarjetas.map((t) => (
          <div
            key={t.label}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="text-2xl">{t.emoji}</div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{t.valor}</p>
            <p className="text-sm text-gray-500">{t.label}</p>
          </div>
        ))}
      </div>

      {stockBajo > 0 && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            ⚠️ Tienes <strong>{stockBajo}</strong> producto(s) con stock bajo
            (≤10 unidades).{" "}
            <Link href="/admin/productos" className="font-medium underline">
              Revisar inventario
            </Link>
          </p>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Link
          href="/admin/productos"
          className="rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white hover:bg-mexico-green/90"
        >
          Gestionar productos
        </Link>
        <Link
          href="/admin/pedidos"
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-mexico-sand"
        >
          Ver pedidos
        </Link>
      </div>
    </div>
  );
}

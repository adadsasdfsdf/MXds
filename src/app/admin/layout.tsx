import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          ⚙️ Panel de administración
        </h1>
        <Link href="/" className="text-sm text-mexico-green hover:underline">
          ← Volver a la tienda
        </Link>
      </div>

      <nav className="mb-8 flex gap-2">
        <Link
          href="/admin"
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-mexico-sand"
        >
          Resumen
        </Link>
        <Link
          href="/admin/productos"
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-mexico-sand"
        >
          Productos
        </Link>
        <Link
          href="/admin/pedidos"
          className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-mexico-sand"
        >
          Pedidos
        </Link>
      </nav>

      {children}
    </div>
  );
}

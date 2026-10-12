import { prisma } from "@/lib/prisma";
import { mapProducto } from "@/lib/data";
import AdminProductos from "./AdminProductos";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  const productosDB = await prisma.producto.findMany({
    orderBy: { creadoEn: "desc" },
  });
  // Serializamos a un formato simple para el componente cliente.
  const productos = productosDB.map((p) => ({
    ...mapProducto(p),
    activo: p.activo,
  }));

  return <AdminProductos productosIniciales={productos} />;
}

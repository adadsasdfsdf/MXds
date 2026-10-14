import { notFound } from "next/navigation";
import ProductoCard from "@/components/ProductoCard";
import CategoriaIcono from "@/components/CategoriaIcono";
import { CATEGORIAS, getProductosPorCategoria } from "@/lib/data";

// Pre-genera una página .html por cada categoría en el build estático.
export async function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ categoria: c.id }));
}

export default async function CategoriaPage({
  params,
}: {
  params: { categoria: string };
}) {
  const info = CATEGORIAS.find((c) => c.id === params.categoria);
  if (!info) {
    notFound();
  }

  const productos = await getProductosPorCategoria(params.categoria);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mexico-green/10 text-mexico-green">
            <CategoriaIcono categoria={info!.id} className="h-6 w-6" />
          </span>
          {info!.nombre}
        </h1>
        <p className="mt-2 text-gray-600">{info!.descripcion}</p>
      </div>

      {productos.length === 0 ? (
        <p className="rounded-lg bg-mexico-sand p-8 text-center text-gray-600">
          Aún no hay productos en esta categoría. ¡Vuelve pronto!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {productos.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
}

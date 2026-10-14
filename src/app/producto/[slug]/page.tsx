import { notFound } from "next/navigation";
import { getProductoPorSlug, getProductos, getResenas } from "@/lib/data";
import DetalleProducto from "./DetalleProducto";
import Resenas from "@/components/Resenas";

// Pre-genera una página .html por cada producto en el build estático.
export async function generateStaticParams() {
  const productos = await getProductos();
  return productos.map((p) => ({ slug: p.slug }));
}

export default async function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const producto = await getProductoPorSlug(params.slug);
  if (!producto) {
    notFound();
  }

  const resenas = await getResenas(producto!.id);

  return (
    <>
      <DetalleProducto
        producto={producto!}
        promedio={resenas.promedio}
        totalResenas={resenas.total}
      />
      <div id="opiniones" className="mx-auto max-w-7xl px-4 pb-10">
        <Resenas data={resenas} />
      </div>
    </>
  );
}

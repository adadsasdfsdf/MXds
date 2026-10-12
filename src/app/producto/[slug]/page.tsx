import { notFound } from "next/navigation";
import { PRODUCTOS, getProductoPorSlug } from "@/lib/data";
import DetalleProducto from "./DetalleProducto";

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }));
}

export default function ProductoPage({ params }: { params: { slug: string } }) {
  const producto = getProductoPorSlug(params.slug);
  if (!producto) {
    notFound();
  }

  return <DetalleProducto producto={producto!} />;
}

import { notFound } from "next/navigation";
import { getProductoPorSlug } from "@/lib/data";
import DetalleProducto from "./DetalleProducto";

export const dynamic = "force-dynamic";

export default async function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const producto = await getProductoPorSlug(params.slug);
  if (!producto) {
    notFound();
  }

  return <DetalleProducto producto={producto!} />;
}

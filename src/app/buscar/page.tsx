import { getProductos } from "@/lib/data";
import BuscarCliente from "./BuscarCliente";

// En exportación estática no hay servidor para procesar ?q=, así que
// embebemos todo el catálogo en el HTML y filtramos en el navegador.
export default async function BuscarPage() {
  const productos = await getProductos();
  return <BuscarCliente productos={productos} />;
}

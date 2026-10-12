import { getTodosLosPedidos } from "@/lib/pedidos-consulta";
import AdminPedidos from "./AdminPedidos";

export const dynamic = "force-dynamic";

export default async function AdminPedidosPage() {
  const pedidosDB = await getTodosLosPedidos();
  const pedidos = pedidosDB.map((p) => ({
    id: p.id,
    numero: p.numero,
    nombreCliente: p.nombreCliente,
    email: p.email,
    totalCentavos: p.totalCentavos,
    metodoPago: p.metodoPago,
    estadoPago: p.estadoPago,
    estadoEnvio: p.estado_envio,
    creadoEn: p.creadoEn.toISOString(),
    items: p.items.map((i) => ({ nombre: i.nombre, cantidad: i.cantidad })),
  }));

  return <AdminPedidos pedidos={pedidos} />;
}

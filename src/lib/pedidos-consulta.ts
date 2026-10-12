import { prisma } from "./prisma";

/** Obtiene un pedido por su número (para la página de confirmación). */
export async function getPedidoPorNumero(numero: string) {
  return prisma.pedido.findUnique({
    where: { numero },
    include: { items: true },
  });
}

/** Lista los pedidos de un usuario (historial en Mi Cuenta). */
export async function getPedidosDeUsuario(usuarioId: string) {
  return prisma.pedido.findMany({
    where: { usuarioId },
    include: { items: true },
    orderBy: { creadoEn: "desc" },
  });
}

/** Lista todos los pedidos (panel admin). */
export async function getTodosLosPedidos() {
  return prisma.pedido.findMany({
    include: { items: true },
    orderBy: { creadoEn: "desc" },
  });
}

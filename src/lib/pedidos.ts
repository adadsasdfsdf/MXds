import { prisma } from "./prisma";
import { costoEnvio } from "./mexico";
import { procesarPago } from "./pago";
import { z } from "zod";

/** Esquema de validación del checkout. */
export const checkoutSchema = z.object({
  nombreCliente: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(10),
  calle: z.string().min(3),
  colonia: z.string().optional().default(""),
  codigoPostal: z.string().regex(/^\d{5}$/, "Código postal inválido"),
  ciudad: z.string().min(2),
  estado: z.string().min(2),
  metodoPago: z.enum(["tarjeta", "spei", "mercadopago"]),
  requiereFactura: z.boolean().optional().default(false),
  rfc: z.string().optional(),
  razonSocial: z.string().optional(),
  usoCfdi: z.string().optional(),
  items: z
    .array(
      z.object({
        productoId: z.string(),
        cantidad: z.number().int().positive(),
      }),
    )
    .min(1, "El carrito está vacío"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

/** Genera el siguiente número de pedido legible (MX-00001). */
async function siguienteNumero(): Promise<string> {
  const count = await prisma.pedido.count();
  return `MX-${String(count + 1).padStart(5, "0")}`;
}

/**
 * Crea un pedido:
 *  1. Valida stock y recalcula precios DESDE la base de datos (nunca confía
 *     en los precios enviados por el cliente).
 *  2. Procesa el pago (mock o Mercado Pago).
 *  3. Descuenta el stock y guarda el pedido con sus items.
 */
export async function crearPedido(
  input: CheckoutInput,
  usuarioId: string | null,
) {
  // 1. Traer productos reales y validar stock
  const ids = input.items.map((i) => i.productoId);
  const productos = await prisma.producto.findMany({
    where: { id: { in: ids }, activo: true },
  });

  if (productos.length !== input.items.length) {
    throw new Error("Algún producto ya no está disponible");
  }

  let subtotalCentavos = 0;
  const itemsPedido = input.items.map((item) => {
    const producto = productos.find((p) => p.id === item.productoId)!;
    if (producto.stock < item.cantidad) {
      throw new Error(`Stock insuficiente de "${producto.nombre}"`);
    }
    subtotalCentavos += producto.precioCentavos * item.cantidad;
    return {
      productoId: producto.id,
      nombre: producto.nombre,
      precioCentavos: producto.precioCentavos,
      cantidad: item.cantidad,
    };
  });

  const envioCentavos = costoEnvio(subtotalCentavos / 100) * 100;
  const totalCentavos = subtotalCentavos + envioCentavos;
  const numero = await siguienteNumero();

  // 2. Procesar pago
  const pago = await procesarPago({
    numeroPedido: numero,
    totalCentavos,
    metodoPago: input.metodoPago,
    email: input.email,
    descripcion: `Pedido ${numero} · Mexlindo`,
  });

  // 3. Transacción: crear pedido + descontar stock
  const pedido = await prisma.$transaction(async (tx) => {
    const nuevoPedido = await tx.pedido.create({
      data: {
        numero,
        usuarioId,
        nombreCliente: input.nombreCliente,
        email: input.email,
        telefono: input.telefono,
        calle: input.calle,
        colonia: input.colonia || null,
        codigoPostal: input.codigoPostal,
        ciudad: input.ciudad,
        estado: input.estado,
        subtotalCentavos,
        envioCentavos,
        totalCentavos,
        metodoPago: input.metodoPago,
        estadoPago: pago.estado,
        referenciaPago: pago.referencia,
        requiereFactura: input.requiereFactura ?? false,
        rfc: input.rfc || null,
        razonSocial: input.razonSocial || null,
        usoCfdi: input.usoCfdi || null,
        items: { create: itemsPedido },
      },
      include: { items: true },
    });

    // Descontar stock
    for (const item of input.items) {
      await tx.producto.update({
        where: { id: item.productoId },
        data: { stock: { decrement: item.cantidad } },
      });
    }

    return nuevoPedido;
  });

  return { pedido, urlPago: pago.urlPago };
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  estadoPago: z.enum(["pendiente", "pagado", "fallido"]).optional(),
  estado_envio: z
    .enum(["procesando", "enviado", "entregado", "cancelado"])
    .optional(),
});

/** Actualiza el estado de pago o de envío de un pedido. */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 },
    );
  }

  try {
    const pedido = await prisma.pedido.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ pedido });
  } catch {
    return NextResponse.json(
      { error: "Pedido no encontrado" },
      { status: 404 },
    );
  }
}

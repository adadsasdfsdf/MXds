import { NextResponse } from "next/server";
import { getSesion } from "@/lib/auth";
import { checkoutSchema, crearPedido } from "@/lib/pedidos";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 },
    );
  }

  // El usuario puede comprar como invitado o autenticado.
  const sesion = await getSesion();
  const usuarioId = sesion?.userId ?? null;

  try {
    const { pedido, urlPago } = await crearPedido(parsed.data, usuarioId);
    return NextResponse.json({
      numero: pedido.numero,
      estadoPago: pedido.estadoPago,
      referenciaPago: pedido.referenciaPago,
      metodoPago: pedido.metodoPago,
      urlPago,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Error al crear el pedido",
      },
      { status: 400 },
    );
  }
}

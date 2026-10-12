import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Webhook de Mercado Pago (solo se usa en modo real, MP_MOCK=false).
 * Mercado Pago notifica aquí cuando cambia el estado de un pago.
 * Verificamos el pago contra su API y actualizamos el pedido.
 */
export async function POST(request: Request) {
  // En modo mock no hay webhooks reales.
  if (process.env.MP_MOCK !== "false") {
    return NextResponse.json({ ok: true, mock: true });
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: "Sin token" }, { status: 500 });
  }

  try {
    const body = await request.json();
    // Mercado Pago envía { type: "payment", data: { id } }
    const paymentId = body?.data?.id;
    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    // Consultar el pago real en la API de Mercado Pago.
    const res = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!res.ok) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    const pago = (await res.json()) as {
      status: string;
      external_reference: string;
    };

    // external_reference es el número de pedido que enviamos al crear la preferencia.
    const numero = pago.external_reference;
    const estadoPago =
      pago.status === "approved"
        ? "pagado"
        : pago.status === "rejected"
          ? "fallido"
          : "pendiente";

    await prisma.pedido.updateMany({
      where: { numero },
      data: { estadoPago, referenciaPago: String(paymentId) },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Responder 200 para que Mercado Pago no reintente indefinidamente.
    return NextResponse.json({ ok: true });
  }
}

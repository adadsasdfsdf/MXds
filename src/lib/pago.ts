/**
 * Capa de pago. Soporta dos modos:
 *  - MOCK (MP_MOCK=true): simula el pago sin cobrar, útil para desarrollo/demo.
 *  - Mercado Pago real: crea una preferencia de pago vía su API REST.
 *
 * Mercado Pago es la pasarela más usada en México e incluye tarjeta,
 * SPEI y meses sin intereses.
 */

export interface DatosPago {
  numeroPedido: string;
  totalCentavos: number;
  metodoPago: string;
  email: string;
  descripcion: string;
}

export interface ResultadoPago {
  // En modo real: URL de checkout de Mercado Pago a la que redirigir.
  // En modo mock: null (el pago se "aprueba" de inmediato).
  urlPago: string | null;
  referencia: string;
  estado: "pendiente" | "pagado";
}

const esMock = process.env.MP_MOCK !== "false";

/** Genera una referencia simulada según el método de pago. */
function referenciaSimulada(metodo: string): string {
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  switch (metodo) {
    case "spei":
      return `CLABE-${rand}`;
    default:
      return `MP-${rand}`;
  }
}

export async function procesarPago(datos: DatosPago): Promise<ResultadoPago> {
  if (esMock) {
    // Modo simulado: tarjeta/mercadopago se aprueban al instante;
    // spei queda "pendiente" (como pasaría en la vida real hasta que el
    // cliente hace la transferencia).
    const pendiente = datos.metodoPago === "spei";
    return {
      urlPago: null,
      referencia: referenciaSimulada(datos.metodoPago),
      estado: pendiente ? "pendiente" : "pagado",
    };
  }

  // Modo real: crear preferencia en Mercado Pago.
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "MP_ACCESS_TOKEN no configurado. Pon MP_MOCK=true o agrega tu token.",
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      items: [
        {
          title: datos.descripcion,
          quantity: 1,
          unit_price: datos.totalCentavos / 100,
          currency_id: "MXN",
        },
      ],
      payer: { email: datos.email },
      external_reference: datos.numeroPedido,
      back_urls: {
        success: `${siteUrl}/pedido/${datos.numeroPedido}`,
        failure: `${siteUrl}/checkout`,
        pending: `${siteUrl}/pedido/${datos.numeroPedido}`,
      },
      auto_return: "approved",
      notification_url: `${siteUrl}/api/pagos/webhook`,
    }),
  });

  if (!res.ok) {
    const texto = await res.text();
    throw new Error(`Error de Mercado Pago: ${texto}`);
  }

  const pref = (await res.json()) as { id: string; init_point: string };
  return {
    urlPago: pref.init_point,
    referencia: pref.id,
    estado: "pendiente",
  };
}

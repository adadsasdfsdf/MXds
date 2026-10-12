"use client";

import { useState, useRef, useEffect } from "react";

interface Mensaje {
  de: "bot" | "usuario";
  texto: string;
}

// Respuestas automáticas según palabras clave (atención al cliente básica).
const RESPUESTAS: { claves: string[]; respuesta: string }[] = [
  {
    claves: [
      "envio",
      "envío",
      "entrega",
      "llega",
      "cuanto tarda",
      "cuánto tarda",
    ],
    respuesta:
      "📦 Enviamos a toda la República Mexicana. El envío es GRATIS en compras mayores a $999 MXN. La entrega tarda de 3 a 7 días hábiles.",
  },
  {
    claves: ["pago", "pagar", "tarjeta", "spei", "mercado"],
    respuesta:
      "💳 Aceptamos tarjeta de crédito/débito, transferencia SPEI y Mercado Pago (con meses sin intereses).",
  },
  {
    claves: ["factura", "cfdi", "rfc"],
    respuesta:
      "🧾 ¡Claro! Puedes solicitar tu factura CFDI al finalizar la compra, marcando la casilla de facturación e ingresando tu RFC.",
  },
  {
    claves: ["descuento", "oferta", "promocion", "promoción", "cupon", "cupón"],
    respuesta:
      "🎉 ¡Estamos de lanzamiento! Tenemos 15% de descuento en TODA la tienda por tiempo limitado. ¡Aprovecha!",
  },
  {
    claves: ["devolucion", "devolución", "cambio", "reembolso"],
    respuesta:
      "🔄 Tienes 30 días para devoluciones o cambios. Escríbenos a hola@mexlindo.mx con tu número de pedido.",
  },
  {
    claves: [
      "hola",
      "buenas",
      "buenos dias",
      "buenos días",
      "que tal",
      "qué tal",
    ],
    respuesta:
      "¡Hola! 👋 Soy el asistente de Mexlindo. ¿En qué puedo ayudarte? Puedes preguntarme sobre envíos, pagos, facturación o devoluciones.",
  },
];

const PREGUNTAS_RAPIDAS = [
  "¿Cuánto tarda el envío?",
  "¿Qué métodos de pago aceptan?",
  "¿Puedo pedir factura?",
  "¿Hay descuentos?",
];

function responder(texto: string): string {
  const t = texto.toLowerCase();
  for (const r of RESPUESTAS) {
    if (r.claves.some((c) => t.includes(c))) return r.respuesta;
  }
  return "Gracias por tu mensaje. 🙌 Para ayuda personalizada escríbenos a hola@mexlindo.mx o pregúntame sobre envíos, pagos, facturación o devoluciones.";
}

export default function ChatSoporte() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      de: "bot",
      texto:
        "¡Hola! 👋 Soy el asistente de Mexlindo. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  const enviar = (texto: string) => {
    const limpio = texto.trim();
    if (!limpio) return;
    setMensajes((m) => [...m, { de: "usuario", texto: limpio }]);
    setEntrada("");
    // Respuesta del bot con un pequeño retraso para que parezca natural.
    setTimeout(() => {
      setMensajes((m) => [...m, { de: "bot", texto: responder(limpio) }]);
    }, 500);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-mexico-green text-2xl text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Abrir chat de soporte"
      >
        {abierto ? "✕" : "💬"}
      </button>

      {/* Ventana de chat */}
      {abierto && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          {/* Encabezado */}
          <div className="flex items-center gap-3 bg-mexico-green px-4 py-3 text-white">
            <span className="text-2xl">🌵</span>
            <div>
              <p className="font-semibold leading-tight">Soporte Mexlindo</p>
              <p className="text-xs text-emerald-100">
                Normalmente respondemos al instante
              </p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-mexico-sand p-4">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.de === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.de === "usuario"
                      ? "rounded-br-sm bg-mexico-green text-white"
                      : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {m.texto}
                </div>
              </div>
            ))}

            {/* Preguntas rápidas (solo al inicio) */}
            {mensajes.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {PREGUNTAS_RAPIDAS.map((p) => (
                  <button
                    key={p}
                    onClick={() => enviar(p)}
                    className="rounded-full border border-mexico-green bg-white px-3 py-1 text-xs text-mexico-green transition-colors hover:bg-mexico-green hover:text-white"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            <div ref={finRef} />
          </div>

          {/* Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(entrada);
            }}
            className="flex items-center gap-2 border-t border-gray-200 p-3"
          >
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-mexico-green focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-mexico-green text-white transition-colors hover:bg-mexico-green/90"
              aria-label="Enviar"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

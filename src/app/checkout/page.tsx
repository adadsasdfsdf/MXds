"use client";

import { useState } from "react";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import {
  ESTADOS_MEXICO,
  METODOS_PAGO,
  esCodigoPostalValido,
  formatMXN,
} from "@/lib/mexico";

export default function CheckoutPage() {
  const { items, subtotal, iva, envio, total, vaciar } = useCarrito();
  const [metodoPago, setMetodoPago] = useState<string>("tarjeta");
  const [cp, setCp] = useState("");
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [quiereFactura, setQuiereFactura] = useState(false);

  const cpInvalido = cp.length > 0 && !esCodigoPostalValido(cp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // En producción: aquí se crearía el pedido y se iniciaría el flujo de pago
    // con la pasarela correspondiente (Mercado Pago, Stripe, Conekta, etc.).
    setPedidoRealizado(true);
    vaciar();
  };

  if (pedidoRealizado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          ¡Gracias por tu compra!
        </h1>
        <p className="mt-2 text-gray-600">
          {metodoPago === "oxxo"
            ? "Te enviamos por correo tu ficha de pago para que pagues en cualquier OXXO."
            : "Tu pedido ha sido confirmado. Te enviaremos los detalles por correo."}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white transition-colors hover:bg-mexico-green/90"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          No hay productos para pagar
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-mexico-green px-6 py-3 font-semibold text-white"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Finalizar compra
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Datos de contacto */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Datos de contacto
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Nombre completo"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
              />
              <input
                required
                type="tel"
                placeholder="Teléfono (10 dígitos)"
                pattern="[0-9]{10}"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none sm:col-span-2"
              />
            </div>
          </section>

          {/* Dirección de envío */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Dirección de envío
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Calle y número"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none sm:col-span-2"
              />
              <input
                type="text"
                placeholder="Colonia"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
              />
              <div>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={cp}
                  onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Código postal"
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none ${
                    cpInvalido
                      ? "border-mexico-red"
                      : "border-gray-300 focus:border-mexico-green"
                  }`}
                />
                {cpInvalido && (
                  <p className="mt-1 text-xs text-mexico-red">
                    El código postal debe tener 5 dígitos
                  </p>
                )}
              </div>
              <input
                required
                type="text"
                placeholder="Ciudad / Municipio"
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
              />
              <select
                required
                defaultValue=""
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-mexico-green focus:outline-none"
              >
                <option value="" disabled>
                  Selecciona tu estado
                </option>
                {ESTADOS_MEXICO.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </section>

          {/* Método de pago */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
              Método de pago
            </h2>
            <div className="space-y-3">
              {METODOS_PAGO.map((m) => (
                <label
                  key={m.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                    metodoPago === m.id
                      ? "border-mexico-green bg-mexico-green/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    value={m.id}
                    checked={metodoPago === m.id}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{m.nombre}</p>
                    <p className="text-sm text-gray-500">{m.descripcion}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Facturación CFDI */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={quiereFactura}
                onChange={(e) => setQuiereFactura(e.target.checked)}
              />
              <span className="font-medium text-gray-900">
                🧾 Necesito factura (CFDI)
              </span>
            </label>
            {quiereFactura && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="RFC"
                  className="rounded-lg border border-gray-300 px-4 py-2 uppercase focus:border-mexico-green focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Razón social"
                  className="rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
                />
                <select
                  defaultValue=""
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-mexico-green focus:outline-none sm:col-span-2"
                >
                  <option value="" disabled>
                    Uso de CFDI
                  </option>
                  <option value="G03">G03 - Gastos en general</option>
                  <option value="G01">G01 - Adquisición de mercancías</option>
                  <option value="P01">P01 - Por definir</option>
                </select>
              </div>
            )}
          </section>
        </div>

        {/* Resumen */}
        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Tu pedido</h2>
          <ul className="mb-4 space-y-2 text-sm">
            {items.map(({ producto, cantidad }) => (
              <li key={producto.id} className="flex justify-between gap-2">
                <span className="text-gray-600">
                  {producto.nombre} × {cantidad}
                </span>
                <span className="font-medium">
                  {formatMXN(producto.precio * cantidad)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 border-t border-gray-200 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd>{formatMXN(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-gray-500">
              <dt>IVA (16%) incluido</dt>
              <dd>{formatMXN(iva)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Envío</dt>
              <dd>{envio === 0 ? "Gratis" : formatMXN(envio)}</dd>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
              <dt>Total</dt>
              <dd>{formatMXN(total)}</dd>
            </div>
          </dl>

          <button
            type="submit"
            disabled={cpInvalido}
            className="mt-6 block w-full rounded-lg bg-mexico-green py-3 text-center font-semibold text-white transition-colors hover:bg-mexico-green/90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {metodoPago === "oxxo" ? "Generar ficha OXXO" : "Pagar ahora"}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            🔒 Pago seguro · Esta es una demostración, no se procesan cobros
            reales
          </p>
        </div>
      </form>
    </div>
  );
}

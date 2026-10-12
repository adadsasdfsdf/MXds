"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/context/CarritoContext";
import {
  ESTADOS_MEXICO,
  METODOS_PAGO,
  esCodigoPostalValido,
  formatMXN,
} from "@/lib/mexico";

export default function CheckoutPage() {
  const { items, subtotal, iva, envio, total, vaciar } = useCarrito();
  const router = useRouter();

  const [form, setForm] = useState({
    nombreCliente: "",
    email: "",
    telefono: "",
    calle: "",
    colonia: "",
    codigoPostal: "",
    ciudad: "",
    estado: "",
  });
  const [metodoPago, setMetodoPago] = useState<string>("tarjeta");
  const [quiereFactura, setQuiereFactura] = useState(false);
  const [factura, setFactura] = useState({
    rfc: "",
    razonSocial: "",
    usoCfdi: "G03",
  });
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  const cpInvalido =
    form.codigoPostal.length > 0 && !esCodigoPostalValido(form.codigoPostal);

  const set =
    (campo: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [campo]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setProcesando(true);
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          metodoPago,
          requiereFactura: quiereFactura,
          ...(quiereFactura ? factura : {}),
          items: items.map((i) => ({
            productoId: i.producto.id,
            cantidad: i.cantidad,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al procesar el pedido");

      // Si Mercado Pago real devolvió una URL, redirigir a su checkout.
      if (data.urlPago) {
        vaciar();
        window.location.href = data.urlPago;
        return;
      }

      // Modo simulado: ir a la página de confirmación del pedido.
      vaciar();
      router.push(`/pedido/${data.numero}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al procesar el pedido",
      );
      setProcesando(false);
    }
  };

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

  const inputClass =
    "rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Finalizar compra
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {error && (
            <p className="rounded-lg bg-red-50 p-4 text-sm text-mexico-red">
              {error}
            </p>
          )}

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
                value={form.nombreCliente}
                onChange={set("nombreCliente")}
                className={inputClass}
              />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={set("email")}
                className={inputClass}
              />
              <input
                required
                type="tel"
                placeholder="Teléfono (10 dígitos)"
                pattern="[0-9]{10}"
                value={form.telefono}
                onChange={set("telefono")}
                className={`${inputClass} sm:col-span-2`}
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
                value={form.calle}
                onChange={set("calle")}
                className={`${inputClass} sm:col-span-2`}
              />
              <input
                type="text"
                placeholder="Colonia"
                value={form.colonia}
                onChange={set("colonia")}
                className={inputClass}
              />
              <div>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={form.codigoPostal}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      codigoPostal: e.target.value.replace(/\D/g, ""),
                    }))
                  }
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
                value={form.ciudad}
                onChange={set("ciudad")}
                className={inputClass}
              />
              <select
                required
                value={form.estado}
                onChange={set("estado")}
                className={`${inputClass} bg-white`}
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
                  value={factura.rfc}
                  onChange={(e) =>
                    setFactura((f) => ({
                      ...f,
                      rfc: e.target.value.toUpperCase(),
                    }))
                  }
                  className={`${inputClass} uppercase`}
                />
                <input
                  type="text"
                  placeholder="Razón social"
                  value={factura.razonSocial}
                  onChange={(e) =>
                    setFactura((f) => ({ ...f, razonSocial: e.target.value }))
                  }
                  className={inputClass}
                />
                <select
                  value={factura.usoCfdi}
                  onChange={(e) =>
                    setFactura((f) => ({ ...f, usoCfdi: e.target.value }))
                  }
                  className={`${inputClass} bg-white sm:col-span-2`}
                >
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
            disabled={cpInvalido || procesando}
            className="mt-6 block w-full rounded-lg bg-mexico-green py-3 text-center font-semibold text-white transition-colors hover:bg-mexico-green/90 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {procesando
              ? "Procesando..."
              : metodoPago === "oxxo"
                ? "Generar ficha OXXO"
                : "Pagar ahora"}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            🔒 Pago seguro procesado con Mercado Pago
          </p>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatMXN } from "@/lib/mexico";
import { CATEGORIAS } from "@/lib/data";
import type { Producto } from "@/lib/types";

type ProductoAdmin = Producto & { activo: boolean };

const CATEGORIAS_IDS = CATEGORIAS.map((c) => c.id);

const FORM_VACIO = {
  nombre: "",
  slug: "",
  descripcion: "",
  precio: "",
  precioAnterior: "",
  categoria: "artesanias",
  imagen: "",
  stock: "",
  origen: "",
  destacado: false,
};

export default function AdminProductos({
  productosIniciales,
}: {
  productosIniciales: ProductoAdmin[];
}) {
  const router = useRouter();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof FORM_VACIO>(FORM_VACIO);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  const abrirNuevo = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setError("");
    setMostrarForm(true);
  };

  const abrirEditar = (p: ProductoAdmin) => {
    setForm({
      nombre: p.nombre,
      slug: p.slug,
      descripcion: p.descripcion,
      precio: String(p.precio),
      precioAnterior: p.precioAnterior ? String(p.precioAnterior) : "",
      categoria: p.categoria,
      imagen: p.imagen,
      stock: String(p.stock),
      origen: p.origen ?? "",
      destacado: p.destacado ?? false,
    });
    setEditandoId(p.id);
    setError("");
    setMostrarForm(true);
  };

  const generarSlug = (nombre: string) =>
    nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGuardando(true);

    const payload = {
      nombre: form.nombre,
      slug: form.slug || generarSlug(form.nombre),
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      precioAnterior: form.precioAnterior
        ? parseFloat(form.precioAnterior)
        : null,
      categoria: form.categoria,
      imagen: form.imagen,
      stock: parseInt(form.stock, 10),
      origen: form.origen || null,
      destacado: form.destacado,
    };

    try {
      const url = editandoId
        ? `/api/admin/productos/${editandoId}`
        : "/api/admin/productos";
      const method = editandoId ? "PATCH" : "POST";
      // Al editar no se envía el slug (es inmutable aquí para simplificar).
      const bodyObj = editandoId ? { ...payload, slug: undefined } : payload;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setMostrarForm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (id: string, nombre: string) => {
    if (!confirm(`¿Desactivar "${nombre}"? Dejará de mostrarse en la tienda.`))
      return;
    await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-mexico-green focus:outline-none";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Productos</h2>
        <button
          onClick={abrirNuevo}
          className="rounded-lg bg-mexico-green px-4 py-2 text-sm font-semibold text-white hover:bg-mexico-green/90"
        >
          + Nuevo producto
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productosIniciales.map((p) => (
              <tr key={p.id} className={p.activo ? "" : "opacity-50"}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {p.nombre}
                  {p.destacado && <span title="Destacado"> ⭐</span>}
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">
                  {p.categoria}
                </td>
                <td className="px-4 py-3">{formatMXN(p.precio)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.stock <= 10 ? "font-semibold text-mexico-red" : ""
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.activo ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Activo
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => abrirEditar(p)}
                    className="mr-2 text-mexico-green hover:underline"
                  >
                    Editar
                  </button>
                  {p.activo && (
                    <button
                      onClick={() => eliminar(p.id, p.nombre)}
                      className="text-mexico-red hover:underline"
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de formulario */}
      {mostrarForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              {editandoId ? "Editar producto" : "Nuevo producto"}
            </h3>
            {error && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-mexico-red">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className={inputClass}
              />
              {!editandoId && (
                <input
                  placeholder="Slug (se genera automáticamente si lo dejas vacío)"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputClass}
                />
              )}
              <textarea
                required
                placeholder="Descripción"
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                className={inputClass}
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Precio (MXN)"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Precio anterior (opcional)"
                  value={form.precioAnterior}
                  onChange={(e) =>
                    setForm({ ...form, precioAnterior: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                  className={inputClass}
                >
                  {CATEGORIAS_IDS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  required
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className={inputClass}
                />
              </div>
              <input
                required
                type="url"
                placeholder="URL de la imagen"
                value={form.imagen}
                onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Origen (ej. Oaxaca)"
                value={form.origen}
                onChange={(e) => setForm({ ...form, origen: e.target.value })}
                className={inputClass}
              />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.destacado}
                  onChange={(e) =>
                    setForm({ ...form, destacado: e.target.checked })
                  }
                />
                Producto destacado (aparece en la página de inicio)
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={guardando}
                  className="flex-1 rounded-lg bg-mexico-green py-2 font-semibold text-white hover:bg-mexico-green/90 disabled:bg-gray-300"
                >
                  {guardando ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarForm(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const destino = searchParams.get("redirect") || "/mi-cuenta";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(email, password);
      router.push(destino);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
      <p className="mt-2 text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-medium text-mexico-green hover:underline"
        >
          Regístrate aquí
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-mexico-red">
            {error}
          </p>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-mexico-green focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-lg bg-mexico-green py-3 font-semibold text-white transition-colors hover:bg-mexico-green/90 disabled:bg-gray-300"
        >
          {cargando ? "Entrando..." : "Iniciar sesión"}
        </button>
      </form>

      <div className="mt-6 rounded-lg bg-mexico-sand p-4 text-xs text-gray-600">
        <p className="font-semibold">Cuentas de prueba:</p>
        <p>👤 Admin: admin@tiendamexicana.mx / admin123</p>
        <p>👤 Cliente: cliente@ejemplo.mx / cliente123</p>
      </div>
    </div>
  );
}

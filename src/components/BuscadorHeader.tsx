"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconoBuscar } from "@/components/Iconos";

export default function BuscadorHeader() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limpio = q.trim();
    if (limpio) {
      router.push(`/buscar?q=${encodeURIComponent(limpio)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative hidden flex-1 md:block">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar productos, categorías y más..."
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-5 pr-14 text-sm transition-colors focus:border-mexico-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-mexico-green/20"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-mexico-green text-white transition-colors hover:bg-mexico-green/90"
        aria-label="Buscar"
      >
        <IconoBuscar className="h-4 w-4" />
      </button>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
        placeholder="Buscar productos..."
        className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm focus:border-mexico-green focus:bg-white focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 hover:text-mexico-green"
        aria-label="Buscar"
      >
        🔍
      </button>
    </form>
  );
}

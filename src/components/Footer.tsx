import Link from "next/link";
import { CATEGORIAS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-mexico-sand">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌵</span>
            <span className="text-lg font-bold text-mexico-green">
              Tienda<span className="text-mexico-red">Mexicana</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Productos auténticos hechos en México. Apoyamos a artesanos y
            productores locales.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-900">Categorías</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/categoria/${c.id}`}
                  className="hover:text-mexico-green"
                >
                  {c.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-900">Ayuda</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Envíos y entregas</li>
            <li>Devoluciones</li>
            <li>Facturación (CFDI)</li>
            <li>Contáctanos</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-900">Métodos de pago</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>💳 Tarjeta de crédito/débito</li>
            <li>🏪 Pago en efectivo (OXXO)</li>
            <li>🏦 Transferencia SPEI</li>
            <li>💙 Mercado Pago</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} TiendaMexicana · Hecho con 💚 en México ·
          Precios en pesos mexicanos (MXN), IVA incluido
        </p>
      </div>
    </footer>
  );
}

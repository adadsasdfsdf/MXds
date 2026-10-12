/**
 * Iconos SVG por categoría, estilo línea limpia (como en las grandes tiendas
 * en línea). Claros y reconocibles de un vistazo.
 */
type IconProps = { className?: string };

const base = "stroke-current";

function Artesanias({ className }: IconProps) {
  // Paleta de pintor
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-.5-.3-.8-.3-1.3 0-.6.5-1.2 1.3-1.2H16a4 4 0 0 0 4-4c0-5-3.6-9-8-9Z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Ropa({ className }: IconProps) {
  // Camiseta
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4 4 7l2 3 2-1v10h8V9l2 1 2-3-4-3-2 2a2.5 2.5 0 0 1-4 0L8 4Z" />
    </svg>
  );
}

function Alimentos({ className }: IconProps) {
  // Chile
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 20c6 0 11-4 11-10 0-1 .5-2 1.5-2.5" />
      <path d="M6 20c-2 0-3-1.5-3-3 0-2 2-3 4-3 3 0 6-2 6-5" />
      <path d="M18.5 7.5c1-.5 1.5-1.5 1.5-2.5" />
    </svg>
  );
}

function Bebidas({ className }: IconProps) {
  // Copa / vaso
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h12l-1.5 8a4.5 4.5 0 0 1-9 0L6 4Z" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
      <path d="M6.5 8h11" />
    </svg>
  );
}

function Hogar({ className }: IconProps) {
  // Casa
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

function Belleza({ className }: IconProps) {
  // Frasco cosmético / gota
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3c2.5 3.5 4 6 4 8.5A4 4 0 0 1 8 11.5C8 9 9.5 6.5 12 3Z" />
      <path d="M9 20h6" />
      <path d="M12 16v4" />
    </svg>
  );
}

function Joyeria({ className }: IconProps) {
  // Diamante
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4h12l3 5-9 11L3 9l3-5Z" />
      <path d="M3 9h18" />
      <path d="m9 4-3 5 6 11" />
      <path d="m15 4 3 5-6 11" />
    </svg>
  );
}

function Juguetes({ className }: IconProps) {
  // Pelota / juguete
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="13" r="7" />
      <path d="M12 6V3" />
      <path d="M9 3h6" />
      <path d="M8 11c1.5 1 6.5 1 8 0" />
      <path d="M8 15c1.5-1 6.5-1 8 0" />
    </svg>
  );
}

function Libros({ className }: IconProps) {
  // Libro abierto
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6c-2-1.5-5-1.5-8-1v13c3-.5 6-.5 8 1 2-1.5 5-1.5 8-1V5c-3-.5-6-.5-8 1Z" />
      <path d="M12 6v13" />
    </svg>
  );
}

function Deportes({ className }: IconProps) {
  // Balón de fútbol
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m12 7 3 2-1 3.5h-4L9 9l3-2Z" />
      <path d="M12 7V3.5M9 9 5.5 7.5M15 9l3.5-1.5M10 12.5 7.5 16M14 12.5l2.5 3.5" />
    </svg>
  );
}

function Mascotas({ className }: IconProps) {
  // Huella
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="16" rx="4" ry="3.5" />
      <circle cx="6.5" cy="11" r="1.6" />
      <circle cx="17.5" cy="11" r="1.6" />
      <circle cx="9.5" cy="7" r="1.6" />
      <circle cx="14.5" cy="7" r="1.6" />
    </svg>
  );
}

function Electronica({ className }: IconProps) {
  // Teléfono / dispositivo
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

const ICONOS: Record<string, (p: IconProps) => JSX.Element> = {
  artesanias: Artesanias,
  ropa: Ropa,
  alimentos: Alimentos,
  bebidas: Bebidas,
  hogar: Hogar,
  belleza: Belleza,
  joyeria: Joyeria,
  juguetes: Juguetes,
  libros: Libros,
  deportes: Deportes,
  mascotas: Mascotas,
  electronica: Electronica,
};

export default function CategoriaIcono({
  categoria,
  className = "h-7 w-7",
}: {
  categoria: string;
  className?: string;
}) {
  const Icono = ICONOS[categoria];
  if (!Icono) return null;
  return <Icono className={className} />;
}

/**
 * Logo de Mexlindo: un nopal (cactus) sobre un sol, con los colores de México.
 * Icono vectorial reutilizable para el header, footer y favicon.
 */
export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Mexlindo"
    >
      {/* Sol / círculo de fondo */}
      <circle cx="32" cy="32" r="30" fill="#006847" />
      {/* Rayos de sol */}
      <circle cx="32" cy="32" r="23" fill="#F2B705" opacity="0.18" />
      {/* Nopal (cactus) */}
      <g fill="#1f9e5a" stroke="#0b5f3a" strokeWidth="1.5">
        {/* Brazo izquierdo */}
        <path d="M22 40c0-6 0-11 4-11s4 4 4 9" />
        <rect x="18" y="30" width="8" height="14" rx="4" />
        {/* Brazo derecho */}
        <rect x="38" y="26" width="8" height="18" rx="4" />
        {/* Tronco central */}
        <rect x="27" y="18" width="10" height="30" rx="5" />
      </g>
      {/* Flor del nopal */}
      <circle cx="32" cy="18" r="3.2" fill="#ce1126" />
      {/* Tierra / maceta */}
      <path
        d="M20 46h24l-2.5 7a3 3 0 0 1-3 2.2H25.5a3 3 0 0 1-3-2.2L20 46z"
        fill="#c47a3d"
        stroke="#8a5527"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Logo con texto para el header y footer. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoIcon className="h-9 w-9" />
      <span className="text-xl font-extrabold tracking-tight text-mexico-green">
        Mex<span className="text-mexico-red">lindo</span>
      </span>
    </span>
  );
}

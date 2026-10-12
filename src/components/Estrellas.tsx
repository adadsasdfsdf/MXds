/**
 * Muestra una calificación de 0 a 5 con estrellas.
 * Usa una técnica de dos capas: estrellas grises de fondo y estrellas
 * doradas recortadas al porcentaje exacto (soporta medias estrellas).
 */
export default function Estrellas({
  valor,
  size = "text-base",
}: {
  valor: number;
  size?: string;
}) {
  const porcentaje = Math.max(0, Math.min(100, (valor / 5) * 100));

  return (
    <span
      className={`relative inline-block ${size} leading-none`}
      aria-label={`${valor} de 5 estrellas`}
    >
      {/* Capa gris de fondo */}
      <span className="text-gray-300">★★★★★</span>
      {/* Capa dorada recortada */}
      <span
        className="absolute left-0 top-0 overflow-hidden text-amber-400"
        style={{ width: `${porcentaje}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

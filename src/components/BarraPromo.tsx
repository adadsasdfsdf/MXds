/**
 * Barra superior con anuncios que se desplazan en bucle (marquee).
 * El contenido se duplica para que el bucle sea continuo.
 */
const ANUNCIOS = [
  "🎉 ¡Nueva tienda! 15% de descuento en TODA la tienda",
  "🚚 Envío GRATIS en compras mayores a $999 MXN",
  "💳 Paga con tarjeta, SPEI o Mercado Pago a meses sin intereses",
  "🧾 Facturación CFDI disponible en todos tus pedidos",
  "🌵 Productos 100% auténticos hechos por manos mexicanas",
  "⭐ Miles de clientes satisfechos en todo México",
];

export default function BarraPromo() {
  // Duplicamos la lista para que el desplazamiento sea continuo.
  const items = [...ANUNCIOS, ...ANUNCIOS];

  return (
    <div className="marquee-pausa overflow-hidden bg-mexico-green text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2">
        {items.map((texto, i) => (
          <span key={i} className="mx-6 text-sm font-medium">
            {texto}
          </span>
        ))}
      </div>
    </div>
  );
}

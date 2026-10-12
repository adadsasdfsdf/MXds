# 🌵 TiendaMexicana

Plantilla (scaffold) de tienda en línea para el **mercado mexicano**, construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

> Es un punto de partida listo para extender con una base de datos, autenticación y pasarelas de pago reales.

## ✨ Características incluidas

- 🏠 **Página de inicio** con hero, categorías y productos destacados
- 🗂️ **Páginas por categoría** (artesanías, ropa, alimentos, hogar, belleza)
- 🛍️ **Página de detalle de producto** con selector de cantidad
- 🛒 **Carrito de compras** persistente (localStorage) con React Context
- 💳 **Checkout** con formulario de envío y métodos de pago locales
- 🇲🇽 **Localización para México**:
  - Moneda en **pesos mexicanos (MXN)** con formato `es-MX`
  - **IVA 16%** incluido y desglosado
  - Métodos de pago: **tarjeta, OXXO, SPEI, Mercado Pago**
  - Envío gratis desde $999 MXN
  - Catálogo de los **32 estados** de la República
  - Validación de **código postal** (5 dígitos)
  - Casilla de **facturación CFDI** (RFC, razón social, uso de CFDI)
  - Interfaz 100% en **español**

## 🚀 Puesta en marcha

> Requiere acceso a internet para instalar dependencias (`npm install`).

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run build      # compilar para producción
npm run start      # ejecutar la build de producción
npm run lint       # linting
npm run typecheck  # verificación de tipos (tsc)
```

## 📁 Estructura del proyecto

```
src/
├── app/                      # Rutas (App Router)
│   ├── layout.tsx            # Layout raíz (Header, Footer, CarritoProvider)
│   ├── page.tsx              # Página de inicio
│   ├── globals.css           # Estilos globales + Tailwind
│   ├── not-found.tsx         # Página 404
│   ├── categoria/[categoria] # Listado por categoría
│   ├── producto/[slug]       # Detalle de producto
│   ├── carrito/              # Carrito de compras
│   └── checkout/             # Finalizar compra
├── components/               # Header, Footer, ProductoCard
├── context/                  # CarritoContext (estado del carrito)
└── lib/
    ├── data.ts               # Catálogo de ejemplo (mock)
    ├── types.ts              # Tipos de dominio
    └── mexico.ts             # Utilidades: MXN, IVA, envío, estados, CP
```

## 🔜 Próximos pasos sugeridos

Este scaffold usa **datos de ejemplo** y un checkout **simulado**. Para llevarlo a producción:

1. **Base de datos**: reemplazar `src/lib/data.ts` por una BD real (PostgreSQL + Prisma, o un headless commerce como [Medusa](https://medusajs.com/)).
2. **Pasarela de pago**: integrar [Mercado Pago](https://www.mercadopago.com.mx/developers), [Stripe](https://stripe.com/mx) o [Conekta](https://conekta.com/) (incluye OXXO y SPEI).
3. **Autenticación**: cuentas de usuario e historial de pedidos (NextAuth.js / Clerk).
4. **Facturación CFDI**: conectar con un PAC autorizado por el SAT para timbrar facturas.
5. **Envíos**: cotización y guías con Estafeta, DHL o un agregador (Skydropx, Envia.com).
6. **Panel de administración**: gestión de productos, inventario y pedidos.

## 📝 Notas

- Las imágenes de ejemplo provienen de Unsplash (configurado en `next.config.mjs`).
- Los precios ya incluyen IVA; el checkout es una demostración y **no procesa cobros reales**.

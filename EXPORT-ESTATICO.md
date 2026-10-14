# Exportación a HTML estático

Esta rama adapta la tienda para generar una versión **100 % HTML estático**
(una carpeta `out/` con archivos `.html`, `.css`, `.js`) que puedes abrir
localmente o subir a cualquier hosting estático (GitHub Pages, Netlify, Vercel
estático, un bucket S3, etc.) **sin necesidad de servidor ni base de datos**.

## Qué se conserva y qué se pierde

Al ser estático, el sitio pierde todo lo que necesita un servidor en tiempo real.

**Se conserva (apariencia + catálogo "congelado"):**

- Página de inicio, con productos destacados.
- Página de ofertas.
- Las 12 páginas de categoría (una por categoría).
- Una página de detalle por cada producto, con sus reseñas.
- Buscador (filtra en el navegador sobre el catálogo embebido).
- Carrito (funciona en el navegador con `localStorage`).
- Estilos, imágenes y diseño completos.

**Deja de funcionar (requiere servidor/BD):**

- Login / registro / "mi cuenta".
- Panel de administración.
- Checkout real y creación de pedidos / pagos.
- Página de confirmación de pedido (`/pedido/...`).

Los datos de productos quedan "congelados" en el HTML en el momento del build.

## Cómo generar el HTML

Necesitas una máquina **con acceso a internet** (para instalar dependencias).

```bash
# 1. Instalar dependencias
npm install

# 2. Generar el sitio estático
#    Este comando: genera el cliente de Prisma, crea una base SQLite local
#    (prisma/dev.db), la siembra con el catálogo de ejemplo y exporta el HTML.
npm run build
```

Al terminar tendrás una carpeta **`out/`** con todo el sitio estático.

## Cómo verlo

```bash
# Opción A: servidor estático rápido
npm run serve:static        # abre http://localhost:3000

# Opción B: cualquier servidor estático
npx serve out
# o
python3 -m http.server -d out 8080
```

> Abrir los `.html` con doble clic (protocolo `file://`) suele funcionar para
> ver el diseño, pero algunos enlaces y rutas se comportan mejor servidos por
> HTTP. Usa una de las opciones de arriba para una vista fiel.

## Cambios técnicos aplicados en esta rama

- `next.config.mjs`: `output: "export"` e `images.unoptimized: true`.
- `prisma/schema.prisma`: provider cambiado a `sqlite` (build sin BD externa).
- Se quitó `export const dynamic = "force-dynamic"` de las páginas.
- Se añadió `generateStaticParams()` a `producto/[slug]` y `categoria/[categoria]`
  para pre-generar un HTML por producto y por categoría.
- `buscar`: ahora filtra en el navegador (antes leía `?q=` en el servidor).
- Se eliminaron las partes que exigen servidor y rompen la exportación:
  `src/app/api/*`, `src/middleware.ts`, `src/app/admin/*`,
  `src/app/mi-cuenta`, `src/app/pedido/*`.

## Volver a la versión dinámica

Si en el futuro quieres el sitio dinámico completo otra vez, parte de la rama
`main` (que conserva PostgreSQL, API, auth, admin y checkout). Esta rama es
solo para la exportación estática.

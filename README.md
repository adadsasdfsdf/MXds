# 🌵 Mexlindo

> **Lo lindo de México, en tu puerta.**

Tienda en línea **full-stack** para el mercado mexicano, construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma**.

## ✨ Características

### 🛍️ Tienda

- Página de inicio con hero, categorías y productos destacados
- Páginas por categoría y detalle de producto
- Carrito persistente (localStorage) con React Context
- Checkout completo con dirección de envío y facturación CFDI

### 🗄️ Base de datos (Prisma + SQLite)

- Productos, usuarios, pedidos e items persistidos en base de datos
- Precios guardados en centavos (sin errores de redondeo)
- Fácil de migrar a PostgreSQL (cambia el `provider` en `schema.prisma`)

### 🔐 Usuarios y autenticación

- Registro e inicio de sesión (JWT en cookie httpOnly, contraseñas con bcrypt)
- Historial de pedidos en "Mi cuenta"
- Roles: `cliente` y `admin`
- Compra como invitado o con cuenta

### 💳 Pagos (Mercado Pago)

- Integración con **Mercado Pago** (tarjeta, OXXO, SPEI, meses sin intereses)
- **Modo simulado** por defecto (`MP_MOCK=true`) para probar sin cobros reales
- Webhook para confirmar pagos reales
- OXXO/SPEI generan referencia y quedan "pendientes" hasta confirmarse

### 📦 Pedidos

- Creación de pedidos con validación de stock y recálculo de precios en el servidor
- Descuento de inventario transaccional
- Números de pedido legibles (MX-00001)
- Página de confirmación con instrucciones de pago (ficha OXXO, referencia SPEI)

### ⚙️ Panel de administración (`/admin`)

- Protegido por middleware (solo rol `admin`)
- Resumen con métricas (ventas, pedidos, stock bajo)
- CRUD de productos (crear, editar, activar/desactivar)
- Gestión de pedidos (actualizar estado de pago y de envío)

### 🇲🇽 Localización para México

- Moneda en **pesos mexicanos (MXN)** con formato `es-MX`
- **IVA 16%** incluido y desglosado
- Métodos de pago locales, facturación **CFDI**, 32 estados, validación de CP

## 🚀 Puesta en marcha (local)

> Requiere Node.js 18+ y una base de datos PostgreSQL.
> Para desarrollo local puedes crear un Postgres gratuito en
> [Neon](https://neon.tech) o [Supabase](https://supabase.com) en 2 minutos.

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env      # (en Windows: copy .env.example .env)
#   -> edita .env y pega tu DATABASE_URL y DIRECT_URL de Postgres

# 3. Crear la base de datos y sembrar datos de ejemplo
npm run setup
#   -> genera el cliente de Prisma, crea las tablas y siembra
#      productos + usuarios de prueba

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abre **http://localhost:3000** 🎉

> 🌐 **¿Quieres una URL pública?** Mira **[DEPLOY.md](./DEPLOY.md)** para publicar
> en Vercel con base de datos en la nube (gratis).

### 👤 Cuentas de prueba (creadas por el seed)

| Rol     | Correo                  | Contraseña |
| ------- | ----------------------- | ---------- |
| Admin   | admin@tiendamexicana.mx | admin123   |
| Cliente | cliente@ejemplo.mx      | cliente123 |

> El panel de administración está en **http://localhost:3000/admin** (inicia sesión como admin).

## 📜 Scripts

| Script              | Qué hace                                        |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo                          |
| `npm run build`     | Compila para producción (genera Prisma + build) |
| `npm run start`     | Ejecuta la build de producción                  |
| `npm run setup`     | Genera cliente + crea tablas + siembra datos    |
| `npm run db:seed`   | Siembra datos de ejemplo                        |
| `npm run db:reset`  | Reinicia la base de datos y vuelve a sembrar    |
| `npm run typecheck` | Verificación de tipos                           |

## 💳 Activar pagos reales con Mercado Pago

1. Crea una cuenta en [Mercado Pago Developers](https://www.mercadopago.com.mx/developers)
2. Obtén tu **Access Token** de producción
3. En `.env`:
   ```
   MP_MOCK="false"
   MP_ACCESS_TOKEN="tu-access-token"
   NEXT_PUBLIC_SITE_URL="https://tu-dominio.com"
   ```
4. Configura el webhook en Mercado Pago apuntando a `https://tu-dominio.com/api/pagos/webhook`

## 📁 Estructura

```
prisma/
├── schema.prisma           # Modelos: Usuario, Producto, Pedido, ItemPedido
└── seed.ts                 # Datos de ejemplo
src/
├── middleware.ts           # Protección de rutas /admin
├── app/
│   ├── (tienda)            # inicio, categoría, producto, carrito, checkout
│   ├── pedido/[numero]     # Confirmación de pedido
│   ├── login, registro     # Autenticación
│   ├── mi-cuenta           # Historial de pedidos
│   ├── admin/              # Panel: resumen, productos, pedidos
│   └── api/
│       ├── auth/           # login, registro, logout, sesión
│       ├── pedidos/        # Crear pedido
│       ├── pagos/webhook   # Webhook de Mercado Pago
│       └── admin/          # CRUD productos, gestión de pedidos
├── components/             # Header, Footer, ProductoCard
├── context/                # CarritoContext, AuthContext
└── lib/
    ├── prisma.ts           # Cliente Prisma (singleton)
    ├── auth.ts             # JWT + cookies de sesión
    ├── data.ts             # Consultas de productos
    ├── pedidos.ts          # Lógica de creación de pedidos
    ├── pago.ts             # Capa de pago (mock / Mercado Pago)
    ├── mexico.ts           # Utilidades: MXN, IVA, envío, estados, CP
    └── types.ts            # Tipos de dominio
```

## 🔜 Siguientes pasos para producción

- Migrar SQLite → PostgreSQL (`provider = "postgresql"` + hosting como Supabase/Neon)
- Facturación CFDI real conectando un PAC autorizado por el SAT
- Cotización de envíos con Estafeta/DHL o un agregador (Skydropx, Envia.com)
- Subida de imágenes de productos (en vez de URLs) con un storage (S3, Cloudinary)
- Rate limiting y verificación de correo

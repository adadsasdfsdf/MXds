# 🚀 Desplegar en Vercel (URL pública)

Guía paso a paso para publicar la tienda en internet con una base de datos
en la nube gratuita. Resultado: una URL como `https://tu-tienda.vercel.app`
accesible desde cualquier dispositivo.

## Resumen

1. Crear una base de datos PostgreSQL gratuita (Neon)
2. Importar el repositorio en Vercel
3. Configurar variables de entorno
4. Desplegar
5. Sembrar datos de ejemplo (una vez)

---

## 1. Base de datos gratuita (Neon)

1. Entra a **https://neon.tech** y regístrate (puedes usar tu cuenta de GitHub).
2. Crea un proyecto nuevo (region: elige la más cercana, p. ej. US East).
3. Copia la **connection string** que te da (empieza con `postgresql://...`).
   Guárdala, la usarás como `DATABASE_URL` y `DIRECT_URL`.

> Alternativa: Supabase (https://supabase.com) también ofrece Postgres gratis.

---

## 2. Importar en Vercel

1. Entra a **https://vercel.com** y regístrate con tu cuenta de GitHub.
2. Clic en **Add New… → Project**.
3. Busca el repositorio **MXds** y haz clic en **Import**.
4. **Importante:** si el código está en una rama (p. ej. `feature/tienda-completa`),
   primero haz merge del Pull Request a `main`, o selecciona esa rama en Vercel.

---

## 3. Variables de entorno (en la pantalla de importación de Vercel)

Agrega estas variables (**Environment Variables**):

| Nombre                 | Valor                                                        |
|------------------------|--------------------------------------------------------------|
| `DATABASE_URL`         | la connection string de Neon                                 |
| `DIRECT_URL`           | la misma connection string de Neon                           |
| `AUTH_SECRET`          | una cadena larga y aleatoria (invéntala, mín. 32 caracteres) |
| `SEED_TOKEN`           | un token secreto que tú elijas (para sembrar datos)          |
| `MP_MOCK`              | `true`                                                       |
| `NEXT_PUBLIC_SITE_URL` | se completa después con tu URL de Vercel                     |

---

## 4. Desplegar

1. Clic en **Deploy**. Vercel instalará dependencias, generará Prisma,
   creará las tablas (`prisma db push`) y compilará.
2. Al terminar, tendrás una URL pública: `https://tu-proyecto.vercel.app`.
3. (Opcional) Vuelve a **Settings → Environment Variables** y pon
   `NEXT_PUBLIC_SITE_URL` con esa URL. Luego **Redeploy**.

---

## 5. Sembrar datos de ejemplo (una sola vez)

La base de datos arranca vacía. Para cargar los productos y usuarios de prueba,
visita en el navegador:

```
https://tu-proyecto.vercel.app/api/seed?token=EL_SEED_TOKEN_QUE_PUSISTE
```

Deberías ver un mensaje `"Sembrados 8 productos y 2 usuarios."`.

Cuentas de prueba:
- Admin: `admin@tiendamexicana.mx` / `admin123`
- Cliente: `cliente@ejemplo.mx` / `cliente123`

¡Listo! Tu tienda ya está en línea 🎉

---

## Activar pagos reales (opcional)

En **Settings → Environment Variables** de Vercel:
- `MP_MOCK` = `false`
- `MP_ACCESS_TOKEN` = tu Access Token de producción de Mercado Pago
- Configura el webhook en Mercado Pago → `https://tu-proyecto.vercel.app/api/pagos/webhook`

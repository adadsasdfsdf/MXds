/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Permitir imágenes de cualquier host HTTPS (el admin puede usar URLs externas).
    // En producción conviene restringir esto a los dominios que realmente uses.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

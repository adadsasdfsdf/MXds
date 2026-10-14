/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exportación a HTML estático: genera una carpeta `out/` con páginas .html.
  output: "export",
  images: {
    // En exportación estática no hay servidor que optimice imágenes,
    // así que se sirven tal cual (sin optimización on-the-fly).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

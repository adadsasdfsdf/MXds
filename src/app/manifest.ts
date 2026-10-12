import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mexlindo · Lo lindo de México, en tu puerta",
    short_name: "Mexlindo",
    description:
      "Tienda en línea de productos mexicanos auténticos: artesanías, ropa, alimentos y más.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f5f0",
    theme_color: "#006847",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

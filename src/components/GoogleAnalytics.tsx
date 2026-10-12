import Script from "next/script";

/**
 * Integración de Google Analytics 4 (gtag.js).
 * Solo se activa si existe la variable de entorno NEXT_PUBLIC_GA_ID
 * (el ID de medición, con formato "G-XXXXXXXXXX").
 *
 * Al no estar configurada, el componente no renderiza nada, así que
 * el sitio funciona igual sin Google Analytics.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}

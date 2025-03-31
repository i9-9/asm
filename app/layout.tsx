import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASSEMBLY STUDIO",
  description: "Assembly Studio - Design & Development Studio based in Buenos Aires. We create bespoke, high-performance digital experiences with precision-engineered, API-driven, and custom-coded solutions.",
  keywords: [
    "web development",
    "web design",
    "digital agency",
    "custom development",
    "API integration",
    "Buenos Aires",
    "Argentina",
    "design studio",
    "development studio",
    "high-performance websites"
  ],
  authors: [{ name: "Assembly Studio" }],
  creator: "Assembly Studio",
  publisher: "Assembly Studio",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://asm-delta.vercel.app'),
  openGraph: {
    title: 'ASSEMBLY STUDIO',
    description: 'Design & Development Studio based in Buenos Aires',
    url: 'https://asm-delta.vercel.app',
    siteName: 'Assembly Studio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Asegúrate de tener esta imagen en tu carpeta public
        width: 1200,
        height: 630,
        alt: 'Assembly Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASSEMBLY STUDIO',
    description: 'Design & Development Studio based in Buenos Aires',
    images: ['/og-image.jpg'], // La misma imagen que en OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion', // Reemplaza con tu código de Google Search Console
  },
  alternates: {
    canonical: 'https://asm-delta.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.ico' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vvz1rns.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* Schema.org markup para Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Assembly Studio",
              "url": "https://asm-delta.vercel.app",
              "logo": "https://asm-delta.vercel.app/favicon.ico",
              "description": "Design & Development Studio based in Buenos Aires",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Buenos Aires",
                "addressCountry": "Argentina"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@asm.studio",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className={`transition-colors duration-300`}>
        <div id="app-wrapper">{children}</div>
      </body>
    </html>
  );
}

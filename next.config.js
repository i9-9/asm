/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [], // Añadir dominios si usas imágenes externas
  },
  eslint: {
    // Deshabilitar ESLint durante el build para evitar errores que bloqueen el despliegue
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Ignorar errores de TypeScript durante el build
    ignoreBuildErrors: false,
  },
  // Actualizar redirects para manejar rutas antiguas
  async redirects() {
    return [
      {
        source: '/components/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/icons/:path*',
        destination: '/',
        permanent: true,
      }
    ];
  },
  // Añadir pageExtensions para especificar exactamente qué archivos son páginas
  pageExtensions: ['js', 'jsx', 'ts', 'tsx']
}

module.exports = nextConfig 
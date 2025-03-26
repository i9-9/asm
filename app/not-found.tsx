import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#212122] text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl">Página no encontrada</p>
      <Link href="/" className="mt-8 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700">
        Volver al inicio
      </Link>
    </div>
  );
} 
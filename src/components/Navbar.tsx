'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-700">🏠 Panel Inmobiliario</h1>
      <div className="space-x-4">
        <Link
          href="/propiedades"
          className={`text-sm font-medium ${
            pathname === '/propiedades' ? 'text-blue-600 underline' : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          Listado de propiedades
        </Link>
        <Link
          href="/nueva-propiedad"
          className={`text-sm font-medium ${
            pathname === '/nueva-propiedad' ? 'text-blue-600 underline' : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          Agregar nueva propiedad
        </Link>
      </div>
    </nav>
  );
}

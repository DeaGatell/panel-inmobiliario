import './globals.css';
import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

export const metadata = {
  title: 'Panel Inmobiliario',
  description: 'Gestión de propiedades inmobiliarias',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

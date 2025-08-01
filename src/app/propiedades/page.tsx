'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Propiedad = {
  id: string;
  colonia: string;
  direccion: string;
  conjunto: string;
  precio: string;
  moneda: string;
  mantenimiento: string;
  fichaEinmob: string;
  fichaEasyBroker: string;
  tipo: string;
  amueblada: string;
  habitaciones: string;
  banos: string;
  garage: string;
  m2Construccion: string;
  m2Terreno: string;
};

export default function PropiedadesPage() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([
    {
      id: uuidv4(),
      colonia: 'Roma Norte',
      direccion: 'Calle Ficticia 123',
      conjunto: 'Residencial Roma',
      precio: '25000',
      moneda: 'MXN',
      mantenimiento: '1500',
      fichaEinmob: 'https://einmob.com/ficha123',
      fichaEasyBroker: 'https://easybroker.com/ficha123',
      tipo: 'Departamento',
      amueblada: 'No',
      habitaciones: '2',
      banos: '1',
      garage: '1',
      m2Construccion: '85',
      m2Terreno: '100',
    },
  ]);

  const eliminarPropiedad = (id: string) => {
    setPropiedades(prev => prev.filter(p => p.id !== id));
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Propiedades</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border">Colonia</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propiedades.map((prop) => (
              <tr key={prop.id}>
                <td className="p-2 border">{prop.direccion}</td>
                <td className="p-2 border">{prop.colonia}</td>
                <td className="p-2 border">{prop.moneda} ${prop.precio}</td>
                <td className="p-2 border">{prop.tipo}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => alert('Editar aún no implementado')}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => eliminarPropiedad(prop.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
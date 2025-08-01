'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { v4 as uuidv4 } from 'uuid';

type Propiedad = {
  id: string;
  direccion: string;
  colonia: string;
  conjunto: string;
  tipo: string;
  operacion: string;
  precio: string;
  moneda: string;
  mantenimiento: string;
  fichaEinmob: string;
  fichaEasyBroker: string;
  amueblada: string;
  habitaciones: string;
  banos: string;
  garage: string;
  m2Construccion: string;
  m2Terreno: string;
};

const propiedadesIniciales: Propiedad[] = [
  {
    id: uuidv4(),
    direccion: 'Calle Ficticia 123',
    colonia: 'Roma Norte',
    conjunto: 'Residencial Roma',
    tipo: 'Departamento',
    operacion: 'Renta',
    precio: '25000',
    moneda: 'MXN',
    mantenimiento: '1500',
    fichaEinmob: 'https://einmob.com/ficha123',
    fichaEasyBroker: 'https://easybroker.com/ficha123',
    amueblada: 'No',
    habitaciones: '2',
    banos: '1',
    garage: '1',
    m2Construccion: '85',
    m2Terreno: '100',
  },
];

export default function Page() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>(propiedadesIniciales);
  const [coloniaFiltro, setColoniaFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [operacionFiltro, setOperacionFiltro] = useState('');
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  const propiedadesFiltradas = propiedades.filter((p) => {
    return (
      (coloniaFiltro === '' || p.colonia === coloniaFiltro) &&
      (tipoFiltro === '' || p.tipo === tipoFiltro) &&
      (operacionFiltro === '' || p.operacion === operacionFiltro)
    );
  });

  const totalPaginas = Math.ceil(propiedadesFiltradas.length / porPagina);
  const propiedadesPaginadas = propiedadesFiltradas.slice((pagina - 1) * porPagina, pagina * porPagina);

  const exportarPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Dirección', 'Colonia', 'Tipo', 'Operación', 'Precio', 'Habitaciones', 'Baños']],
      body: propiedadesFiltradas.map((p) => [
        p.direccion,
        p.colonia,
        p.tipo,
        p.operacion,
        `${p.moneda} $${p.precio}`,
        p.habitaciones,
        p.banos,
      ]),
    });
    doc.save('propiedades.pdf');
  };

  return (
    <div className="p-8 bg-white min-h-screen text-gray-900">
      <h1 className="text-2xl font-bold mb-6">Listado de Propiedades</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={coloniaFiltro}
          onChange={(e) => setColoniaFiltro(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">Todas las colonias</option>
          {[...new Set(propiedades.map((p) => p.colonia))].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">Todos los tipos</option>
          {[...new Set(propiedades.map((p) => p.tipo))].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={operacionFiltro}
          onChange={(e) => setOperacionFiltro(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">Todas las operaciones</option>
          {[...new Set(propiedades.map((p) => p.operacion))].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <button
          onClick={exportarPDF}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Exportar a PDF
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full text-sm text-left text-gray-900 border border-gray-300">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="p-2 border">Dirección</th>
              <th className="p-2 border">Colonia</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Operación</th>
              <th className="p-2 border">Habitaciones</th>
              <th className="p-2 border">Baños</th>
              <th className="p-2 border">Garage</th>
              <th className="p-2 border">M2 Const.</th>
              <th className="p-2 border">M2 Terreno</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propiedadesPaginadas.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{p.direccion}</td>
                <td className="p-2 border">{p.colonia}</td>
                <td className="p-2 border">{p.moneda} ${p.precio}</td>
                <td className="p-2 border">{p.tipo}</td>
                <td className="p-2 border">{p.operacion}</td>
                <td className="p-2 border">{p.habitaciones}</td>
                <td className="p-2 border">{p.banos}</td>
                <td className="p-2 border">{p.garage}</td>
                <td className="p-2 border">{p.m2Construccion}</td>
                <td className="p-2 border">{p.m2Terreno}</td>
                <td className="p-2 border">
                  <span className="text-blue-600 hover:underline cursor-pointer">Editar</span>{' '}
                  <span className="text-red-600 hover:underline cursor-pointer">Eliminar</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={pagina === 1}
          onClick={() => setPagina(pagina - 1)}
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {pagina} de {totalPaginas}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={pagina === totalPaginas}
          onClick={() => setPagina(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}


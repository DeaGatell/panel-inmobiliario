// src/app/nueva-propiedad/page.tsx
"use client";

import { useState } from "react";

export default function NuevaPropiedad() {
  const [formulario, setFormulario] = useState({
    colonia: "",
    direccion: "",
    conjunto: "",
    precio: "",
    moneda: "MXN",
    mantenimiento: "",
    fichaEinmob: "",
    fichaEasyBroker: "",
    tipo: "",
    amueblada: "No",
    habitaciones: "",
    banos: "",
    garage: "",
    m2Construccion: "",
    m2Terreno: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formulario);
    // Aquí luego agregaremos conexión con base de datos (Supabase)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Agregar nueva propiedad</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow"
      >
        <input className="input" name="colonia" placeholder="Colonia" onChange={handleChange} />
        <input className="input" name="direccion" placeholder="Dirección" onChange={handleChange} />
        <input className="input" name="conjunto" placeholder="Conjunto" onChange={handleChange} />
        <input className="input" name="precio" placeholder="Precio" type="number" onChange={handleChange} />
        <select className="input" name="moneda" onChange={handleChange}>
          <option>MXN</option>
          <option>USD</option>
        </select>
        <input className="input" name="mantenimiento" placeholder="Mantenimiento" type="number" onChange={handleChange} />
        <input className="input" name="fichaEinmob" placeholder="Link E-Inmob" onChange={handleChange} />
        <input className="input" name="fichaEasyBroker" placeholder="Link EasyBroker" onChange={handleChange} />
        <input className="input" name="tipo" placeholder="Tipo de inmueble" onChange={handleChange} />
        <select className="input" name="amueblada" onChange={handleChange}>
          <option>No</option>
          <option>Semi</option>
          <option>Sí</option>
        </select>
        <input className="input" name="habitaciones" placeholder="Habitaciones" type="number" onChange={handleChange} />
        <input className="input" name="banos" placeholder="Baños" type="number" onChange={handleChange} />
        <input className="input" name="garage" placeholder="Garage" type="number" onChange={handleChange} />
        <input className="input" name="m2Construccion" placeholder="M2 Construcción" type="number" onChange={handleChange} />
        <input className="input" name="m2Terreno" placeholder="M2 Terreno" type="number" onChange={handleChange} />

        <div className="md:col-span-2 text-right mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Guardar propiedad
          </button>
        </div>
      </form>

      <style jsx>{`
        .input {
          @apply border p-2 rounded w-full;
        }
      `}</style>
    </div>
  );
}
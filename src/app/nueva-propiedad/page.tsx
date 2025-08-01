"use client";

import { useState, useEffect } from "react";

type Formulario = {
  colonia: string;
  direccion: string;
  conjunto: string;
  precio: string;
  moneda: string;
  mantenimiento: string;
  fichaEinmob: string;
  fichaEasyBroker: string;
  tipo: string;
  operacion: string;
  amueblada: string;
  habitaciones: string;
  banos: string;
  garage: string;
  m2Construccion: string;
  m2Terreno: string;
};

type Errores = Partial<Record<keyof Formulario, string>>;

const formularioInicial: Formulario = {
  colonia: "",
  direccion: "",
  conjunto: "",
  precio: "",
  moneda: "MXN",
  mantenimiento: "",
  fichaEinmob: "",
  fichaEasyBroker: "",
  tipo: "",
  operacion: "Venta",
  amueblada: "No",
  habitaciones: "",
  banos: "",
  garage: "",
  m2Construccion: "",
  m2Terreno: "",
};

export default function NuevaPropiedad() {
  const [formulario, setFormulario] = useState<Formulario>(formularioInicial);
  const [errores, setErrores] = useState<Errores>({});
  const [tocado, setTocado] = useState<Partial<Record<keyof Formulario, boolean>>>({});
  const [exito, setExito] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const esURLValida = (url: string) => {
    try {
      if (!url) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const nuevosErrores: Errores = {};

    const camposObligatorios: (keyof Formulario)[] = [
      "colonia",
      "direccion",
      "precio",
      "moneda",
      "mantenimiento",
      "fichaEinmob",
      "fichaEasyBroker",
      "tipo",
      "operacion",
      "amueblada",
      "habitaciones",
      "banos",
      "garage",
      "m2Construccion",
      "m2Terreno",
    ];

    camposObligatorios.forEach((campo) => {
      if (!formulario[campo] || formulario[campo].trim() === "") {
        nuevosErrores[campo] = "Este campo es obligatorio";
      }
    });

    if (formulario.fichaEinmob && !esURLValida(formulario.fichaEinmob)) {
      nuevosErrores.fichaEinmob = "URL inválida";
    }
    if (formulario.fichaEasyBroker && !esURLValida(formulario.fichaEasyBroker)) {
      nuevosErrores.fichaEasyBroker = "URL inválida";
    }

    setErrores(nuevosErrores);
  }, [formulario]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(errores).length === 0) {
      console.log("Datos enviados:", formulario);
      setFormulario(formularioInicial);
      setErrores({});
      setTocado({});
      setExito(true);
      setTimeout(() => setExito(false), 4000);
    } else {
      alert("Por favor corrige los errores antes de enviar.");
    }
  };

  const esFormularioIncompleto = () => {
    return Object.keys(errores).length > 0;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6">Agregar nueva propiedad</h1>

      {exito && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded">
          ¡Propiedad guardada correctamente!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded shadow"
        noValidate
      >
        <Field label="Colonia" name="colonia" value={formulario.colonia} onChange={handleChange} error={errores.colonia} tocado={tocado} setTocado={setTocado} />
        <Field label="Dirección" name="direccion" value={formulario.direccion} onChange={handleChange} error={errores.direccion} tocado={tocado} setTocado={setTocado} />
        <Field label="Conjunto" name="conjunto" value={formulario.conjunto} onChange={handleChange} error={errores.conjunto} tocado={tocado} setTocado={setTocado} />
        <Field label="Precio" name="precio" type="number" value={formulario.precio} onChange={handleChange} error={errores.precio} tocado={tocado} setTocado={setTocado} />

        {/* Moneda */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Moneda <span className="text-red-500">*</span>
          </label>
          <select
            name="moneda"
            value={formulario.moneda}
            onChange={handleChange}
            onBlur={() => setTocado((prev) => ({ ...prev, moneda: true }))}
            className={`w-full p-2 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500 ${
              tocado.moneda && errores.moneda ? "border-red-500" : ""
            }`}
          >
            <option>MXN</option>
            <option>USD</option>
          </select>
          {tocado.moneda && errores.moneda && <p className="text-red-600 text-sm mt-1">{errores.moneda}</p>}
        </div>

        <Field label="Mantenimiento" name="mantenimiento" type="number" value={formulario.mantenimiento} onChange={handleChange} error={errores.mantenimiento} tocado={tocado} setTocado={setTocado} />
        <Field label="Link E-Inmob" name="fichaEinmob" type="url" value={formulario.fichaEinmob} onChange={handleChange} error={errores.fichaEinmob} tocado={tocado} setTocado={setTocado} />
        <Field label="Link EasyBroker" name="fichaEasyBroker" type="url" value={formulario.fichaEasyBroker} onChange={handleChange} error={errores.fichaEasyBroker} tocado={tocado} setTocado={setTocado} />
        <Field label="Tipo de inmueble" name="tipo" value={formulario.tipo} onChange={handleChange} error={errores.tipo} tocado={tocado} setTocado={setTocado} />

        {/* Tipo de operación */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            Tipo de operación <span className="text-red-500">*</span>
          </label>
          <select
            name="operacion"
            value={formulario.operacion}
            onChange={handleChange}
            onBlur={() => setTocado((prev) => ({ ...prev, operacion: true }))}
            className={`w-full p-2 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500 ${
              tocado.operacion && errores.operacion ? "border-red-500" : ""
            }`}
          >
            <option value="">Selecciona</option>
            <option value="Venta">Venta</option>
            <option value="Renta">Renta</option>
          </select>
          {tocado.operacion && errores.operacion && <p className="text-red-600 text-sm mt-1">{errores.operacion}</p>}
        </div>

        {/* Amueblada */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">
            ¿Amueblada? <span className="text-red-500">*</span>
          </label>
          <select
            name="amueblada"
            value={formulario.amueblada}
            onChange={handleChange}
            onBlur={() => setTocado((prev) => ({ ...prev, amueblada: true }))}
            className={`w-full p-2 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500 ${
              tocado.amueblada && errores.amueblada ? "border-red-500" : ""
            }`}
          >
            <option>No</option>
            <option>Semi</option>
            <option>Sí</option>
          </select>
          {tocado.amueblada && errores.amueblada && <p className="text-red-600 text-sm mt-1">{errores.amueblada}</p>}
        </div>

        <Field label="Habitaciones" name="habitaciones" type="number" value={formulario.habitaciones} onChange={handleChange} error={errores.habitaciones} tocado={tocado} setTocado={setTocado} />
        <Field label="Baños" name="banos" type="number" value={formulario.banos} onChange={handleChange} error={errores.banos} tocado={tocado} setTocado={setTocado} />
        <Field label="Garage" name="garage" type="number" value={formulario.garage} onChange={handleChange} error={errores.garage} tocado={tocado} setTocado={setTocado} />
        <Field label="M2 Construcción" name="m2Construccion" type="number" value={formulario.m2Construccion} onChange={handleChange} error={errores.m2Construccion} tocado={tocado} setTocado={setTocado} />
        <Field label="M2 Terreno" name="m2Terreno" type="number" value={formulario.m2Terreno} onChange={handleChange} error={errores.m2Terreno} tocado={tocado} setTocado={setTocado} />

        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              esFormularioIncompleto() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={esFormularioIncompleto()}
          >
            Guardar propiedad
          </button>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: keyof Formulario;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  tocado: Partial<Record<keyof Formulario, boolean>>;
  setTocado: React.Dispatch<React.SetStateAction<Partial<Record<keyof Formulario, boolean>>>>;
};

// Simple Field component definition
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  tocado,
  setTocado,
}: FieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-semibold mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={() => setTocado((prev) => ({ ...prev, [name]: true }))}
        className={`w-full p-2 rounded border border-gray-300 bg-white text-gray-900 placeholder-gray-500 ${
          tocado[name] && error ? "border-red-500" : ""
        }`}
        placeholder={label}
      />
      {tocado[name] && error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

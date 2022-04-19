// Copia y pega el estilo del botón necesario, agrega al className el width en porcentaje, por ejemplo: w-1/2, w-full

export const primaryButton = (
  <button className="bg-red-600 p-1 text-sm text-gray-100 border-1 border-red-600 rounded hover:border-red-600 hover:bg-white hover:text-red-600">
    Primary
  </button>
);

export const secondaryButton = (
  <button className="bg-gray-100 p-1 text-sm text-red-600 border-1 border-red-600 rounded hover:bg-red-600 hover:text-gray-100">
    Secondary
  </button>
);
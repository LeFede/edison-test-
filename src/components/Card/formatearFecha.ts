function formatearFecha(fechaISO: string): string {
  // Parsear la fecha ISO a un objeto Date en UTC
  const fecha = new Date(fechaISO);

  // Verificar si la fecha es válida
  if (isNaN(fecha.getTime())) {
    throw new Error("Fecha inválida");
  }

  // Objeto con las abreviaciones de los meses
  const monthAbbreviations = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Obtener el día y el mes en UTC
  const dia = fecha.getUTCDate();
  const mes = monthAbbreviations[fecha.getUTCMonth()];

  // Devolver la fecha formateada como "día de mes"
  return `${dia} de ${mes}`;
}

export default formatearFecha;

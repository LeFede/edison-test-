function formatearFecha(fechaISO: string): string {
  // Parsear la fecha ISO a un objeto Date
  const fecha = new Date(fechaISO);

  // Verificar si la fecha es válida
  if (isNaN(fecha.getTime())) {
    throw new Error("Fecha inválida");
  }

  // Objeto con las abreviaciones de los meses
  const monthAbbreviations = {
    0: "enero",
    1: "febrero",
    2: "marzo",
    3: "abril",
    4: "mayo",
    5: "junio",
    6: "julio",
    7: "agosto",
    8: "septiembre",
    9: "octubre",
    10: "noviembre",
    11: "diciembre",
  };

  // Obtener el día y el mes de la fecha
  const dia = fecha.getDate();

  // @ts-ignore
  const mes = monthAbbreviations[fecha.getMonth()]; // Obtener la abreviatura del mes

  // Devolver la fecha formateada como "día mes."
  return `${dia} de ${mes}`;
}

export default formatearFecha;

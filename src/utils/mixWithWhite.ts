
export function mixWithWhite(hexColor: string, ratio = 0.5) {
  // Asegúrate de que el color esté en formato hexadecimal
  if (!/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    throw new Error("Invalid hex color format. Please use #RRGGBB.");
  }

  // Eliminar el símbolo '#' y convertir el color a RGB
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // Mezclar el color con blanco (255, 255, 255)
  const mixedR = Math.round(r + (255 - r) * ratio);
  const mixedG = Math.round(g + (255 - g) * ratio);
  const mixedB = Math.round(b + (255 - b) * ratio);

  // Convertir los valores RGB mezclados de vuelta a formato hexadecimal
  const mixedHex = `#${((1 << 24) | (mixedR << 16) | (mixedG << 8) | mixedB).toString(16).slice(1).toUpperCase()}`;

  return mixedHex;
}

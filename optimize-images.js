import sharp from "sharp";
import fs from "fs";
import path from "path";
import axios from "axios";

// Configuración de Axios para la API
const api_qa = axios.create({
  baseURL: "https://qa.api.somosedison.com",
  headers: {
    Authorization: "l33hDPtjJK0emSag5NcJKdrJbWXUFpORTSih",
  },
});

// Usamos import.meta.url para obtener el directorio actual
const outputDir = path.resolve(
  new URL(".", import.meta.url).pathname,
  "public",
  "optimized-images",
);

// Asegúrate de que el directorio de salida exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  try {
    console.log("Iniciando la optimización de imágenes...");

    // Obtener todos los cursos de la API
    const res = await api_qa.get(`/courses/market`);
    const courses = res.data;

    for (const course of courses) {
      for (const user of course.users) {
        const { picture, id: userId } = user.user;

        // Generar un nombre único para cada imagen
        const outputImagePath = path.join(outputDir, `${userId}.webp`);

        // Verificar si la imagen ya existe
        if (fs.existsSync(outputImagePath)) {
          console.log(`Imagen ya existe: ${outputImagePath}`);
          continue;
        }

        try {
          // Descargar la imagen desde la URL
          const imageResponse = await axios({
            url: picture.startsWith("http") ? picture : `http:${picture}`,
            method: "GET",
            responseType: "arraybuffer",
          });

          // Procesar la imagen con sharp
          await sharp(Buffer.from(imageResponse.data))
            .resize(36)
            .webp({ quality: 80 })
            .toFile(outputImagePath);

          console.log(`Imagen optimizada y guardada: ${outputImagePath}`);
        } catch (error) {
          console.error(
            `Error al procesar la imagen para el usuario ${userId}:`,
            error,
          );
        }
      }
    }

    console.log("Optimización de imágenes completada.");
  } catch (error) {
    console.error("Error en el proceso de optimización:", error);
    process.exit(1); // Termina el proceso con error si algo falla
  }
})();

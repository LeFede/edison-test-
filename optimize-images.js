import sharp from "sharp";
import fs from "fs";
import path from "path";
import axios from "axios";
import api from "./axios.js";
const tryLoadEnv = () => {
  process.loadEnvFile();
  return process.env;
};
const tryLoadParameter = () => {
  return process.env;
};

let [err, data] = tryLoadEnv[result]();
if (err || !data) {
  [err, data] = tryLoadParameter[result]();
  if (err) throw err;
  if (!data) throw err;
}

const { AUTHORIZATION, TAL, ACADEMY_ID } = data;
for (let _ in Array.from({ length: 10 })) {
  console.log(TAL);
}

// Usamos import.meta.url para obtener el directorio actual
const outputDir = path.resolve(
  new URL(".", import.meta.url).pathname,
  "public",
  "__optimized-images",
);

// Asegúrate de que el directorio de salida exista
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  try {
    console.log("Iniciando la optimización de imágenes...");

    // Obtener todos los cursos de la API
    const res = await api.get(`/courses/market/${ACADEMY_ID}`);
    const courses = res.data;

    for (const course of courses) {
      for (const user of course.users) {
        const { picture, id: userId } = user.user;

        // Definir los tamaños de las imágenes (1x, 2x, 3x)
        const sizes = [36, 72, 108]; // 1x, 2x, 3x

        for (let i = 0; i < sizes.length; i++) {
          const size = sizes[i];
          const outputImagePath = path.join(
            outputDir,
            `${userId}_${i + 1}x.webp`,
          );

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

            // Procesar la imagen con sharp y redimensionarla según el tamaño
            await sharp(Buffer.from(imageResponse.data))
              .resize(size, size, {
                fit: "cover",
                position: "center",
              })
              .webp({ quality: 80 })
              .toFile(outputImagePath);

            console.log(`Imagen optimizada y guardada: ${outputImagePath}`);
          } catch (error) {
            console.error(
              `Error al procesar la imagen para el usuario ${userId} en tamaño ${size}x:`,
              error,
            );
          }
        }
      }
    }

    console.log("Optimización de imágenes completada.");
  } catch (error) {
    console.error("Error en el proceso de optimización:", error);
    process.exit(1); // Termina el proceso con error si algo falla
  }
})();

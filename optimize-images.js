// import sharp from "sharp";
// import fs from "fs";
// import path from "path";
// import axios from "axios";
// import api from "./axios.js";
//
// try {
//   process.loadEnvFile();
// } catch (err) {}
// const { ACADEMY_ID } = process.env;
//
// // Usamos import.meta.url para obtener el directorio actual
// const outputDir = path.resolve(
//   new URL(".", import.meta.url).pathname,
//   "public",
//   "__optimized-images",
// );
//
// // Asegúrate de que el directorio de salida exista
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }
//
// (async () => {
//   try {
//     console.log("Iniciando la optimización de imágenes...");
//
//     // Obtener todos los cursos de la API
//     const res = await api.get(`/courses/market/${ACADEMY_ID}`);
//     const courses = res.data;
//
//     for (const course of courses) {
//       for (const user of course.users) {
//         const { picture, id: userId } = user.user;
//
//         // Definir los tamaños de las imágenes (1x, 2x, 3x)
//         const sizes = [36, 72, 108]; // 1x, 2x, 3x
//
//         for (let i = 0; i < sizes.length; i++) {
//           const size = sizes[i];
//           const outputImagePath = path.join(
//             outputDir,
//             `${userId}_${i + 1}x.webp`,
//           );
//
//           // Verificar si la imagen ya existe
//           if (fs.existsSync(outputImagePath)) {
//             console.log(`Imagen ya existe: ${outputImagePath}`);
//             continue;
//           }
//
//           try {
//             // Descargar la imagen desde la URL
//             const imageResponse = await axios({
//               url: picture.startsWith("http") ? picture : `http:${picture}`,
//               method: "GET",
//               responseType: "arraybuffer",
//             });
//
//             // Procesar la imagen con sharp y redimensionarla según el tamaño
//             await sharp(Buffer.from(imageResponse.data))
//               .resize(size, size, {
//                 fit: "cover",
//                 position: "center",
//               })
//               .webp({ quality: 80 })
//               .toFile(outputImagePath);
//
//             console.log(`Imagen optimizada y guardada: ${outputImagePath}`);
//           } catch (error) {
//             console.error(
//               `Error al procesar la imagen para el usuario ${userId} en tamaño ${size}x:`,
//               error,
//             );
//           }
//         }
//       }
//     }
//
//     console.log("Optimización de imágenes completada.");
//   } catch (error) {
//     console.error("Error en el proceso de optimización:", error);
//     process.exit(1); // Termina el proceso con error si algo falla
//   }
// })();
//
//
// ////////////////////////////////////////////////////////////////////////////

import sharp from "sharp";
import fs from "fs";
import path from "path";
import axios from "axios";
import api from "./axios.js";

try {
  process.loadEnvFile();
} catch (err) {}
const { ACADEMY_ID } = process.env;

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
    const resCourses = await api.get(`/courses/market/${ACADEMY_ID}`);
    const courses = resCourses.data;

    // Obtener datos de la academia
    const resAcademy = await api.get(`/academies/${ACADEMY_ID}`);
    const academy = resAcademy.data;

    // Función para procesar una imagen con verificación
    const processImage = async (
      imageUrl,
      fileName,
      sizes,
      keepAspectRatio = false,
      isFavicon = false,
    ) => {
      // Verificar si imageUrl es undefined o null antes de continuar
      if (!imageUrl) {
        console.log(`URL de imagen para ${fileName} no encontrada`);
        return; // Salir de la función si no hay URL
      }

      for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i];
        const fileExtension = isFavicon ? "png" : "webp"; // Cambiado a png para el favicon
        const outputImagePath = path.join(
          outputDir,
          `${fileName}_${i + 1}x.${fileExtension}`,
        );

        // Verificar si la imagen ya existe
        if (fs.existsSync(outputImagePath)) {
          console.log(`Imagen ya existe: ${outputImagePath}`);
          continue;
        }

        try {
          // Descargar la imagen desde la URL
          const imageResponse = await axios({
            url: imageUrl.startsWith("http") ? imageUrl : `http:${imageUrl}`,
            method: "GET",
            responseType: "arraybuffer",
          });

          // Procesar la imagen con sharp y redimensionarla según el tamaño
          // Aquí ajustamos el parámetro fit en función de si queremos mantener el aspect ratio
          const sharpImage = sharp(Buffer.from(imageResponse.data)).resize(
            size,
            keepAspectRatio ? null : size,
            {
              fit: keepAspectRatio ? "inside" : "cover",
              position: "center",
            },
          );

          if (isFavicon) {
            // Para el favicon, convertimos a PNG
            await sharpImage.png({ quality: 80 }).toFile(outputImagePath);
          } else {
            // Para imágenes no favicon, usar .webp
            await sharpImage.webp({ quality: 80 }).toFile(outputImagePath);
          }

          console.log(`Imagen optimizada y guardada: ${outputImagePath}`);
        } catch (error) {
          console.error(
            `Error al procesar la imagen ${fileName} en tamaño ${size}x:`,
            error,
          );
        }
      }
    };

    // Procesar imágenes de los usuarios
    for (const course of courses) {
      for (const user of course.users) {
        const { picture, id: userId } = user.user;
        const sizes = [36, 72, 108]; // 1x, 2x, 3x
        await processImage(picture, userId, sizes);
      }
    }

    // Procesar imágenes de la academia, manteniendo el aspect ratio
    const academySizes = {
      favicon: [16], // Solo 1x para favicon
      logo: [100, 200, 300], // 1x, 2x, 3x
      heroMobile: [300, 600, 900], // 1x, 2x, 3x
      heroDesk: [800, 1600, 2400], // 1x, 2x, 3x
    };

    for (const [imageType, sizes] of Object.entries(academySizes)) {
      if (academy.style && academy.style[imageType]) {
        // Solo para favicon, pasamos true para isFavicon
        await processImage(
          academy.style[imageType],
          imageType,
          sizes,
          true,
          imageType === "favicon",
        );
      } else {
        console.log(
          `El campo ${imageType} para la academia.style es undefined.`,
        );
      }
    }

    console.log("Optimización de imágenes completada.");
  } catch (error) {
    console.error("Error en el proceso de optimización:", error);
    process.exit(1); // Termina el proceso con error si algo falla
  }
})();

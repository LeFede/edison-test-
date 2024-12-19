// astro.config.mjs
import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import CompressionPlugin from "compression-webpack-plugin";
import BrotliWebpackPlugin from "brotli-webpack-plugin";
// import react from "@astrojs/react";
// import tailwind from "@astrojs/tailwind";

export default defineConfig({
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip", // Puedes usar 'gzip' o 'brotli' como algoritmo
      test: /\.(js|css|html)$/i, // Comprimir archivos JS, CSS y HTML
      threshold: 8192, // Solo comprimir archivos mayores a 8KB
      minRatio: 0.8, // Solo comprimir si la reducción de tamaño es al menos del 20%
    }),

    new BrotliWebpackPlugin({
      asset: "[path].br", // Generar archivos con extensión `.br`
      test: /\.(js|css|html)$/i, // Comprimir archivos JS, CSS y HTML
      threshold: 8192, // Solo comprimir archivos mayores a 8KB
      minRatio: 0.8, // Solo comprimir si la reducción de tamaño es al menos del 20%
    }),
  ],
  build: {
    webpack: {
      // Usar los plugins de compresión en Webpack
      plugins: [
        new CompressionPlugin({
          algorithm: "gzip", // Esto seguirá siendo Gzip para la compresión gzip
          test: /\.(js|css|html)$/i, // Comprimir archivos JS, CSS y HTML
          threshold: 8192, // Solo comprimir archivos mayores a 8KB
          minRatio: 0.8, // Solo comprimir si la reducción de tamaño es al menos del 20%
        }),

        new BrotliWebpackPlugin({
          asset: "[path].br", // Generar archivos con extensión `.br`
          test: /\.(js|css|html)$/i, // Comprimir archivos JS, CSS y HTML
          threshold: 8192, // Solo comprimir archivos mayores a 8KB
          minRatio: 0.8, // Solo comprimir si la reducción de tamaño es al menos del 20%
        }),
      ],
    },
  },
  // integrations: [react(), tailwind()],
  // output: 'hybrid'
  output: "static",
  // server: {
  //   port: 3001,
  // },

  adapter: awsAmplify(),

  image: {
    domains: [
      "4c6fd7a052e7730e10b5e8324446b71d.cdn.bubble.io",
      "edison-s3.s3.us-east-1.amazonaws.com",
    ],
  },

  integrations: [tailwind(), react()],
});

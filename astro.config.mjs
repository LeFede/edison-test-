import { defineConfig, envField } from "astro/config";
import awsAmplify from "astro-aws-amplify";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// import compressor from "astro-compressor";

export default defineConfig({
  integrations: [react(), tailwind()],
  adapter: awsAmplify(),
  output: "static", // Asegúrate de que la salida esté en la carpeta estática
  compressHTML: true,
  env: {
    schema: {
      ACADEMY_ID: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },
});

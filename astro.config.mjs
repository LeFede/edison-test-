import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import compressor from "astro-compressor";

export default defineConfig({
  integrations: [react(), // otras integraciones...
  tailwind(), compressor()],
  adapter: awsAmplify(),
  output: "static", // Asegúrate de que la salida esté en la carpeta estática
});
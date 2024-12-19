// astro.config.mjs
import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
// import react from "@astrojs/react";
// import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // integrations: [react(), tailwind()],
  // output: 'hybrid'
  output: "static",
  server: {
    port: 3001,
  },

  adapter: awsAmplify(),

  image: {
    domains: [
      "4c6fd7a052e7730e10b5e8324446b71d.cdn.bubble.io",
      "edison-s3.s3.us-east-1.amazonaws.com",
    ],
  },

  integrations: [tailwind(), react()],
});

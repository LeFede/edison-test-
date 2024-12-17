// astro.config.mjs
import { defineConfig } from "astro/config";
import awsAmplify from "astro-aws-amplify";
// import react from "@astrojs/react";
// import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // integrations: [react(), tailwind()],
  output: "static", // output: 'hybrid'
  adapter: awsAmplify(),

  image: {
    domains: [
      "4c6fd7a052e7730e10b5e8324446b71d.cdn.bubble.io",
      "edison-s3.s3.us-east-1.amazonaws.com",
    ],
  },
});

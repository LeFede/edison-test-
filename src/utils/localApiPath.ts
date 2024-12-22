/// <reference types="astro/client" />

import type { AstroGlobal } from "astro";

const localApiPath = (astroContext: AstroGlobal, route: string): string => {
  return `${astroContext.url.origin}/api/${route}.json`;
};

export default localApiPath;

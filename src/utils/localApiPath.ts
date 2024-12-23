/// <reference types="astro/client" />

import type { AstroGlobal } from "astro";

const localApiPath = (astroContext: AstroGlobal, route: string): string => {
  return `${astroContext.url.origin}/api/${route}.json`;
};

const staticLocalApiPath = (route: string): string => {
  return `/api/${route}.json`;
};

export { staticLocalApiPath };
export default localApiPath;

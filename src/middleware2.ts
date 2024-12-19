import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  return new Response(
    response.body?.pipeThrough(new CompressionStream("gzip")),
    {
      ...response,
      headers: {
        ...response.headers,
        "Content-Encoding": "gzip",
      },
    },
  );
});

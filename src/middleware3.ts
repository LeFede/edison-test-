import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
  const response = await next();

  if (!response.body) {
    return response;
  }

  const contentType = response.headers.get("Content-Type");
  const isCompressible =
    contentType &&
    (contentType.includes("text/") ||
      contentType.includes("application/json") ||
      contentType.includes("application/javascript") ||
      contentType.includes("application/xml"));

  if (!isCompressible) {
    return response;
  }

  const compressedBody = response.body.pipeThrough(
    new CompressionStream("gzip"),
  );
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Content-Encoding", "gzip");

  return new Response(compressedBody, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
});

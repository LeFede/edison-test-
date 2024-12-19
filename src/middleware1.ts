// funciona pero tiene un poco de performance issue
import { defineMiddleware } from "astro:middleware";
import { brotliCompressSync, deflateSync, gzipSync } from "node:zlib";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const html = await response.text();

  const headers = response.headers;
  let res: string | Buffer;
  if (response.headers.get("Content-Type") === "text/html") {
    const reqEncodings =
      context.request.headers
        .get("accept-encoding")
        ?.split(",")
        .map((e) => e.trim()) ?? [];

    if (reqEncodings?.includes("br")) {
      headers.set("Content-Encoding", "br");
      res = brotliCompressSync(html);
    } else if (reqEncodings?.includes("gzip")) {
      headers.set("Content-Encoding", "gzip");
      res = gzipSync(html);
    } else if (reqEncodings?.includes("deflate")) {
      headers.set("Content-Encoding", "deflate");
      res = deflateSync(html);
    } else {
      res = html;
    }
  }

  return new Response(res, {
    status: response.status,
    headers: headers,
  });
});

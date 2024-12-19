// @bun
// This module is only required for Bun, because it doesn't currently have CompressionStream. This module just polyfills it in.
// Use like this: import "./compressionStream.js";
// It should be possible to remove this soon and depend upon the built-in CompressionStream once it has landed in Bun.
// Modified from: https://github.com/oven-sh/bun/issues/1723#issuecomment-1774174194

import zlib from "node:zlib";

const make = (ctx, handle) =>
  Object.assign(ctx, {
    writable: new WritableStream({
      write: (chunk) => handle.write(chunk),
      close: () => handle.end(),
    }),
    readable: new ReadableStream({
      type: "bytes",
      start(ctrl) {
        handle.on("data", (chunk) => ctrl.enqueue(chunk));
        handle.once("end", () => ctrl.close());
      },
    }),
  });

globalThis.CompressionStream ??= class CompressionStream {
  constructor(format) {
    make(
      this,
      format === "deflate"
        ? zlib.createDeflate()
        : format === "gzip"
          ? zlib.createGzip()
          : format === "br"
            ? zlib.createBrotliCompress()
            : zlib.createDeflateRaw(),
    );
  }
};

globalThis.DecompressionStream ??= class DecompressionStream {
  constructor(format) {
    make(
      this,
      format === "deflate"
        ? zlib.createInflate()
        : format === "gzip"
          ? zlib.createGunzip()
          : format === "br"
            ? zlib.createBrotliDecompress()
            : zlib.createInflateRaw(),
    );
  }
};

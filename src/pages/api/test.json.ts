import type { APIContext } from "astro";
export const prerender = false;

export async function GET({ params }: APIContext) {
  console.log(params);

  const currentTime = new Date().toLocaleTimeString();
  return new Response(JSON.stringify({ message: currentTime }), {
    status: 200,
    statusText: "Ok!",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control":
        "public, max-age=10, s-maxage=20, stale-while-revalidate=5",
    },
  });
}

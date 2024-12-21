import type { APIContext, APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = ({ params }: APIContext) => {
  console.log(params);

  const currentTime = new Date().toLocaleTimeString();
  return new Response(JSON.stringify({ message: currentTime }), {
    status: 200,
    statusText: "Ok!",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control":
        "public, max-age=30, s-maxage=35, stale-while-revalidate=10",
    },
  });
};

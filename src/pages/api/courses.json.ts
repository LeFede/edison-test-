import type { APIRoute } from "astro";
import api from "../../../axios";
import { aResult, type Result } from "@volpe/utils";
export const prerender = false;
import { HttpStatusCode, type AxiosResponse } from "axios";
import { ACADEMY_ID } from "astro:env/server";
import { type Course } from "../../env.d";

export const GET: APIRoute = async (_ctx) => {
  const [err, res] = (await api.get[aResult](
    `/courses/market/${ACADEMY_ID}`,
  )) as unknown as Result<AxiosResponse<Course[]>>;

  if (err || !res)
    return new Response(JSON.stringify([err, null]), {
      status: HttpStatusCode.Conflict,
      statusText: "There was an error fetching courses",
    });

  const { data: courses } = res;

  return new Response(JSON.stringify([null, courses]), {
    status: HttpStatusCode.Ok,
    statusText: "Ok!",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control":
        "public, max-age=30, s-maxage=35, stale-while-revalidate=10",
    },
  });
};

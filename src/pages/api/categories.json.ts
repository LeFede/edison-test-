import type { APIRoute } from "astro";
import api from "../../../axios";
import { aResult, type Result } from "@volpe/utils";
export const prerender = false;
import axios, { HttpStatusCode, type AxiosResponse } from "axios";
import { ACADEMY_ID } from "astro:env/server";
import { type Category, type Course, type IAcademy } from "../../env.d";

function countCoursesByCategory(courses: Course[]): Record<string, number> {
  return courses.reduce(
    (acc, course) => {
      const category = course.categoryId;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

export const GET: APIRoute = async (_ctx) => {
  const [err, res] = (await api.get[aResult](
    `/categories`,
  )) as unknown as Result<AxiosResponse<Category[]>>;

  const a = await axios.get(`${_ctx.url.origin}/api/courses.json`);
  const [coursesError, courses] = a.data;

  const [err2, academyResult] = (await api.get[aResult](
    `/academies/${ACADEMY_ID}`,
  )) as unknown as Result<AxiosResponse<IAcademy>>;

  if (err || !res)
    return new Response(JSON.stringify([err, null]), {
      status: HttpStatusCode.Conflict,
      statusText: "There was an error fetching courses",
    });

  let { data: categories } = res;
  let academy = academyResult?.data;
  // @ts-ignore
  const countedCategories = countCoursesByCategory(courses);
  // console.log(academy?.courses[0]);

  categories = categories?.filter((e: any) => e.academyId === academy?.id);
  categories = categories.sort(
    (a, b) => (countedCategories[b.id] || 0) - (countedCategories[a.id] || 0),
  );

  return new Response(JSON.stringify([null, categories]), {
    status: HttpStatusCode.Ok,
    statusText: "Ok!",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control":
        "public, max-age=30, s-maxage=35, stale-while-revalidate=10",
    },
  });
};

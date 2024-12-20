import { useEffect, useState } from "react";
import type { Category, Course } from "../../env.d";
import Card from "../Card/Card";
import s from "./Market.module.css";
import Arrow from "./Arrow.svg";
import Filters from "./Filters";

interface Props {
  courses: Course[];
  firstShowed: number;
  categories: Category[];
}

const Market: React.FC<Props> = ({ courses, firstShowed = 10, categories }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);

  const splitCourses = [...courses].splice(
    0,
    showAllCourses ? courses.length : firstShowed,
  );

  useEffect(() => {
    const element = document.getElementById("marketSkeleton");
    if (element) {
      // Establecer las propiedades de estilo
      // element.style.visibility = "hidden";
      element.style.opacity = "0.5";
      element.style.zIndex = "-99";
    }
  }, []); // El efecto se ejecuta una vez cuando el componente se monta

  return (
    <section
      className="px-4 m-auto
      md:max-w-container
      lg:px-0 lg:grid lg:grid-cols-[150px_auto] lg:gap-x-14
    "
    >
      <Filters>
        <p className="font-medium mb-4 cursor-pointer hidden lg:block">
          Todos los cursos
        </p>

        <Filters.Title>Categorías</Filters.Title>
        <ul
          className="flex gap-2 mb-4
          flex-row
          lg:flex-col 
          "
        >
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className="text-wrap line-clamp-1 text-sm cursor-pointer"
                title={category.value}
              >
                {category.value}
              </li>
            );
          })}
        </ul>

        <Filters.Title>Duración</Filters.Title>
        <ul
          className="flex gap-2 mb-4
          flex-row
          lg:flex-col 
          "
        >
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className="text-wrap line-clamp-1 text-sm cursor-pointer"
                title={category.value}
              >
                {category.value}
              </li>
            );
          })}
        </ul>

        <Filters.Title>Modalidad</Filters.Title>
        <ul
          className="flex gap-2 mb-4
          flex-row
          lg:flex-col 
          "
        >
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                className="text-wrap line-clamp-1 text-sm cursor-pointer"
                title={category.value}
              >
                {category.value}
              </li>
            );
          })}
        </ul>
      </Filters>
      <div className="col-start-2">
        <label
          htmlFor="market-input"
          className="text-4xl font-semibold mb-2 hidden lg:block"
        >
          Todos los cursos
        </label>
        <label htmlFor="market-input" className="text-xl mb-4 hidden lg:block">
          Explora todos nuestros cursos, liderados por los principales expertos
          de cada industria.
        </label>

        <input
          id="market-input"
          type="text"
          placeholder="Busca tu curso..."
          className={`
            mx-0 p-2.5 w-full z-10 rounded-lg bg-white border-dark border-2 border-opacity-35 text-dark focus:outline-none lg:mb-10
          ${s.input}`}
        />
        <hr className="h-0.5 bg-gray_300 my-6 lg:hidden" />
      </div>
      <div className="grid gap-4 grid-cols-market col-start-2">
        {splitCourses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>

      {!showAllCourses && courses.length > firstShowed && (
        <button
          className="w-full text-gray_25 font-medium text-lg flex justify-center py-1.5 gap-x-2 rounded-lg mt-6 mb-12 col-start-2"
          style={{ backgroundColor: "var(--main-color)" }}
          onClick={() => setShowAllCourses(true)}
        >
          Todos los cursos
          <Arrow />
        </button>
      )}
    </section>
  );
};

export default Market;

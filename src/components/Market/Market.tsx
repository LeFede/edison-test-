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

function countCoursesByCategory(courses: Course[]): Record<string, number> {
  return courses.reduce(
    (acc, course) => {
      const category = course.category.value;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

const Test: React.FC<Props> = ({ courses, firstShowed = 9, categories }) => {
  const countedCategories = countCoursesByCategory(courses);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showDuration, setShowDuration] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showModality, setShowModality] = useState(false);

  const splitCourses = [...courses].splice(
    0,
    showAllCourses ? courses.length : firstShowed,
  );

  useEffect(() => {
    const element = document.getElementById("marketSkeleton");
    if (element) {
      element.style.visibility = "hidden";
      // element.style.opacity = "0.1";
      element.style.zIndex = "-99";
    }
  }, []);

  return (
    <>
      <Filters>
        <p className="font-medium mb-4 cursor-pointer hidden lg:block lg:px-4 text-nowrap">
          Todos los cursos
        </p>

        <Filters.Title toggle={setShowCategories}>
          Categoría<span className="hidden lg:inline">s</span>
        </Filters.Title>
        <Filters.Group show={showCategories}>
          {categories
            .sort(
              (a, b) =>
                (countedCategories[b.value] || 0) -
                (countedCategories[a.value] || 0),
            )
            .map((category) => (
              <Filters.Category
                key={category.id}
                value={category.value}
                amount={countedCategories[category.value]}
              />
            ))}
        </Filters.Group>

        <Filters.Title toggle={setShowDuration}>Duración</Filters.Title>
        <Filters.Group show={showDuration}>
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
        </Filters.Group>

        <Filters.Title toggle={setShowPrice}>Precio</Filters.Title>
        <Filters.Group show={showPrice}>
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
        </Filters.Group>

        <Filters.Title toggle={setShowModality}>Modalidad</Filters.Title>
        <Filters.Group show={showModality}>
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
        </Filters.Group>
      </Filters>
      <hr className="h-0.5 bg-gray_300 my-6 lg:hidden" />
      <div className="lg:col-start-2 row-start-1 lg:row-start-auto mb-4 lg:mb-0">
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
            text-sm mx-0 p-2.5 w-full z-10 rounded-lg bg-white border-dark border-2 border-opacity-35 text-dark focus:outline-none lg:mb-10 lg:text-base
          ${s.input}`}
        />
      </div>
      <div className="grid gap-4 grid-cols-market lg:col-start-2">
        {splitCourses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>

      {!showAllCourses && courses.length > firstShowed && (
        <button
          className="w-full text-gray_25 font-medium text-lg flex justify-center py-1.5 gap-x-2 rounded-lg mt-6 mb-12 lg:col-start-2"
          style={{ backgroundColor: "var(--main-color)" }}
          onClick={() => setShowAllCourses(true)}
        >
          Todos los cursos
          <Arrow />
        </button>
      )}
    </>
  );
};

export default Test;

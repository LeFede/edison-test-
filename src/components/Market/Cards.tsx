import Arrow from "./Arrow.svg";
import s from "./Market.module.css";
import { useState } from "react";
import Card from "../Card/Card";
import type { Course } from "../../env.d";

interface Props {
  courses: Course[];
  firstShowed: number;
}

const Cards: React.FC<Props> = ({ courses, firstShowed }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);

  const splitCourses = [...courses].splice(
    0,
    showAllCourses ? courses.length : firstShowed,
  );

  return (
    <>
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
          id={"market-input"}
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

export default Cards;

import { useEffect } from "react";
import type { Course } from "../../env.d";
import Card from "../Card/Card";

interface Props {
  courses: Course[];
}

const Market: React.FC<Props> = ({ courses }) => {
  useEffect(() => {
    const element = document.getElementById("marketSkeleton");
    if (element) {
      // element.remove();
      // Establecer las propiedades de estilo
      element.style.visibility = "hidden";
      element.style.zIndex = "-99";
    }
  }, []); // El efecto se ejecuta una vez cuando el componente se monta

  return (
    <section
      className="px-4 m-auto 
      md:max-w-screen-lg
      lg:px-0 lg:grid lg:grid-cols-[100px_auto]
    "
    >
      <aside className="row-span-full col-span-1 col-start-1">
        <p>Hola</p>
      </aside>
      <div className="col-start-2">
        <label htmlFor="market-input" className="text-4xl font-semibold">
          Todos los cursos
        </label>
        <p className="text-xl">
          Explora todos nuestros cursos, liderados por los principales expertos
          de cada industria.
        </p>
        <input id="market-input" type="text" className="border p-2" />
      </div>
      <div className="grid gap-4 grid-cols-market col-start-2">
        {courses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Market;

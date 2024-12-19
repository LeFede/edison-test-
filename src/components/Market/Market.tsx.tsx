import type { Course } from "../../env.d";
import Card from "../Card/Card";

interface Props {
  courses: Course[];
}

const Market: React.FC<Props> = ({ courses }) => {
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
        <p className="text-4xl font-semibold">Todos los cursos</p>
        <p className="text-xl">
          Explora todos nuestros cursos, liderados por los principales expertos
          de cada industria.
        </p>
        <input type="text" />
      </div>
      <div className="grid gap-4 grid-cols-market col-start-2">
        {courses.map((course) => (
          <Card course={course} />
        ))}
      </div>
    </section>
  );
};

export default Market;

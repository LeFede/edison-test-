import Arrow from "./Arrow.svg";
import s from "./Market.module.css";
import { useEffect } from "react";
import { animateScroll as scroll, Events, scrollSpy } from "react-scroll";
import Card from "../Card/Card";
import type { Course } from "../../env.d";
import { Filter, updateQuery } from "@volpe/utils";
import { useStore } from "@nanostores/react";
import {
  isScrolling,
  searchBar,
  selectedCategories,
  selectedDuration,
  selectedModality,
  selectedPrice,
  showAllCourses,
} from "../../store";
import { useUrlInputAtom, useUrlInputAtomDebounce } from "@volpe/react-utils";
import X from "../Svgs/X";
import { scrollToMarket } from "../../utils/scrollToMarket";

interface Props {
  courses: Course[];
  firstShowed: number;
}

const Cards: React.FC<Props> = ({ courses, firstShowed }) => {
  const [$searchBar, onChange] = useUrlInputAtom(searchBar, "search");

  const $showAllCourses = useStore(showAllCourses);

  const splitCourses = $showAllCourses
    ? courses
    : [...courses].splice(0, firstShowed);

  const $selectedCategories = useStore(selectedCategories);
  const $selectedDuration = useStore(selectedDuration);
  const $selectedModality = useStore(selectedModality);
  const $selectedPrice = useStore(selectedPrice);

  let filteredCourses = Filter.from(splitCourses)
    .filterByCheck($selectedCategories, ["category", "value"])
    .disjunction()
    .filterByString($searchBar, ["name"])
    .filterByObject({ users: { user: { name: $searchBar } } })
    .filterByString($searchBar, ["category", "value"])
    .filterByString($searchBar, ["generalLearningOutcome"])
    .union()
    .wrap();

  // @ts-ignore
  const _1clase = $selectedDuration.includes("1-clase");
  // @ts-ignore
  const _2_4clase = $selectedDuration.includes("2-a-4-clases");
  // @ts-ignore
  const _4clase = $selectedDuration.includes("mas-de-4-clases");

  // @ts-ignore
  const en_vivo = $selectedModality.includes("en-vivo");
  // @ts-ignore
  const grabados = $selectedModality.includes("grabados");
  const _0a75 = $selectedPrice.includes("0-75");
  const _75a120 = $selectedPrice.includes("75-120");
  const _120a175 = $selectedPrice.includes("120-175");
  const _mas175 = $selectedPrice.includes("mas-de-175");

  filteredCourses = filteredCourses.filter((course) => {
    if (!_1clase && !_2_4clase && !_4clase) return true;
    const len = course.events.length;

    // @ts-ignore
    return (
      (_1clase && len == 1) ||
      (_2_4clase && len >= 2 && len <= 4) ||
      (_4clase && len > 4)
    );
  });

  filteredCourses = filteredCourses.filter((e) => {
    if (!en_vivo && !grabados) return e;
    return (
      // @ts-ignore
      (en_vivo && e.config.isAsync == false) ||
      // @ts-ignore
      (grabados && e.config.isAsync == true)
    );
  });

  filteredCourses = filteredCourses.filter((e) => {
    if (!_0a75 && !_75a120 && !_120a175 && !_mas175) return true;
    const usd = e.prices.find((e) => e.currency == "USD")?.value;
    if (!usd) return true;
    return (
      (_0a75 && usd <= 75) ||
      (_75a120 && usd > 75 && usd <= 120) ||
      (_120a175 && usd > 120 && usd <= 175) ||
      (_mas175 && usd > 175)
    );
  });

  useEffect(() => {
    if ($searchBar.length > 0) showAllCourses.set(true);

    Events.scrollEvent.register("begin", () => {
      isScrolling.set(true);
    });

    Events.scrollEvent.register("end", () => {
      isScrolling.set(false);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, [$searchBar]);

  return (
    <>
      <div className="lg:col-start-2 row-start-1 lg:row-start-auto mb-4 lg:mb-0 z-20 sticky top-16 lg:-top-0">
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
        <div className="relative">
          <input
            name="test1"
            id={"market-input"}
            onChange={(e) => {
              onChange(e);
              showAllCourses.set(true);
              scrollToMarket();
            }}
            value={$searchBar}
            type="text"
            autoComplete="off"
            placeholder="Busca tu curso..."
            className={`
            text-sm mx-0 p-2.5 w-full z-10 rounded-lg bg-white border-dark border-2 border-opacity-35 text-dark focus:outline-none lg:text-base 
          ${s.input}`}
          />
          {$searchBar.length > 0 && (
            <X
              // className="absolute right-0 cursor-pointer px-4 py-2.5 text-gray_500 hover:text-gray_900"
              className="absolute right-4 top-2 w-4 cursor-pointer"
              onClick={() => {
                searchBar.set("");
                updateQuery("search", "");
              }}
            ></X>
          )}
        </div>
      </div>
      <div
        className="grid gap-4 grid-cols-market lg:col-start-2 lg:mt-10 lg:min-h-[620px] auto-rows-min relative
        "
      >
        {courses.length == 0 ? (
          <>
            <div className="col-span-3 place-items-center  w-full">
              <img src={"/astronaut/luna.webp"} className="min-h-10" />

              <p className="mt-10">Aún no hay cursos disponibles 🚀🌙</p>
            </div>
          </>
        ) : (
          filteredCourses.length == 0 && (
            <>
              <div className="col-span-3 place-items-center  w-full">
                <img src={"/astronaut/astronaut.webp"} className="min-h-10" />
                <p className="mt-10">
                  No encontramos cursos con esos filtros 😢🪐🚀
                </p>
              </div>
            </>
          )
        )}
        {filteredCourses.map((course) => (
          <Card key={course.id} course={course} />
        ))}
      </div>

      {!$showAllCourses && courses.length > firstShowed && (
        <button
          name="test2"
          className="w-full text-gray_25 font-medium text-lg flex justify-center py-1.5 gap-x-2 rounded-lg mt-6 mb-12 lg:col-start-2"
          style={{ backgroundColor: "var(--main-color)" }}
          onClick={() => showAllCourses.set(true)}
        >
          Todos los cursos
          <Arrow />
        </button>
      )}
    </>
  );
};

export default Cards;

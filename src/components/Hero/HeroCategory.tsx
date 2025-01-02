import { selectedCategories, showAllCourses } from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";
import { animateScroll as scroll } from "react-scroll";
import { scrollToMarket } from "../../utils/scrollToMarket";

export const HeroCategory = ({ name }: { name: string }) => {
  const [$selectedCategories, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedCategories,
    "categorias",
  );
  const scrollToElement = () => {
    scrollToMarket();

    showAllCourses.set(true);
  };
  return (
    <li onClick={scrollToElement}>
      <input
        type="checkbox"
        name={name}
        checked={$selectedCategories.includes(name)}
        onChange={handleCheckboxChange}
        className="hidden"
        id={name}
      />

      <label
        htmlFor={name}
        className="p-4 rounded-full bg-darkviolet text-nowrap border border-lightopacity font-bold hover:drop-shadow-light transition-all cursor-pointer block"
      >
        {name.toUpperCase()}
      </label>
    </li>
  );
};

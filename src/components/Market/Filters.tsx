import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  isScrolling,
  selectedCategories,
  selectedDuration,
  selectedModality,
  showAllCourses,
} from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";
import { animateScroll } from "react-scroll";
import Arrow from "../Svgs/Arrow.tsx";

interface AnyChildren {
  children: React.ReactNode;
}

interface TitleProps extends AnyChildren {
  toggle: (value: boolean) => void;
  storeLength: number;
  state: boolean;
}

interface GroupProps extends AnyChildren {
  show: boolean;
}

interface CategoryProps {
  value: string;
  amount: number;
}

interface FiltersComponent extends React.FC<AnyChildren> {
  Title: React.FC<TitleProps>;
  Group: React.FC<GroupProps>;
  Category: React.FC<CategoryProps>;
}

const Filters: FiltersComponent = ({ children }) => {
  return (
    <aside
      className="gap-x-1 lg:col-span-1 lg:col-start-1 lg:row-span-5 sticky top-14 grid grid-cols-4 xs:gap-x-3 gap-y-2 
      grid-flow-dense select-none
      z-10 lg:block lg:h-min
        "
    >
      {children}
    </aside>
  );
};

const Title: React.FC<TitleProps> = ({
  children,
  toggle,
  storeLength,
  state,
}) => {
  return (
    <p
      onClick={() => toggle(!state)}
      className={`
text-xs sm:text-sm lg:text-base border border-gray_400 flex justify-center text-center  py-2 rounded-lg
      lg:border-l-transparent lg:border-r-transparent lg:border-t-transparent lg:flex lg:p-0 lg:rounded-none 
      lg:font-medium lg:text-gray_500 lg:border-gray_500 lg:border-b lg:border-opacity-35 lg:hover:text-gray_900 hover:cursor-pointer lg:hover:border-opacity-100 lg:text-left lg:mb-2 overflow-hidden lg:bg-transparent lg:mx-4  ${state ? "bg-[var(--main-color)] text-gray_25" : storeLength > 0 ? "bg-[var(--main-transparent)]" : "bg-gray_25"}`}
    >
      {children}{" "}
      {storeLength > 0 && (
        <>
          <span className="hidden lg:inline ml-1">({storeLength})</span>
        </>
      )}
      <Arrow
        className="transition-transform ml-auto hidden lg:inline-block w-3.5"
        style={{
          transform: state ? "rotate(270deg)" : "rotate(90deg)",
        }}
        fill={"#6b7280"}
      ></Arrow>
    </p>
  );
};

const Group: React.FC<GroupProps> = ({ children, show }) => {
  if (!show) return <></>;
  return (
    <div
      className="flex gap-3 border border-gray_900 bg-gray_100 rounded-lg p-4 col-span-4
          flex-row flex-wrap text-sm
          lg:flex-col lg:relative lg:border-none lg:rounded-none lg:p-0 lg:gap-2 lg:flex-nowrap lg:bg-transparent lg:mb-6 
          "
    >
      {children}
    </div>
  );
};

const Category: React.FC<CategoryProps> = ({ value, amount }) => {
  const [$selectedCategories, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedCategories,
    "categorias",
  );
  const isSelected = $selectedCategories.includes(value);
  const selectedStyles = { background: "var(--main-color)" };
  return (
    <div
      className={`text-wrap line-clamp-1 text-sm cursor-pointer bg-gray_25
        border rounded-lg border-gray_900
        lg:border-none lg:bg-transparent lg:font-medium ${isSelected && "text-gray_25 flex"}
      `}
      style={isSelected ? selectedStyles : {}}
      title={value}
    >
      <label
        className="cursor-pointer flex w-full px-2.5 py-1 lg:px-4 lg:py-1 hover:bg-[var(--main-transparent)] 
      "
        style={isSelected ? selectedStyles : {}}
        title={value}
      >
        <span className="lg:line-clamp-1 lg:max-w-32">{value}</span>
        <span
          className={`hidden lg:inline ml-1 ${!isSelected && "text-gray_500"}`}
        >
          ({amount})
        </span>
        {isSelected && (
          <span className="hidden lg:inline ml-auto font-normal">x</span>
        )}
        <input
          type="checkbox"
          name={value}
          checked={$selectedCategories.includes(value)}
          onChange={(e) => {
            handleCheckboxChange(e);
            showAllCourses.set(true);

            const isMobile = window.innerWidth < 1024;
            if (isScrolling.get()) return;
            animateScroll.scrollTo(isMobile ? 300 : 380, {
              duration: 200,
              smooth: false,
            });
          }}
          hidden
        />
      </label>
    </div>
  );
};

Filters.Title = Title;
Filters.Group = Group;
Filters.Category = Category;

export default Filters;

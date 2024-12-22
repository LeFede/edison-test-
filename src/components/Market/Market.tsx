import { useEffect, useState } from "react";
import type { Category, Course } from "../../env.d";
import Filters from "./Filters";
import CategoryCriteria from "./CategoryCriteria";
import DurationCriteria from "./DurationCriteria";
import PriceCriteria from "./PriceCriteria";
import ModalityCriteria from "./ModalityCriteria";
import Cards from "./Cards";
import { updateQuery } from "@volpe/utils";
import {
  selectedCategories,
  selectedDuration,
  selectedModality,
  selectedPrice,
} from "../../store";

interface Props {
  courses: Course[];
  firstShowed: number;
  categories: Category[];
}

const Market: React.FC<Props> = ({ courses, firstShowed = 9, categories }) => {
  useEffect(() => {
    const element = document.getElementById("marketSkeleton");
    if (element) {
      element.style.visibility = "hidden";
      // element.style.opacity = "0.5";
      element.style.zIndex = "-999";
    }
  }, []);

  const resetCategories = () => {
    selectedCategories.set([]);
    selectedDuration.set([]);
    selectedPrice.set([]);
    selectedModality.set([]);
    updateQuery("categorias", "");
    updateQuery("duracion", "");
    updateQuery("modalidad", "");
    updateQuery("precio", "");
  };

  return (
    <>
      <Filters>
        <p
          className="font-medium mb-4 cursor-pointer hidden lg:block lg:px-4 text-nowrap"
          onClick={resetCategories}
        >
          Todos los cursos
        </p>

        <CategoryCriteria categories={categories} courses={courses} />
        <DurationCriteria />
        <PriceCriteria />
        <ModalityCriteria />
      </Filters>
      <hr className="h-0.5 bg-gray_300 my-6 lg:hidden" />
      <Cards firstShowed={firstShowed} courses={courses} />
    </>
  );
};

export default Market;

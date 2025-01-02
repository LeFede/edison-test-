import { useState } from "react";
import Filters from "./Filters";
import type { Category, Course } from "../../env.d";
import {
  selectedCategories,
  showCategories,
  showDuration,
  showModality,
  showPrice,
} from "../../store";
import { useStore } from "@nanostores/react";

interface Props {
  categories: Category[];
  courses: Course[];
}

export function countCoursesByCategory(
  courses: Course[],
): Record<string, number> {
  return courses.reduce(
    (acc, course) => {
      const category = course.category.value;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
}

const CategoryCriteria: React.FC<Props> = ({ categories, courses }) => {
  const countedCategories = countCoursesByCategory(courses);
  const $showCategories = useStore(showCategories);
  const $selectedCategories = useStore(selectedCategories);

  return (
    <>
      <Filters.Title
        toggle={(e) => {
          showDuration.set(false);
          showModality.set(false);
          showPrice.set(false);
          showCategories.set(e);
        }}
        state={$showCategories}
        storeLength={$selectedCategories.length}
      >
        Categoría<span className="hidden lg:inline">s</span>
      </Filters.Title>
      <Filters.Group show={$showCategories}>
        {categories.length == 0 && <p className="px-4">No hay categorías</p>}
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
    </>
  );
};

export default CategoryCriteria;

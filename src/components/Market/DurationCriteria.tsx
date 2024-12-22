import { useState } from "react";
import Filters from "./Filters";

import {
  selectedCategories,
  selectedDuration,
  selectedModality,
  showAllCourses,
  showCategories,
  showDuration,
  showModality,
  showPrice,
} from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";
import { useStore } from "@nanostores/react";

interface Props {}

const DurationCriteria: React.FC<Props> = () => {
  const [$selectedDuration, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedDuration,
    "duracion",
  );
  const sel1 = $selectedDuration.includes("1-clase");
  const sel2 = $selectedDuration.includes("2-a-4-clases");
  const sel3 = $selectedDuration.includes("mas-de-4-clases");
  const $showDuration = useStore(showDuration);
  return (
    <>
      <Filters.Title
        toggle={(e) => {
          showDuration.set(e);
          showModality.set(false);
          showPrice.set(false);
          showCategories.set(false);
        }}
        state={$showDuration}
        storeLength={$selectedDuration.length}
      >
        Duración
      </Filters.Title>
      <Filters.Group show={$showDuration}>
        <label className="px-4 hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1">
          <input
            type="checkbox"
            className="mr-2 pointer-events-none"
            checked={sel1}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
            }}
            name="1-clase"
          />
          1 clase
        </label>

        <label className="px-4 hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel2}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
            }}
            name="2-a-4-clases"
          />
          2 a 4 clases
        </label>

        <label className="px-4 hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel3}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
            }}
            name="mas-de-4-clases"
          />
          +4 clases
        </label>
      </Filters.Group>
    </>
  );
};

export default DurationCriteria;

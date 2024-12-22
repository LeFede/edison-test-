import { useState } from "react";
import Filters from "./Filters";

import {
  selectedCategories,
  selectedDuration,
  selectedModality,
  showAllCourses,
} from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";

interface Props {}

const DurationCriteria: React.FC<Props> = () => {
  const [$selectedDuration, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedDuration,
    "duracion",
  );
  const sel1 = $selectedDuration.includes("1-clase");
  const sel2 = $selectedDuration.includes("2-a-4-clases");
  const sel3 = $selectedDuration.includes("mas-de-4-clases");
  const [show, setShow] = useState(false);
  return (
    <>
      <Filters.Title toggle={setShow} storeLength={$selectedDuration.length}>
        Duración
      </Filters.Title>
      <Filters.Group show={show}>
        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
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

        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
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

        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
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

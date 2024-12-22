import { useState } from "react";
import Filters from "./Filters";

import { selectedModality, showAllCourses } from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";

interface Props {}

const ModalityCriteria: React.FC<Props> = () => {
  const [$selectedModality, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedModality,
    "modalidad",
  );
  const [show, setShow] = useState(false);
  const sel1 = $selectedModality.includes("en-vivo");
  const sel2 = $selectedModality.includes("grabados");
  return (
    <>
      <Filters.Title toggle={setShow} storeLength={$selectedModality.length}>
        Modalidad
      </Filters.Title>
      <Filters.Group show={show}>
        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel1}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
            }}
            name="en-vivo"
          />
          En vivo
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
            name="grabados"
          />
          Grabados
        </label>
      </Filters.Group>
    </>
  );
};

export default ModalityCriteria;

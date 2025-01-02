import { useState } from "react";
import Filters from "./Filters";

import {
  isScrolling,
  selectedModality,
  showAllCourses,
  showCategories,
  showDuration,
  showModality,
  showPrice,
} from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";
import { useStore } from "@nanostores/react";
import { animateScroll } from "react-scroll";
import { scrollToMarket } from "../../utils/scrollToMarket";

interface Props {}

const ModalityCriteria: React.FC<Props> = () => {
  const [$selectedModality, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedModality,
    "modalidad",
  );
  const $showModality = useStore(showModality);
  const sel1 = $selectedModality.includes("en-vivo");
  const sel2 = $selectedModality.includes("grabados");
  return (
    <>
      <Filters.Title
        toggle={(e) => {
          showModality.set(e);
          showPrice.set(false);
          showDuration.set(false);
          showCategories.set(false);
        }}
        state={$showModality}
        storeLength={$selectedModality.length}
      >
        Modalidad
      </Filters.Title>
      <Filters.Group show={$showModality}>
        <label className="px-4 lg:hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1 flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel1}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
              scrollToMarket();
            }}
            name="en-vivo"
          />
          En vivo
        </label>

        <label className="px-4 lg:hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1 flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel2}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
              scrollToMarket();
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

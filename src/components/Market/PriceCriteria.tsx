import { useState } from "react";
import Filters from "./Filters";

import {
  isScrolling,
  selectedPrice,
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

const PriceCriteria: React.FC<Props> = () => {
  const [$selectedPrice, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedPrice,
    "precio",
  );
  const $showPrice = useStore(showPrice);
  const sel1 = $selectedPrice.includes("0-75");
  const sel2 = $selectedPrice.includes("75-120");
  const sel3 = $selectedPrice.includes("120-175");
  const sel4 = $selectedPrice.includes("mas-de-175");
  return (
    <>
      <Filters.Title
        toggle={(e) => {
          showPrice.set(e);
          showModality.set(false);
          showDuration.set(false);
          showCategories.set(false);
        }}
        state={$showPrice}
        storeLength={$selectedPrice.length}
      >
        Precio
      </Filters.Title>
      <Filters.Group show={$showPrice}>
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
            name="0-75"
          />
          0 a 75 USD
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
            name="75-120"
          />
          75 a 120 USD
        </label>

        <label className="px-4 lg:hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1 flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel3}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
              scrollToMarket();
            }}
            name="120-175"
          />
          120 a 175 USD
        </label>

        <label className="px-4 lg:hover:bg-[var(--main-transparent)] cursor-pointer rounded-lg lg:py-1 flex items-center">
          <input
            type="checkbox"
            className="mr-2 cursor-pointer"
            checked={sel4}
            onChange={(e) => {
              handleCheckboxChange(e);
              showAllCourses.set(true);
              scrollToMarket();
            }}
            name="mas-de-175"
          />
          +175 USD
        </label>
      </Filters.Group>
    </>
  );
};

export default PriceCriteria;

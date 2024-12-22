import { useState } from "react";
import Filters from "./Filters";

import { selectedPrice } from "../../store";
import { useUrlCheckboxAtom } from "@volpe/react-utils";

interface Props { }

const PriceCriteria: React.FC<Props> = () => {
  const [$selectedPrice, handleCheckboxChange] = useUrlCheckboxAtom(
    selectedPrice,
    "precio",
  );
  const [show, setShow] = useState(false);
  const sel1 = $selectedPrice.includes("0-75");
  const sel2 = $selectedPrice.includes("75-120");
  const sel3 = $selectedPrice.includes("120-175");
  const sel4 = $selectedPrice.includes("mas-de-175");
  return (
    <>
      <Filters.Title toggle={setShow}>Precio</Filters.Title>
      <Filters.Group show={show}>
        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel1}
            onChange={handleCheckboxChange}
            name="0-75"
          />
          0 a 75 USD
        </label>

        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel2}
            onChange={handleCheckboxChange}
            name="75-120"
          />
          75 a 120 USD
        </label>

        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
          <input
            type="checkbox"
            className="mr-2"
            checked={sel3}
            onChange={handleCheckboxChange}
            name="120-175"
          />
          120 a 175 USD
        </label>

        <label className="px-4 hover:bg-gray_100 cursor-pointer rounded-lg">
          <input
            type="checkbox"
            className="mr-2 cursor-pointer"
            checked={sel4}
            onChange={handleCheckboxChange}
            name="mas-de-175"
          />
          +175 USD
        </label>
      </Filters.Group>
    </>
  );
};

export default PriceCriteria;

import React, { useState } from "react";
import { Slider } from "@mui/material";
import NavTitle from "./NavTitle";

function valueText(value) {
  return `$${value}`;
}

const PriceFilter = () => {
  const [value, setValue] = useState([0, 100]);
  const handleOnChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeTheLabel = () => {
    return `$${value[0]} - $${value[1]}`;
  };

  return (
    <div>
      <div className="cursor-pointer">
        <NavTitle title="Filter By Price" icons={false} />
      </div>
      <div className="flex justify-center items-center">
        <Slider
          getAriaLabel={changeTheLabel}
          value={value}
          onChange={handleOnChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          color="hoverColor"
          size="small"
        />
      </div>

      <div className="mt-[5px] text-[var(--grey-color)] font-[14px] flex justify-between items-center">
        <div>Price: {changeTheLabel()}</div>
        <div className="group flex justify-around items-center bg-[var(--violet-color)] py-1 w-[100px] text-white rounded-[50px] hover:cursor-pointer hover:bg-[var(--hover-color)]">
          <div className="">Filter</div>
          <div className="w-[24px] h-[24px] rounded-full text-[12px] bg-white text-black flex items-center justify-center group-hover:bg-[var(--hover-color)] group-hover:text-white">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;

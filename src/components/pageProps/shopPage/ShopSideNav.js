import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import PriceFilter from "./shopBy/PriceFilter";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category icons={false} />
      <PriceFilter />
      <Brand />
      {/* <Price /> */}
    </div>
  );
};

export default ShopSideNav;

import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import instance from "../../../../api/axios.js";
import { dogFoot } from "../../../../assets/images";
import "./category.css";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClickCategory = (category) => () => {
    setSearchParams({ ...searchParams, category });
  };

  const getCategories = async () => {
    const { data } = await instance.get("/category?pageNumber=0&pageSize=20");
    setItems(data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="w-full">
      <NavTitle title="Product Category" icons={false} />
      <hr className="border-[var(--grey-bolder)] border-1 pb-[20px]" />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.length &&
            items.map(({ categoryId, categoryName, icons }) => (
              <li
                onClick={handleClickCategory(categoryId)}
                key={categoryId}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between hover:cursor-pointer hover:text-[var(--hover-color)] duration-300"
              >
                <div>
                  <img src={dogFoot} alt="" />
                </div>
                <div className="text"> {categoryName} </div>
                <div className="review-number">(5)</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;

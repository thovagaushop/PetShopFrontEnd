import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import instance from "../../../../api/axios.js";
import { dogFoot } from "../../../../assets/images";
import "./category.css";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [items, setItems] = useState([]);

  const getCategories = async () => {
    const { data } = await instance.get("/category?pageNumber=0&pageSize=20");
    setItems(data.data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  // const items = [
  //   {
  //     _id: 990,
  //     title: "Beds",
  //   },
  //   {
  //     _id: 991,
  //     title: "Bowls",
  //   },
  //   {
  //     _id: 992,
  //     title: "Clothings",
  //   },
  //   {
  //     _id: 993,
  //     title: "Crates",
  //   },
  //   {
  //     _id: 994,
  //     title: "Flea & Tick",
  //   },
  //   {
  //     _id: 995,
  //     title: "Food",
  //   },
  //   {
  //     _id: 996,
  //     title: "Furniture",
  //   },
  //   {
  //     _id: 997,
  //     title: "Pharmacy",
  //   },
  //   {
  //     _id: 998,
  //     title: "Toys",
  //   },
  //   {
  //     _id: 999,
  //     title: "Treats",
  //   },
  //   {
  //     _id: 9910,
  //     title: "Uncategorized",
  //   },
  // ];
  console.log(items);
  return (
    <div className="w-full">
      <NavTitle title="Product Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.length &&
            items.map(({ categoryId, categoryName, icons }) => (
              <li
                key={categoryId}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between :hover: cursor-pointer :hover: text-red-500]"
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

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";
import { useSearchParams } from "react-router-dom";
import instance from "../../../api/axios";

// const items = paginationItems;
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item.id}
              img={`http://localhost:8080/api/product/images/${item.images[0]}`}
              productName={item.title}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.description}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset},`
    // );
    setItemStart(newOffset);
  };

  const getProducts = async () => {
    const petType = searchParams.get("pet");
    const category = searchParams.get("category");

    if (category) {
      const { data } = await instance.get(`/category/${category}/products`);
      setItems(data.data);
    } else {
      const { data } = await instance.get(`/product`);
      console.log(data.data);
      setItems(data.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-[var(--violet-color)] duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-[var(--hover-color)] text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {items.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;

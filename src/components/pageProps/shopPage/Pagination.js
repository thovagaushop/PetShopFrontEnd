import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { isNil } from "lodash";
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
  const category = searchParams.get("category");
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0,
    previousPage: false,
    lastPage: false,
  });

  // const endOffset = itemOffset + itemsPerPage;
  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    setPagination({ ...pagination, pageNumber: event.selected });
    getProducts(event.selected, itemsPerPage);
  };

  const getProducts = async (pageNumber, pageSize) => {
    setPagination({ ...pagination, pageNumber: pageNumber });
    let fetchAxios =
      !isNil(pageNumber) && !isNil(pageSize)
        ? `/product?pageNumber=${pageNumber}&pageSize=${pageSize}`
        : "/product";
    if (category)
      fetchAxios =
        !isNil(pageNumber) && !isNil(pageSize)
          ? `/category/${category}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
          : `/category/${category}/products`;

    console.log(fetchAxios);
    try {
      const { data } = await instance.get(fetchAxios);
      console.log(data);
      setItems(data.data);
      setPagination({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalElements: data.totalElements,
        totalPages: data.totalPages,
        previousPage: data.previousPage,
        lastPage: data.lastPage,
      });
    } catch (error) {
      setItems([]);
    }
  };

  useEffect(() => {
    getProducts(0, itemsPerPage);
  }, [category]);

  console.log(pagination.pageNumber);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={items} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-center items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          marginPagesDisplayed={0}
          pageCount={pagination.totalPages}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-[var(--violet-color)] duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-[var(--hover-color)] text-white"
        />

        {/* <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
          {items.length}
        </p> */}
      </div>
    </div>
  );
};

export default Pagination;

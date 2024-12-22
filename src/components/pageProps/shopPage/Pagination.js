import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import BaseUrl from "../../../BaseUrl";
import api from "../../../Api";
import { toast } from 'react-hot-toast';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id} className="w-full">
            <Product
              _id={item.id}
              img={`${BaseUrl}/images/${item.image}`}
              productName={item.name}
              price={item.price}
              color={item?.color ? item.color : null}
              badge={item?.badge ? item.badge : null}
              des={item.description}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({brandId, categoryId}) => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);



  useEffect(() => {

    const fetchProducts = async (page) => {
      try {
        const response = await api.read(`/products?page=${page}&bId=${brandId}&cId=${categoryId}`);
        if (response) {
          setProducts(response.data);
          setPageCount(response.last_page);
          setTotalItems(response.total);
        } else {
          toast.error("Failed to fetch products.");
        }
      } catch (error) {
        toast.error("Error fetching products: " + error.message);
      }
    };

    fetchProducts(1); // Fetch the first page on component mount
  }, [brandId, categoryId]);

  const handlePageClick = (event) => {
    const fetchProducts = async (page) => {
      try {
        const response = await api.read(`/products?page=${page}&bId=${brandId}&cId=${categoryId}`);
        if (response) {
          setProducts(response.data);
          setPageCount(response.last_page);
          setTotalItems(response.total);
        } else {
          toast.error("Failed to fetch products.");
        }
      } catch (error) {
        toast.error("Error fetching products: " + error.message);
      }
    };
    const selectedPage = event.selected + 1;
    fetchProducts(selectedPage);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={products} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel="Next"
          previousLabel="Previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName=""
          containerClassName="flex text-base flex items-center font-semibold font-titleFont gap-4 py-10"
          activeClassName="bg-black text-white"
        />
        <p className="text-base font-normal text-lightText">
          Showing {products.length} of {totalItems} products
        </p>
      </div>
    </div>
  );
};

export default Pagination;

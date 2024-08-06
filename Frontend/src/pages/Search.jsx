import React, { useContext, useCallback, useState, useEffect } from "react";
import { ProductContext } from "../Components/Context/ProductContext";
import SearchResult from "../Components/SearchPage/SearchResult.jsx";
import SearchFilter from "../Components/SearchPage/SearchFilter.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { AuthContext } from "../Components/Context/AuthContext.jsx";
const Search = () => {
  const [sortOption, showSortOption] = useState(false);
  const [filtersOption, showFiltersOption] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleSortOption = useCallback(() => {
    showSortOption(!sortOption);
    showFiltersOption(false);
  }, [sortOption]);

  const toggleFilterOption = useCallback(() => {
    showFiltersOption(!filtersOption);
    showSortOption(false);
  }, [filtersOption]);

  const { searchTerm } = useContext(ProductContext);

  const [products, setProducts] = useState([]);
  const { userDetails } = useContext(AuthContext);

  const getAllProducts = async (productKeyword, productCategory) => {
    if (userDetails) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getAllProducts`,
          {
            userId: userDetails._id,
          }
        );

        if (response.data.success) {
          setProducts(response.data.dataOfP);

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const onProductUpdate = (productId, updatedFields) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, ...updatedFields } : product
      )
    );
  };
  return (
    <div className="p-1 bg-slate-200 flex w-screen h-full gap-2 sm:flex-row flex-col dark:bg-[#121212] overflow-x-hidden">
      <SearchFilter
        isSortOption={sortOption}
        toggleSortOption={toggleSortOption}
        filtersOption={filtersOption}
        toggleFilterOption={toggleFilterOption}
      />
      <div className="dark:border-gray-600 h-full border-4 shadow-xl dark:bg-slate-800 p-4 gap-5 flex flex-col flex-grow">
        <div
          className={`flex justify-start bg-white w-full dark:border-gray-600 h-full dark:bg-slate-800 ${
            sortOption ? "flex" : "hidden sm:flex"
          }`}
        >
          <div className="w-full dark:bg-slate-800 px-3 py-1 rounded-md">
            <span className="sm:text-2xl text-xl font-bold">
              Showing Results for "{searchTerm}"
            </span>
            <div className="flex gap-4 font-semibold mt-2 flex-col sm:flex-row w-full">
              <span className="font-semibold sm:font-medium text-xl sm:text-base">
                Sort By
              </span>
              <div className="sm:flex flex-col sm:flex-row gap-4 flex justify-center sm:m-0 -ml-10 items-center">
                <button className="hover:text-blue-600 sm:active:border-b-2 border-blue-600">
                  Relevance
                </button>
                <button className="sm:active:border-b-2 border-blue-600 hover:text-blue-600">
                  Popularity
                </button>
                <button className="sm:active:border-b-2 border-blue-600 hover:text-blue-600">
                  Price- Low to High
                </button>
                <button className="sm:active:border-b-2 border-blue-600 hover:text-blue-600">
                  Price- High to Low
                </button>
                <button className="sm:active:border-b-2 border-blue-600 hover:text-blue-600">
                  Newest First
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow ">
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, index) => (
                <SearchResult key={index} loading={true} />
              ))}
            </div>
          ) : (
            products.map((product) => (
              <SearchResult
              
                key={product._id}
                productid={product._id}
                productName={product.name}
                productDesc={product.description}
                productPrice={product.price}
                productBrand={product.brand}
                productStock={product.stock}
                productRatings={product.ratings}
                productNumReviews={product.numReviews}
                productImage={product.images}
                productDiscount={product.discount}
                loading={false}
                hasLiked={product.hasLiked}
                hasAddedToCart={product.hasAddedToCart}
                onProductUpdate={onProductUpdate}
              />
            ))
          )}
          {/* <SearchResult /> */}
        </div>
      </div>
    </div>
  );
};

export default Search;

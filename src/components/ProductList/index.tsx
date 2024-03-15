"use client";
import { useEffect, useState } from "react";
import { Product } from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa6";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  fetchProducts,
  selectFilteredProducts,
} from "@/redux/slices/productSlice";
import CategoryFilter from "../Filter/categoryFilter";
import PriceRangeFilter from "../Filter/priceFilter";
import RatingsFilter from "../Filter/ratingFilter";
import renderStarRating from "../Filter/getRatings";
import Loader from "../Loader";
import Link from "next/link";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const loading = useSelector((state: any) => state?.product?.loading);

  const [filtersProduct, setFiltersProduct] = useState(products);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    ratings: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setFiltersProduct(products);
  }, [products]);

  const handleFilterChange = (filterType: any, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  // Fetch Products
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Filter Product
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Add To Cart 
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 4000);
  };

  const applyFilters = () => {
    let filteredProducts = products.filter((product: any) => {
      let passCategory = true;
      let passPriceRange = true;
      let passRatings = true;

      if (filters.category && product?.category !== filters.category) {
        passCategory = false;
      }

      if (filters.priceRange && product?.price > parseInt(filters.priceRange)) {
        passPriceRange = false;
      }

      if (
        filters.ratings &&
        product?.rating?.rate < parseInt(filters.ratings)
      ) {
        passRatings = false;
      }

      return passCategory && passPriceRange && passRatings;
    });

    setFiltersProduct(filteredProducts);
  };

  return (
    <div>
      {loading ? <Loader /> : (
        <div className="flex flex-col md:flex-row">

          {/* Filters Block */}
          <div className="w-full md:w-1/5">
            <div className="p-3 sticky top-0 bg-[#e4e4e4] md:h-screen flex flex-col gap">
              <CategoryFilter handleFilterChange={handleFilterChange} />
              <PriceRangeFilter handleFilterChange={handleFilterChange} />
              <RatingsFilter handleFilterChange={handleFilterChange} />
            </div>
          </div>

          <div className="w-full md:w-4/5">
            <div className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                  {filtersProduct && filtersProduct?.length > 0 ? (
                    filtersProduct.map((product: Product) => (
                      <a className="group" key={product?.id}>
                        <div className="h-[350px]">
                          <img
                            src={product?.image}
                            alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                            className="h-full mx-auto object-cover object-center group-hover:opacity-75"
                          />
                        </div>
                        <h3 className="mt-4 text-sm min-h-[40px] text-gray-700">
                          {product?.title}
                        </h3>
                        <div className="flex justify-between">
                          <div>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                              ${product?.price}
                            </p>
                            <div>{renderStarRating(product?.rating?.rate)}</div>
                          </div>
                          <button
                            type="button"
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => handleAddToCart(product)}
                          >
                            <FaCartPlus />
                          </button>
                        </div>
                      </a>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-0 left-0 w-full bg-green-500 py-2 text-white text-center">
          Product added to cart successfully! &nbsp;<Link href={"/cart"} className="underline">Go to Cart Page & Check Details Of Your Items</Link>
        </div>
      )}
    </div>
  );
};

export default ProductList;

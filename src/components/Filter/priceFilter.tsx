import React from "react";

const PriceRangeFilter = ({ handleFilterChange }: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="priceRange" className="text-gray-700 mb-2">
        Filter by Price:
      </label>
      <div className="relative">
        <select
          id="priceRange"
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          className="block w-full py-2 pl-3 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="">All Prices</option>
          <option value="50">Below $50</option>
          <option value="100">Below $100</option>
          <option value="150">Below $150</option>
          <option value="200">Below $200</option>
          <option value="300">Below $300</option>
          <option value="1000">Below $1000</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none text-gray-700">
          <svg
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9 11l4-4-4-4V0H1v16h8v-1H3V1h6z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;

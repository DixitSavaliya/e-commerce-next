import React from 'react';

const RatingsFilter = ({ handleFilterChange }: any) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="ratings" className="text-gray-700 mb-2">Filter by Ratings:</label>
      <div className="relative">
        <select
          id="ratings"
          onChange={(e) => handleFilterChange('ratings', e.target.value)}
          className="block w-full py-2 pl-3 pr-8 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        >
          <option value="">All Ratings</option>
          <option value="1">1 Star or above</option>
          <option value="2">2 Star or above</option>
          <option value="3">3 Star or above</option>
          <option value="4">4 Star or above</option>
          <option value="5">5 Star or above</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none text-gray-700">
          <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9 11l4-4-4-4V0H1v16h8v-1H3V1h6z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RatingsFilter;
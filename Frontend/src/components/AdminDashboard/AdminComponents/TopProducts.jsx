import React, { useEffect, useState } from "react";

function TopProducts() {
  const products = [
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product A",
      unitsSold: 500,
      totalRevenue: 15000,
      percentOfTotalSales: 25,
      stockStatus: "In Stock",
      averageRating: 4.5,
      reviews: 200,
    },
    {
      id: 2,
      image: "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Product B",
      unitsSold: 450,
      totalRevenue: 12000,
      percentOfTotalSales: 20,
      stockStatus: "Low Stock",
      averageRating: 4.2,
      reviews: 150,
    },
  ];
  return (
    <div className="bg-white px-4 py-2 rounded-md">
      <div className="flex flex-col gap-2">
        <span className="font-bold">Top Selling Products</span>
        <div className="mt-2 flex justify-between">
          <div>
            <span>Entries</span>
            <select className="focus:outline-none">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          <input type="text" placeholder="Search Product..." className="focus:outline-none md:w-[50%] border-b" />
        </div>
        <div className="overflow-x-auto h-[80vh]">
          <table className="min-w-full bg-white  mt-2">
            <thead className="sticky top-0">
              <tr className="bg-white ">
               
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Product Image
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Units Sold
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  % of Total Sales
                </th>
               
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Stock Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Average Rating
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                  Reviews
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={` ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  } hover:bg-blue-50`}
                >
                 
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.unitsSold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${product.totalRevenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.percentOfTotalSales}%
                  </td>
                  
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      product.stockStatus === "In Stock"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {product.stockStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.averageRating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.reviews}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;

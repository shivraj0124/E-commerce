import React, { useEffect } from "react";
import adminHook from "../../Context/AdminContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function Product() {
  const { setSidebarLocation } = adminHook();
  useEffect(() => {
    setSidebarLocation("Products");
  }, []);
  const products = [
    {
      id: 1,
      images:
        "https://t4.ftcdn.net/jpg/03/28/37/93/360_F_328379347_xEKgEB2wkjAJmcqSTmrg4uKxfWrlL7D9.jpg",
      name: "Boat Rockers900",
      description: "Best Headphones in this budget range",
      price: 15000,
      category: 25,
      brand: "Boat",
      stock: 250,
      discount: 200,
      ratings: 4.5,
      numReviews: 124,
      likes: 512,
    },
  ];
  return (
    <div className=" p-4">
      <div className="bg-white px-4 py-2 rounded-md">
        <div className="flex flex-col gap-2">
          <span className="font-bold">All Products</span>
          <div className="mt-2 flex justify-between">
            <div className="flex items-center gap-2 justify-between w-[100%]">
              <div>
                <span>Entries</span>
                <select className="focus:outline-none">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Search Product..."
                className="focus:outline-none md:w-[50%] border-b"
              />
            </div>
            <div className="w-[100%] flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-500 rounded-md font-semibold text-white px-4 py-2">
                Add Product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto max-h-[80vh]">
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
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Category
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Ratings
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Total Reviews
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Total Likes
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={` ${
                      index % 2 === 0 ? "bg-white" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.images}
                        alt={product.name}
                        className="h-10 w-10 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.brand}
                    </td>

                    <td className={`px-6 py-4 whitespace-nowrap text-sm `}>
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.discount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.ratings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.numReviews}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.likes}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex gap-2">
                      <FaEdit size={20} color="#16a34a" className="cursor-pointer" title="Edit" />
                      <MdDelete  size={20} color="red" className="cursor-pointer" title="Delete" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getCategories, getHeaderData, getReviews } from "../../apis/ApiCalls";
import Icon from "../Icon";

export default function Header() {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const about = await getHeaderData();
      const reviews = await getReviews();
      console.log("ooo", reviews?.data);

      setAboutData(about?.data?.data);
      toast.success("Fetched data successfully");
      console.log(categories.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="w-full">
      {/* Top navigation bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
          <div className="flex space-x-6 text-sm">
            <>
              {aboutData.map((item, index) => (
                <a
                  key={item?.pageId?._id || index}
                  href={item?.pageId?.pg_url_key}
                  className="hover:text-blue-600"
                >
                  {item?.headerName}
                </a>
              ))}
            </>
          </div>
          <div className="text-sm">
            Call Us: 024 7637 5531 | Mon-Friday 9am - 5pm | Saturday 10:00am -
            4:00pm | Sunday Closed
          </div>
          <div className="text-sm">
            <a href="#" className="hover:text-blue-600">
              Sign In / Register
            </a>
          </div>
        </div>
      </div>

      {/* Logo and search bar */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="mr-8">
              <img
                src="/logo.png"
                alt="The Natural Stone & Tile Co"
                className="h-14"
              />
            </a>
          </div>

          <div className="text-red-600 font-medium">
            Welcome to "The Natural Stone & Tile Co" - Save upto 50% on all
            tiles
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search in..."
                className="w-full border border-green-600 rounded px-3 py-2"
              />
              <button className="absolute right-0 top-0 h-full bg-green-600 text-white px-3 rounded-r">
                <Icon icon="pi-search" />
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                <Icon icon="pi-heart" />
                <span className="text-xs mt-1">Wishlist</span>
              </a>

              <a
                href="#"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                <Icon icon="pi-shopping-bag" />
                <span className="text-xs mt-1">Compare</span>
              </a>

              <a
                href="#"
                className="flex flex-col items-center text-white bg-green-500 px-4 py-2 rounded"
              >
                <div className="relative">
                  <Icon icon="shopping-cart" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </div>
                <span className="text-xs mt-1">Cart</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-gray-800 text-white">
        {/* make the menus horizontal scrollable */}
        <div className="container mx-auto w-full overflow-x-auto whitespace-nowrap hide-scrollbar">
          <ul className="flex">
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">WALL</li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              FLOOR
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              BATHROOM <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              PORCELAIN <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              WOOD EFFECT <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              OUTDOOR <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              ACCESSORIES <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 bg-red-600 hover:bg-red-700 cursor-pointer">
              CLEARANCE
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              REAL IMAGES
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              CONTACT US
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              OUTDOOR <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center">
              ACCESSORIES <Icon icon="angle-down" />
            </li>
            <li className="px-4 py-3 bg-red-600 hover:bg-red-700 cursor-pointer">
              CLEARANCE
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              REAL IMAGES
            </li>
            <li className="px-4 py-3 hover:bg-gray-700 cursor-pointer">
              CONTACT US
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

import React, { useEffect, useState } from "react";

import { getCategories, getHeaderData } from "../../apis/ApiCalls";
import Icon from "../Icon";
import useAppContext from "../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import SideModal from "./SideModal";
import { Link } from "react-router-dom";

export default function Header() {
  const { userState, dispatch } = useAppContext();

  const [aboutData, setAboutData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const about = await getHeaderData();

      setAboutData(about?.data?.data);
      dispatch({
        type: "HEADER_DATA",
        data: about?.data?.data
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="w-full">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-300">
        <div className="container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
          <div className="hidden md:flex space-x-6 text-sm">
            <>
              {aboutData.map((item, index) => (
                <Link
                  key={item?.pageId?._id || index}
                  to={item?.pageId?.pg_url_key}
                  className="hover:text-blue-600"
                >
                  {item?.headerName}
                </Link>
              ))}
            </>
          </div>
          <div className="text-sm font-bold text-center">
            Call Us: 024 7637 5531 | Mon-Friday 9am - 5pm | Saturday 10:00am -
            4:00pm | Sunday Closed
          </div>
          <div className="hidden md:block text-sm">
            <Link to="/login" className="hover:text-blue-600">
              Sign In / Register
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <marquee className="hidden md:block text-sm text-red-600 font-medium bg-white">
          Welcome to "The Natural Stone & Tile Co" - Save upto 50% on all tiles
        </marquee>
      </div>
      {/* Logo and search bar */}
      <div className="bg-white pt-2 pb-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden mr-1 md:mr-4 pt-4 pb-2 pr-2 hover:bg-gray-200"
            >
              <Icon icon="pi-bars" className="text-2xl" />
            </button>

            <Link to="/" className="mr-2 md:mr-8">
              <img
                src="/logo.png"
                alt="The Natural Stone & Tile Co"
                className="h-10 md:h-14"
              />
            </Link>
          </div>

          <div className="mr-2 md:mr-4 relative flex-1">
            <input
              type="text"
              placeholder="Search in..."
              className="w-full border border-green-600 rounded px-3 py-2"
            />
            <button className="absolute right-0 top-0 h-full bg-green-600 text-white px-3 rounded-r">
              <Icon icon="pi-search" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              <Link
                to="/wishlist"
                className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                <Icon icon="pi-heart" />
                <span className="text-xs mt-1">Wishlist</span>
              </Link>

              <Link
                to="/compare"
                className="hidden md:flex flex-col items-center text-gray-600 hover:text-blue-600"
              >
                <Icon icon="pi-shopping-bag" />
                <span className="text-xs mt-1">Compare</span>
              </Link>

              <button
                onClick={() => setOpenCart(true)}
                className="relative flex flex-col items-center text-white border border-green-600 bg-green-600 hover:bg-green-700 px-2 py-2.5 rounded"
              >
                <Icon icon="shopping-cart" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
                {/* <span className="hidden md:block text-xs mt-1">Cart</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Navbar />
      </div>
      <SideModal isOpen={openCart} setIsOpen={setOpenCart} />
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

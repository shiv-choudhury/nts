import React, { useEffect, useRef, useState } from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { debounce } from "lodash";

import {
  getCategories,
  getHeaderData,
  searchProduct
} from "../../apis/ApiCalls";
import Icon from "../Icon";
import useAppContext from "../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import MiniCart from "../MiniCart";

export default function Header() {
  const headerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { userState, dispatch } = useAppContext();
  const marqueData = userState?.homePageData?.offers?.find(
    (item) => item?.dynamic_section === "header_marquee"
  );

  const [aboutData, setAboutData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const about = await getHeaderData();
      setCategories(categories?.data?.data);
      setAboutData(about?.data?.data);
      dispatch({
        type: "CATEGORIES_DATA",
        data: categories?.data?.data
      });
      dispatch({
        type: "HEADER_DATA",
        data: about?.data?.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedSearch = debounce(async (inputValue) => {
    try {
      setLoading(true);
      const resp = await searchProduct({ product: inputValue });
      const { data, success, message } = resp.data;
      if (success) {
        const formatted = data.map((item) => ({
          label: item.name,
          value: item.slug,
          url_key: item.url_key
        }));
        setSearchOptions(formatted);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleInputChange = (inputValue) => {
    if (inputValue) {
      debouncedSearch(inputValue);
    } else {
      setSearchOptions([]);
    }
  };

  const handleSelect = (selected) => {
    if (selected?.value) {
      navigate(`/product/details/${selected.value}`);
      setSearchOptions([]);
    }
  };

  return (
    <header ref={headerRef} id="header" className="w-full">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-300">
        <div className="w-full lg:container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
          <div className="hidden lg:flex space-x-6 text-sm">
            {aboutData.map((item, index) => (
              <Link
                key={item?.pageId?._id || index}
                to={`pages/${item?.pageId?.pg_url_key}`}
                className="hover:text-blue-600"
              >
                {item?.headerName}
              </Link>
            ))}
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
      <div className="w-full lg:container mx-auto">
        {marqueData?.status === "Active" && (
          <marquee className="hidden md:block text-sm text-red-600 font-medium bg-white">
            <div dangerouslySetInnerHTML={{ __html: marqueData?.content }} />
          </marquee>
        )}
      </div>
      {/* Logo and search bar */}
      <div className="bg-white pt-2 pb-4">
        <div className="w-full lg:container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className=" mr-1 md:mr-4 pt-4 pb-2 pr-2 hover:bg-gray-200" //xl:hidden
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

          <div className="mr-2 md:mr-4 relative flex-1 z-30">
            <Select
              className="react-select-container cursor-pointer  "
              classNamePrefix="react-select"
              options={searchOptions}
              onInputChange={handleInputChange}
              onChange={handleSelect}
              isLoading={loading}
              placeholder="Search products here"
              isClearable
              noOptionsMessage={({ inputValue }) =>
                !inputValue ? "Find a product" : "No results found"
              }
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 50 }) }}
            />
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
                <ApartmentOutlined className="text-xl" />
                <span className="text-xs mt-1">Compare</span>
              </Link>

              <button
                onClick={() => setOpenCart(true)}
                className="relative flex flex-col items-center text-white border border-green-600 bg-green-600 hover:bg-green-700 px-2 py-2.5 rounded"
              >
                <Icon icon="shopping-cart" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {userState?.cartLength}
                </span>
                {/* <span className="hidden md:block text-xs mt-1">Cart</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Navbar data={categories} />
      </div>
      {openCart && <MiniCart isOpen={openCart} setIsOpen={setOpenCart} />}
      <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} data={categories} />
    </header>
  );
}

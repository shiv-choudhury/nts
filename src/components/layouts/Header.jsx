import React, { useEffect, useRef, useState } from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchContainerRef = useRef(null);

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

  const debouncedSearch = useRef(
    debounce(async (value) => {
      try {
        setLoading(true);
        const params = {
          product: value || undefined
        };
        const resp = await searchProduct(params);
        const { data, success, message } = resp.data;
        if (success) {
          setSearchResults(data);
        } else {
          toast.error(message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    if (searchValue) {
      debouncedSearch(searchValue);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event) {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setSearchResults([]);
      setHighlightedIndex(-1);
    }
  }

  return (
    <header ref={headerRef} id="header" className="w-full">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-300">
        <div className="w-full lg:container mx-auto px-4 py-2 flex flex-wrap justify-between items-center">
          <div className="hidden lg:flex space-x-6 text-sm">
            <>
              {aboutData.map((item, index) => (
                <Link
                  key={item?.pageId?._id || index}
                  to={`pages/${item?.pageId?.pg_url_key}`}
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

          <div
            className="mr-2 md:mr-4 relative flex-1"
            ref={searchContainerRef}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search in..."
                className="w-full border border-green-600 rounded px-3 py-2"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    setHighlightedIndex((prev) =>
                      Math.min(prev + 1, searchResults.length - 1)
                    );
                  } else if (e.key === "ArrowUp") {
                    setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                  } else if (e.key === "Enter" && highlightedIndex >= 0) {
                    const selected = searchResults[highlightedIndex];
                    if (selected && selected?.slug) {
                      navigate(`/product/details/${selected?.slug}`);
                      setSearchResults([]);
                      setSearchValue("");
                    }
                  }
                }}
              />
              <button
                className="absolute right-0 top-0 h-full bg-green-600 text-white px-3 rounded-r"
                onClick={() => {
                  if (searchValue && searchResults.length > 0) {
                    const selected =
                      searchResults[highlightedIndex] || searchResults[0];
                    if (selected?.url_key) {
                      window.location.href = `/product/${selected.url_key}`;
                    }
                  }
                }}
              >
                <Icon icon="pi-search" />
              </button>

              {searchValue && searchResults.length > 0 && (
                <ul className="absolute z-30 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                  {searchResults.map((item, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer text-sm ${
                        index === highlightedIndex
                          ? "bg-green-100"
                          : "hover:bg-green-50"
                      }`}
                      onClick={() => {
                        item?.slug &&
                          navigate(`/product/details/${item?.slug}`);
                        setSearchResults([]);
                        setSearchValue("");
                      }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

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

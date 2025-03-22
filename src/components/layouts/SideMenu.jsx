import { useState, useEffect } from "react";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import useAppContext from "../context/UserContext";

const SideMenu = (props) => {
  const { isOpen, setIsOpen, data } = props;
  const { userState } = useAppContext();
  const { headerData } = userState;
  const [activeTab, setActiveTab] = useState("categories");
  const [openMenus, setOpenMenus] = useState({});

  const menuItems = [
    { name: "REAL IMAGES", url: "gallery" },
    { name: "CONTACT US", url: "contact" }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Toggle submenu visibility
  const toggleSubMenu = (categoryId) => {
    setOpenMenus((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  // Close menu when clicking outside the side menu
  const closeMenu = (e) => {
    if (!e.target.closest(".sidemenu")) {
      setIsOpen(false);
    }
  };

  // Prevent scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Filter only active categories
  const activeCategories = data?.filter((category) => category.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay to close menu when clicked */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />

          {/* Side Menu Panel */}
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-gray-900 text-white z-50 flex flex-col sidemenu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Tabs for switching between menu categories */}
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === "categories"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 border-b-2 border-gray-900"
                }`}
                onClick={() => setActiveTab("categories")}
              >
                CATEGORIES
              </button>
              <button
                className={`flex-1 py-3 text-center ${
                  activeTab === "main"
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 border-b-2 border-gray-900"
                }`}
                onClick={() => setActiveTab("main")}
              >
                MAIN MENU
              </button>
            </div>

            {/* Conditional Rendering for Active Tab */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === "main" ? (
                <ul className="p-4">
                  {headerData?.map((item, index) => (
                    <li
                      key={item.id || index}
                      className="py-3 border-b border-gray-700 hover:bg-gray-800"
                    >
                      <Link
                        className="hover:text-blue-600 block"
                        key={item?.pageId?._id || index}
                        to={`pages/${item?.pageId?.pg_url_key || ""}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item?.headerName}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="p-4">
                  {/* Render active categories and their subcategories */}
                  {activeCategories.map((category) => (
                    <li
                      key={category._id}
                      className={`py-3 border-b border-gray-700 hover:bg-gray-800 ${
                        category.slug === "clearance"
                          ? "bg-red-600 hover:bg-red-500"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <Link
                          onClick={() => setIsOpen(false)}
                          to={`/${category.slug}`}
                          className="block"
                        >
                          {category.name}
                        </Link>
                        {/* Toggle Button for Submenu */}
                        {category.subCategories?.filter((sub) => sub.status)
                          .length > 0 && (
                          <button
                            onClick={() => toggleSubMenu(category._id)}
                            className="text-gray-400 hover:text-white"
                          >
                            <DownOutlined
                              className={
                                openMenus[category._id] ? "rotate-180" : ""
                              }
                            />
                          </button>
                        )}
                      </div>
                      {/* Show subcategories if available and menu is open */}
                      {openMenus[category._id] &&
                        category.subCategories?.filter((sub) => sub.status)
                          .length > 0 && (
                          <ul className="pl-4 mt-2">
                            {category.subCategories
                              .filter((sub) => sub.status)
                              .map((sub) => (
                                <li
                                  key={sub._id}
                                  className="py-2 text-gray-400 hover:text-white"
                                >
                                  <Link
                                    onClick={() => setIsOpen(false)}
                                    to={`/${category.slug}/${sub.slug}`}
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        )}
                    </li>
                  ))}
                  {menuItems.map((item) => (
                    <li
                      key={item?._id}
                      className="py-3 border-b border-gray-700 hover:bg-gray-800"
                    >
                      <div className="flex justify-between items-center">
                        <Link
                          onClick={() => setIsOpen(false)}
                          to={item?.url}
                          className="block"
                        >
                          {item?.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Close Button */}
            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
              <Link
                className="text-white"
                onClick={() => setIsOpen(false)}
                to="/login"
              >
                Login/Signup
              </Link>
              <button className="text-white" onClick={toggleMenu}>
                <CloseOutlined className="text-lg" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;

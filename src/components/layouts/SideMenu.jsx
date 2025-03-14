import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { CloseOutlined } from "@ant-design/icons";
import useAppContext from "../context/UserContext";

const SideMenu = ({ isOpen, setIsOpen }) => {
  const { userState } = useAppContext();
  const { headerData } = userState;

  const [activeTab, setActiveTab] = useState("main");

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = (e) => {
    if (!e.target.closest(".sidemenu")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />

          {/* Side Menu */}
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-gray-900 text-white z-50 flex flex-col sidemenu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header with Tabs */}
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

            {/* Content based on active tab */}
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
                        to={item?.pageId?.pg_url_key}
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        {item.headerName}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="p-4">
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    WALL
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    FLOOR
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    BATHROOM
                  </li>
                  <li className="pl-4 py-2 text-gray-400 hover:text-white">
                    BATHROOM FLOOR TILES
                  </li>
                  <li className="pl-4 py-2 text-gray-400 hover:text-white">
                    BATHROOM WALL TILES
                  </li>
                  <li className="pl-4 py-2 text-gray-400 hover:text-white">
                    VICTORIAN / MOROCCAN TILES
                  </li>
                  <li className="pl-4 py-2 text-gray-400 hover:text-white">
                    BATHROOM LUXURY TILES
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    PORCELAIN
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    WOOD EFFECT
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    OUTDOOR
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    ACCESSORIES
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-red-700 bg-red-600">
                    CLEARANCE
                  </li>
                  <li className="py-3 border-b border-gray-700 hover:bg-gray-800">
                    REAL IMAGES
                  </li>
                  <li className="py-3 hover:bg-gray-800">CONTACT US</li>
                </ul>
              )}
            </div>

            {/* Close Button */}
            <div className="p-4 border-t border-gray-700 flex justify-end">
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

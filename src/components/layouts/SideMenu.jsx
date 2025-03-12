import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const SideMenu = (props) => {
  const { isOpen, setIsOpen } = props;
  if (!isOpen) return null;

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
    <div>
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeMenu}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sidemenu z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-lg font-bold">MAIN MENU</span>
          <button className="text-white" onClick={toggleMenu}>
            <CloseOutlined className="mr-2 text-md" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="px-4">
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
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

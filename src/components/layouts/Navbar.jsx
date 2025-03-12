import { useState } from "react";

const menuItems = [
  { name: "WALL" },
  { name: "FLOOR" },
  {
    name: "BATHROOM",
    submenu: [
      "BATHROOM FLOOR TILES",
      "BATHROOM WALL TILES",
      "VICTORIAN / MOROCCAN TILES",
      "BATHROOM LUXURY TILES"
    ]
  },
  {
    name: "PORCELAIN",
    submenu: ["Option 1", "Option 2", "Option 3"]
  },
  {
    name: "WOOD EFFECT",
    submenu: ["Option 1", "Option 2"]
  },
  {
    name: "OUTDOOR",
    submenu: ["Option 1", "Option 2"]
  },
  {
    name: "ACCESSORIES",
    submenu: ["Option 1", "Option 2"]
  },
  { name: "CLEARANCE", className: "bg-red-600 hover:bg-red-700" },
  { name: "REAL IMAGES" },
  { name: "CONTACT US" }
];

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <nav className="hidden xl:block bg-gray-800 text-white text-sm relative z-20">
      <div className="container mx-auto w-full">
        <ul className="flex justify-center">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`relative px-3 py-3 hover:bg-gray-700 cursor-pointer flex items-center ${
                item.className || ""
              }`}
              onMouseEnter={() => setHoveredMenu(item.name)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {item.name}
              {item.submenu && (
                <>
                  <span className="ml-1">▼</span>
                  {hoveredMenu === item.name && (
                    <ul className="absolute left-0 top-full bg-black text-white w-56 shadow-lg z-50">
                      {item.submenu.map((sub, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 hover:bg-gray-600"
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

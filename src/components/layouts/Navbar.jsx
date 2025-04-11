import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imageBaseUrl4 } from "../utils/constants";

const Navbar = ({ data }) => {
  const navigate = useNavigate();

  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menuItems = [
    { name: "REAL IMAGES", url: "gallery" },
    { name: "CONTACT US", url: "contact" }
  ];

  const activeMenus = data?.filter((menu) => menu?.status) || [];

  return (
    <nav className="hidden xl:block bg-gray-800 text-white text-sm relative z-20">
      <div className="container mx-auto w-full">
        <ul className="flex justify-center">
          {activeMenus?.map((menu) => {
            const activeSubCategories =
              menu?.subCategories?.filter((sub) => sub?.status) || [];

            return (
              <li
                key={menu?._id}
                className={`relative group px-3 py-3 hover:bg-gray-700 cursor-pointer flex items-center ${
                  menu?.slug === "clearance"
                    ? "bg-red-600 hover:bg-red-500"
                    : ""
                }`}
                onMouseEnter={() => setHoveredMenu(menu?.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <div
                  onClick={() => {
                    navigate(`/category/${menu?.slug}`);
                  }}
                  // to={`/category/${menu?.slug}`}
                  className="w-full h-full flex items-center"
                >
                  <span>{menu?.name}</span>
                  {activeSubCategories?.length > 0 && (
                    <span className="ml-1">▼</span>
                  )}
                </div>

                {hoveredMenu === menu?.name &&
                  activeSubCategories?.length > 0 && (
                    <ul className="absolute left-0 top-full bg-black text-white w-56 shadow-lg z-50">
                      {activeSubCategories?.map((sub) => (
                        <li key={sub?._id} className="hover:bg-gray-600">
                          <div
                            onClick={() => {
                              navigate(`/subcategory/${sub?.slug}`, {
                                state: {
                                  // imageUrl: `${imageBaseUrl4}${sub?.category_image[0]}`,
                                  name: sub?.name
                                }
                              });
                            }}
                            // to={`/subcategory/${sub?.slug}`}
                            className="block px-4 py-2 w-full h-full"
                          >
                            {sub?.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            );
          })}

          {menuItems?.map((item) => (
            <li
              key={item?.name}
              className="px-3 py-3 hover:bg-gray-700 cursor-pointer"
            >
              <Link to={`/${item?.url}`} className="w-full h-full block">
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

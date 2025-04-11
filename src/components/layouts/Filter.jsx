import { useEffect, useState } from "react";
import { CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

import useAppContext from "../context/UserContext";
import { getFilters } from "../../apis/ApiCalls";

const DEFAULT_FILTER_STATE = {
  Price: [100, 500],
  Appearance: [],
  Material: [],
  Thickness: [],
  Type: [],
  ColorList: [],
  Size: [],
  Brand: [],
  Group: []
};

const Filter = (props) => {
  const { isOpen, setIsOpen } = props;
  const { userState } = useAppContext();
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState(DEFAULT_FILTER_STATE);
  const [expanded, setExpanded] = useState({
    Appearance: false,
    Material: true,
    Thickness: false,
    Type: false,
    ColorList: false,
    Size: false,
    Brand: false,
    Group: false
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = (e) => {
    if (!e.target.closest(".sidemenu")) {
      setIsOpen(false);
    }
  };

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = (category, value) => {
    const key = category === "Color" ? "ColorList" : category;
    setSelectedFilters((prev) => {
      const updated = prev[key]?.includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...(prev[key] || []), value];

      return { ...prev, [key]: updated };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters(DEFAULT_FILTER_STATE);
    // Reset all expanded states except Material
    setExpanded({
      Appearance: false,
      Material: true,
      Thickness: false,
      Type: false,
      ColorList: false,
      Size: false,
      Brand: false,
      Group: false
    });
  };

  useEffect(() => {
    if (isOpen) fetchFilters();
  }, [isOpen]);

  const fetchFilters = async () => {
    try {
      const resp = await getFilters();
      const { status, success, data, message } = resp.data;
      if (success) {
        setFilters(data);
        toast.success("Fetched filters successfully");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  const applyFilters = () => {
    const { onFilterApply } = props;
    onFilterApply(selectedFilters);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
          <motion.div
            className="fixed top-0 left-0 h-full w-80 bg-white z-50 sidemenu shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col">
              {/* Sticky Top: Close Button */}
              <div className="flex justify-between items-center sticky top-0 z-10 bg-white border-b p-2">
                <div className="text-lg font-bold text-gray-700">Filters</div>
                <button
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium"
                  onClick={toggleMenu}
                >
                  <CloseOutlined className="" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Price Range */}
                <div className="space-y-2">
                  <h3 className="text-md font-bold">Price</h3>
                  <p className="text-sm text-gray-600">{`${selectedFilters.Price[0]} - ${selectedFilters.Price[1]}`}</p>
                  <input
                    type="range"
                    className="w-full accent-green-500 cursor-grab"
                    min={100}
                    max={500}
                    value={selectedFilters.Price[1]}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        Price: [prev.Price[0], +e.target.value]
                      }))
                    }
                  />
                </div>

                {/* Dynamic Filters */}
                {Object.entries(filters).map(([category, options]) => {
                  const sectionKey =
                    category === "Color" ? "ColorList" : category;

                  return (
                    <div key={category} className="border-b pb-3">
                      <button
                        onClick={() => toggleSection(category)}
                        className="flex justify-between items-center w-full text-md font-semibold text-gray-800 cursor-pointer"
                      >
                        <span>{category}</span>
                        {expanded[category] ? (
                          <MinusOutlined className="text-xs" />
                        ) : (
                          <PlusOutlined className="text-xs" />
                        )}
                      </button>

                      {expanded[category] && (
                        <div className="mt-2 max-h-80 overflow-y-auto space-y-1">
                          {options.map((item, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-2 text-md text-gray-700 cursor-pointer hover:text-green-600"
                            >
                              <input
                                type="checkbox"
                                className="form-checkbox text-green-600"
                                checked={selectedFilters[sectionKey]?.includes(
                                  item
                                )}
                                onChange={() =>
                                  handleCheckboxChange(category, item)
                                }
                              />
                              <span>{item}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Sticky Bottom: Apply / Clear All */}
              <div className="px-4 py-2 sticky bottom-0 z-10 bg-white border-t flex justify-between gap-2">
                <button
                  onClick={applyFilters}
                  className="w-full text-sm bg-green-600 text-white px-4 py-2 hover:bg-green-700 rounded-sm"
                >
                  Apply Filter
                </button>
                <button
                  onClick={clearAllFilters}
                  className="w-full text-sm bg-red-600 text-white px-4 py-2 hover:bg-red-700 rounded-sm"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Filter;

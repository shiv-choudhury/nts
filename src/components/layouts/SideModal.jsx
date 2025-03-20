import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";

const SideModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    title,
    showHeader = true,
    contentStyle = "",
    className = "",
    children
  } = props;

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

          {/* Side Modal */}
          <motion.div
            className={`fixed top-0 right-0 h-full w-[90%] md:w-96 bg-white z-50 flex flex-col sidemenu shadow-lg ${className}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            {showHeader && (
              <div className="p-4 flex justify-between items-center border-b border-gray-300">
                <span className="text-lg font-bold">{title}</span>
                <button onClick={toggleMenu}>
                  <CloseOutlined className="mr-2 text-md" />
                </button>
              </div>
            )}

            {/* Main Content (Ensures Footer Stays at Bottom) */}
            <div className={`flex flex-col flex-1 h-full ${contentStyle}`}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideModal;

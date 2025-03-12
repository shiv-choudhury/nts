import { CloseOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const SideModal = (props) => {
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
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={closeMenu}
      ></div>

      {/* Side modal (positioned on the right) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform sidemenu z-50 flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <span className="text-lg font-bold">Cart</span>
          <button className="" onClick={toggleMenu}>
            <CloseOutlined className="mr-2 text-md" />
          </button>
        </div>
        <div className="p-4">Cart content</div>
      </div>
    </div>
  );
};

export default SideModal;

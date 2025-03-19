import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CloseOutlined } from "@ant-design/icons";

const HalfModal = (props) => {
  const {
    children,
    isOpen,
    onClose,
    title,
    modalStyle = "",
    bodyStyle = "",
    showFooter = true,
    showContinueBtn = false,
    showCloseBtn = true,
    onContinueClick = () => {},
    continueBtnDisabled = false,
    continueBtnText
  } = props;

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen && !isClosing) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex justify-center items-end z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className={`relative bg-white w-screen transform rounded-t-xl h-4/6 flex flex-col ${modalStyle} ${
          isClosing ? "animate-slideDown" : "animate-slideUp"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
      >
        {/* Sticky Modal Header */}
        <div
          className={`p-4 rounded-tl-xl rounded-tr-xl flex justify-between items-center border-b border-[#E4E4E7] bg-white`}
        >
          <h3 className="text-lg font-medium">{title}</h3>
          <button
            className="hover:bg-gray-100 rounded-md"
            onClick={handleClose}
          >
            <CloseOutlined className="p-2 text-md" />
          </button>
        </div>

        {/* Modal Body */}
        <div className={`p-4 flex-grow overflow-y-auto ${bodyStyle}`}>
          {children}
        </div>

        {/* Sticky Modal Footer */}
        {showFooter && (
          <div className="p-3 border-t border-[#E4E4E7] bg-[#F1EBFF]">
            <div className="flex gap-4 items-center justify-end">
              {showContinueBtn && (
                <button
                  disabled={continueBtnDisabled}
                  onClick={onContinueClick}
                  className={`text-sm font-bold px-4 py-2.5 w-80 ${
                    continueBtnDisabled
                      ? "bg-[#d3d3d3] cursor-not-allowed"
                      : "bg-tag-gradient"
                  }`}
                >
                  {continueBtnText || "CONTINUE ORDER"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default HalfModal;

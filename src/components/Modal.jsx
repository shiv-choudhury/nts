import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Spinner from "./Spinner";

const Modal = (props) => {
  const {
    title,
    headerStyle = "",
    isOpen,
    onClose,
    size = "md",
    children,
    showHeader = false,
    showFooter = false,
    cancelBtnText = "Cancel",
    onSave,
    saving = false,
    saveBtnText = "Save",
    showSaveBtn = true,
    saveDisabled = false
  } = props;

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

  if (!isOpen) return null;

  const sizeClasses = {
    xs: "max-w-[444px]",
    sm: "max-w-[600px]",
    md: "max-w-[900px]",
    lg: "max-w-[1200px]",
    xl: "max-w-[1536px]"
  };

  const modalContent = (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => {
          console.log("Overlay clicked");
          onClose();
        }}
      ></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className={`relative w-full flex flex-col max-h-[calc(100%-64px)] ${sizeClasses[size]} w-[calc(100%-64px)] mx-2 md:mx-16 bg-white rounded-xl shadow-lg overflow-hidden`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Modal Header */}
          {showHeader && (
            <div
              className={`p-2 flex justify-between items-center border-b border-[#E4E4E7] ${headerStyle}`}
            >
              <h3 className="text-lg font-medium">{title}</h3>
              <button
                className="hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                <CloseOutlined className="p-2 text-md" />
              </button>
            </div>
          )}

          {/* Modal Body (Scrollable) */}
          <div className="overflow-y-auto max-h-[70vh] rounded-bl-xl rounded-br-xl">
            {children}
          </div>

          {/* Modal Footer */}
          {showFooter && (
            <div className="px-6 py-4 flex justify-end border-t border-[#E4E4E7]">
              <div
                className={`flex space-x-2 ${size === "xs" ? "w-full" : ""}`}
              >
                <button
                  className="px-8 py-2.5 bg-white border border-[#e4e4e4] text-[#09090B] text-sm rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  {cancelBtnText}
                </button>
                {showSaveBtn && (
                  <button
                    disabled={saving || saveDisabled}
                    className={`px-8 py-2.5 bg-[#27272A] border border-[#151518] text-[#e5e5e5] text-sm rounded-md ${
                      saving || saveDisabled
                        ? "cursor-not-allowed !bg-[#474747]"
                        : "hover:bg-[#525255]"
                    }`}
                    onClick={onSave}
                  >
                    {saving ? <Spinner /> : saveBtnText}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;

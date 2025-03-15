import React, { useState, useEffect } from "react";
import Modal from "./Modal";

export default function WelcomePopup(props) {
  const { data = [] } = props;
  const popupData = data[0];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const popupShown = localStorage.getItem("welcomePopupShown");
    if (!popupShown && popupData?.status === "Active") {
      setIsOpen(true);
    }
  }, [popupData]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("welcomePopupShown", "true");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm" showHeader={true}>
      <div className="p-4 text-center">
        {popupData?.lines
          .filter((item) => item.status === "Active")
          .map((item, index) => (
            <div
              key={item._id}
              className={` ${
                index % 2 === 1 ? "text-red-500 mb-1 text-xl" : "mb-1"
              } font-medium`}
            >
              {item.text}
            </div>
          ))}
      </div>
    </Modal>
  );
}

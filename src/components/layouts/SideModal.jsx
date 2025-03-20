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

          {/* Side Modal (Slides in from Right) */}
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

            {/* Content */}
            <div className={`p-2 ${contentStyle}`}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideModal;

const MiniCart = ({ onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Genava Black Matt Porcelain Wall & Floor Tile 600X600mm",
      price: 34.99,
      quantity: 1,
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Genava Black Gloss Porcelain Wall & Floor Tile 600X600mm",
      price: 34.99,
      quantity: 1,
      image: "/api/placeholder/80/80"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
    <div className="bg-white w-full max-w-md h-full flex flex-col">
      {/* Cart Items */}
      <div className="flex-grow overflow-y-auto px-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="py-4 border-b flex items-start relative"
          >
            <button
              onClick={() => removeItem(item.id)}
              className="absolute top-4 right-0 text-gray-500 font-bold"
            >
              &times;
            </button>

            <div className="flex-grow pr-8">
              <p className="text-sm mb-2">{item.name}</p>
              <div className="flex items-center">
                <span className="text-sm mr-2">{item.quantity} x</span>
                <span className="text-blue-600 font-medium">
                  £{item.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center border rounded">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 border-r hover:bg-gray-100 rounded cursor-pointer"
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  // onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-12 text-center py-1"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 border-l hover:bg-gray-100 rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="ml-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Subtotal:</span>
          <span className="font-medium">£{subtotal.toFixed(2)}</span>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Shipping, taxes and discounts codes calculated at checkout
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-emerald-500 text-white py-3 uppercase text-sm font-medium hover:bg-emerald-600">
            View Cart
          </button>
          <button className="bg-emerald-500 text-white py-3 uppercase text-sm font-medium hover:bg-emerald-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export { MiniCart };

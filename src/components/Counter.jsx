const Counter = ({ quantity, setQuantity, disabled = false }) => {
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center border rounded">
      <button
        disabled={disabled}
        onClick={decrementQuantity}
        className="px-3 py-1 border-r hover:bg-gray-100 rounded cursor-pointer disabled:cursor-not-allowed"
      >
        −
      </button>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        className="w-12 text-center py-1"
      />
      <button
        disabled={disabled}
        onClick={incrementQuantity}
        className="px-3 py-1 border-l hover:bg-gray-100 rounded cursor-pointer disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default Counter;

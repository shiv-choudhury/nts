const CategoryCard = ({ key }) => {
  return (
    <div
      key={key}
      className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="h-32 md:h-40 mb-3 rounded overflow-hidden">
        <img
          src="assets/product2.jpg"
          alt="Category"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Category Info */}
      <h3 className="font-medium">Wall Tiles</h3>
      <h4 className="font-base text-gray-500">Wall Tiles description</h4>
    </div>
  );
};

export default CategoryCard;

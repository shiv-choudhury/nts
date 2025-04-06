import { imageBaseUrl4 } from "./utils/constants";

const CategoryCard = ({ data, key }) => {
  return (
    <div
      key={key}
      className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="mb-3 rounded overflow-hidden">
        <img
          src={`${imageBaseUrl4}${data?.banner_image[0]}`}
          onError={(e) => {
            if (
              e.target.src !== `${window.location.origin}/assets/product.jpg`
            ) {
              e.target.src = `${window.location.origin}/assets/product.jpg`;
            }
          }}
          alt="Category"
          className="w-full h-full aspect-square object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Category Info */}
      <h3 className="font-medium">{data?.name}</h3>
      <h4 className="font-base text-gray-500">{data?.description || ""}</h4>
    </div>
  );
};

export default CategoryCard;

import { useNavigate } from "react-router-dom";
import { imageBaseUrl4 } from "./utils/constants";

const CategoryCard = ({ data, key }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/category/${data?.slug}`, {
      state: {
        imageUrl: `${imageBaseUrl4}${data?.category_image[0]}`,
        name: data?.name
      }
    });
  };

  return (
    <div
      key={key}
      className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="mb-3 rounded overflow-hidden">
        <img
          onClick={handleOnClick}
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
      <div
        dangerouslySetInnerHTML={{ __html: data?.content || "" }}
        className="font-base text-gray-500"
      />
    </div>
  );
};

export default CategoryCard;

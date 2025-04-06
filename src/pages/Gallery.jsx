import React, { useEffect, useState } from "react";
import { getRealImages } from "../apis/ApiCalls";

export default function Gallery() {
  const [realImages, setRealImages] = useState([]);
  const imageBaseUrl =
    "https://naturaltilestone.co.uk/public/upload/advertisement/imagesbyuser/";

  useEffect(() => {
    fetchRealImages();
  }, []);

  const fetchRealImages = async () => {
    try {
      const resp = await getRealImages();
      const { data, status, success, message } = resp.data;
      if (success) {
        setRealImages(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-[#d3d3d3]">
      {realImages?.map((item, index) => (
        <div
          key={index}
          className="relative w-full aspect-[4/3] overflow-hidden rounded-lg"
        >
          <img
            src={`${imageBaseUrl}${item?.img_path}`}
            onError={(e) => {
              e.target.src = `assets/product1.jpg`;
            }}
            alt="Product"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}

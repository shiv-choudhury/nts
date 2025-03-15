import axios from "axios";
import * as ApiMethods from "./ApiMethods";

export const getCategories = (payload) => {
  let url = `categories`;
  return ApiMethods.postResponse(url, payload);
};

export const getAboutUsData = (payload) => {
  let url = `pages/about-us`;
  return ApiMethods.postResponse(url, payload);
};

export const getHeaderData = (payload) => {
  let url = `header`;
  return ApiMethods.postResponse(url, payload);
};

export const getHomeData = (payload) => {
  let url = `home`;
  return ApiMethods.postResponse(url, payload);
};

export const getRealImages = (payload) => {
  let url = `realimage`;
  return ApiMethods.postResponse(url, payload);
};

export const getProducts = (product) => {
  let url = `getproducts/${product}`;
  return ApiMethods.postResponse(url);
};

export const getReviews = async (config) => {
  const resp = await axios({
    method: "get",
    url: `https://api.reviews.co.uk/third-party/reviews?store=natural-tiles-stone&limit=40&tag=&branch=&third_party_location=&minRating=&votes`,
    ...config
  });

  return resp;
};

import axios from "axios";
import * as ApiMethods from "./ApiMethods";

export const getCategories = (payload) => {
  let url = `categories`;
  return ApiMethods.postResponse(url, payload);
};

export const getPages = (page) => {
  let url = `pages/${page}`;
  return ApiMethods.postResponse(url);
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

export const getProducts = (product, payload) => {
  let url = `getproducts/${product}`;
  return ApiMethods.postResponse(url, payload);
};

export const getSubCategories = (product) => {
  let url = `subcategories/${product}`;
  return ApiMethods.postResponse(url);
};

export const getProductDetails = (slug) => {
  let url = `getproductdetils/${slug}`;
  return ApiMethods.postResponse(url);
};

export const getFilters = () => {
  let url = `filters`;
  return ApiMethods.postResponse(url);
};

export const searchProduct = (params) => {
  let url = `searchproduct`;
  return ApiMethods.getResponse(url, params);
};

//wishlist
export const addToFavorites = (payload) => {
  let url = `favorites/add`;
  return ApiMethods.postResponse(url, payload);
};

export const getFavoritesList = (payload) => {
  let url = `favorites`;
  return ApiMethods.postResponse(url, payload);
};

//compare
export const addToCompare = (payload) => {
  let url = `compare/add`;
  return ApiMethods.postResponse(url, payload);
};

export const getCompareList = (payload) => {
  let url = `getcompare`;
  return ApiMethods.postResponse(url, payload);
};

//cart
export const getCartList = (payload) => {
  let url = `cart`;
  return ApiMethods.postResponse(url, payload);
};

export const addToCart = (payload) => {
  let url = `cart/add`;
  return ApiMethods.postResponse(url, payload);
};

export const updateCart = (payload) => {
  let url = `cart/update`;
  return ApiMethods.postResponse(url, payload);
};

export const removeFromCart = (payload) => {
  let url = `cart/remove`;
  return ApiMethods.postResponse(url, payload);
};

export const clearCart = (payload) => {
  let url = `cart/clear`;
  return ApiMethods.postResponse(url, payload);
};

//signup login
export const login = (payload) => {
  let url = `login`;
  return ApiMethods.postResponse(url, payload);
};

export const register = (payload) => {
  let url = `register`;
  return ApiMethods.postResponse(url, payload);
};

export const getReviews = async (config) => {
  const resp = await axios({
    method: "get",
    url: `https://api.reviews.co.uk/third-party/reviews?store=natural-tiles-stone&limit=40&tag=&branch=&third_party_location=&minRating=&votes`,
    ...config
  });

  return resp;
};

export const getUserProfile = (payload) => {
  let url = `profile`;
  return ApiMethods.postResponse(url, payload);
};

export const getUserOrders = (payload) => {
  let url = `user/orders`;
  return ApiMethods.postResponse(url, payload);
};

export const checkDiscount = (payload) => {
  let url = `discount/check`;
  return ApiMethods.postResponse(url, payload);
};
// {
//     "code":"X9YNEGE1AXK",
//     "cartTotal":22,
//     "buyQty":1
// }

export const placeOrder = (payload) => {
  let url = `placeorder`;
  return ApiMethods.postResponse(url, payload);
};

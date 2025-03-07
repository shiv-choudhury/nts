import * as ApiMethods from "./ApiMethods";

export const getCategories = (params) => {
  let url = `categories`;
  return ApiMethods.postResponse(url, params);
};

export const getAboutUsData = (params) => {
  let url = `pages/about-us`;
  return ApiMethods.postResponse(url, params);
};

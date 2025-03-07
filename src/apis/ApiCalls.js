import * as ApiMethods from "./ApiMethods";

export const getCategories = (params) => {
  let url = `categories`;
  return ApiMethods.postResponse(url, params);
};

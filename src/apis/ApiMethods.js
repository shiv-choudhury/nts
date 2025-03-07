import axios from "axios";

const BaseUrl = "https://aksasoftware.com:5018/api/";

export const getResponse = async (url, params, token = null) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      params: { ...params },
      method: "GET"
    })
      .then((response) => {
        if (response.data.status === 403 && !response.data.success) {
          // window.location.href = "/logout";
          resolve(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 403 && !error.response.success) {
          // logout()
          // window.location.href = "/logout";
        }
        reject(error);
      });
  });
};

export const postResponse = async (url, payload, token = null) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      method: "POST",
      data: { ...payload }
    })
      .then((response) => {
        if (response.data.status === 403 && !response.data.success) {
          // window.location.href = "/logout";
          resolve(response);
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 403 && !error.response.success) {
          // logout()
          // window.location.href = "/logout";
        }
        reject(error);
      });
  });
};

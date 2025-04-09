import axios from "axios";

const BaseUrl = "https://aksasoftware.com:5018/api/";

export const getHeader = async (token) => {
  const authToken = token || localStorage.getItem("token");

  return {
    Authorization: `token ${authToken}`
  };
};

export const getResponse = async (url, params, token = null) => {
  const URL = BaseUrl + url;
  return new Promise(async (resolve, reject) => {
    axios(URL, {
      method: "GET",
      params: { ...params },
      headers: await getHeader(token)
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
        if (error?.response?.data?.message === "invalidToken") {
          localStorage.removeItem("token");
        }
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
      data: { ...payload },
      headers: await getHeader(token)
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
        if (error?.response?.data?.message === "invalidToken") {
          localStorage.removeItem("token");
        }
        if (error?.response?.status === 403 && !error.response.success) {
          // logout()
          // window.location.href = "/logout";
        }
        reject(error);
      });
  });
};

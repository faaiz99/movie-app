import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

/** Add Token to all requests */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("movie-night-token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.group("AXIOS-API-ERROR");
    switch (error.response.status) {
      case 401:
        console.log("401: Unauthorized:", error);
        break;
      case 403:
        console.log("403: Forbidden:", error);
        break;
      case 500:
        console.log("500: Internal Server Error:", error);
        break;
      default:
        console.log("Unknown error", error);
        break;
    }
    console.groupEnd();
    return Promise.reject(error);
  },
);

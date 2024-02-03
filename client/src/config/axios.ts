import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    console.group("Axios Interceptor");
    let message;
    let status;
    switch (error.response.status) {
      case 401: {
        throw new Error("Token Expired. Please login again.");
      }
      case 403: {
        throw new Error(
          "Forbidden: You do not have permission to access this resource.",
        );
      }
      case 500: {
        throw new Error(`Internal Server Error: ` + error.response.data);
      }
      default: {
        console.log("Error: ", error.response);
        status = error.response.status;
        message = error.response.data.message;
        break;
      }
    }
    console.groupEnd();
    return Promise.reject(`${"Error: " + status + " " + message}`);
  },
);

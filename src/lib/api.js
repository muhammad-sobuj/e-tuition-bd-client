import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://etuitonbd-api-server.vercel.app/",
  withCredentials: true,
});

// Attach Firebase ID token
axiosSecure.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized globally
axiosSecure.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - login again");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;

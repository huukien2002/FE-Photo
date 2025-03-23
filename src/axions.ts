import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor để thêm CSRF token và Authorization token
axiosInstance.interceptors.request.use(async (config) => {
  // Lấy CSRF token từ Laravel
  const csrfResponse = await axios.get("http://127.0.0.1:8000/csrf-token", {
    withCredentials: true,
  });
  const csrfToken = csrfResponse.data.csrf_token;

  // Thêm CSRF token vào headers
  config.headers["X-CSRF-TOKEN"] = csrfToken;

  // Thêm Authorization token nếu có
  const token = Cookies.get("accessToken")?.replace(/"/g, "");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

export default axiosInstance;

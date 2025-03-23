import axiosInstance from "@/axions";
import { useQuery } from "@tanstack/react-query";

const API_URL = "api/my-blogs";

// Hàm gọi API
export const fetchMyBlogs = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

// Hook lấy danh sách blogs
export const useMyBlogs = () => {
  return useQuery({
    queryKey: ["my-blogs"],
    queryFn: fetchMyBlogs,
  });
};

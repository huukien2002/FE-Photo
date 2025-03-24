import axiosInstance from "@/axions";
import { useQuery } from "@tanstack/react-query";

const API_URL = "api/blogs";

// Hàm gọi API
export const fetchDataBlogs = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

// Hook lấy danh sách blogs
export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["data-blogs"],
    queryFn: fetchDataBlogs,
  });
};

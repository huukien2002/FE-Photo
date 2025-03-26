import axiosInstance from "@/axions";
import { useMutation } from "@tanstack/react-query";

const API_URL = "/api/blogs";

// Hàm gọi API để xóa user
const deleteBlog = async (userId: number) => {
  const { data } = await axiosInstance.delete(`${API_URL}/${userId}`);
  return data;
};

// Hook xóa user
export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: (userId: number) => deleteBlog(userId),
  });
};

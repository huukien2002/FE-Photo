import axiosInstance from "@/axions";
import { useMutation } from "@tanstack/react-query";

const API_URL = "/api/blogs";

// Hàm gọi API đăng ký
const createBlog = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

// Hook đăng ký người dùng
export const useCreateBlog = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => createBlog(formData),
  });
};

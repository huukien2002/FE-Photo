import axiosInstance from "@/axions";
import { useMutation } from "@tanstack/react-query";

const API_URL = "api/login";

// Hàm gọi API đăng nhập
const loginUser = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

// Custom Hook đăng nhập người dùng
export const useUserLogin = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => loginUser(formData),
  });
};

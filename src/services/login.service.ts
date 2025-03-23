import axiosInstance from "@/axions";
import { useMutation } from "@tanstack/react-query";

const API_URL = "api/login";

// Hàm gọi API đăng ký
const loginUser = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

// Hook đăng ký người dùng
export const userLoginUser = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => loginUser(formData),
  });
};

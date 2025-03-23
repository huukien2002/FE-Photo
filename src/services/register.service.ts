import axiosInstance from "@/axions";
import { useMutation } from "@tanstack/react-query";

const API_URL = "api/users";

// Hàm gọi API đăng ký
const registerUser = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

// Hook đăng ký người dùng
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      registerUser(formData),
  });
};

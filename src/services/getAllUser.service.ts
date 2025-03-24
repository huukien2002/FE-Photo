import axiosInstance from "@/axions";
import { useQuery } from "@tanstack/react-query";

const API_URL = "api/users";

// Hàm gọi API
export const getAllUsers = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

// Hook lấy danh sách blogs
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });
};

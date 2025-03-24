import axiosInstance from "@/axions";
import { useQuery } from "@tanstack/react-query";

const API_URL = "api/users/profile";

// Hàm gọi API
export const fetchProfile = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

// Hook lấy danh sách blogs
export const useProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: fetchProfile,
  });
};

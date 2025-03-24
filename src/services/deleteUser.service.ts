import axiosInstance from "@/axions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = "/api/users";

// Hàm gọi API để xóa user
const deleteUser = async (userId: number) => {
  const { data } = await axiosInstance.delete(`${API_URL}/${userId}`);
  return data;
};

// Hook xóa user
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
  });
};

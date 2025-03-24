import axiosInstance from "@/axions";
import { useMutation } from "@tanstack/react-query";

const API_URL = "api/logout";

const logoutUser = async () => {
  const { data } = await axiosInstance.post(API_URL);
  return data;
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => logoutUser(),
  });
};

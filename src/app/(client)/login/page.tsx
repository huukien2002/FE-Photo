"use client";

import { useForm, Controller } from "react-hook-form";
import { userLoginUser } from "@/services/login.service";

import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = userLoginUser();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    mutate(
      { formData },
      {
        onSuccess: (response) => {
          const token = response?.data?.token;
          if (token) {
            Cookies.set("accessToken", token, { expires: 7 });
          }
          toast.success(response.message);
          // Cập nhật dataProfile ngay lập tức
          queryClient.setQueryData(["my-profile"], response.data.user);
          router.push("/");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  };

  console.log(process.env.BACKEND_URL);

  return (
    <Box
      maxWidth={400}
      mx="auto"
      p={3}
      bgcolor="white"
      color={"gray"}
      boxShadow={3}
      borderRadius={2}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Đăng nhập
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Tên đăng nhập */}
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Tên đăng nhập là bắt buộc" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Tên đăng nhập"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />

        {/* Mật khẩu */}
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Mật khẩu là bắt buộc",
            minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Mật khẩu"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        {/* Nút đăng ký */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isPending}
          sx={{ mt: 2, height: 50 }}
        >
          {isPending ? <CircularProgress size={24} /> : "Đăng nhập"}
        </Button>
      </form>
    </Box>
  );
}

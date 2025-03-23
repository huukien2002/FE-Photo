"use client";

import { useForm, Controller } from "react-hook-form";
import { useRegisterUser } from "@/services/register.service";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

interface RegisterForm {
  username: string;
  password: string;
}

export default function RegisterPage() {
  const { mutate, isPending } = useRegisterUser();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("role", "user");

    mutate(
      { formData },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          //   alert("Đăng ký thành công!");
        },
        onError: (error: any) => {
          if (error.response?.data?.errors) {
            const serverErrors = error.response.data.errors;
            Object.keys(serverErrors).forEach((field) => {
              setError(field as keyof RegisterForm, {
                type: "server",
                message: serverErrors[field], // Hiển thị lỗi từ server
              });
            });
          }
        },
      }
    );
  };

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
        Đăng ký tài khoản
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
          {isPending ? <CircularProgress size={24} /> : "Đăng ký"}
        </Button>
      </form>
    </Box>
  );
}

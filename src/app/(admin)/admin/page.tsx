"use client";
import { useGetAllUsers } from "@/services/getAllUser.service";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDeleteUser } from "@/services/deleteUser.service";
import { toast } from "react-toastify";
import { useGetAllBlogs } from "@/services/getDataBlog.service";
import { confirmAlert } from "react-confirm-alert";
import { useDeleteBlog } from "@/services/deleteBlog.service";
import { AxiosError } from "axios";

interface Blog {
  id: number;
  title: string;
  image: string;
  user: {
    username: string;
  };
}
const AdminPage = () => {
  const { data: dataUsers, refetch: refetchUser } = useGetAllUsers();
  const { data: dataBlogs, refetch: refetchBlogs } = useGetAllBlogs();

  const { mutate: mutateDeleteUser } = useDeleteUser();
  const { mutate: mutateDeleteBlog } = useDeleteBlog();

  const handleDeleteUser = (id: number) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa người dùng này?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            mutateDeleteUser(id, {
              onSuccess: (response) => {
                toast.success(response.message);
                refetchUser();
              },
              onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                toast.error(
                  axiosError.response?.data?.message || "Đã xảy ra lỗi!"
                );
              },
            });
          },
        },
        {
          label: "Hủy",
        },
      ],
    });
  };

  const handleDeleteBlog = (id: number) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa bài viết này?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            mutateDeleteBlog(id, {
              onSuccess: (response) => {
                toast.success(response.message);
                refetchBlogs();
              },
              onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                toast.error(
                  axiosError.response?.data?.message || "Đã xảy ra lỗi!"
                );
              },
            });
          },
        },
        {
          label: "Hủy",
        },
      ],
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataUsers?.data?.map(
                (user: { id: string; username: string; role: string }) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteUser(parseInt(user.id))}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataBlogs?.data?.map((blog: Blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>
                    <img
                      src={blog.image}
                      width={100}
                      height={100}
                      srcSet=""
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{blog.user.username}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteBlog(Number(blog.id))}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminPage;

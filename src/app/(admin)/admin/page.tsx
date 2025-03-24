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
  Typography,
} from "@mui/material";
import React from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDeleteUser } from "@/services/deleteUser.service";
import { toast } from "react-toastify";
import { useGetAllBlogs } from "@/services/getDataBlog.service";

const AdminPage = () => {
  const { data: dataUsers, refetch: refetchUser } = useGetAllUsers();
  const { data: dataBlogs, refetch: refetchBlogs } = useGetAllBlogs();

  const { mutate: mutateDeleteUser } = useDeleteUser();

  const handleDelete = (id: number) => {
    mutateDeleteUser(id, {
      onSuccess: (response) => {
        toast.success(response.message);
        refetchUser();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  console.log(dataBlogs);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ padding: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Action</TableCell>
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
                        onClick={() => handleDelete(parseInt(user.id))}
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
            <TableHead style={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataBlogs?.data?.map((blog: any) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.image}</TableCell>
                  <TableCell>{blog.user.username}</TableCell>
                  <TableCell>
                    <IconButton
                      // onClick={() => handleDelete(parseInt(user.id))}
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

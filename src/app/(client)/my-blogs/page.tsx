"use client";
import { useCreateBlog } from "@/services/createBlog.service";
import { useMyBlogs } from "@/services/myBlogs.service";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteBlog } from "@/services/deleteBlog.service";
import { confirmAlert } from "react-confirm-alert";
import { AxiosError } from "axios";

interface Blog {
  id: number;
  title: string;
  image: string;
  user: {
    username: string;
  };
}
const MyBlogsComponent = () => {
  const { data, refetch: refetchBlog } = useMyBlogs();
  const { mutate } = useCreateBlog();
  const { mutate: mutateDelete } = useDeleteBlog();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setImage(null);
    setPreview(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title || !image) {
      alert("Vui lòng nhập tiêu đề và chọn ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    mutate(
      { formData },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          refetchBlog();
        },
        onError: (error) => {
          const axiosError = error as AxiosError<{ message: string }>;
          toast.error(axiosError.response?.data?.message || "Đã xảy ra lỗi!");
        },
      }
    );

    handleClose();
  };

  const handleDeleteBlog = (id: number) => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa bài viết này?",
      buttons: [
        {
          label: "Có",
          onClick: () => {
            mutateDelete(id, {
              onSuccess: (response) => {
                toast.success(response.message);
                refetchBlog();
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
    <Container maxWidth="md">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Tạo Blog
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "text.primary",
          }}
        >
          <Typography variant="h6">Tạo Blog Mới</Typography>
          <TextField
            label="Tiêu đề"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: "100%",
                maxHeight: 200,
                objectFit: "cover",
                mt: 2,
                borderRadius: 1,
              }}
            />
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
      <Typography color="primary" variant="h4" gutterBottom>
        Danh sách Blog
      </Typography>
      <Grid container spacing={3}>
        {data?.data?.map((blog: Blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title}
              />
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">{blog.title}</Typography>
                <DeleteForeverIcon
                  onClick={() => handleDeleteBlog(blog.id)}
                  color="error"
                  sx={{ cursor: "pointer" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
        {data?.data?.length === 0 && (
          <Typography variant="h6">Bạn chưa có Blog nào</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default MyBlogsComponent;

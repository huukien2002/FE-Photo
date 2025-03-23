"use client";
import { useMyBlogs } from "@/services/myBlogs.service";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const MyBlogsComponent = () => {
  const { data } = useMyBlogs();

  return (
    <Container maxWidth="md">
      <Typography color="primary" variant="h4" gutterBottom>
        Danh sách Blog
      </Typography>
      <Grid container spacing={3}>
        {data?.data?.map((blog: any) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                // image={blog.image || "/placeholder.jpg"}
                image="https://tse4.mm.bing.net/th?id=OIP.NN1uAgTw1BZgX-hXgKx06wHaEN&pid=Api&P=0&h=180"
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyBlogsComponent;

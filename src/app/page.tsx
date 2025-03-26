import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", color: "#333" }}>
      {/* Hero Section */}
      <Container sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Chụp, chỉnh sửa và chia sẻ ảnh dễ dàng!
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Ứng dụng giúp bạn lưu giữ khoảnh khắc tuyệt vời mọi lúc, mọi nơi.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Tải ngay
        </Button>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="340"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Trải nghiệm Photo App ngay hôm nay!
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Tải ngay
        </Button>
      </Box>
    </div>
  );
}

const features = [
  {
    title: "Chỉnh sửa ảnh dễ dàng",
    description: "Bộ công cụ chỉnh sửa mạnh mẽ, dễ sử dụng.",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.NN1uAgTw1BZgX-hXgKx06wHaEN&pid=Api&P=0&h=180",
  },
  {
    title: "Chia sẻ nhanh chóng",
    description: "Kết nối với bạn bè chỉ trong vài giây.",
    image:
      "https://tse1.mm.bing.net/th?id=OIP.T5OvBqx401D4fnBNImatvgAAAA&pid=Api&P=0&h=180",
  },
  {
    title: "Bộ lọc đa dạng",
    description: "Hàng trăm bộ lọc giúp bức ảnh của bạn đẹp hơn.",
    image:
      "https://tinhocdaiviet.com/wp-content/uploads/5-Cong-Cu-Tao-Anh-AI-Tot-Nhat-Ban-Nen-Thu-Trong-Nam-2023.webp",
  },
];

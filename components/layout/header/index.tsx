"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Link from "next/link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useProfile } from "@/services/getProfile.service";
import { useLogoutUser } from "@/services/logout.service";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

export const Header = () => {
  const { data: dataProfile } = useProfile();
  const { mutate } = useLogoutUser();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (response) => {
        Cookies.remove("accessToken");
        toast.success(response.message);
        window.location.href = "/";
      },
      onError: (error) => {
        console.error("Lỗi khi đăng xuất:", error);
      },
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Website
        </Typography>

        <Box>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/my-blogs">
            My Blogs
          </Button>

          {dataProfile ? (
            <>
              <Tooltip title={`I'm ${dataProfile.username}`}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AccountCircleIcon />}
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </Tooltip>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

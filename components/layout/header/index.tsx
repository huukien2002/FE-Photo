import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Link from "next/link";

export const Header = () => {
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
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} href="/my-blogs">
            My Blogs
          </Button>
          <Button color="inherit" component={Link} href="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Link href="/" passHref>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Magenta
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            onClick={handleNotificationsOpen}
            sx={{ "&:hover": { color: "secondary.main" } }}
          >
            <NotificationsIcon />
          </IconButton>
          <Menu
            anchorEl={notificationsEl}
            open={Boolean(notificationsEl)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: 3,
              },
            }}
          >
            <MenuItem>
              <ListItemText
                primary="New message from John"
                secondary="2 minutes ago"
              />
            </MenuItem>
            <MenuItem>
              <ListItemText
                primary="Server downtime alert"
                secondary="10 minutes ago"
              />
            </MenuItem>
            <MenuItem>
              <ListItemText
                primary="New comment on your post"
                secondary="30 minutes ago"
              />
            </MenuItem>
          </Menu>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ "&:hover": { color: "secondary.main" } }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: 3,
              },
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "error.main" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
          <Button
            color="inherit"
            sx={{ ml: 2, "&:hover": { bgcolor: "secondary.main" } }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

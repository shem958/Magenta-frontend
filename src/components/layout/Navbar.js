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
  Avatar,
  Badge,
  InputBase,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

  const notifications = [
    {
      id: 1,
      title: "New order received",
      time: "2 minutes ago",
      type: "success",
    },
    {
      id: 2,
      title: "Low stock alert: Widget Pro",
      time: "10 minutes ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Employee schedule updated",
      time: "30 minutes ago",
      type: "info",
    },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderColor: "grey.200",
      }}
    >
      <Toolbar sx={{ gap: 2, px: { xs: 2, sm: 3 } }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onMenuClick}
            sx={{
              color: "grey.700",
              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.main",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Search Bar */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            bgcolor: "grey.100",
            borderRadius: 2,
            px: 2,
            py: 0.75,
            flex: 1,
            maxWidth: 400,
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "grey.200",
            },
            "&:focus-within": {
              bgcolor: "#fff",
              boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
            },
          }}
        >
          <SearchIcon sx={{ color: "grey.500", mr: 1 }} />
          <InputBase
            placeholder="Search anything..."
            sx={{
              flex: 1,
              color: "grey.800",
              "& input::placeholder": {
                color: "grey.500",
                opacity: 1,
              },
            }}
          />
          <Chip
            label="⌘K"
            size="small"
            sx={{
              bgcolor: "grey.200",
              color: "grey.600",
              height: 22,
              fontSize: "0.7rem",
              display: { xs: "none", md: "flex" },
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Mobile Search */}
          <IconButton
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "grey.700",
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              onClick={handleNotificationsOpen}
              sx={{
                color: "grey.700",
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "primary.main",
                },
              }}
            >
              <Badge
                badgeContent={3}
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: "secondary.main",
                    color: "#fff",
                  },
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notificationsEl}
            open={Boolean(notificationsEl)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 320,
                maxHeight: 400,
                boxShadow: theme.shadows[4],
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Notifications
              </Typography>
              <Typography variant="caption" color="text.secondary">
                You have 3 unread messages
              </Typography>
            </Box>
            {notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                sx={{
                  py: 1.5,
                  "&:hover": { bgcolor: "grey.50" },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor:
                      notification.type === "success"
                        ? "success.main"
                        : notification.type === "warning"
                          ? "warning.main"
                          : "info.main",
                    mr: 1.5,
                    flexShrink: 0,
                  }}
                />
                <ListItemText
                  primary={notification.title}
                  secondary={notification.time}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                  secondaryTypographyProps={{ fontSize: "0.75rem" }}
                />
              </MenuItem>
            ))}
            <Box
              sx={{ p: 1.5, borderTop: "1px solid", borderColor: "grey.200" }}
            >
              <Button fullWidth size="small" sx={{ color: "primary.main" }}>
                View all notifications
              </Button>
            </Box>
          </Menu>

          {/* User Menu */}
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                JD
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                width: 220,
                boxShadow: theme.shadows[4],
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary">
                john@magenta.com
              </Typography>
            </Box>
            <Divider />
            <MenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="My Profile"
                primaryTypographyProps={{ fontSize: "0.875rem" }}
              />
            </MenuItem>
            <MenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: "0.875rem" }}
              />
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{
                py: 1.5,
                color: "error.main",
                "&:hover": { bgcolor: "error.light" },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: "0.875rem" }}
              />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

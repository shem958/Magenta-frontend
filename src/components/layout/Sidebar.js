"use client";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Collapse,
  IconButton,
  InputBase,
  Avatar,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const DRAWER_WIDTH = 280;

const menuItems = [
  { 
    title: "Dashboard", 
    icon: <DashboardIcon />, 
    path: "/",
    description: "Overview & Analytics"
  },
  { 
    title: "Inventory", 
    icon: <InventoryIcon />, 
    path: "/inventory",
    description: "Stock Management"
  },
  { 
    title: "Employees", 
    icon: <PeopleIcon />, 
    path: "/employees",
    description: "Team Management"
  },
  { 
    title: "Deliveries", 
    icon: <LocalShippingIcon />, 
    path: "/deliveries",
    description: "Shipping & Logistics"
  },
  { 
    title: "Finance", 
    icon: <AccountBalanceWalletIcon />, 
    path: "/finance",
    description: "Revenue & Expenses"
  },
];

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState("/");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
              width: 40,
              height: 40,
              fontWeight: 700,
            }}
          >
            M
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              Magenta
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.5)" }}
            >
              Business Suite
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton
            onClick={onMobileClose}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.08)",
            borderRadius: 2,
            px: 2,
            py: 1,
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.12)",
            },
            "&:focus-within": {
              bgcolor: "rgba(255,255,255,0.15)",
              boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
            },
          }}
        >
          <SearchIcon sx={{ color: "rgba(255,255,255,0.5)", mr: 1 }} />
          <InputBase
            placeholder="Search menu..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              flex: 1,
              color: "#fff",
              "& input::placeholder": {
                color: "rgba(255,255,255,0.5)",
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mx: 2 }} />

      {/* Navigation */}
      <Box sx={{ flex: 1, overflow: "auto", px: 2, py: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.4)",
            px: 2,
            mb: 1,
            display: "block",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
          }}
        >
          Main Menu
        </Typography>
        <List component="nav" sx={{ p: 0 }}>
          {filteredMenuItems.map((item) => (
            <Tooltip
              key={item.path}
              title={item.description}
              placement="right"
              arrow
            >
              <Link href={item.path} passHref style={{ textDecoration: "none" }}>
                <ListItemButton
                  selected={selectedPath === item.path}
                  onClick={() => {
                    setSelectedPath(item.path);
                    if (isMobile) onMobileClose?.();
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    py: 1.5,
                    px: 2,
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-selected": {
                      bgcolor: "rgba(99, 102, 241, 0.2)",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "rgba(99, 102, 241, 0.3)",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "#818cf8",
                      },
                    },
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.08)",
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: selectedPath === item.path ? 600 : 500,
                      fontSize: "0.9375rem",
                    }}
                  />
                </ListItemButton>
              </Link>
            </Tooltip>
          ))}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
        <List sx={{ p: 0 }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              py: 1,
              color: "rgba(255,255,255,0.6)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ fontSize: "0.875rem" }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: 2,
              py: 1,
              color: "rgba(255,255,255,0.6)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <HelpOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Help & Support"
              primaryTypographyProps={{ fontSize: "0.875rem" }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

export default Sidebar;

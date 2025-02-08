"use client";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Button,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const DeliveriesList = ({ deliveries = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setAnchorEl(null);
  };

  const filteredDeliveries = deliveries.filter((delivery) => {
    return (
      (filterStatus === "All" || delivery.status === filterStatus) &&
      (delivery.orderId.includes(searchQuery) ||
        delivery.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <SearchIcon />
        <InputBase
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ ml: 1, flex: 1 }}
        />
        <Button
          aria-controls="filter-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          sx={{ ml: 2 }}
        >
          Filter
        </Button>
        <Menu
          id="filter-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleFilterChange("All")}>All</MenuItem>
          <MenuItem onClick={() => handleFilterChange("In Transit")}>
            In Transit
          </MenuItem>
          <MenuItem onClick={() => handleFilterChange("Completed")}>
            Completed
          </MenuItem>
          <MenuItem onClick={() => handleFilterChange("Delayed")}>
            Delayed
          </MenuItem>
        </Menu>
      </Box>
      <List>
        {filteredDeliveries.map((delivery) => (
          <Box key={delivery.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <LocalShippingIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Order: ${delivery.orderId}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Customer: {delivery.customerName}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Pickup: {delivery.pickupLocation}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Delivery: {delivery.deliveryLocation}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Expected: {delivery.expectedDeliveryTime}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Actual: {delivery.actualDeliveryTime}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Driver: {delivery.driverName}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color={
                        delivery.status === "Delayed"
                          ? "error.main"
                          : "textPrimary"
                      }
                    >
                      Status: {delivery.status}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Last Update: {delivery.lastUpdate}
                    </Typography>
                  </>
                }
              />
              <IconButton edge="end" aria-label="more" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => console.log("Expand details")}>
                  Expand Details
                </MenuItem>
                <MenuItem onClick={() => console.log("Quick status update")}>
                  Quick Status Update
                </MenuItem>
                <MenuItem
                  onClick={() => console.log("Real-time tracking link")}
                >
                  Real-time Tracking Link
                </MenuItem>
                <MenuItem
                  onClick={() => console.log("Customer contact options")}
                >
                  Customer Contact Options
                </MenuItem>
                <MenuItem onClick={() => console.log("Delivery route preview")}>
                  Delivery Route Preview
                </MenuItem>
                <MenuItem onClick={() => console.log("Edit/cancel options")}>
                  Edit/Cancel Options
                </MenuItem>
              </Menu>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default DeliveriesList;

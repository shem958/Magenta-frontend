"use client";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Button,
  Grid,
} from "@mui/material";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const EmployeesList = ({ employees = [] }) => {
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

  const filteredEmployees = employees.filter((employee) => {
    return (
      (filterStatus === "All" || employee.status === filterStatus) &&
      (employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={8}>
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ ml: 1, flex: 1, width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
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
            <MenuItem onClick={() => handleFilterChange("Active")}>
              Active
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("Inactive")}>
              Inactive
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <List>
        {filteredEmployees.map((employee) => (
          <Box key={employee.id}>
            <ListItem
              button
              component={Link}
              href={`/employees/${employee.id}`}
            >
              <ListItemAvatar>
                <Avatar
                  src={employee.profilePhoto}
                  sx={{ bgcolor: "primary.main" }}
                >
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={employee.name}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {employee.department}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {employee.role}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Status: {employee.status}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Contact: {employee.contact}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Join Date:{" "}
                      {new Date(employee.joinDate).toLocaleDateString()}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Performance Rating: {employee.performanceRating}
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
                <MenuItem onClick={() => console.log("Quick view")}>
                  Quick View
                </MenuItem>
                <MenuItem onClick={() => console.log("Edit")}>Edit</MenuItem>
                <MenuItem onClick={() => console.log("Update status")}>
                  Update Status
                </MenuItem>
                <MenuItem onClick={() => console.log("Export")}>
                  Export
                </MenuItem>
              </Menu>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default EmployeesList;

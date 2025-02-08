"use client";
import {
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const InventoryList = ({ items = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredItems = items.filter((item) => {
    return (
      (filterStatus === "All" ||
        (filterStatus === "In Stock" && item.stock > item.reorderLevel) ||
        (filterStatus === "Low Stock" &&
          item.stock <= item.reorderLevel &&
          item.stock > 0) ||
        (filterStatus === "Out of Stock" && item.stock === 0)) &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const sortedItems = filteredItems.sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (orderBy === "stock") {
      return order === "asc" ? a.stock - b.stock : b.stock - a.stock;
    } else if (orderBy === "category") {
      return order === "asc"
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    }
    return 0;
  });

  const paginatedItems = sortedItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            <MenuItem onClick={() => handleFilterChange("In Stock")}>
              In Stock
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("Low Stock")}>
              Low Stock
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange("Out of Stock")}>
              Out of Stock
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "category"}
                  direction={orderBy === "category" ? order : "asc"}
                  onClick={() => handleRequestSort("category")}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "stock"}
                  direction={orderBy === "stock" ? order : "asc"}
                  onClick={() => handleRequestSort("stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Link href={`/inventory/${item._id}`} passHref>
                    <Typography
                      component="a"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.stock}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        item.stock === 0
                          ? "red"
                          : item.stock <= item.reorderLevel
                          ? "orange"
                          : "green",
                    }}
                  >
                    {item.stock === 0
                      ? "Out of Stock"
                      : item.stock <= item.reorderLevel
                      ? "Low Stock"
                      : "In Stock"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    edge="end"
                    aria-label="more"
                    onClick={handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="action-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => console.log("Quick edit")}>
                      Quick Edit
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Delete")}>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Update stock")}>
                      Update Stock
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Export")}>
                      Export
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default InventoryList;

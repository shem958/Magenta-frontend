// src/components/inventory/InventoryDashboard.js
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../../store/slices/inventorySlice";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import InventoryList from "./InventoryList";

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Management
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 2 }}>
            <InventoryList items={items} />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default InventoryDashboard;

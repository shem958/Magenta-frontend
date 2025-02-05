// src/components/inventory/InventoryDashboard.js
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../../store/slices/inventorySlice";
import { Container, Typography } from "@mui/material";
import InventoryList from "./InventoryList";

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <InventoryList items={items} />
      )}
    </Container>
  );
};

export default InventoryDashboard;

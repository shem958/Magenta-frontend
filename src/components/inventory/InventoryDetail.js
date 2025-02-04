"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryItem } from "../../redux/slices/inventorySlice";
import { useParams } from "next/navigation";
import { Container, Typography, Paper } from "@mui/material";

const InventoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventoryItem(id));
  }, [dispatch, id]);

  if (loading || !selectedItem) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">{selectedItem.name}</Typography>
        <Typography>Stock: {selectedItem.stock}</Typography>
        <Typography>Location: {selectedItem.location}</Typography>
      </Paper>
    </Container>
  );
};

export default InventoryDetail;

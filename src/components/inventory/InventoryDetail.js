"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryItem } from "../../redux/slices/inventorySlice";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

const InventoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventoryItem(id));
  }, [dispatch, id]);

  if (loading || !selectedItem) {
    return (
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
    );
  }

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {selectedItem.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Stock:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {selectedItem.stock}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" color="textSecondary">
            Location:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {selectedItem.location}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default InventoryDetail;

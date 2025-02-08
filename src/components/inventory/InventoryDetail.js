"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem } from "../../store/slices/inventorySlice";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Avatar,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const InventoryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchItem(id));
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            src={selectedItem.image}
            sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56 }}
          />
          <Typography variant="h5">{selectedItem.name}</Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ ml: "auto" }}
          >
            Edit
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Comprehensive Item Information
            </Typography>
            <Typography variant="body1">
              <strong>Stock:</strong> {selectedItem.stock}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {selectedItem.location}
            </Typography>
            <Typography variant="body1">
              <strong>Specifications:</strong> {selectedItem.specifications}
            </Typography>
            <Typography variant="body1">
              <strong>Purchase History:</strong> {selectedItem.purchaseHistory}
            </Typography>
            <Typography variant="body1">
              <strong>Supplier Information:</strong> {selectedItem.supplier}
            </Typography>
            <Typography variant="body1">
              <strong>Minimum Stock Levels:</strong> {selectedItem.minStock}
            </Typography>
            <Typography variant="body1">
              <strong>Reorder Points:</strong> {selectedItem.reorderPoint}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Enhanced Functionality
            </Typography>
            <Typography variant="body1">
              <strong>Stock Movement History:</strong>{" "}
              {selectedItem.stockMovementHistory}
            </Typography>
            <Typography variant="body1">
              <strong>Related Items:</strong> {selectedItem.relatedItems}
            </Typography>
            <Typography variant="body1">
              <strong>Price History:</strong> {selectedItem.priceHistory}
            </Typography>
            <Typography variant="body1">
              <strong>Quality Control Records:</strong>{" "}
              {selectedItem.qualityControl}
            </Typography>
            <Typography variant="body1">
              <strong>Batch/Lot Tracking:</strong> {selectedItem.batchTracking}
            </Typography>
            <Typography variant="body1">
              <strong>Expiration Date:</strong> {selectedItem.expirationDate}
            </Typography>
            <Typography variant="body1">
              <strong>Attachments:</strong> {selectedItem.attachments}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary">
            Quick Reorder
          </Button>
          <Button variant="contained" color="primary">
            Stock Adjustment
          </Button>
          <Button variant="contained" color="primary">
            Transfer Location
          </Button>
          <Button variant="contained" color="primary">
            Print Barcode/QR Code
          </Button>
          <Button variant="contained" color="primary">
            Generate Reports
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InventoryDetail;

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveries } from "../../store/slices/deliveriesSlice";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import DeliveriesList from "./DeliveriesList";

const DeliveriesDashboard = () => {
  const dispatch = useDispatch();
  const { deliveries, loading } = useSelector((state) => state.deliveries);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Deliveries Overview
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
            <DeliveriesList deliveries={deliveries} />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default DeliveriesDashboard;

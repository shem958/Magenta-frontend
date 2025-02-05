"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveries } from "../../redux/slices/deliveriesSlice";
import { Container, Typography } from "@mui/material";
import DeliveriesList from "./DeliveriesList";

const DeliveriesDashboard = () => {
  const dispatch = useDispatch();
  const { deliveries, loading } = useSelector((state) => state.deliveries);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Deliveries Overview
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <DeliveriesList deliveries={deliveries} />
      )}
    </Container>
  );
};

export default DeliveriesDashboard;

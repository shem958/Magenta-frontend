"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinanceData } from "../../redux/slices/financeSlice";
import { Container, Typography } from "@mui/material";
import FinanceSummary from "./FinanceSummary";

const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Finance Overview
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <FinanceSummary data={data} />
      )}
    </Container>
  );
};

export default FinanceDashboard;

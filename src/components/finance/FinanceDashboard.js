"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinanceData } from "../../store/slices/financeSlice";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import FinanceSummary from "./FinanceSummary";

const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Finance Overview
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
            <FinanceSummary data={data} />
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default FinanceDashboard;

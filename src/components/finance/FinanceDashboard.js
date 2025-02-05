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
  Grid,
  Button,
} from "@mui/material";
import FinanceSummary from "./FinanceSummary";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 2000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
    { name: "Jul", revenue: 3490 },
    { name: "Aug", revenue: 2000 },
    { name: "Sep", revenue: 2780 },
    { name: "Oct", revenue: 1890 },
    { name: "Nov", revenue: 2390 },
    { name: "Dec", revenue: 3490 },
  ];

  const expenseData = [
    { name: "Rent", value: 4000 },
    { name: "Salaries", value: 3000 },
    { name: "Utilities", value: 2000 },
    { name: "Miscellaneous", value: 1000 },
  ];

  const kpiData = [
    { name: "Profit Margin", value: "15%", trend: "up" },
    { name: "Cash Flow", value: "$12,000", trend: "down" },
    { name: "Debt Ratio", value: "30%", trend: "stable" },
  ];

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
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Revenue Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                      />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Expense Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {expenseData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Financial KPIs
                  </Typography>
                  <Grid container spacing={2}>
                    {kpiData.map((kpi, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography variant="h6">{kpi.name}</Typography>
                          <Typography variant="h4">{kpi.value}</Typography>
                          <Typography
                            variant="body2"
                            color={
                              kpi.trend === "up"
                                ? "green"
                                : kpi.trend === "down"
                                ? "red"
                                : "gray"
                            }
                          >
                            {kpi.trend === "up"
                              ? "↑"
                              : kpi.trend === "down"
                              ? "↓"
                              : "→"}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Finance Summary
                  </Typography>
                  <FinanceSummary data={data} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Downloadable Reports
                  </Typography>
                  <Button variant="contained" color="primary">
                    Download Report
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default FinanceDashboard;

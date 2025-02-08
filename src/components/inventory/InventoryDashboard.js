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
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import InventoryList from "./InventoryList";
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

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const totalInventoryValue = items.reduce((acc, item) => acc + item.value, 0);
  const lowStockAlerts = items.filter(
    (item) => item.stock < item.reorderLevel
  ).length;
  const itemsNeedingReorder = items.filter(
    (item) => item.stock < item.reorderLevel
  );
  const topSellingItems = items.sort((a, b) => b.sales - a.sales).slice(0, 5);
  const recentTransactions = items.slice(-5); // Example static value

  const stockLevelTrends = items.map((item) => ({
    name: item.name,
    stock: item.stock,
  }));
  const inventoryTurnoverRate = items.map((item) => ({
    name: item.name,
    turnover: item.turnoverRate,
  }));
  const categoryWiseDistribution = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.value;
    return acc;
  }, {});
  const categoryWiseData = Object.keys(categoryWiseDistribution).map((key) => ({
    name: key,
    value: categoryWiseDistribution[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Total Inventory Value</Typography>
                    <Typography variant="h4">${totalInventoryValue}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Low Stock Alerts</Typography>
                    <Typography variant="h4">{lowStockAlerts}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Items Needing Reorder</Typography>
                    <Typography variant="h4">
                      {itemsNeedingReorder.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Top Selling Items</Typography>
                    <Typography variant="body1">
                      {topSellingItems.map((item) => item.name).join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Recent Transactions</Typography>
                    <Typography variant="body1">
                      {recentTransactions.map((item) => item.name).join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Stock Level Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stockLevelTrends}>
                      <Line type="monotone" dataKey="stock" stroke="#8884d8" />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Inventory Turnover Rate
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={inventoryTurnoverRate}>
                      <Line
                        type="monotone"
                        dataKey="turnover"
                        stroke="#82ca9d"
                      />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Category-wise Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryWiseData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {categoryWiseData.map((entry, index) => (
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
                  <InventoryList items={items} />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default InventoryDashboard;

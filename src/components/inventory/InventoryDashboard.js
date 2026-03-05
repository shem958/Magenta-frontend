// src/components/inventory/InventoryDashboard.js
"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../../store/slices/inventorySlice";
import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ErrorAlert from "../common/ErrorAlert";
import StatsCard from "../common/StatsCard";
import InventoryList from "./InventoryList";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { items, loading, error } = useSelector((state) => state.inventory);

  const handleRetry = () => {
    dispatch(fetchInventory());
  };

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const totalInventoryValue = items.reduce((acc, item) => acc + (item.value || 0), 0);
  const lowStockAlerts = items.filter(
    (item) => item.stock < item.reorderLevel
  ).length;
  const totalItems = items.length;
  const avgStock = totalItems > 0 ? Math.round(items.reduce((acc, item) => acc + (item.stock || 0), 0) / totalItems) : 0;

  const stockLevelTrends = items.slice(0, 10).map((item) => ({
    name: item.name?.substring(0, 8) || "Item",
    stock: item.stock || 0,
  }));

  const categoryWiseDistribution = items.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + (item.value || 0);
    return acc;
  }, {});
  
  const categoryWiseData = Object.keys(categoryWiseDistribution).map((key) => ({
    name: key,
    value: categoryWiseDistribution[key],
  }));

  const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6", "#8b5cf6"];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box className="page-transition">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1, flexWrap: "wrap" }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Inventory Management
          </Typography>
          <Chip 
            label={`${totalItems} items`} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Track and manage your inventory levels, stock alerts, and product categories.
        </Typography>
      </Box>

      <ErrorAlert
        error={error}
        onRetry={handleRetry}
        title="Failed to load inventory"
      />

      {loading ? (
        <Box className="loading-overlay">
          <CircularProgress size={48} />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Total Inventory Value"
              value={formatCurrency(totalInventoryValue)}
              icon={AttachMoneyIcon}
              color="primary"
              variant="gradient"
              trend="up"
              trendValue="+12%"
              subtitle="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Total Items"
              value={totalItems}
              icon={Inventory2OutlinedIcon}
              color="info"
              trend="up"
              trendValue="+5"
              subtitle="new this week"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Low Stock Alerts"
              value={lowStockAlerts}
              icon={WarningAmberIcon}
              color={lowStockAlerts > 0 ? "warning" : "success"}
              subtitle="items need attention"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Average Stock Level"
              value={avgStock}
              icon={ShoppingCartOutlinedIcon}
              color="secondary"
              subtitle="units per item"
            />
          </Grid>

          {/* Charts */}
          <Grid item xs={12} lg={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Stock Level Overview
              </Typography>
              <Box sx={{ height: { xs: 250, md: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stockLevelTrends}>
                    <defs>
                      <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      stroke="#94a3b8"
                      axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke="#94a3b8"
                      axisLine={{ stroke: "#e2e8f0" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="stock"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#stockGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Category Distribution
              </Typography>
              <Box sx={{ height: { xs: 250, md: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryWiseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={isMobile ? 40 : 60}
                      outerRadius={isMobile ? 70 : 90}
                      paddingAngle={2}
                    >
                      {categoryWiseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => (
                        <span style={{ color: "#64748b", fontSize: 12 }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Inventory List */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                All Inventory Items
              </Typography>
              <InventoryList items={items} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default InventoryDashboard;

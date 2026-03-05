"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinanceData } from "../../store/slices/financeSlice";
import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ErrorAlert from "../common/ErrorAlert";
import StatsCard from "../common/StatsCard";
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
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";

const FinanceDashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { revenue, expenses, debts, loading, error } = useSelector((state) => state.finance);

  const handleRetry = () => {
    dispatch(fetchFinanceData());
  };

  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

  const revenueData = [
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 3000, expenses: 1398 },
    { name: "Mar", revenue: 2000, expenses: 9800 },
    { name: "Apr", revenue: 2780, expenses: 3908 },
    { name: "May", revenue: 1890, expenses: 4800 },
    { name: "Jun", revenue: 2390, expenses: 3800 },
    { name: "Jul", revenue: 3490, expenses: 4300 },
    { name: "Aug", revenue: 4000, expenses: 2400 },
    { name: "Sep", revenue: 2780, expenses: 3908 },
    { name: "Oct", revenue: 1890, expenses: 4800 },
    { name: "Nov", revenue: 2390, expenses: 3800 },
    { name: "Dec", revenue: 3490, expenses: 4300 },
  ];

  const expenseData = [
    { name: "Salaries", value: 45000, color: "#6366f1" },
    { name: "Rent", value: 12000, color: "#ec4899" },
    { name: "Utilities", value: 5000, color: "#10b981" },
    { name: "Marketing", value: 8000, color: "#f59e0b" },
    { name: "Other", value: 5000, color: "#3b82f6" },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const quickActions = [
    { label: "Add Transaction", icon: <AddIcon />, color: "primary" },
    { label: "Generate Report", icon: <CalculateIcon />, color: "secondary" },
    { label: "Export Data", icon: <DownloadIcon />, color: "info" },
  ];

  return (
    <Box className="page-transition">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1, flexWrap: "wrap" }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Finance Overview
          </Typography>
          <Chip
            label={netProfit >= 0 ? "Profitable" : "Loss"}
            size="small"
            color={netProfit >= 0 ? "success" : "error"}
            variant="filled"
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Track revenue, expenses, and financial performance metrics.
        </Typography>
      </Box>

      <ErrorAlert
        error={error}
        onRetry={handleRetry}
        title="Failed to load finance data"
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
              title="Total Revenue"
              value={formatCurrency(revenue || totalRevenue)}
              icon={AttachMoneyIcon}
              color="primary"
              variant="gradient"
              trend="up"
              trendValue="+12.5%"
              subtitle="vs last year"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Total Expenses"
              value={formatCurrency(expenses || totalExpenses)}
              icon={ReceiptLongIcon}
              color="secondary"
              trend="down"
              trendValue="-3.2%"
              subtitle="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Net Profit"
              value={formatCurrency(netProfit)}
              icon={netProfit >= 0 ? TrendingUpIcon : TrendingDownIcon}
              color={netProfit >= 0 ? "success" : "error"}
              subtitle={`${profitMargin}% margin`}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Outstanding Debts"
              value={formatCurrency(debts || 15000)}
              icon={AccountBalanceWalletIcon}
              color="warning"
              subtitle="due this month"
            />
          </Grid>

          {/* Revenue Chart */}
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
                Revenue vs Expenses
              </Typography>
              <Box sx={{ height: { xs: 250, md: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#ec4899"
                      strokeWidth={2}
                      fill="url(#expensesGradient)"
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Expense Breakdown */}
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
                Expense Breakdown
              </Typography>
              <Box sx={{ height: { xs: 250, md: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={isMobile ? 40 : 60}
                      outerRadius={isMobile ? 70 : 90}
                      paddingAngle={2}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                      }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* KPI Cards */}
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
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Financial KPIs
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "primary.light",
                      color: "#fff",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700}>
                      {profitMargin}%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Profit Margin
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                      <TrendingUpIcon fontSize="small" />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "success.light",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="success.dark">
                      {formatCurrency(12000)}
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                      Cash Flow
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1, color: "success.dark" }}>
                      <TrendingUpIcon fontSize="small" />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "warning.light",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="warning.dark">
                      30%
                    </Typography>
                    <Typography variant="body2" color="warning.dark">
                      Debt Ratio
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1, color: "warning.dark" }}>
                      <TrendingDownIcon fontSize="small" />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "info.light",
                    }}
                  >
                    <Typography variant="h4" fontWeight={700} color="info.dark">
                      2.4x
                    </Typography>
                    <Typography variant="body2" color="info.dark">
                      Current Ratio
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 1, color: "info.dark" }}>
                      <TrendingUpIcon fontSize="small" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Quick Actions */}
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
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "contained" : "outlined"}
                    color={action.color}
                    startIcon={action.icon}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FinanceDashboard;

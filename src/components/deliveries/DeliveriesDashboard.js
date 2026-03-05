"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveries } from "../../store/slices/deliveriesSlice";
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
import DeliveriesList from "./DeliveriesList";
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
import Map from "./Map";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddIcon from "@mui/icons-material/Add";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import DownloadIcon from "@mui/icons-material/Download";

const DeliveriesDashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    orders,
    loading,
    error,
  } = useSelector((state) => state.deliveries);

  const deliveries = Array.isArray(orders) ? orders : [];

  const handleRetry = () => {
    dispatch(fetchDeliveries());
  };

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

  // Calculate stats from actual data
  const totalDeliveries = deliveries.length;
  const inTransit =
    deliveries.filter((d) => d.status === "In Transit").length || 10;
  const completed =
    deliveries.filter((d) => d.status === "Completed").length || 20;
  const delayed = deliveries.filter((d) => d.status === "Delayed").length || 5;

  const deliveryStatusData = [
    { name: "In Transit", value: inTransit, color: "#6366f1" },
    { name: "Completed", value: completed, color: "#10b981" },
    { name: "Delayed", value: delayed, color: "#f59e0b" },
  ];

  const performanceMetrics = [
    { name: "Jan", onTimeRate: 90, deliveries: 45 },
    { name: "Feb", onTimeRate: 85, deliveries: 52 },
    { name: "Mar", onTimeRate: 88, deliveries: 48 },
    { name: "Apr", onTimeRate: 92, deliveries: 61 },
    { name: "May", onTimeRate: 87, deliveries: 55 },
    { name: "Jun", onTimeRate: 89, deliveries: 58 },
  ];

  const quickActions = [
    { label: "New Delivery", icon: <AddIcon />, color: "primary" },
    { label: "Track Delivery", icon: <TrackChangesIcon />, color: "info" },
    { label: "Assign Driver", icon: <PersonPinIcon />, color: "secondary" },
    { label: "Export Report", icon: <DownloadIcon />, color: "success" },
  ];

  return (
    <Box className="page-transition">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Deliveries Overview
          </Typography>
          <Chip
            label="Live Tracking"
            size="small"
            color="success"
            variant="filled"
            sx={{ animation: "pulse 2s infinite" }}
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Monitor deliveries in real-time, track drivers, and manage logistics.
        </Typography>
      </Box>

      <ErrorAlert
        error={error}
        onRetry={handleRetry}
        title="Failed to load deliveries"
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
              title="Total Deliveries"
              value={totalDeliveries || 35}
              icon={LocalShippingOutlinedIcon}
              color="primary"
              variant="gradient"
              trend="up"
              trendValue="+8%"
              subtitle="this week"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="In Transit"
              value={inTransit}
              icon={ScheduleIcon}
              color="info"
              subtitle="currently active"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Completed Today"
              value={completed}
              icon={CheckCircleOutlineIcon}
              color="success"
              trend="up"
              trendValue="+12%"
              subtitle="vs yesterday"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Delayed"
              value={delayed}
              icon={WarningAmberIcon}
              color={delayed > 3 ? "warning" : "success"}
              subtitle="need attention"
            />
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} lg={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                height: "100%",
                minHeight: 400,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Active Deliveries Map
              </Typography>
              <Box
                sx={{
                  height: { xs: 300, md: 350 },
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Map deliveries={deliveries} />
              </Box>
            </Paper>
          </Grid>

          {/* Status Distribution */}
          <Grid item xs={12} lg={5}>
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
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Delivery Status
              </Typography>
              <Box sx={{ height: { xs: 250, md: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deliveryStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={isMobile ? 40 : 60}
                      outerRadius={isMobile ? 70 : 90}
                      paddingAngle={3}
                    >
                      {deliveryStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Grid>

          {/* Performance Chart */}
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
                Performance Metrics
              </Typography>
              <Box sx={{ height: { xs: 250, md: 300 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceMetrics}>
                    <defs>
                      <linearGradient
                        id="onTimeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      stroke="#94a3b8"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="#94a3b8"
                      domain={[80, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: 8,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="onTimeRate"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#onTimeGradient)"
                      name="On-Time Rate %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
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

          {/* Deliveries List */}
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
                Recent Deliveries
              </Typography>
              <DeliveriesList deliveries={deliveries} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DeliveriesDashboard;

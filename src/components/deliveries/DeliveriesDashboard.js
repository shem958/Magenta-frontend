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
  Grid,
  Button,
} from "@mui/material";
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
} from "recharts";
import Map from "./Map"; // Import the Map component

const DeliveriesDashboard = () => {
  const dispatch = useDispatch();
  const { deliveries, loading } = useSelector((state) => state.deliveries);

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, [dispatch]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const deliveryStatusData = [
    { name: "In Transit", value: 10 },
    { name: "Completed", value: 20 },
    { name: "Delayed", value: 5 },
  ];

  const performanceMetrics = [
    { name: "Jan", onTimeRate: 90 },
    { name: "Feb", onTimeRate: 85 },
    { name: "Mar", onTimeRate: 88 },
    { name: "Apr", onTimeRate: 92 },
    { name: "May", onTimeRate: 87 },
    { name: "Jun", onTimeRate: 89 },
  ];

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
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Key Metrics
                  </Typography>
                  <Typography variant="body1">
                    Total Active Deliveries: 15
                  </Typography>
                  <Typography variant="body1">
                    Deliveries in Transit: 10
                  </Typography>
                  <Typography variant="body1">
                    Completed Deliveries Today: 20
                  </Typography>
                  <Typography variant="body1">
                    Delayed/Problematic Deliveries: 5
                  </Typography>
                  <Typography variant="body1">
                    Average Delivery Time: 45 mins
                  </Typography>
                  <Typography variant="body1">
                    On-time Delivery Rate: 90%
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Active Deliveries Map
                  </Typography>
                  <Map deliveries={deliveries} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Delivery Status Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deliveryStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {deliveryStatusData.map((entry, index) => (
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
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceMetrics}>
                      <Line
                        type="monotone"
                        dataKey="onTimeRate"
                        stroke="#8884d8"
                      />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Deliveries List
                  </Typography>
                  <DeliveriesList deliveries={deliveries} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Create New Delivery
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Track Specific Delivery
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Assign/Reassign Drivers
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Schedule Future Deliveries
                  </Button>
                  <Button variant="contained" color="primary">
                    Generate Reports
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

export default DeliveriesDashboard;

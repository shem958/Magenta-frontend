"use client";

import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  TrendingUp,
  LocalShipping,
  People,
  Inventory,
  ArrowForward,
  TrendingDown,
} from "@mui/icons-material";
import Link from "next/link";

interface StatCardProps {
  value: string | number;
  label: string;
  change: number;
}

const StatCard = ({ value, label, change }: StatCardProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h4" fontWeight={700} sx={{ color: "text.primary" }}>
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {change > 0 ? (
        <TrendingUp sx={{ fontSize: 18, color: "success.main" }} />
      ) : (
        <TrendingDown sx={{ fontSize: 18, color: "error.main" }} />
      )}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: change > 0 ? "success.main" : "error.main",
        }}
      >
        {change > 0 ? "+" : ""}
        {change}%
      </Typography>
      <Typography variant="body2" color="text.secondary">
        vs last month
      </Typography>
    </Box>
  </Box>
);

export default function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const sections = [
    {
      title: "Finance",
      path: "/finance",
      description: "Track revenue, expenses, and financial KPIs.",
      icon: <TrendingUp />,
      stats: { value: "$45,289", label: "Monthly Revenue", change: 12.3 },
      gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    },
    {
      title: "Deliveries",
      path: "/deliveries",
      description: "Manage and track deliveries in real-time.",
      icon: <LocalShipping />,
      stats: { value: "1,234", label: "Active Deliveries", change: -2.5 },
      gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    },
    {
      title: "Employees",
      path: "/employees",
      description: "Manage your team and track performance.",
      icon: <People />,
      stats: { value: "89", label: "Active Employees", change: 5.7 },
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    },
    {
      title: "Inventory",
      path: "/inventory",
      description: "Keep track of inventory and stock levels.",
      icon: <Inventory />,
      stats: { value: "3,456", label: "Items in Stock", change: 3.2 },
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    },
  ];

  return (
    <Box className="page-transition">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here&apos;s what&apos;s happening with your business today.
        </Typography>
      </Box>

      {/* Quick Stats Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          color: "#fff",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                Total Revenue
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                $124,500
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                Active Orders
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                342
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                Team Members
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                89
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                Inventory Items
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                3,456
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Section Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {sections.map(({ title, path, description, icon, stats, gradient }) => (
          <Grid key={title} item xs={12} sm={6} lg={3}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
                  borderColor: "primary.main",
                },
              }}
            >
              {/* Icon Header */}
              <Box
                sx={{
                  p: 2,
                  background: gradient,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    width: 48,
                    height: 48,
                  }}
                >
                  {icon}
                </Avatar>
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                  {title}
                </Typography>
              </Box>

              {/* Content */}
              <Box sx={{ p: 3, flex: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {description}
                </Typography>
                <StatCard
                  value={stats.value}
                  label={stats.label}
                  change={stats.change}
                />
              </Box>

              {/* Action */}
              <Box sx={{ p: 2, pt: 0 }}>
                <Link href={path} passHref style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 500,
                      py: 1,
                    }}
                  >
                    View Details
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

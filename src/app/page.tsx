"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Avatar,
  IconButton,
  Chip,
  useTheme,
  Grid,
} from "@mui/material";
import {
  TrendingUp,
  LocalShipping,
  People,
  Inventory,
  ArrowForward,
  AccountCircle,
  Notifications,
} from "@mui/icons-material";
import Link from "next/link";

interface StatCardProps {
  value: string | number;
  label: string;
  change: number;
}

const StatCard = ({ value, label, change }: StatCardProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Chip
      size="small"
      label={`${change > 0 ? "+" : ""}${change}%`}
      color={change > 0 ? "success" : "error"}
      sx={{ mt: 1 }}
    />
  </Box>
);

export default function Page() {
  const theme = useTheme();
  const sections = [
    {
      title: "Finance",
      path: "/finance",
      description: "Track revenue, expenses, and debts.",
      icon: <TrendingUp />,
      stats: { value: "$45,289", label: "Monthly Revenue", change: 12.3 },
    },
    {
      title: "Deliveries",
      path: "/deliveries",
      description: "Manage and track deliveries easily.",
      icon: <LocalShipping />,
      stats: { value: "1,234", label: "Active Deliveries", change: -2.5 },
    },
    {
      title: "Employees",
      path: "/employees",
      description: "Manage employee records and information.",
      icon: <People />,
      stats: { value: "89", label: "Active Employees", change: 5.7 },
    },
    {
      title: "Inventory",
      path: "/inventory",
      description: "Keep track of inventory levels and stock.",
      icon: <Inventory />,
      stats: { value: "3,456", label: "Items in Stock", change: 3.2 },
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Dashboard Overview
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={3}>
        {sections.map(({ title, path, description, icon, stats }) => (
          <Grid key={title} xs={12} sm={6} md={4} lg={3} item>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                    {icon}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {title}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {description}
                </Typography>
                <StatCard
                  value={stats.value}
                  label={stats.label}
                  change={stats.change}
                />
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Link href={path} passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    endIcon={<ArrowForward />}
                  >
                    View Details
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

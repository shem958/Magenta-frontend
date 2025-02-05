// Homepage component
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
  IconButton,
  Chip,
  useTheme,
} from "@mui/material";
import {
  TrendingUp,
  LocalShipping,
  People,
  Inventory,
  ArrowForward,
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

export default function Dashboard() {
  const theme = useTheme();

  const sections = [
    {
      title: "Finance",
      path: "/finance",
      description: "Track revenue, expenses, and debts",
      icon: <TrendingUp />,
      stats: { value: "$45,289", label: "Monthly Revenue", change: 12.3 },
    },
    {
      title: "Deliveries",
      path: "/deliveries",
      description: "Manage and track deliveries in real-time",
      icon: <LocalShipping />,
      stats: { value: "1,234", label: "Active Deliveries", change: -2.5 },
    },
    {
      title: "Employees",
      path: "/employees",
      description: "Manage employee records and performance",
      icon: <People />,
      stats: { value: "89", label: "Active Employees", change: 5.7 },
    },
    {
      title: "Inventory",
      path: "/inventory",
      description: "Monitor stock levels and movements",
      icon: <Inventory />,
      stats: { value: "3,456", label: "Items in Stock", change: 8.2 },
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography color="text.secondary">
          Welcome back! Here&apos;s what&apos;s happening today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sections.map(({ title, path, description, icon, stats }) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Card
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      "&:hover": { bgcolor: theme.palette.primary.dark },
                    }}
                  >
                    {icon}
                  </IconButton>
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {title}
                  </Typography>
                </Box>

                <StatCard {...stats} />

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {description}
                </Typography>

                <Link href={path} passHref style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

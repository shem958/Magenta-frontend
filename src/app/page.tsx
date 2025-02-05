import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import Link from "next/link";

export default function Page() {
  const sections = [
    {
      title: "Finance",
      path: "/finance",
      description: "Track revenue, expenses, and debts.",
    },
    {
      title: "Deliveries",
      path: "/deliveries",
      description: "Manage and track deliveries easily.",
    },
    {
      title: "Employees",
      path: "/employees",
      description: "Manage employee records and information.",
    },
    {
      title: "Inventory",
      path: "/inventory",
      description: "Keep track of inventory levels and stock.",
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Welcome to Magenta Dashboard
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 column for small screens
            sm: "repeat(2, 1fr)", // 2 columns for medium screens
            md: "repeat(3, 1fr)", // 3 columns for larger screens
            lg: "repeat(4, 1fr)", // 4 columns for extra-large screens
          },
          gap: 3, // spacing between items
          mt: 4,
        }}
      >
        {sections.map(({ title, path, description }) => (
          <Card
            key={title}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" paragraph>
                {description}
              </Typography>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Link href={path} passHref>
                <Button variant="contained" color="primary" fullWidth>
                  Go to {title}
                </Button>
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

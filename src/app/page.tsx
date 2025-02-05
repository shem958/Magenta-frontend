import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
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
      <Grid2 container spacing={3}>
        {sections.map(({ title, path, description }) => (
          <Grid2 key={title} component="div" sx={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" component="p">
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
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

"use client";
import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to Magenta
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage your wholesale business efficiently.
      </Typography>

      <Stack
        spacing={3}
        direction={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {[
          {
            title: "Inventory",
            path: "/inventory",
            description: "Manage stock and track updates.",
          },
          {
            title: "Employees",
            path: "/employees",
            description: "Monitor employee details and payroll.",
          },
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
        ].map(({ title, path, description }) => (
          <Box key={title} width={{ xs: "100%", sm: "45%", md: "22%" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {description}
                </Typography>
                <Link href={path} passHref>
                  <Button variant="contained" color="primary">
                    Go to {title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}

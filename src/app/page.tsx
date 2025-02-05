import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
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
    <Container>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        {sections.map(({ title, path, description }) => (
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

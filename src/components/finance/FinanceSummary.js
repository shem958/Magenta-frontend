"use client";
import { Card, CardContent, Typography, Box } from "@mui/material";

const FinanceSummary = ({ data = {} }) => {
  return (
    <Card sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Finance Summary
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Total Revenue:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${data.totalRevenue || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Total Expenses:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${data.totalExpenses || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body1" color="textSecondary">
            Outstanding Debt:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${data.outstandingDebt || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinanceSummary;

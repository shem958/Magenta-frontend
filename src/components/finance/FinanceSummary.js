"use client";
import { Card, CardContent, Typography } from "@mui/material";

const FinanceSummary = ({ data = {} }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Total Revenue: ${data.totalRevenue || 0}
        </Typography>
        <Typography variant="h6">
          Total Expenses: ${data.totalExpenses || 0}
        </Typography>
        <Typography variant="h6">
          Outstanding Debt: ${data.outstandingDebt || 0}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FinanceSummary;

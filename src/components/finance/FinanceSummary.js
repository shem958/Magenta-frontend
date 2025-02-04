"use client";
import { Card, CardContent, Typography } from "@mui/material";

const FinanceSummary = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Total Revenue: ${data.totalRevenue}
        </Typography>
        <Typography variant="h6">
          Total Expenses: ${data.totalExpenses}
        </Typography>
        <Typography variant="h6">
          Outstanding Debt: ${data.outstandingDebt}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FinanceSummary;

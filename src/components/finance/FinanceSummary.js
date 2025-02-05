"use client";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SaveAlt } from "@mui/icons-material";

const FinanceSummary = ({ data = {} }) => {
  const [dateRange, setDateRange] = useState("YTD");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Implement data filtering based on date range
    const filterData = () => {
      // Example filtering logic (to be replaced with actual logic)
      if (dateRange === "YTD") {
        setFilteredData(data);
      } else {
        // Filter data based on the selected date range
        const filtered = {
          totalRevenue: data.totalRevenue * 0.25, // Example calculation
          totalExpenses: data.totalExpenses * 0.25, // Example calculation
          outstandingDebt: data.outstandingDebt,
          revenueChange: data.revenueChange,
          expensesChange: data.expensesChange,
          profitMargin: data.profitMargin,
          ytdTotalRevenue: data.ytdTotalRevenue,
          ytdTotalExpenses: data.ytdTotalExpenses,
          operatingExpensesRatio: data.operatingExpensesRatio,
          grossProfitMargin: data.grossProfitMargin,
          netProfitMargin: data.netProfitMargin,
          currentRatio: data.currentRatio,
          quickRatio: data.quickRatio,
          debtToEquityRatio: data.debtToEquityRatio,
        };
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [dateRange, data]);

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting data...");
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <Card sx={{ bgcolor: "#f5f5f5", borderRadius: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Finance Summary
          </Typography>
          <IconButton onClick={handleExport} color="primary">
            <SaveAlt />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Total Revenue:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${filteredData.totalRevenue || 0} ({filteredData.revenueChange || 0}
            %)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Total Expenses:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${filteredData.totalExpenses || 0} (
            {filteredData.expensesChange || 0}%)
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Outstanding Debt:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${filteredData.outstandingDebt || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Profit Margin:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.profitMargin || 0}%
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            YTD Total Revenue:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${filteredData.ytdTotalRevenue || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            YTD Total Expenses:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            ${filteredData.ytdTotalExpenses || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Operating Expenses Ratio:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.operatingExpensesRatio || 0}%
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Gross Profit Margin:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.grossProfitMargin || 0}%
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Net Profit Margin:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.netProfitMargin || 0}%
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Current Ratio:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.currentRatio || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Quick Ratio:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.quickRatio || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1" color="textSecondary">
            Debt-to-Equity Ratio:
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {filteredData.debtToEquityRatio || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => handleDateRangeChange("YTD")}
          >
            YTD
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDateRangeChange("Q1")}
          >
            Q1
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDateRangeChange("Q2")}
          >
            Q2
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDateRangeChange("Q3")}
          >
            Q3
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleDateRangeChange("Q4")}
          >
            Q4
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinanceSummary;

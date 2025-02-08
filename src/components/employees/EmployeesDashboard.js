"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/slices/employeesSlice";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import EmployeesList from "./EmployeesList";

const EmployeesDashboard = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const totalEmployees = employees.length;
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active"
  ).length;
  const inactiveEmployees = employees.filter(
    (emp) => emp.status === "Inactive"
  ).length;
  const newHiresThisMonth = employees.filter(
    (emp) => new Date(emp.hireDate).getMonth() === new Date().getMonth()
  ).length;
  const upcomingBirthdays = employees.filter(
    (emp) => new Date(emp.birthDate).getMonth() === new Date().getMonth()
  );
  const attendanceRate = 95; // Example static value
  const performanceMetrics = { averageRating: 4.2 }; // Example static value

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Management
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Overview Stats
                  </Typography>
                  <Typography variant="body1">
                    Total Employees: {totalEmployees}
                  </Typography>
                  <Typography variant="body1">
                    Departments: {departments.join(", ")}
                  </Typography>
                  <Typography variant="body1">
                    Active Employees: {activeEmployees}
                  </Typography>
                  <Typography variant="body1">
                    Inactive Employees: {inactiveEmployees}
                  </Typography>
                  <Typography variant="body1">
                    New Hires This Month: {newHiresThisMonth}
                  </Typography>
                  <Typography variant="body1">
                    Upcoming Birthdays:{" "}
                    {upcomingBirthdays.map((emp) => emp.name).join(", ")}
                  </Typography>
                  <Typography variant="body1">
                    Attendance Rate: {attendanceRate}%
                  </Typography>
                  <Typography variant="body1">
                    Performance Metrics: Avg Rating{" "}
                    {performanceMetrics.averageRating}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Add New Employee
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Generate Reports
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Schedule Reviews
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Approve Leave Requests
                  </Button>
                  <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    View Department Schedules
                  </Button>
                  <Button variant="contained" color="primary">
                    Mass Update Options
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <EmployeesList employees={employees} />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default EmployeesDashboard;

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/slices/employeesSlice";
import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Grid,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ErrorAlert from "../common/ErrorAlert";
import StatsCard from "../common/StatsCard";
import EmployeesList from "./EmployeesList";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AddIcon from "@mui/icons-material/Add";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EmployeesDashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { list, loading, error } = useSelector((state) => state.employees);

  const employees = Array.isArray(list) ? list : [];

  const handleRetry = () => {
    dispatch(fetchEmployees());
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const totalEmployees = employees.length;
  const departments = [
    ...new Set(employees.map((emp) => emp.department).filter(Boolean)),
  ];
  const activeEmployees = employees.filter(
    (emp) => emp.status === "Active",
  ).length;
  const newHiresThisMonth = employees.filter(
    (emp) => new Date(emp.hireDate).getMonth() === new Date().getMonth(),
  ).length;
  const attendanceRate = 95;

  const quickActions = [
    { label: "Add Employee", icon: <AddIcon />, color: "primary" },
    {
      label: "Generate Reports",
      icon: <AssessmentOutlinedIcon />,
      color: "secondary",
    },
    {
      label: "Schedule Reviews",
      icon: <EventNoteOutlinedIcon />,
      color: "info",
    },
    {
      label: "Approve Requests",
      icon: <CheckCircleOutlineIcon />,
      color: "success",
    },
  ];

  return (
    <Box className="page-transition">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Employee Management
          </Typography>
          <Chip
            label={`${departments.length} departments`}
            size="small"
            color="secondary"
            variant="outlined"
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage your team, track performance, and handle HR operations.
        </Typography>
      </Box>

      <ErrorAlert
        error={error}
        onRetry={handleRetry}
        title="Failed to load employees"
      />

      {loading ? (
        <Box className="loading-overlay">
          <CircularProgress size={48} />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Total Employees"
              value={totalEmployees}
              icon={PeopleOutlinedIcon}
              color="primary"
              variant="gradient"
              trend="up"
              trendValue="+3"
              subtitle="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Active Employees"
              value={activeEmployees}
              icon={WorkOutlineIcon}
              color="success"
              subtitle={`${Math.round((activeEmployees / totalEmployees) * 100) || 0}% of total`}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="New Hires"
              value={newHiresThisMonth}
              icon={PersonAddOutlinedIcon}
              color="info"
              subtitle="this month"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatsCard
              title="Attendance Rate"
              value={`${attendanceRate}%`}
              icon={TrendingUpIcon}
              color="secondary"
              trend="up"
              trendValue="+2%"
              subtitle="vs last week"
            />
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "contained" : "outlined"}
                    color={action.color}
                    startIcon={action.icon}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      fontWeight: 500,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Departments Overview */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Departments
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {departments.length > 0 ? (
                  departments.slice(0, 5).map((dept, index) => {
                    const deptEmployees = employees.filter(
                      (e) => e.department === dept,
                    );
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "grey.50",
                          "&:hover": { bgcolor: "grey.100" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: `hsl(${index * 60}, 70%, 50%)`,
                              fontSize: 14,
                            }}
                          >
                            {dept?.charAt(0) || "?"}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {dept}
                          </Typography>
                        </Box>
                        <Chip
                          label={deptEmployees.length}
                          size="small"
                          sx={{ minWidth: 40 }}
                        />
                      </Box>
                    );
                  })
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No departments found
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Recent Team Members */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Team Overview
                </Typography>
                <AvatarGroup
                  max={5}
                  sx={{
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      fontSize: 14,
                    },
                  }}
                >
                  {employees.slice(0, 6).map((emp, index) => (
                    <Avatar
                      key={index}
                      sx={{ bgcolor: `hsl(${index * 50}, 60%, 50%)` }}
                    >
                      {emp.name?.charAt(0) || "?"}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: 2,
                      color: "#fff",
                    }}
                  >
                    <Typography variant="h5" fontWeight={700}>
                      {totalEmployees}
                    </Typography>
                    <Typography variant="caption">Total</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "success.light",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="success.dark"
                    >
                      {activeEmployees}
                    </Typography>
                    <Typography variant="caption" color="success.dark">
                      Active
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "info.light",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} color="info.dark">
                      {newHiresThisMonth}
                    </Typography>
                    <Typography variant="caption" color="info.dark">
                      New Hires
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "warning.light",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="warning.dark"
                    >
                      {departments.length}
                    </Typography>
                    <Typography variant="caption" color="warning.dark">
                      Departments
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Employees List */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                All Employees
              </Typography>
              <EmployeesList employees={employees} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EmployeesDashboard;

"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "../../redux/slices/employeesSlice";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Avatar,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEmployee, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployee(id));
  }, [dispatch, id]);

  if (loading || !selectedEmployee) {
    return (
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
    );
  }

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            src={selectedEmployee.profilePhoto}
            sx={{ bgcolor: "primary.main", mr: 2, width: 56, height: 56 }}
          >
            <PersonIcon />
          </Avatar>
          <Typography variant="h5">{selectedEmployee.name}</Typography>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ ml: "auto" }}
          >
            Edit
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1">
              <strong>Contact:</strong> {selectedEmployee.contact}
            </Typography>
            <Typography variant="body1">
              <strong>Emergency Contact:</strong>{" "}
              {selectedEmployee.emergencyContact}
            </Typography>
            <Typography variant="body1">
              <strong>Department/Role:</strong> {selectedEmployee.department} /{" "}
              {selectedEmployee.role}
            </Typography>
            <Typography variant="body1">
              <strong>Reporting Manager:</strong>{" "}
              {selectedEmployee.reportingManager}
            </Typography>
            <Typography variant="body1">
              <strong>Employment Status:</strong> {selectedEmployee.status}
            </Typography>
            <Typography variant="body1">
              <strong>Join Date:</strong>{" "}
              {new Date(selectedEmployee.joinDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Professional Details
            </Typography>
            <Typography variant="body1">
              <strong>Performance History:</strong>{" "}
              {selectedEmployee.performanceHistory}
            </Typography>
            <Typography variant="body1">
              <strong>Attendance Record:</strong>{" "}
              {selectedEmployee.attendanceRecord}
            </Typography>
            <Typography variant="body1">
              <strong>Skills/Certifications:</strong>{" "}
              {selectedEmployee.skills.join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Training Completed:</strong>{" "}
              {selectedEmployee.trainingCompleted.join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Project Assignments:</strong>{" "}
              {selectedEmployee.projectAssignments.join(", ")}
            </Typography>
            <Typography variant="body1">
              <strong>Leave Balance:</strong> {selectedEmployee.leaveBalance}
            </Typography>
            <Typography variant="body1">
              <strong>Documents/Files:</strong>{" "}
              {selectedEmployee.documents.join(", ")}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary">
            Performance Review History
          </Button>
          <Button variant="contained" color="primary">
            Salary Revision History
          </Button>
          <Button variant="contained" color="primary">
            Leave Management
          </Button>
          <Button variant="contained" color="primary">
            Training Records
          </Button>
          <Button variant="contained" color="primary">
            Upload Documents
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeDetail;

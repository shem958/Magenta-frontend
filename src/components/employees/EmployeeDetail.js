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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

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
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5">{selectedEmployee.name}</Typography>
        </Box>
        <Typography variant="body1" gutterBottom>
          Position: {selectedEmployee.position}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Salary: {selectedEmployee.salary}
        </Typography>
      </Paper>
    </Container>
  );
};

export default EmployeeDetail;

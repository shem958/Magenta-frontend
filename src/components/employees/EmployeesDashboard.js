"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../store/slices/employeesSlice";
import { Container, Typography } from "@mui/material";
import EmployeesList from "./EmployeesList";

const EmployeesDashboard = () => {
  const dispatch = useDispatch();
  const { employees, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <EmployeesList employees={employees} />
      )}
    </Container>
  );
};

export default EmployeesDashboard;

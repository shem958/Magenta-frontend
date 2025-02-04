"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "../../redux/slices/employeesSlice";
import { useParams } from "next/navigation";
import { Container, Typography, Paper } from "@mui/material";

const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedEmployee, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployee(id));
  }, [dispatch, id]);

  if (loading || !selectedEmployee) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">{selectedEmployee.name}</Typography>
        <Typography>Position: {selectedEmployee.position}</Typography>
        <Typography>Salary: {selectedEmployee.salary}</Typography>
      </Paper>
    </Container>
  );
};

export default EmployeeDetail;

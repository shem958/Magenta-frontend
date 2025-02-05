"use client";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";

const EmployeesList = ({ employees = [] }) => {
  return (
    <Paper>
      <List>
        {employees.map((employee) => (
          <ListItem
            button
            component={Link}
            key={employee.id}
            href={`/employees/${employee.id}`}
          >
            <ListItemText primary={employee.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EmployeesList;

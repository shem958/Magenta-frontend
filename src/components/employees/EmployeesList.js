"use client";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";

const EmployeesList = ({ employees }) => {
  return (
    <Paper>
      <List>
        {employees.map((employee) => (
          <ListItem
            button
            component={Link}
            href={`/employees/${employee._id}`}
            key={employee._id}
          >
            <ListItemText
              primary={employee.name}
              secondary={`Position: ${employee.position}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EmployeesList;

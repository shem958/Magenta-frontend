"use client";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Box,
} from "@mui/material";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";

const EmployeesList = ({ employees = [] }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <List>
        {employees.map((employee) => (
          <Box key={employee.id}>
            <ListItem
              button
              component={Link}
              href={`/employees/${employee.id}`}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={employee.name}
                secondary={employee.position}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default EmployeesList;

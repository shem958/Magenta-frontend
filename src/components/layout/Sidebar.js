"use client";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Employees" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

"use client";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";

const InventoryList = ({ items }) => {
  return (
    <Paper>
      <List>
        {items.map((item) => (
          <ListItem
            button
            component={Link}
            href={`/inventory/${item._id}`}
            key={item._id}
          >
            <ListItemText
              primary={item.name}
              secondary={`Stock: ${item.stock}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default InventoryList;

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
import InventoryIcon from "@mui/icons-material/Inventory";

const InventoryList = ({ items = [] }) => {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <List>
        {items.map((item) => (
          <Box key={item._id}>
            <ListItem button component={Link} href={`/inventory/${item._id}`}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <InventoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name}
                secondary={`Stock: ${item.stock}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default InventoryList;

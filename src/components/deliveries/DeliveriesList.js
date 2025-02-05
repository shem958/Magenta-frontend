"use client";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const DeliveriesList = ({ deliveries = [] }) => {
  return (
    <List>
      {deliveries.map((delivery) => (
        <Box key={delivery.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <LocalShippingIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Order: ${delivery.orderId}`}
              secondary={`Status: ${delivery.status}`}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
  );
};

export default DeliveriesList;

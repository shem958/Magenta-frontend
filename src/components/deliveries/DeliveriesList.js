"use client";
import { List, ListItem, ListItemText } from "@mui/material";

const DeliveriesList = ({ deliveries }) => {
  return (
    <List>
      {deliveries.map((delivery) => (
        <ListItem key={delivery.id}>
          <ListItemText
            primary={`Order: ${delivery.orderId} - Status: ${delivery.status}`}
            secondary={`Destination: ${delivery.destination} | ETA: ${delivery.eta}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default DeliveriesList;

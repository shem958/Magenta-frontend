"use client";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f1f1f1" }}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Magenta. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

"use client";
import { Box, Typography, Link, Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#333", color: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Magenta
            </Typography>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Magenta. All rights reserved.
            </Typography>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" color="inherit" underline="none">
              About Us
            </Link>
            <br />
            <Link href="/contact" color="inherit" underline="none">
              Contact Us
            </Link>
            <br />
            <Link href="/privacy" color="inherit" underline="none">
              Privacy Policy
            </Link>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://facebook.com" color="inherit" underline="none">
              Facebook
            </Link>
            <br />
            <Link href="https://twitter.com" color="inherit" underline="none">
              Twitter
            </Link>
            <br />
            <Link href="https://instagram.com" color="inherit" underline="none">
              Instagram
            </Link>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;

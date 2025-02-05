"use client";

import { Box, Typography, Link, Container, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#333",
        color: "#fff",
        py: 4,
        mt: "auto",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Magenta
            </Typography>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Magenta. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="https://facebook.com"
                color="inherit"
                aria-label="Facebook"
              >
                <Facebook />
              </Link>
              <Link
                href="https://twitter.com"
                color="inherit"
                aria-label="Twitter"
              >
                <Twitter />
              </Link>
              <Link
                href="https://instagram.com"
                color="inherit"
                aria-label="Instagram"
              >
                <Instagram />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;

"use client";

import {
  Box,
  Typography,
  Link,
  Container,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FacebookIcon />, href: "https://facebook.com", label: "Facebook" },
    { icon: <TwitterIcon />, href: "https://twitter.com", label: "Twitter" },
    {
      icon: <InstagramIcon />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    { icon: <LinkedInIcon />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "grey.300",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "1.1rem",
                }}
              >
                M
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Magenta
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "grey.400", mb: 3, maxWidth: 280 }}
            >
              Streamline your business operations with our comprehensive
              management suite.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  sx={{
                    color: "grey.400",
                    bgcolor: "rgba(255,255,255,0.05)",
                    "&:hover": {
                      color: "#fff",
                      bgcolor: "primary.main",
                    },
                  }}
                  size="small"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: "grey.400",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.light" },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
            >
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link
                href="/docs"
                underline="none"
                sx={{
                  color: "grey.400",
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.light" },
                }}
              >
                Documentation
              </Link>
              <Link
                href="/help"
                underline="none"
                sx={{
                  color: "grey.400",
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.light" },
                }}
              >
                Help Center
              </Link>
              <Link
                href="/api"
                underline="none"
                sx={{
                  color: "grey.400",
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.light" },
                }}
              >
                API Reference
              </Link>
              <Link
                href="/changelog"
                underline="none"
                sx={{
                  color: "grey.400",
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.light" },
                }}
              >
                Changelog
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#fff", fontWeight: 600, mb: 2 }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              support@magenta.com
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400" }}>
              123 Business Ave, Suite 100
              <br />
              San Francisco, CA 94102
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.500" }}>
            © {currentYear} Magenta. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="/privacy"
              underline="none"
              sx={{
                color: "grey.500",
                fontSize: "0.8125rem",
                "&:hover": { color: "grey.300" },
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              underline="none"
              sx={{
                color: "grey.500",
                fontSize: "0.8125rem",
                "&:hover": { color: "grey.300" },
              }}
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              underline="none"
              sx={{
                color: "grey.500",
                fontSize: "0.8125rem",
                "&:hover": { color: "grey.300" },
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

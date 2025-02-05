// src/lib/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a148c", // Deep purple
      light: "#7c43bd",
      dark: "#12005e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff6f00", // Amber
      light: "#ffa040",
      dark: "#c43e00",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5", // Light grey background
      paper: "#ffffff", // White paper background
    },
    text: {
      primary: "#212121", // Dark grey text
      secondary: "#757575", // Medium grey text
    },
    error: {
      main: "#d32f2f", // Red
    },
    warning: {
      main: "#ffa000", // Orange
    },
    info: {
      main: "#1976d2", // Blue
    },
    success: {
      main: "#388e3c", // Green
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
});

export default theme;

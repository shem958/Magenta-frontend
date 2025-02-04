// src/app/layout.js
"use client";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../lib/theme";
import ReduxProvider from "../lib/providers/ReduxProvider";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Box display="flex">
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
              </Box>
            </Box>
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

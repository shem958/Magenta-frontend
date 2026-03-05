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
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

import { ReactNode } from "react";

const DRAWER_WIDTH = 280;

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                  ml: { md: 0 },
                }}
              >
                <Navbar onMenuClick={handleDrawerToggle} />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    bgcolor: "background.default",
                    minHeight: 0,
                    overflow: "auto",
                  }}
                >
                  {children}
                </Box>
                <Footer />
              </Box>
            </Box>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

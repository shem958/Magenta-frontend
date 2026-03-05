"use client";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
  variant = "default",
}) => {
  const theme = useTheme();

  const colorMap = {
    primary: {
      gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
      light: "#eef2ff",
      main: "#6366f1",
    },
    secondary: {
      gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
      light: "#fdf2f8",
      main: "#ec4899",
    },
    success: {
      gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      light: "#ecfdf5",
      main: "#10b981",
    },
    warning: {
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
      light: "#fffbeb",
      main: "#f59e0b",
    },
    error: {
      gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
      light: "#fef2f2",
      main: "#ef4444",
    },
    info: {
      gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
      light: "#eff6ff",
      main: "#3b82f6",
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  if (variant === "gradient") {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: colors.gradient,
          borderRadius: 3,
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Background decoration */}
        <Box
          sx={{
            position: "absolute",
            right: -20,
            top: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 30,
            bottom: -30,
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontWeight: 500, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {value}
            </Typography>
          </Box>
          {Icon && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon sx={{ fontSize: 28 }} />
            </Box>
          )}
        </Box>

        {(subtitle || trend) && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, zIndex: 1 }}>
            {trend && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "rgba(255,255,255,0.2)",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {trend === "up" ? (
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16 }} />
                )}
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {trendValue}
                </Typography>
              </Box>
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    );
  }

  // Default variant
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
        height: "100%",
        minHeight: 140,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          borderColor: colors.main,
          boxShadow: `0 4px 20px ${colors.main}20`,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500, mb: 1 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}
          >
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: colors.light,
              color: colors.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Box>
        )}
      </Box>

      {(subtitle || trend) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          {trend && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: trend === "up" ? "success.main" : "error.main",
              }}
            >
              {trend === "up" ? (
                <TrendingUpIcon sx={{ fontSize: 18 }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 18 }} />
              )}
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {trendValue}
              </Typography>
            </Box>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default StatsCard;

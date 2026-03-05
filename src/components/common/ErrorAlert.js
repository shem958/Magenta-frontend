"use client";
import { Alert, AlertTitle, Button, Box } from "@mui/material";

const ErrorAlert = ({ error, onRetry, title = "Error" }) => {
  if (!error) return null;

  return (
    <Box sx={{ my: 2 }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;

import React from "react";
import { Stack, Alert, AlertTitle, Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="info">
          <AlertTitle>No Results</AlertTitle>
          No matching results - <strong>try to search another</strong>
        </Alert>
      </Stack>
    </Container>
  );
};

export default NotFound;

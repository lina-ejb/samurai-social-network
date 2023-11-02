import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import img from ".././src/assets/images/error.svg";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6} item>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={navigateTo}>Back Home</Button>
          </Grid>
          <Grid xs={6} item>
            <img
              src={img}
              alt=""
              width={600} height={600}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

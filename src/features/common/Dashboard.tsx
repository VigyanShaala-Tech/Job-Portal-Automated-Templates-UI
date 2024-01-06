import React from "react";
import { Box, Container } from "@mui/material";
import STEMImg from "./images/full.png";

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        component="img"
        sx={{
          width: "80%",
          height: "80%",
          margin: 5,
        }}
        alt="women in stem"
        src={STEMImg}
      />
    </Container>
  );
};

export default Dashboard;

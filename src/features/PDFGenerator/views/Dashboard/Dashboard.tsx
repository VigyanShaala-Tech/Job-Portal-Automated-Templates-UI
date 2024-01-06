import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import TemplateCard from "./TemplateCard";
import PDFContent from "../../common/content";

const TemplateSelectionDashboard: React.FC = () => {
  const { templateSelection } = PDFContent;
  const userDetails = JSON.parse(sessionStorage.userDetails);
  return (
    <Container maxWidth="md">
      <Box py={2}>
        <Typography variant="h5">
          Select the template to be generated
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {(userDetails.cohort?.toLowerCase() === "incubator" ||
          userDetails.cohort?.toLowerCase().includes("internship")) && (
          <>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#5caff8"
                title="SMART Goals"
                content={templateSelection.SMART}
                template="SMARTGOALS"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#69ab4a"
                title="SWOT Analysis"
                content={templateSelection.SWOT}
                template="SWOT"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#feaf36"
                title="RIASEC"
                content={templateSelection.RIASEC}
                template="RIASEC"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#f58434"
                title="IDP"
                content={templateSelection.IDP}
                template="IDP"
              />
            </Grid>
          </>
        )}
        {userDetails.cohort?.toLowerCase().includes("internship") && (
          <>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#2c4869"
                title="Critical Thinking"
                content={templateSelection.CT}
                template="CT"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#5caff8"
                title="Collaboration"
                content={templateSelection.COLLABORATION}
                template="COLLABORATION"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TemplateCard
                backgroundColor="#69ab4a"
                title="Creativity And Growth Mindset"
                content={templateSelection.CAGM}
                template="CAGM"
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default TemplateSelectionDashboard;

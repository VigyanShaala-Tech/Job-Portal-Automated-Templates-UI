import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../../common/images/logo.png";
import {
  CircleList,
  EducationHeader,
  EducationalDetails,
  Goal,
  GoalValue,
  HeaderContainer,
  NameHeader,
  SkillHeader,
  SquareList,
  StyledBoxHeader,
  TickList,
} from "./StyledElements";
import { convertBulletText } from "../../../util/helper";

const theme = createTheme({
  /* typography: {
    h6: {
      fontSize: "13px",
      fontWeight: 600,
      textAlign: "center",
    },
  }, */
});
interface IDPFormFirst {
  goal1: string;
  name: string;
  education1: string;
  education2: string;
  proudMoments: string;
  raisec: string;
  matchStrength: string;
  decreaseThreat: string;
  aquiredHardSkills: string;
  aquiredSoftSkills: string;
}
interface IDPFirstPreviewProps {
  data: IDPFormFirst;
  goalName?: string;
}
const IDPFirstPreview: React.FC<IDPFirstPreviewProps> = ({
  data,
  goalName,
}) => {
  return (
    <>
      <Container maxWidth="md">
        <Box border="1px solid rgb(198, 198, 198)" padding={1.5}>
          <HeaderContainer container alignItems="center">
            <Goal item xs={2}>
              <Box border="1px solid rgb(255, 192, 0)" padding={1} margin={1}>
                <img width={90} src={logo} />
              </Box>
            </Goal>
            <GoalValue item xs={10}>
              <Box padding={data.goal1.length < 77 ? 3.375 : 1.75}>
                <Typography fontWeight="bold" variant="caption">
                  {goalName === "B" ? "Goal B:" : "Goal A:"}
                </Typography>
                <Typography variant="h6" fontSize={16}>
                  {data.goal1}
                </Typography>
              </Box>
            </GoalValue>
          </HeaderContainer>
          <Grid container>
            <NameHeader item xs={12}>
              <Typography variant="h6">Name: {data.name}</Typography>
            </NameHeader>
            <EducationHeader item xs={12}>
              <Typography variant="h6">My Education</Typography>
            </EducationHeader>
            <EducationalDetails item xs={4}>
              <Typography variant="body1">
                X<sup>th</sup> / XII<sup>th</sup>
              </Typography>
              <Typography variant="body1">
                1<sup>st</sup>/2<sup>nd</sup>/3<sup>rd</sup> /4<sup>th</sup>{" "}
                year
              </Typography>
            </EducationalDetails>
            <EducationalDetails item xs={8}>
              <Typography>{data.education1}</Typography>
              <Typography>{data.education2}</Typography>
            </EducationalDetails>
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={7} xs={7}>
              <Grid container>
                <Grid item xs={7} flexDirection="column">
                  <StyledBoxHeader>
                    <Typography variant="body1" textAlign="center">
                      My Proud Moments{" "}
                    </Typography>
                  </StyledBoxHeader>
                  <Box
                    border="0.5px solid rgb(92, 142, 58)"
                    minHeight={375}
                    padding={1}
                  >
                    {/* <TickList> */}
                    {convertBulletText(data.proudMoments, "check")}
                    {/* </TickList> */}
                  </Box>
                </Grid>
                <Grid item xs={5} flexDirection="column">
                  <StyledBoxHeader>
                    <Typography variant="body1" textAlign="center">
                      Top 3 Personality Traits (RAISEC) %
                    </Typography>
                  </StyledBoxHeader>
                  <Box
                    border="0.5px solid rgb(92, 142, 58)"
                    minHeight={353}
                    padding={1}
                  >
                    {convertBulletText(data.raisec, "square")}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={5} xs={5}>
              <Box display="flex" flexDirection="column">
                <StyledBoxHeader>
                  <Typography textAlign="center">
                    Match Strength-Oppn. Strategy
                  </Typography>
                </StyledBoxHeader>
                <Box
                  border="0.5px solid rgb(92, 142, 58)"
                  minHeight={375}
                  padding={1}
                >
                  {convertBulletText(data.matchStrength, "circle")}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item md={6} xs={6}>
              <Box display="flex" flexDirection="column">
                <StyledBoxHeader>
                  <Typography textAlign="center">
                    Decrease Threat Strategy
                  </Typography>
                </StyledBoxHeader>
                <Box
                  border="0.5px solid rgb(92, 142, 58)"
                  minHeight={230}
                  padding={1}
                >
                  {convertBulletText(data.decreaseThreat, "circle")}
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={6}>
              <Grid container>
                <Grid xs={12}>
                  <StyledBoxHeader>
                    <Typography textAlign="center">
                      Acquired Relevant Skills
                    </Typography>
                  </StyledBoxHeader>
                </Grid>
                <Grid xs={6}>
                  <SkillHeader>
                    <Typography textAlign="center">Hard Skills</Typography>
                  </SkillHeader>
                  <Box
                    border="0.5px solid rgb(92, 142, 58)"
                    minHeight={191}
                    padding={1}
                  >
                    {convertBulletText(data.aquiredHardSkills, "circle")}
                  </Box>
                </Grid>
                <Grid xs={6}>
                  <SkillHeader>
                    <Typography textAlign="center">Soft Skills</Typography>
                  </SkillHeader>
                  <Box
                    border="0.5px solid rgb(92, 142, 58)"
                    minHeight={191}
                    padding={1}
                  >
                    {convertBulletText(data.aquiredSoftSkills, "circle")}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default IDPFirstPreview;

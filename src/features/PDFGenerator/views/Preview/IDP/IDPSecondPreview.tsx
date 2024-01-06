import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BlueBox,
  CareerHeader,
  Goal,
  GoalValue,
  HeaderContainer,
  LightBlueBox,
  LightYellowBox,
  SkillHeaderYellow,
  StyledYellowHeader,
} from "./StyledElements";
import logo from "../../../common/images/logo.png";
import { convertBulletText, convertToPara } from "../../../util/helper";

interface IDPFormSecond {
  goal2: string;
  careerOptions: string;
  hardSkillsToAquire: string;
  softSkillsToAquire: string;
  employers: string;
  mentor1: string;
  mentor2: string;
  mentor3: string;
  mentor4: string;
  mileStone1: string;
  mileStone2: string;
  mileStone3: string;
  m1Step1: string;
  m1Step2: string;
  m1Step3: string;
  m2Step1: string;
  m2Step2: string;
  m2Step3: string;
  m3Step1: string;
  m3Step2: string;
  m3Step3: string;
  adjustment: string;
  review: string;
}
interface IDPSecondPreviewProps {
  data: IDPFormSecond;
  goalName?: string;
}
const IDPSecondPreview: React.FC<IDPSecondPreviewProps> = ({
  data,
  goalName,
}) => {
  const [adjustmentPart1, setAdjustment1] = React.useState("");
  const [adjustmentPart2, setAdjustment2] = React.useState("");
  const [reviewPart1, setReview1] = React.useState("");
  const [reviewPart2, setReview2] = React.useState("");
  React.useEffect(() => {
    const adjustmentPoints = data.adjustment
      ?.split("• ")
      .filter((point) => point.trim());
    const reviewPoints = data.review
      ?.split("• ")
      .filter((point) => point.trim());
    const middleIndex = Math.floor(adjustmentPoints.length / 2);
    const reviewMiddleIndex = Math.floor(reviewPoints.length / 2);
    setAdjustment1(
      adjustmentPoints
        .slice(0, middleIndex)
        .map((item) => `• ${item}`)
        .join("")
    );
    setAdjustment2(
      adjustmentPoints
        .slice(middleIndex)
        .map((item) => `• ${item}`)
        .join("")
    );
    setReview1(
      reviewPoints
        .slice(0, reviewMiddleIndex)
        .map((item) => `• ${item}`)
        .join("")
    );
    setReview2(
      reviewPoints
        .slice(reviewMiddleIndex)
        .map((item) => `• ${item}`)
        .join("")
    );
  }, []);
  return (
    <>
      <Container maxWidth="md">
        <Box border="1px solid rgb(198, 198, 198)" padding={1.5}>
          <HeaderContainer
            container
            alignItems="center"
            sx={{ minHeight: "102.3px" }}
          >
            <Goal item xs={2} alignItems="center">
              <Box border="1px solid rgb(255, 192, 0)" padding={1} margin={1}>
                <img width={90} src={logo} />
              </Box>
            </Goal>
            <GoalValue item xs={10}>
              <Box padding={data.goal2.length < 77 ? 3.375 : 1.75}>
                <Typography fontWeight="bold" variant="caption">
                  {goalName === "B" ? "Goal B:" : "Goal A:"}
                </Typography>
                <Typography variant="h6" fontSize={16}>
                  {data.goal2}
                </Typography>
              </Box>
            </GoalValue>
          </HeaderContainer>
          <Grid container>
            <Grid item xs={12} marginTop={0.5}>
              <CareerHeader>
                <Typography variant="h6">Career Exploration</Typography>
              </CareerHeader>
            </Grid>
            <Grid item xs={4}>
              <StyledYellowHeader minHeight={25}>
                <Typography>Career Options for this Goal</Typography>
              </StyledYellowHeader>
              <LightYellowBox minHeight={205}>
                {convertBulletText(data.careerOptions, "")}
              </LightYellowBox>
            </Grid>
            <Grid item xs={4}>
              <Grid container minHeight={60}>
                <Grid item xs={12}>
                  <StyledYellowHeader>
                    <Typography>Skills to acquire</Typography>
                  </StyledYellowHeader>
                </Grid>
                <Grid item xs={6}>
                  <SkillHeaderYellow>
                    <Typography>Hard skills</Typography>
                  </SkillHeaderYellow>
                  <LightYellowBox minHeight={163}>
                    {convertBulletText(data.hardSkillsToAquire, "")}
                  </LightYellowBox>
                </Grid>
                <Grid item xs={6}>
                  <SkillHeaderYellow>
                    <Typography>Soft skills</Typography>
                  </SkillHeaderYellow>
                  <LightYellowBox minHeight={163}>
                    {convertBulletText(data.softSkillsToAquire, "")}
                  </LightYellowBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <StyledYellowHeader minHeight={72}>
                <Typography>Key Employers/or University</Typography>
              </StyledYellowHeader>
              <LightYellowBox minHeight={158}>
                {convertBulletText(data.employers, "")}
              </LightYellowBox>
            </Grid>
            <Grid item xs={2}>
              <StyledYellowHeader minHeight={60}>
                <Typography>My Mentors/or Alumni</Typography>
              </StyledYellowHeader>
              <LightYellowBox minHeight={38}>{data.mentor1}</LightYellowBox>
              <LightYellowBox minHeight={38}>{data.mentor2}</LightYellowBox>
              <LightYellowBox minHeight={38}>{data.mentor3}</LightYellowBox>
              <LightYellowBox minHeight={38}>{data.mentor4}</LightYellowBox>
            </Grid>
            <Grid item xs={12} marginTop={1}>
              <LightBlueBox>
                <Typography variant="h6">
                  Developmental Milestones (M1-M3){" "}
                  <Typography variant="caption">
                    (Breaking down Goal into SMART Mile Stones){" "}
                  </Typography>
                </Typography>
              </LightBlueBox>
            </Grid>
            <Grid item xs={4}>
              <BlueBox minHeight={50}>
                <Typography variant="body2">M1({data.mileStone1})</Typography>
              </BlueBox>
              <Grid container>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step1
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m1Step1)}
                  </LightBlueBox>
                </Grid>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step2
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m1Step2)}
                  </LightBlueBox>
                </Grid>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step3
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m1Step3)}
                  </LightBlueBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <BlueBox minHeight={50}>
                <Typography variant="body2">M2({data.mileStone2})</Typography>
              </BlueBox>
              <Grid container>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step1
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m2Step1)}
                  </LightBlueBox>
                </Grid>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step2
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m2Step2)}
                  </LightBlueBox>
                </Grid>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step3
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m2Step3)}
                  </LightBlueBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <BlueBox minHeight={50}>
                <Typography variant="body2">M3({data.mileStone3})</Typography>
              </BlueBox>
              <Grid container>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step1
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m3Step1)}
                  </LightBlueBox>
                </Grid>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step2
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m3Step2)}
                  </LightBlueBox>
                </Grid>
                <Grid item xs={4}>
                  <LightBlueBox>
                    <Typography variant="body2" textAlign="center">
                      Step3
                    </Typography>
                  </LightBlueBox>
                  <LightBlueBox minHeight={265}>
                    {convertToPara(data.m3Step3)}
                  </LightBlueBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <BlueBox>
                <Typography>
                  Adjustment Needed
                  <Typography variant="caption">
                    (When unexpected situations arise){" "}
                  </Typography>
                </Typography>
              </BlueBox>
            </Grid>
            <Grid item xs={6}>
              <LightBlueBox minHeight={60}>
                {convertBulletText(adjustmentPart1, "")}
              </LightBlueBox>
            </Grid>
            <Grid item xs={6}>
              <LightBlueBox minHeight={60}>
                {convertBulletText(adjustmentPart2, "")}
              </LightBlueBox>
            </Grid>
            <Grid item xs={12} marginTop={0.5}>
              <StyledYellowHeader>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography textAlign={"left"}>Review</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography textAlign={"left"}>
                      Mile Stones Attained
                    </Typography>
                  </Grid>
                </Grid>
              </StyledYellowHeader>
            </Grid>
            <Grid item md={6}>
              <LightYellowBox minHeight={60}>
                {convertBulletText(reviewPart1, "check")}
              </LightYellowBox>
            </Grid>
            <Grid item md={6}>
              <LightYellowBox minHeight={60}>
                {convertBulletText(reviewPart2, "check")}
              </LightYellowBox>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
export default IDPSecondPreview;

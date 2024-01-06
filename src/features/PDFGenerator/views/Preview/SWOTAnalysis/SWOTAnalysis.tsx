import React from "react";
import styled from "styled-components";
import rightBracket from "./images/right.png";
import bottom from "./images/bottom.png";
import top from "./images/top.png";
import leftBracket from "./images/left.png";
import { useUserContext } from "../../../contexts/UserContext";
import logo from "../../../common/images/logo.png";
import {
  Paper,
  Card,
  Typography,
  CardContent,
  CardHeader,
  Box,
  Container,
} from "@mui/material";

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
`;

const StyledPaper = styled(Paper)`
  display: grid;
  grid-template-columns: 4rem 18rem 18rem 4rem;
  grid-template-rows: 4rem 24rem 24.9rem 4rem;
  grid-gap: 0.063rem;
  justify-items: center;
  align-items: center;
  justify-content: safe center;
`;
const StyledCardContent = styled(CardContent)`
  margin: 16px;
  padding: 8px;
  &.MuiCardContent-root {
    :last-child {
      padding-bottom: 9px;
      margin-left: 12px;
      margin-right: 14px;
    }
    padding: 8px;
    height: 72%;
    border: 1px solid black;
  }
`;
const Top = styled(Box)`
  grid-row: 1 / 2;
  grid-column: 1 / 5;
  margin-top: 25px;
`;
const TopGradient = styled(Typography)`
  width: 36rem;
  border: 1px solid black;
  text-align: center;
  background-image: linear-gradient(
    to right,
    rgb(246, 138, 51),
    rgb(254, 199, 42)
  );
`;
const BottomGradient = styled(Typography)`
  width: 36rem;
  border: 1px solid black;
  text-align: center;
  background-image: linear-gradient(
    to right,
    rgb(57, 90, 123),
    rgb(144, 215, 246)
  );
`;
const Bottom = styled(Box)`
  grid-row: 4 / 5;
  grid-column: 1 / 5;
  margin-bottom: 22px;
`;
const Left = styled(Box)`
  grid-row: 2 / 4;
  grid-column: 1 / 2;
`;
const Right = styled(Box)`
  grid-row: 2 / 4;
  grid-column: 4 / 5;
`;
const TopCurlyBrace = styled(Box)`
  grid-row: 1 / 2;
  grid-column: 1 / span 3;
  margin-top: 107.5px;
  margin-left: 64px;
`;
const BottomCurlyBrace = styled(Box)`
  grid-row: 4 / 5;
  grid-column: 1 / span 3;
  margin-left: 70.5px;
  margin-bottom: 92px;
`;
const StyledCardHeader = styled(CardHeader)`
  text-align: center;
  &.css-185gdzj-MuiCardHeader-root {
    padding: 4px;
  }
  .MuiCardHeader-content {
    .css-nrdprl-MuiTypography-root {
      color: #000000;
      font-weight: bold;
    }
  }
`;
const PageBreak = styled.div`
  page-break-after: always;
`;

interface CardProps {
  title: string;
}
type TemplateData = {
  [key: string]: string;
};
type tcolorCode = {
  [key: string]: {
    title: string;
    background: string;
    contentBackground: string;
  };
};
const colorCode: tcolorCode = {
  strength: {
    title: "rgb(250, 151, 111)",
    background: "rgb(252, 189, 165)",
    contentBackground: "rgb(249, 167, 120)",
  },
  weakness: {
    title: "rgb(255, 220, 125)",
    background: "rgb(255, 230, 171)",
    contentBackground: "rgb(255, 220, 119)",
  },
  opportunity: {
    title: "rgb(139, 150, 169)",
    background: "rgb(191, 193, 203)",
    contentBackground: "rgb(133, 145, 164)",
  },
  threat: {
    title: "rgb(195, 228, 246)",
    background: "rgb(222, 236, 246)",
    contentBackground: "rgb(151, 171, 198)",
  },
};

const SWOTAnalysis: React.FC<TemplateData> = () => {
  const {
    userState: { SWOTData },
  } = useUserContext();
  const renderformattedText = (title: string) => {
    let text = "";
    switch (title) {
      case "strength":
        text = SWOTData.strength;
        break;
      case "weakness":
        text = SWOTData.weakness;
        break;
      case "opportunity":
        text = SWOTData.opportunity;
        break;
      case "threat":
        text = SWOTData.threat;
        break;
      default:
        text = "";
    }
    const bulletPoints = text?.split("• ").filter((point) => point.trim());
    return bulletPoints?.map((point, index) => (
      <div key={index} style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>{"\u2022"}</div>
        <Typography sx={{ fontSize: "0.75rem" }}>{point}</Typography>
      </div>
    ));
  };
  const MyCard = ({ title }: CardProps) => {
    // const classes = useStyles();
    console.log(SWOTData);
    return (
      <StyledCard
        elevation={0}
        square={true}
        style={{
          backgroundColor: colorCode[title.toLocaleLowerCase()].background,
        }}
      >
        <StyledCardHeader
          style={{
            backgroundColor: colorCode[title.toLocaleLowerCase()].title,
          }}
          title={title}
        />
        <StyledCardContent
          style={{
            backgroundColor:
              colorCode[title.toLocaleLowerCase()].contentBackground,
          }}
        >
          {renderformattedText(title.toLocaleLowerCase())}
        </StyledCardContent>
      </StyledCard>
    );
  };

  const Quadrants = () => {
    return (
      <React.Fragment>
        <MyCard title="Strength" />

        <MyCard title="Weakness" />
        <TopCurlyBrace>
          <img src={top} alt="top"></img>
        </TopCurlyBrace>
        <MyCard title="Opportunity" />

        <MyCard title="Threat" />
        <BottomCurlyBrace>
          <img src={bottom} alt="bottom"></img>
        </BottomCurlyBrace>
      </React.Fragment>
    );
  };

  return (
    <>
      <PageBreak className="page-break">
        <Box maxWidth="md" padding={1.5}>
          <Box border="1px solid #616161" padding={2} maxWidth={760}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                  {SWOTData.studentName}
                </Typography>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>Studying Degree:</span>{" "}
                  {SWOTData.studentDegree}
                </Typography>
                <Typography variant="body1">
                  <span style={{ fontWeight: "bold" }}>Short-term goal:</span>
                  {SWOTData.goal}
                </Typography>
              </Box>
              <Box>
                <img src={logo} />
              </Box>
            </Box>
            <StyledPaper elevation={0}>
              <Top>
                <TopGradient fontWeight={700} variant="h5">
                  Internal
                </TopGradient>
              </Top>

              <Bottom>
                <BottomGradient fontWeight={700} variant="h5">
                  External
                </BottomGradient>
              </Bottom>
              <Left marginRight={2}>
                <img
                  src={leftBracket}
                  alt="left bracket"
                  style={{ height: 82, width: 76 }}
                />
              </Left>
              <Right marginLeft={3}>
                <img
                  src={rightBracket}
                  alt="right bracket"
                  style={{ height: 75, width: 79 }}
                />
              </Right>
              <Quadrants />
            </StyledPaper>
            <Box ml={9}>
              <Typography variant="h6">C: Convert M: Match</Typography>
            </Box>
          </Box>
        </Box>
      </PageBreak>
    </>
  );
};

export default SWOTAnalysis;

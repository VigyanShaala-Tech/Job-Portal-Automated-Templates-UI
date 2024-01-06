import styled from "styled-components";
import { Box, Grid, } from "@mui/material";
export const HeaderContainer = styled(Grid)`
  border: 1px solid rgb(45, 46, 49);
  
`;
export const Goal = styled(Grid)`
  align-items: center;
`;
export const GoalValue = styled(Grid)`
  background-color: rgb(207, 217, 236);
  border-left: 1px solid rgb(97, 97, 97);
`;
export const NameHeader = styled(Grid)`
  background-color: rgb(112, 173, 71);
  color: rgb(255, 255, 255);
  font-weight: bold;
  padding: 4px;
  border: 0.5px solid rgb(92, 142, 58);
  margin-top: 4px;
`;
export const EducationHeader = styled(Grid)`
  background-color: rgb(197, 224, 180);
  padding: 4px;
  border: 0.5px solid rgb(92, 142, 58);
`;
export const CareerHeader = styled(Grid)`
  background-color: rgb(254, 249, 231);
  border: 0.5px solid rgb(193, 189, 176);
  padding: 4px;
`;
export const EducationalDetails = styled(Grid)`
  border: 0.5px solid rgb(92, 142, 58);
  padding: 8px;
`;

export const StyledBoxHeader = styled(Box)`
  border: 0.5px solid rgb(92, 142, 58);
  padding: 8px 8px;
  background-color: rgb(197, 224, 180);
  margin-top: 4px;
`;
export const StyledYellowHeader = styled(Box)`
  border: 0.5px solid rgb(193, 189, 176);
  padding: 4px;
  background-color: rgb(255, 232, 167);
  min-height: 25px;
`;
export const SkillHeader = styled(Box)`
  background-color: rgb(197, 224, 180);
  border: 0.5px solid rgb(92, 142, 58);
  padding: 8px;
`;
export const SkillHeaderYellow = styled(Box)`
  background-color: rgb(255, 232, 167);
  border: 0.5px solid rgb(193, 189, 176);
  padding: 8px;
`;
export const LightYellowBox = styled(Box)`
  border: 0.5px solid rgb(224, 220, 204);
  background-color: rgb(254, 249, 231);
  padding: 4px;
`;
export const LightBlueBox = styled(Box)`
  border: 0.5px solid rgb(165, 169, 177);
  background-color: rgb(229, 234, 245);
  padding: 4px;
`;
export const BlueBox = styled(Box)`
  border: 0.5px solid rgb(165, 169, 177);
  background-color: rgb(180, 199, 231);
  padding: 4px;
`;
export const TickList = styled.ul`
  list-style: "✓ ";
`;
export const CircleList = styled.ul`
  list-style-type: circle;
`;
export const SquareList = styled.ul`
  list-style-type: square;
`;
import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import styled from "styled-components";
import logo from "../../../common/images/logo.png";
import { useUserContext } from "../../../contexts/UserContext";

// Define custom styles for the components

const SmartGoalsContainer = styled(Container)`
  position: relative;
  background-color: white;
  padding-top: 40px; /* Add padding to make space for the logo */
  width: 90%;
  margin: auto; /* Center the template on the page */
  z-index: 3;
`;

const LogoImage = styled.img`
  margin-right: auto;
`;

const BlueTableCell = styled(TableCell)`
  background-color: #2c4869; /* Dark blue color for column 1 */
  color: white;
  width: 15%;
  text-align: center;
  border-right: 1px;
`;

const LightBlueTableCell = styled(TableCell)`
  background-color: #8acfec; /* Light blue color for row 1 in column 2 */
  width: 85%;
`;

const LightGreenTableCell = styled(TableCell)`
  background-color: #99ceab; /* Light green color for other rows in column 2 */
  width: 85%;
`;

const WhiteText = styled.span`
  color: white;
  font-weight: bold;
`;

const RowText = styled.span`
  font-weight: bold;
`;

const CustomTableContainer = styled(Paper)`
  padding-top: 0%;
  width: 75%;
  margin: auto;
`;

const SmartGoalsContent = styled.div`
  width: 75%;
  padding-top: 3%;
  margin: auto;
  padding-bottom: 3%;
`;

const CustomTableRow = styled(TableRow)`
  margin-bottom: 30px;
`;

const PageBreak = styled.div`
  page-break-after: always;
`;

const SMARTGOALS: React.FC = () => {
  const {
    userState: { SMARTGOALSData },
  } = useUserContext();

  return (
    <PageBreak className="page-break">
      <SmartGoalsContainer>
        <Box textAlign="right" marginRight={10}>
          <img src={logo} alt="Logo" />
        </Box>

        {/*     <BackgroundLogo src={background_logo1} alt="Background Logo" /> */}

        <SmartGoalsContent>
          <h2>SMART GOALS </h2>
          <p>
            <strong>
              SMART Goals Overview:SMART goals set you up for success by making
              goals Specific, Measurable, Achievable, Relevant, and Time-bound.
              The SMART method helps push you further, gives you a sense of
              direction, and helps you organize and reach your short-term goals.
            </strong>
          </p>
        </SmartGoalsContent>

        <CustomTableContainer>
          <Table>
            <TableHead>
              <CustomTableRow>
                <BlueTableCell align="center">
                  <WhiteText>Goal</WhiteText>
                </BlueTableCell>
                <LightBlueTableCell>
                  <RowText>{SMARTGOALSData.goal}</RowText>
                </LightBlueTableCell>
              </CustomTableRow>
            </TableHead>
            <TableBody>
              <CustomTableRow>
                <BlueTableCell align="center">
                  <WhiteText>S</WhiteText>
                </BlueTableCell>
                <LightGreenTableCell>
                  <RowText>{SMARTGOALSData.specific}</RowText>
                </LightGreenTableCell>
              </CustomTableRow>
              <CustomTableRow>
                <BlueTableCell align="center">
                  <WhiteText>M</WhiteText>
                </BlueTableCell>
                <LightGreenTableCell>
                  <RowText>{SMARTGOALSData.measurable}</RowText>
                </LightGreenTableCell>
              </CustomTableRow>
              <CustomTableRow>
                <BlueTableCell align="center">
                  <WhiteText>A</WhiteText>
                </BlueTableCell>
                <LightGreenTableCell>
                  <RowText>{SMARTGOALSData.achievable}</RowText>
                </LightGreenTableCell>
              </CustomTableRow>
              <CustomTableRow>
                <BlueTableCell align="center">
                  <WhiteText>R</WhiteText>
                </BlueTableCell>
                <LightGreenTableCell>
                  <RowText>{SMARTGOALSData.relevant}</RowText>
                </LightGreenTableCell>
              </CustomTableRow>
              <CustomTableRow>
                <BlueTableCell align="center">
                  <WhiteText>T</WhiteText>
                </BlueTableCell>
                <LightGreenTableCell>
                  <RowText>{SMARTGOALSData.timeBound}</RowText>
                </LightGreenTableCell>
              </CustomTableRow>
            </TableBody>
          </Table>
        </CustomTableContainer>
      </SmartGoalsContainer>
    </PageBreak>
  );
};

export default SMARTGOALS;

import React from "react";
import styled from "styled-components";
import { useUserContext } from "../../contexts/UserContext";
import logo from "../../common/images/logo.png";
import watermark from "../../common/images/watermark.png";
import {
  Typography,
  Box,
  Link,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import PDFContent from "../../common/content";

const WaterMarkContainer = styled(Box)`
  position: relative;
`;
const WatermarkImage = styled.img`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  pointer-events: none;
`;
const PageBreak = styled.div`
  page-break-after: always;
`;

const RIASEC: React.FC = () => {
  const {
    userState: { RIASECData, userDetails },
  } = useUserContext();
  const { RIASECContent } = PDFContent;

  return (
    <>
      <PageBreak className="page-break">
        <WaterMarkContainer>
          <Box maxWidth="md" padding={4}>
            <Box border="1px solid #616161" padding={2} minWidth={700}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">
                  <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                  {userDetails.name}
                </Typography>
                <Box>
                  <img src={logo} alt="logo" />
                </Box>
              </Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ textDecoration: "underline" }}
              >
                RIASEC Personality Test
              </Typography>
              <Box m={2}>
                <Typography variant="h6" gutterBottom>
                  {RIASECContent.question1}
                </Typography>
                <Link
                  marginLeft={2}
                  href={RIASECContent.examlLink}
                  target="_blank"
                  variant="body1"
                >
                  {RIASECContent.examlLink}
                </Link>
              </Box>
              <Box m={2}>
                <Typography variant="h6" gutterBottom>
                  {RIASECContent.question2}
                </Typography>
                <Typography marginLeft={2} variant="body1" gutterBottom>
                  {RIASECContent.question2a}
                </Typography>
                <TableContainer>
                  <Table sx={{ maxWidth: 400 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ border: 0.5 }}
                          component="th"
                          scope="row"
                        >
                          {RIASECContent.realistic}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }}>
                          {RIASECData.realistic}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ border: 0.5 }}
                          component="th"
                          scope="row"
                        >
                          {RIASECContent.investigative}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }}>
                          {RIASECData.investigative}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ border: 0.5 }}
                          component="th"
                          scope="row"
                        >
                          {RIASECContent.artistic}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }}>
                          {RIASECData.artistic}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ border: 0.5 }}
                          component="th"
                          scope="row"
                        >
                          {RIASECContent.social}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }}>
                          {RIASECData.social}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ border: 0.5 }}
                          component="th"
                          scope="row"
                        >
                          {RIASECContent.enterprising}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }}>
                          {RIASECData.enterprising}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ border: 0.5 }}
                          component="th"
                          scope="row"
                        >
                          {RIASECContent.conventional}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }}>
                          {" "}
                          {RIASECData.conventional}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box m={2}>
                <Typography variant="body1" gutterBottom>
                  {RIASECContent.question2b}
                </Typography>
                <TableContainer>
                  <Table sx={{ maxWidth: 400 }}>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ border: 0.5 }} align="center">
                          {RIASECData?.hollandCode
                            ?.charAt(0)
                            .toLocaleUpperCase()}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }} align="center">
                          {RIASECData?.hollandCode
                            ?.charAt(1)
                            .toLocaleUpperCase()}
                        </TableCell>
                        <TableCell sx={{ border: 0.5 }} align="center">
                          {RIASECData?.hollandCode
                            ?.charAt(2)
                            .toLocaleUpperCase()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <WatermarkImage
            src={watermark}
            height={600}
            width={500}
            alt="Watermark"
          />
        </WaterMarkContainer>
      </PageBreak>
    </>
  );
};

export default RIASEC;

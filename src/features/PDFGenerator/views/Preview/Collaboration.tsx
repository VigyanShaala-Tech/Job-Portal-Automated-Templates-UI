import React from "react";
import styled from "styled-components";
import { useUserContext } from "../../contexts/UserContext";
import logo from "../../common/images/logo.png";
import watermark from "../../common/images/watermark.png";
import { Typography, Box } from "@mui/material";
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

const COLLABORATION: React.FC = () => {
  const {
    userState: { COLLABORATIONData, userDetails },
  } = useUserContext();
  const { CollabContent } = PDFContent;

  return (
    <>
      <PageBreak className="page-break">
        <WaterMarkContainer>
          <Box maxWidth="md" padding={4}>
            <Box border="1px solid #616161" padding={2}>
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
                  <img src={logo} />
                </Box>
              </Box>
              <Box my={2}>
                <Typography variant="body1" gutterBottom>
                  {CollabContent.question1}
                </Typography>
                <Box
                  padding={1}
                  border="1px solid #a39c9c"
                  maxWidth={700}
                  minHeight={100}
                >
                  <Typography variant="caption" fontWeight="bold">
                    Answer:
                  </Typography>
                  <Typography variant="body2">
                    {COLLABORATIONData.answerA}
                  </Typography>
                </Box>
              </Box>
              <Box my={2}>
                <Typography variant="body1" gutterBottom>
                  {CollabContent.question2}
                </Typography>
                <Box
                  padding={1}
                  border="1px solid #a39c9c"
                  maxWidth={700}
                  minHeight={100}
                >
                  <Typography variant="caption" fontWeight="bold">
                    Answer:
                  </Typography>
                  <Typography variant="body2">
                    {COLLABORATIONData.answerB}
                  </Typography>
                </Box>
              </Box>
              <Box my={2}>
                <Typography variant="body1" gutterBottom>
                  {CollabContent.question3}
                </Typography>
                <Box
                  padding={1}
                  border="1px solid #a39c9c"
                  maxWidth={700}
                  minHeight={100}
                >
                  <Typography variant="caption" fontWeight="bold">
                    Answer:
                  </Typography>
                  <Typography variant="body2">
                    {COLLABORATIONData.answerC}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <WatermarkImage
            src={watermark}
            height={700}
            width={700}
            alt="Watermark"
          />
        </WaterMarkContainer>
      </PageBreak>
    </>
  );
};

export default COLLABORATION;

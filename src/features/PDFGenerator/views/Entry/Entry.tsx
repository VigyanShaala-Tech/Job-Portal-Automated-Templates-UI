import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import SWOTEntry from "./SWOTEntry";
import IDPEntry from "./IDP/IDPEntry";
import CriticalThinkingEntry from "./CrticalThinkingEntry";
import SMARTGOALSEntry from "./SmartGoalsEntry";
import RIASECEntry from "./RIASECEntry";
import { useUserContext } from "../../contexts/UserContext";
import COLLABORATIONEntry from "./CollaborationEntry";
import CAGMEntry from "./CAGMEntry";
import { theme } from "../../../common/util/theme";
import { useNavigate } from "react-router-dom";

const Entry: React.FC = () => {
  const {
    userState: { selectedTemplate },
  } = useUserContext();
  const [templateToBeRendered, setTemplate] = useState(<></>);
  const [headerContent, setHeader] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    switch (selectedTemplate) {
      case "SWOT":
        setTemplate(<SWOTEntry />);
        setHeader("SWOT Analysis");
        break;
      case "SMARTGOALS":
        setTemplate(<SMARTGOALSEntry />);
        setHeader("SMART Goals");
        break;
      case "IDP":
        setTemplate(<IDPEntry />);
        setHeader("IDP");
        break;
      case "CT":
        setTemplate(<CriticalThinkingEntry />);
        setHeader("Critical Thinking");
        break;
      case "RIASEC":
        setTemplate(<RIASECEntry />);
        setHeader("RIASEC");
        break;
      case "COLLABORATION":
        setTemplate(<COLLABORATIONEntry />);
        setHeader("Collaboration");
        break;
      case "CAGM":
        setTemplate(<CAGMEntry />);
        setHeader("Creativity & Growth Mindset");
        break;
      default:
        setTemplate(
          <Alert severity="error">
            <AlertTitle>Error while loading the template!</AlertTitle>
            Please select a template from{" "}
            <Button
              variant="text"
              onClick={() => navigate("/PDFGenerator/dashboard")}
            >
              template selection page
            </Button>
          </Alert>
        );
        break;
    }
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: theme.palette.secondary.light,
          }}
        >
          <Toolbar style={{ alignItems: "flex-start" }}>
            <Typography
              variant="body1"
              color="primary"
              fontSize={28}
              textAlign="center"
              sx={{ flexGrow: 1, alignSelf: "center" }}
            >
              {headerContent}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container>
        <Box py={2}>
          <Typography variant="h6">
            Please answer the below questions to generate the template
          </Typography>
        </Box>
        {templateToBeRendered}
      </Container>
    </>
  );
};

export default Entry;
